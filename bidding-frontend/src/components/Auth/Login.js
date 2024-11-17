import React, { useState } from 'react';
import axios from 'axios'; // For making API calls
import { useNavigate } from 'react-router-dom'; // For navigation
import './Login.css'; // Optional: for styling

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // React Router's navigation function

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', formData);
            const { userId, token, role, username } = response.data;

            // Display welcome message
            setMessage(`Welcome, ${username}!`);
            setError('');

            // Store user information in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('authToken', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);

            // Navigate to the profile page
            navigate('/profile');
        } catch (err) {
            // Handle errors
            setError(err.response?.data?.message || 'Login failed');
            setMessage('');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
