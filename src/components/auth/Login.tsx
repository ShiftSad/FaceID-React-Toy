import React from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../firebase.ts";

import AuthForm from './Authform.tsx';
import Cookies from "js-cookie";
import './Auth.css';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store displayName and email in cookies
            Cookies.set('userDisplayName', user.displayName || 'Unknown User', { expires: 1 });
            Cookies.set('userEmail', email, { expires: 1 });

            navigate('/dashboard'); // Redirect to Dashboard
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
