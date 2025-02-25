import { useState, useEffect } from "react";
import axios from "axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setError(null);
        const token = localStorage.getItem("jwtToken");
        const region = localStorage.getItem("region");
        const response = await axios.get("http://localhost:2426/receptionist/getPatientDetails", {
          headers: {
            Authorization: token,
            Region: region,
          }
        });
        setPatients(response.data.patients || []);
      } catch (err) {
        setPatients([]);
        setError(err.response?.data?.error || "Error fetching patient details");
      }
    };

    fetchPatients();
  }, []);

  return (
    <div style={{
      padding: '25px',
      maxWidth: '900px',
      margin: '40px auto',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '22px',
        color: '#333',
        fontWeight: 'bold',
        borderBottom: '2px solid #007bff',
        paddingBottom: '10px'
      }}>All Patients</h2>

      {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

      {patients.length > 0 ? (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Full Name</th>
              <th style={tableHeaderStyle}>Age</th>
              <th style={tableHeaderStyle}>Gender</th>
              <th style={tableHeaderStyle}>Contact</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Hospital ID</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.patient_id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={tableCellStyle}>{patient.patient_id}</td>
                <td style={tableCellStyle}>{patient.full_name}</td>
                <td style={tableCellStyle}>{patient.age}</td>
                <td style={tableCellStyle}>{patient.gender}</td>
                <td style={tableCellStyle}>{patient.contact_number}</td>
                <td style={tableCellStyle}>{patient.email}</td>
                <td style={tableCellStyle}>{patient.hospital_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#555' }}>No patients found.</p>
      )}
    </div>
  );
}

// Table styles for cleaner code
const tableHeaderStyle = {
  padding: '10px',
  borderBottom: '2px solid #ddd',
  fontWeight: 'bold',
  textAlign: 'center'
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center'
};
