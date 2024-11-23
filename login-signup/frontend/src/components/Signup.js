import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service"; // Import AuthService

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact_number: "",
    region: "",
    user_type: "",
  });

  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    mobileError: "",
    emailError: "",
  });

  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = { mobileError: "", emailError: "" };
    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!mobileRegex.test(formData.contact_number)) {
      errors.mobileError = "Invalid mobile number";
    }

    if (!emailRegex.test(formData.email)) {
      errors.emailError = "Invalid email address";
    }

    setFormErrors(errors);

    return !errors.mobileError && !errors.emailError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOtpDialogOpen(true);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    if (otp === "456789") {
      setOtpDialogOpen(false);
      e.preventDefault();
      const {full_name,email,password,contact_number,region,user_type } = formData;
      console.log("Form Data:", formData);
      try {
        const response = await AuthService.signup(full_name,email,password,contact_number,region,user_type);
        console.log("Signup API response:", response);
        if (response.message==='Signup successful!') {
          localStorage.setItem("user", JSON.stringify(response.data));
          setBackendMessage(response.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setApiError(response.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during signup:", error.message || error);
        setApiError("An error occurred while signing up. Please try again.");
      }
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        background: "white",
      }}
    >
      {!backendMessage ? (
        <>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Sign Up
          </Typography>
          <Typography variant="subtitle1" mb={3}>
            Create your account to get started
          </Typography>
          {apiError && (
            <Typography color="error" mb={2}>
              {apiError}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="full_name"
                  variant="outlined"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={!!formErrors.emailError}
                  helperText={formErrors.emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  required
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="contact_number"
                  variant="outlined"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                  error={!!formErrors.mobileError}
                  helperText={formErrors.mobileError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Region</InputLabel>
                  <Select
                    label="Region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  >
                   <MenuItem value="north">North</MenuItem>
                   <MenuItem value="south">South</MenuItem>
                   <MenuItem value="east">East</MenuItem>
                  <MenuItem value="west">West</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>User Type</InputLabel>
                  <Select
                    label="User Type"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" mt={2}>
            Do you have an account? <a href="/">Login</a>
          </Typography>
          <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogContent>
              <TextField
                label="OTP"
                value={otp}
                onChange={handleOtpChange}
                fullWidth
                error={!!otpError}
                helperText={otpError}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOtpDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleOtpSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography variant="h6" color="primary">
          {backendMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Signup;
