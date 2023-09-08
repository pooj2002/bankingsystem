import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Please enter your email.');
            return;
        }

        if (!password) {
            setPasswordError('Please enter your password.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/users?email=${email}&password=${password}`);
            console.log(response.data);
            if (response.data.length === 1) {
                // Successfully logged in
                navigate('/dashboard');
            } else {
                // Invalid credentials
                //alert('Invalid email or password');
                setError('Email or password is incorrect.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <br></br>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className="error">{emailError}</span>
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="error">{passwordError}</span>
            </div>
            {error && <div className="error" style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
            <br></br>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
