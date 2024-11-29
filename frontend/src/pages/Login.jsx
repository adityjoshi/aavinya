// AdminLoginPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router's useNavigate to handle page redirection

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("north");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, region };

      const response = await fetch("http://localhost:2426/adminLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data.message === "success") {
        // Save the JWT token and region to localStorage
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("region", data.region);

        // Redirect to OTP verification page
        navigate("/verifyotp");
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div>
          <label>Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
