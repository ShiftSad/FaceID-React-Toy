import React from 'react';
import AuthForm from './Authform.tsx';
import './Auth.css';
import {Link} from "react-router-dom";

const Register: React.FC = () => {
    const fields = [
        { type: 'text', placeholder: 'Username', required: true },
        { type: 'email', placeholder: 'Email', required: true },
        { type: 'password', placeholder: 'Password', required: true },
        { type: 'password', placeholder: 'Confirm Password', required: true },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Register submitted');
    };

    return (
        <div className="auth-container">
            <AuthForm title="Register" fields={fields} buttonText="Register" onSubmit={handleSubmit} />
            <div className="switch-link">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default Register;
