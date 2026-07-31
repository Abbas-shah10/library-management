import { Book, Category, Fine, Loan, Member, Reservation } from '../models/associations.js'
import sequelize from '../db/connectDb.js'

const getReportsOverview = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const [totalBooks, totalMembers, totalLoans, activeLoans, overdueLoans, waitingReservations] = await Promise.all([
      Book.count(),
      Member.count(),
      Loan.count(),
      Loan.count({ where: { status: 'active' } }),
      Loan.count({ where: { status: 'overdue' } }),
      Reservation.count({ where: { status: 'waiting' } }),
    ])

    const [fineRevenue, outstandingFines, fineCount] = await Promise.all([
      Fine.sum('amount', { where: { paid: true } }),
      Fine.sum('amount', { where: { paid: false } }),
      Fine.count(),
    ])

    const loans = await Loan.findAll({
      attributes: ['id', 'book_id', 'member_id', 'loan_date', 'due_date', 'return_date', 'status'],
      include: [
        { model: Book, attributes: ['id', 'title', 'isbn'] },
        { model: Member, attributes: ['id', 'name', 'email'] },
      ],
    })

    const topBooksMap = new Map();
    const topMembersMap = new Map();
    const monthlyMap = new Map();

    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      monthlyMap.set(`${d.getFullYear()}-${d.getMonth()}`, { month: d.toLocaleString('en-US', { month: 'short' }), count: 0 })
    }

    for (const loan of loans) {
      const bookId = loan.book_id;
      const memberId = loan.member_id;

      if (bookId) {
        const entry = topBooksMap.get(bookId) || { id: bookId, title: loan.Book?.title || 'Unknown', isbn: loan.Book?.isbn || '', count: 0 };
        entry.count++;
        topBooksMap.set(bookId, entry);
      }

      if (memberId) {
        const entry = topMembersMap.get(memberId) || { id: memberId, name: loan.Member?.name || 'Unknown', email: loan.Member?.email || '', count: 0 };
        entry.count++;
        topMembersMap.set(memberId, entry);
      }

      if (loan.loan_date) {
        const d = new Date(loan.loan_date);
        if (!isNaN(d)) {
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          if (monthlyMap.has(key)) {
            monthlyMap.get(key).count++;
          }
        }
      }
    }

    const topBooks = [...topBooksMap.values()].sort((a, b) => b.count - a.count).slice(0, 5);
    const topMembers = [...topMembersMap.values()].sort((a, b) => b.count - a.count).slice(0, 5);
    const monthlyLoans = [...monthlyMap.values()];

    const categories = await Category.findAll({
      attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('Books.id')), 'bookCount']],
      include: { model: Book, attributes: [] },
      group: ['Category.id'],
      order: [['name', 'ASC']],
    })

    const categoryDistribution = categories.map((c) => ({
      name: c.name,
      bookCount: Number(c.get('bookCount')) || 0,
    }))

    return res.status(200).json({
      message: "Reports fetched successfully",
      data: {
        totals: { totalBooks, totalMembers, totalLoans, activeLoans, overdueLoans, waitingReservations },
        fines: {
          revenue: Number(fineRevenue) || 0,
          outstanding: Number(outstandingFines) || 0,
          totalFines: fineCount,
          collectionRate: fineCount > 0 ? Math.round(((Number(fineRevenue) || 0) / (Number(fineRevenue) + Number(outstandingFines))) * 100) : 0,
        },
        topBooks,
        topMembers,
        monthlyLoans,
        categoryDistribution,
      },
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

export { getReportsOverview };
