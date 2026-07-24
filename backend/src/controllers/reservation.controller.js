import { Book, Loan, Member, Reservation } from '../models/associations.js'

const createReservation = async (req, res) => {
  try {
    const { book_id, member_id, reservation_date } = req.body;

    if (!book_id || !member_id) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const book = await Book.findByPk(book_id);

    if (!book) return res.status(404).json({ message: "COuld not find book" })


    const loan = await Loan.findOne({ where: { book_id: book_id, status: ['active', 'overdue'] } })

    if (loan !== null) {
      return res.status(400).json({ message: "Book is already checked out" })
    }

    const reservation = await Reservation.findOne({ where: { book_id: book_id, status: ['pending', 'confirmed'] } })

    if (reservation) {
      return res.status(400).json({ message: "Reservation rejected someone" })
    }

    const member = await Member.findByPk(member_id);

    if (!member) return res.status(404).json({ message: "Could not find member" })

    const newReservation = await Reservation.create({
      book_id: book_id,
      member_id: member_id,
      reservation_date,
    })

    if (newReservation) {
      res.status(201).json({ message: "Reservation created successfully", newReservation })
    } else {
      return res.status(400).json({ message: "REservation cannot be created this time" })
    }

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const fetchAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: Book, attributes: ["id", 'title'] },
        { model: Member, attributes: ["id", 'name', 'email'] },
      ]
    })

    if (reservations) {
      return res.status(200).json({ message: "All reservation fetched successfully", reservations });
    } else {
      return res.status(400).json({ message: "could not fetched reservations" })
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const fetchReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        { model: Book, attributes: ["id", "title"] },
        { model: Member, attributes: ["id", "name", "email"] },
      ]
    })

    if (reservation) {
      return res.status(200).json({ message: "Reservation fetched successfully", reservation });
    } else {
      return res.status(404).json({ message: "Reservation not found" })
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const fulfillReservation = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);

  if (!reservation) {
    return res.status(404).json({ message: "Could not find reservation" });
  } else {
    if (reservation.status === 'waiting') {
      await reservation.update({ status: "fulfilled" })

      return res.status(200).json({ message: "Reservation status fulfilled" })
    } else {
      return res.status(400).json({ message: "The reservation was found, it just wasn't in waiting status" })
    }
  }
}

const cancelReservation = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);


  if (!reservation) {
    return res.status(404).json({ message: "Could not find reservation" })
  } else {
    if (reservation.status === 'waiting') {
      await reservation.update({ status: "cancelled" })
      return res.status(200).json({ message: "Reservation status updated successfully" })
    } else {
      return res.status(400).json({ message: "The reservation was found, it just wasn't in waiting status" })
    }
  }

}
export { createReservation, fetchAllReservation, fetchReservationById, fulfillReservation, cancelReservation };