import { Book, Fine, Loan, Member } from '../models/associations.js'

const createFine = async (req, res) => {
  try {
    const { loan_id, amount } = req.body;

    if (!loan_id || !amount) {
      res.status(400).json({ message: "All fields are required" })
    }

    const loan = await Loan.findByPk(loan_id)
    if (!loan) {
      res.status(404).json({ message: "Loan not found" })
    }

    const fine = await Fine.create({
      loan_id,
      amount: amount,
      fine_date: new Date(),
    })

    if (fine) {
      res.status(201).json({ message: "Fine is created successfully", data: { fine } })
    } else {
      res.status(400).json({ message: "Could not create fine" })
    }

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const getAllFines = async (req, res) => {
  try {
    const fines = await Fine.findAll({
      include:
        { model: Loan, include: [Book, Member] },
      order: [['fine_date', 'DESC']]
    });

    if (fines) {
      res.status(201).json({ message: "All Fines is Fetched successfully", data: { fines } })
    } else {
      res.status(400).json({ message: "Could not fetched all fines" })
    }

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const getFinesByLoan = async (req, res) => {
  try {
    const fine = await Fine.findByPk({ where: { loan_id: req.params.loanId } }, {
      include: { model: Loan, include: [Book, Member] },
      order: [['fine_date', 'DESC']]
    })


    if (fines) {
      res.status(201).json({ message: "Fine Fetched successfully", data: { fine } })
    } else {
      res.status(400).json({ message: "Could not fetched the fine" })
    }

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const getSingleFine = async (req, res) => {
  const fine = await Fine.findByPk(req.params.id, {
    include: { model: Loan, include: [Book, Member] },
  });
  if (!fine) return res.status(404).json({ message: "Fine not found" });
  res.json(fine);
};

const getMemberFine = async (req, res) => {
  const fines = await Fine.findAll({
    include: { model: Loan, where: { member_id: req.params.memeberId }, include: [Book] },
    order: [['fine_date', "DESC"]]
  })

  res.json(fines);
}

const payFine = async (req, res) => {
  const fine = await Fine.findByPk(req.params.id);
  if (!fine) return res.status(404).json({ message: "Fine not found" });

  await fine.update({ paid: true });

  res.json({ message: "Fine paid successfully", fine });
};

const payAllMemberFines = async (req, res) => {
  const [updated] = await Fine.update(
    { paid: true },
    {
      include: {
        model: Loan,
        where: { member_id: req.params.memberId },
      },
      where: { paid: false },
    },
  );

  res.json({ message: `${updated} fines paid successfully` });
};

const waiveFine = async (req, res) => {
  const fine = await Fine.findByPk(req.params.id);
  if (!fine) return res.status(404).json({ message: "Fine not found" });

  await fine.destroy();
  res.json({ message: "Fine waived" });
};


export {
  createFine,
  getAllFines,
  getFinesByLoan,
  getSingleFine,
  getMemberFine,
  payFine,
  payAllMemberFines,
  waiveFine
};