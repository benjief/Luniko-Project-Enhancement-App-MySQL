import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    loginWithGoogle,
} from "../firebase";
import NavBar from "./Navbar";
import "../styles/Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    // const history = useHistory();
    const navigate = useNavigate();

    const registerConventionally = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
        // .then(() => {
        //     // setTimeout(function () {
        //     navigate("/dashboard");
        //     // }, 1000)
        // })
    };

    // const registerWithGoogle = () => {
    //     loginWithGoogle().then(() => {
    //         // setTimeout(function () {
    //         navigate("/dashboard");
    //         // }, 1000);

    //     })
    // }

    useEffect(() => {
        if (loading) return;
        if (user) {
            setTimeout(function () {
                navigate("/dashboard");
            }, 200);
        }
    }, [user, loading]);

    return (
        <Fragment>
            <NavBar></NavBar>
            <div className="register">
                <div className="register-container">
                    <input
                        type="text"
                        className="register-textBox"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                    />
                    <input
                        type="text"
                        className="register-textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="register-textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className="register-button" onClick={registerConventionally}>
                        Register
                    </button>
                    <div
                        className="register-google"
                        onClick={loginWithGoogle}>
                        <img src={require("../img/google_logo.png")} />
                        <p>Register with Google</p>
                    </div>
                    <div className="register-text-container">
                        <div>
                            Already have an account? <Link to="/">Login</Link> now.
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;