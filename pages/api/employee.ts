import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;
    if (!name || !employeeId || !email || !phone || !department || !dateOfJoining || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: [{ employeeId }, { email }],
      },
    });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee ID or Email already exists." });
    }
    try {
      const newEmployee = await prisma.employee.create({
        data: {name,employeeId,email,phone,department,dateOfJoining: new Date(dateOfJoining),role,},
      });
      return res.status(201).json({ message: "Employee added successfully!", employee: newEmployee });
    } catch (error) {
      console.error("Error creating employee:", error);
      return res.status(500).json({ message: "Error creating employee.", error: `${error}` });
    }
  }else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
