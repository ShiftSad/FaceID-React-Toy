import React from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {auth} from "../../firebase.ts";
import AuthForm from './Authform.tsx';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string, displayName: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user

            await updateProfile(user, { displayName });

            Cookies.set('userDisplayName', displayName, { expires: 1 }); // Store for 1 day
            Cookies.set('userEmail', email, { expires: 1 });

            navigate('/dashboard'); // Redirect to Dashboard
        } catch (error: unknown) {
            if (error instanceof Error) alert(error.message);
            else alert('An unexpected error occurred.');
        }
    };

    const fields = [
        { type: 'text', placeholder: 'Display Name', name: 'displayName', required: true },
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
                    const displayName = formData.get('displayName') as string;
                    const confirmPassword = formData.get('confirmPassword') as string;

                    if (password !== confirmPassword) {
                        alert('Passwords do not match');
                        return;
                    }

                    await handleRegister(email, password, displayName);
                }}
            />
            <div className="switch-link">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </>
    );
};

export default Register;
