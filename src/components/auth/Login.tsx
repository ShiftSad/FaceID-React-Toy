import React from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../firebase.ts";

import AuthForm from './Authform.tsx';
import './Auth.css';
import {Link} from "react-router-dom";

const Login: React.FC = () => {
    const handleLogin = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful');
        } catch (error: unknown) {
            if (error instanceof Error) alert(error.message);
            else alert('An unexpected error occurred.');
        }
    };

    const fields = [
        { type: 'email', placeholder: 'Email', name: 'email', required: true },
        { type: 'password', placeholder: 'Password', name: 'password', required: true },
    ];

    return (
        <>
            <AuthForm
                title="Login"
                fields={fields}
                buttonText="Login"
                onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget as HTMLFormElement);
                    const email = formData.get('email') as string;
                    const password = formData.get('password') as string;

                    await handleLogin(email, password);
                }}
            />
            <div className="switch-link">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </>
    );
};

export default Login;
