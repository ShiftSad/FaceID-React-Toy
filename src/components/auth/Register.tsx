import React from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../firebase.ts";
import AuthForm from './Authform.tsx';
import {Link} from "react-router-dom";

const Register: React.FC = () => {
    const handleRegister = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Registration successful');
        } catch (error: unknown) {
            if (error instanceof Error) alert(error.message);
            else alert('An unexpected error occurred.');
        }
    };

    const fields = [
        { type: 'email', placeholder: 'Email', name: 'email', required: true },
        { type: 'password', placeholder: 'Password', name: 'password', required: true },
        { type: 'password', placeholder: 'Confirm Password', name: 'confirmPassword', required: true },
    ];

    return (
        <>
            <AuthForm
                title="Register"
                fields={fields}
                buttonText="Register"
                onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget as HTMLFormElement);
                    const email = formData.get('email') as string;
                    const password = formData.get('password') as string;
                    const confirmPassword = formData.get('confirmPassword') as string;

                    if (password !== confirmPassword) {
                        alert('Passwords do not match');
                        return;
                    }

                    await handleRegister(email, password);
                }}
            />
            <div className="switch-link">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </>
    );
};

export default Register;
