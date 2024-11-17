import React, { useState } from 'react';
import Login from './Login'; // Import the Login component
import Register from './Register'; // Import the Register component
import './AuthPage.css'; // Optional: for styling

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register

    return (
        <div className="auth-container">
            <div className="auth-toggle">
                <button
                    className={`auth-button ${isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={`auth-button ${!isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </button>
            </div>
            <div className="auth-form">
                {isLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
};

export default AuthPage;
