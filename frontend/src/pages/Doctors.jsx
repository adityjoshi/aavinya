import { useState, useEffect } from "react";
import axios from "axios";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setError(null);
        const token = localStorage.getItem("jwtToken");
        const region = localStorage.getItem("region");
        const response = await axios.get("http://localhost:2426/receptionist/getDoctorsDetails", {
          headers: {
            "Authorization": token,
            "Region": region,
          }
        });
        setDoctors(response.data.doctors);
      } catch (err) {
        setDoctors([]);
        setError(err.response?.data?.error || "Error fetching doctor details");
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">All Doctors</h2>
      {error && <p className="text-red-500">{error}</p>}
      {doctors.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Hospital</th>
              <th className="border p-2">Region</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.doctor_id} className="text-center border">
                <td className="border p-2">{doctor.doctor_id}</td>
                <td className="border p-2">{doctor.full_name}</td>
                <td className="border p-2">{doctor.department}</td>
                <td className="border p-2">{doctor.contact_number}</td>
                <td className="border p-2">{doctor.email}</td>
                <td className="border p-2">{doctor.hospital_name}</td>
                <td className="border p-2">{doctor.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}