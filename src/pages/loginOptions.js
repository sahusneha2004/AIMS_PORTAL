import React from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Google auth package
import { useNavigate } from 'react-router-dom'; // For navigation

function LoginOptions() {
  const navigate = useNavigate();

  const handleAimsLogin = () => {
    navigate('/login'); // Redirects to /login URL
  };

  return (
    <div className="options">
      <h2>Login Options</h2>
      <div className="login-options-container">
        <div className="login-option">
          <h4>Login with your IIT Ropar Google ID</h4>
          <p>Before proceeding, please ensure that:</p>
          <ul>
            <li>JavaScript is not blocked by your browser.</li>
            <li>Popups are not blocked by your browser.</li>
            <li>You are not logged into multiple Google accounts.</li>
            <li>Please try clearing the browser cache if you get the "popup closed by user" error.</li>
            <li>We strongly suggest that you open this website in an independent window.</li>
          </ul>
          <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log('Login successful', credentialResponse);
                navigate('/');     }}
              onError={() => {
                console.log('Login failed');
              }}
              useOneTap
          />

        </div>

        {/* AIMS Credentials Login Option */}
        <div className="login-option">
          <h4>Login with AIMS credentials</h4>
          <p>Please note that:</p>
          <ul>
            <li>JavaScript is not blocked by your browser.</li>
            <li>AIMS credentials are independent from your LDAP/CRP.</li>
            <li>Reset your AIMS password (not the LDAP one) when using it for the first time.</li>
            <li>Your login ID is your entry number (e.g., 2020MEB1234).</li>
          </ul>
          <button className="aims-login">Login with AIMS</button>
        </div>
      </div>
    </div>
  );
}

export default LoginOptions;
