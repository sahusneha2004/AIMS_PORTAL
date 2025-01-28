import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;
console.log(ADMIN_URL);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Changed `loginId` to `email`
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  
  // Handle sending the OTP
  const handleSendOtp = async () => {
    try {
      const response = await fetch(`${ADMIN_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Sending email instead of loginId
      });

      if (response.ok) {
        setOtpSent(true);
        setErrorMessage("");
        alert("OTP sent successfully! Check your email.");
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

    const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`${ADMIN_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }), // Sending email and otp for verification
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.email)
        if(data.token){ // Store the token in context and localStorage
          login(data.token,data.role, data.email);
          const role = data.role;
          alert("Login successful!");
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "student") {
            navigate("/student/enroll");
          } else if (role === "faculty") {
            navigate("/home");
          } else {
            navigate("/default-dashboard");
          }
        }
        else{
          alert('Login failed');
        }
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error) {
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
  };
  

  return (
    <div className="login-container">
      <p className="footer">Academic Information Management System</p>
      <div className="login-div">
        <h2>Login</h2>
        <div className="login-form">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {otpSent && (
            <div>
              <label htmlFor="otp">OTP : </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        <div className="login-buttons">
          {!otpSent ? (
            <button onClick={handleSendOtp}>Send OTP</button>
          ) : (
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          )}
          <button onClick={() => navigate("/login-options")}>
            All Login Options
          </button>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      <p className="terms">
        By proceeding with the login, you agree to the terms of use of this
        service.
      </p>
    </div>
  );
}

export default Login;
