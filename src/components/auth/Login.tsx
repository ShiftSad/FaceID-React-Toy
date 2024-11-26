import React from 'react';
import AuthForm from './Authform.tsx';
import './Auth.css';

const Login: React.FC = () => {
    const fields = [
        { type: 'email', placeholder: 'Email', required: true },
        { type: 'password', placeholder: 'Password', required: true },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login submitted');
    };

    return <AuthForm title="Login" fields={fields} buttonText="Login" onSubmit={handleSubmit} />;
};

export default Login;
