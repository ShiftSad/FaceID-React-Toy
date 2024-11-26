import React from "react";

interface Field {
    type: string;
    placeholder: string;
    required?: boolean;
}

interface AuthFormProps {
    title: string;
    fields: Field[];
    buttonText: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}


const AuthForm: React.FC<AuthFormProps> = ({ title, fields, buttonText, onSubmit }) => {
    return (
        <div className="container">
            <div className="header">
                <h1>{title}</h1>
            </div>
            <form onSubmit={onSubmit} className="auth-form">
                {fields.map((field, index) => (
                    <input
                        key={index}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required || false}
                    />
                ))}
                <button type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default AuthForm;
