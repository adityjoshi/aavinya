import React from "react";

function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-300 p-4 border border-gray-400 rounded-lg text-gray-800 my-16">
    <h2 className="text-xl font-bold mb-6">Sidebar</h2>
    <ul className="space-y-4">
      <li className="hover:text-blue-500 cursor-pointer">Add Beds</li>
      <li className="hover:text-blue-500 cursor-pointer">Track Patients</li>
      <li className="hover:text-blue-500 cursor-pointer">Add Doctors</li>
      <li className="hover:text-blue-500 cursor-pointer">Add Staff</li>
      <li className="hover:text-blue-500 cursor-pointer">Add Hospital</li>
    </ul>
  </div>
  );
}

export default Sidebar;
