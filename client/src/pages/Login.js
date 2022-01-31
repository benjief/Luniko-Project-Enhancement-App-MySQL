import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword, loginWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../components/Navbar";
import "../styles/Login.css";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // TODO: trigger a loading screen?
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <Fragment>
            <NavBar />
            <div className="login">
                <div className="login-container">
                    <input
                        type="text"
                        className="login-textBox"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="login-textBox"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className="login-button"
                        onClick={() => loginWithEmailAndPassword(email, password)}
                    >
                        Login
                    </button>
                    <div
                        className="login-google"
                        onClick={loginWithGoogle}>
                        <img src={require("../img/google_logo.png")} />
                        <p>Login with Google</p>
                    </div>
                    <div className="login-text-container">
                        <div>
                            <Link to="/reset">Forgot Password</Link>
                        </div>
                        <div>
                            Don't have an account? <Link to="/register">Register</Link> now.
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
