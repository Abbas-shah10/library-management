import { Loan, Member, Book } from '../models/associations.js'
import sequelize from '../db/connectDb.js'
import { sendEmail, overdueEmailTemplate } from '../utils/emailService.js'

export async function runOverdueCheck() {
  const today = new Date().toISOString().slice(0, 10);

  const overdueLoans = await Loan.findAll({
    where: {
      status: 'active',
      due_date: { [sequelize.Op.lt]: today },
    },
    include: [
      { model: Member, attributes: ['id', 'name', 'email'] },
      { model: Book, attributes: ['id', 'title'] },
    ]
  })

  let marked = 0;
  let emailed = 0;

  for (const loan of overdueLoans) {
    await loan.update({ status: 'overdue' })
    marked++;

    if (!loan.overdue_notified && loan.Member?.email) {
      await sendEmail({
        to: loan.Member.email,
        subject: `Overdue Book Reminder: ${loan.Book?.title}`,
        html: overdueEmailTemplate({
          memberName: loan.Member.name,
          bookTitle: loan.Book?.title || 'Unknown book',
          dueDate: loan.due_date,
        }),
      })
      await loan.update({ overdue_notified: true })
      emailed++;
    }
  }

  return { marked, emailed, total: overdueLoans.length };
}
