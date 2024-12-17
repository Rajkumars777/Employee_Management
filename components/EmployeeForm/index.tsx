'use client';
import React from 'react'    
import { useState } from "react";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "Engineering",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    dateOfJoining: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = (data: typeof formData) => {
    const errors: { name: string; employeeId: string; email: string; phone: string; dateOfJoining: string; role: string } = {
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      dateOfJoining: "",
      role: ""
    };

    if (!data.name) errors.name = "Name required";
    if (!data.employeeId) errors.employeeId = "EmployeeID is required.";
    if (!data.email) errors.email = "Email id is required.";
    if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Give a valid email address.";
    if (!data.phone || !/^\d{10}$/.test(data.phone)) errors.phone = "Phone number is required and should be 10 digits.";
    if (!data.dateOfJoining || new Date(data.dateOfJoining) > new Date()) errors.dateOfJoining = "Date of joining not correct , it may be the future date.Correct it";
    if (!data.role) errors.role = "Role is required.";

    return errors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      return;
    }
    const response = await fetch("/api/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Employee added successfully!");
      setFormData({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        department: "HR",
        dateOfJoining: "",
        role: "",
      });
    } else {
      const data = await response.json();
      alert(data.message || "Error adding employee.");
    }
  };


  return (
    <div className='items-center mt-16'>
    <form onSubmit={handleSubmit} className="max-w-lg justify-center mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">EMPLOYEE MANAGEMENT</h1>
        <h2 className='text-center text-red-600 text-xl font-semibold mb-16'>Add Employee</h2>

      <div className="mb-4">
        <label className=" text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Employee ID</label>
        <input type="text" id="employeeId" name="employeeId" placeholder="Enter your employee ID" value={formData.employeeId} onChange={handleChange} maxLength={10} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
        {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Phone Number</label>
        <input type="text" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} maxLength={10} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"/>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Department</label>
        <select id="department" name="department" value={formData.department} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black">
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Date of Joining</label>
        <input type="date" id="dateOfJoining" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} max={new Date().toISOString().split('T')[0]} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"/>
        {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining}</p>}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Role</label>
        <input type="text" id="role" name="role" placeholder='Role of the Employee' value={formData.role} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"/>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
      </div>

      <div className="flex justify-between">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white hover:bg-green-800 rounded-md">Submit</button>
        <button type="reset" onClick={() => setFormData({ ...formData, name: "", employeeId: "", email: "", phone: "", department: "Engineering", dateOfJoining: "", role: "" })} className="px-4 py-2 bg-red-500 text-white rounded-md">Reset</button>
      </div>
    </form>
    </div>
  );
};
export default EmployeeForm;

           