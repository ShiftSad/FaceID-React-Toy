import React from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.ts";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // Get user details from cookies
    const displayName = Cookies.get('userDisplayName') || 'Unknown User';
    const email = Cookies.get('userEmail') || 'No Email';

    const handleLogout = async () => {
        try {
            await signOut(auth);
            Cookies.remove('userDisplayName');
            Cookies.remove('userEmail');
            navigate('/login');
        } catch (error: unknown) {
            if (error instanceof Error) alert(error.message);
            else alert('An unexpected error occurred.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, {displayName}!</h1>
            <p>Your email: {email}</p>
            <button
                onClick={handleLogout}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard