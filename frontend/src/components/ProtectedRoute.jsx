import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');

        // If no token found, redirect to login (or signup) page
        if (!token) {
            navigate('/login'); // Change this to your login page route
        }
    }, [navigate]);

    // If the token exists, render the children (protected components)
    return children;
};

export default ProtectedRoute;