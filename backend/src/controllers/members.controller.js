import { Member } from '../models/associations.js'


const createMembers = async (req, res) => {
  try {
    const { name, email, phone, address, membership_date, membership_type, max_books_allowed } = req.body;

    if (!name || !email || !membership_date || !membership_type || !max_books_allowed) {
      return res.status(400).json({ message: "All Fields are required!!!" })
    }

    const existingMember = await Member.findOne({ where: { email } })

    if (existingMember) {
      return res.status(400).json({ message: "Member already exists with same email" })
    }

    const member = await Member.create({
      name,
      email,
      phone,
      address,
      membership_date,
      membership_type,
      max_books_allowed
    })

    if (member) {
      res.status(201).json({ message: "New Member created Successfully", data: { member } })
    } else {
      res.status(400).json({ message: "Error creating new Member" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const updateMembers = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { name, email, phone, address, membership_date, membership_type, max_books_allowed } = req.body;

    const fields = ["name", "email", "phone", "address", "membership_date", "membership_type", "max_books_allowed"]

    const membersDetails = {
      name: name,
      email: email,
      phone: phone,
      membership_date: membership_date,
      membership_type: membership_type,
      max_books_allowed: max_books_allowed
    }

    let updateData = {};

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const member = await Member.findByPk(memberId);

    if (member) {
      await member.update(updateData)
      return res.status(200).json({ message: "Member details updated successfully", data: { member } })
    } else {
      return res.status(404).json({ message: "there was an error updating Member because member not found", })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const deleteMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId);

    if (member) {
      await member.destroy()
      return res.status(200).json({ message: "Member deleted successfully" })
    } else {
      return res.status(404).json({ message: "Member with id not found" })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const fetchAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();

    if (members) {
      res.status(200).json({ message: "All members fetched Successfully", data: { members } })
    } else {
      return res.status(404).json({ message: "Members not found, there is no members" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const fetchMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId)

    if (member) {
      return res.status(200).json({ message: "Member Fetched Successfully", member })
    } else {
      return res.status(404).json({ message: "Member not found!" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export { createMembers, updateMembers, deleteMemberById, fetchAllMembers, fetchMemberById };