import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service"; // Adjust the path as needed

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", region: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, region } = formData;
    console.log("Form Data:", formData);

    try {
      // Call the login service function with form data
      const response = await AuthService.login(email, password, region);
      console.log("Login Response:", response);

      if (response.status === "ok") {
        // Store the user data in local storage
        localStorage.setItem("user", JSON.stringify(response.data)); // Adjust according to response data structure
        // Navigate to the signup page on success
        navigate("/signup");
      } else {
        console.error("Invalid credentials:", response.message || "Unknown error");
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        background: "white",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Login
      </Typography>
      <Typography variant="subtitle1" mb={3}>
        Welcome back! Please login to your account.
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Region</InputLabel>
          <Select
            name="region"
            value={formData.region}
            onChange={handleChange}
            label="Region"
          >
            <MenuItem value="north">North</MenuItem>
            <MenuItem value="south">South</MenuItem>
            <MenuItem value="east">East</MenuItem>
            <MenuItem value="west">West</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: "10px 0" }}
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" mt={2}>
        Don't have an account? <a href="/signup">Signup here</a>
      </Typography>
    </Box>
  );
};

export default Login;
