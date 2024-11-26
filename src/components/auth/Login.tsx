import React from 'react';
import AuthForm from './Authform.tsx';
import './Auth.css';
import {Link} from "react-router-dom";

const Login: React.FC = () => {
    const fields = [
        { type: 'email', placeholder: 'Email', required: true },
        { type: 'password', placeholder: 'Password', required: true },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login submitted');
    };

    return (
        <div className="auth-container">
            <AuthForm title="Login" fields={fields} buttonText="Login" onSubmit={handleSubmit} />
            <div className="switch-link">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
};

export default Login;
