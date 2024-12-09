import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    region: "",
    userType: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    const { firstName, lastName, email, password, confirmPassword, contactNumber, region, userType } = formData;

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email address";

    const phonePattern = /^[0-9]{10}$/;
    if (!contactNumber) newErrors.contactNumber = "Phone number is required";
    else if (!phonePattern.test(contactNumber)) newErrors.contactNumber = "Invalid phone number";

    if (!region) newErrors.region = "Region is required";
    if (!userType) newErrors.userType = "User type is required";

    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const { firstName, lastName, email, password, contactNumber, region, userType } = formData;
    const body = {
      full_name: `${firstName} ${lastName}`,
      email,
      password,
      contact_number: contactNumber,
      region,
      user_type: userType,
    };

    try {
      const response = await fetch("http://localhost:2426/hospitaladmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setServerError(`Server error: ${response.status} - ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log("Server response:", data);
      navigate('/login');
    } catch (err) {
      console.error("Error during submission:", err);
      setServerError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h4 className="mb-4 text-xl font-medium text-gray-700">Register</h4>
        {serverError && <p className="mb-4 text-red-500">{serverError}</p>}
        <form onSubmit={onSubmit}>
          {["firstName", "lastName"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {field === "firstName" ? "First Name" : "Last Name"}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            >
              <option value="">Select a region</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
            {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            >
              <option value="">Select a user type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
