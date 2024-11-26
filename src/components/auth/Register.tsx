import React from 'react';
import AuthForm from './Authform.tsx';
import './Auth.css';

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

    return <AuthForm title="Register" fields={fields} buttonText="Register" onSubmit={handleSubmit} />;
};

export default Register;
