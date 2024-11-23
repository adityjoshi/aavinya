import axios from "axios";

const API_URL = "http://localhost:5000/auth";

// Signup
const signup = (full_name,email,password,region,contact_number,user_type) => {
  const requestPayload={full_name,email,password,region,contact_number,user_type};
  console.log('signup payload',requestPayload);
  return axios
    .post(`${API_URL}/signup`, requestPayload)
    .then((response) => {
      console.log("Signup Response:----", response); // Log the response data
      return response.data; // Return the response data
    })
    .catch((error) => {
      console.error("Signup Error:", error.response?.data || error.message); // Log any error if occurs
      throw error;
    });
};

// Login
const login = (email, password, region) => {
  const requestPayload = { email, password, region }; // Data being sent
  console.log("Sending login request with payload:", requestPayload); // Log request data

  return axios
    .post(`${API_URL}/login`, requestPayload)
    .then((response) => {
      console.log("Login Response:", response); // Log the response data from backend
      return response.data; // Return the full response data
    })
    .catch((error) => {
      console.error("Login Error:", error.response?.data || error.message); // Log any error if occurs
      throw error; // Re-throw the error after logging
    });
};


// Logout
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

// Get Current User
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
