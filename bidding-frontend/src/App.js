import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage'; // Login/Register page
import Profile from './components/Profile'; // Profile page after login

function App() {
    return (
        <Router>
            <Routes>
                {/* AuthPage includes login and registration */}
                <Route path="/" element={<AuthPage />} />
                
                {/* Profile page */}
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
