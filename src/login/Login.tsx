import './Login.css'

const Login = () => {
    return (
        <>
            <div className="container">
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div className="input">
                    <input type="email" placeholder="fulano@siclano.com"/>
                    <input type="password" placeholder="Password"/>
                    <button type="submit">Login</button>
                </div>
            </div>
        </>
    )
}

export default Login