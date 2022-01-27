import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    loginWithGoogle,
} from "../firebase";
import NavBar from "./Navbar";
import RegistrationPopover from "./RegistrationPopover";
import "../styles/Register.css";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [backgroundColor, setBackgroundColor] = useState("#BFBFBF");
    const [disabled, setDisabled] = useState(true);

    // const history = useHistory();
    const navigate = useNavigate();

    const activateRegistration = () => {
        setBackgroundColor("#E58004");
        setDisabled(false);
    }

    const deactivateRegistration = () => {
        setBackgroundColor("#BFBFBF");
        setDisabled(true);
    }

    const registerConventionally = () => {
        let fullName = firstName + " " + lastName;
        registerWithEmailAndPassword(fullName, email, password);
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
        if (firstName && lastName && email.match(/[^@]+@[^@]+\./) && password.length > 5) {
            if (disabled) {
                activateRegistration();
            }
        } else {
            if (!disabled) {
                deactivateRegistration();
            }
        }
    }, [user, loading, firstName, lastName, email, password]);

    return (
        <Fragment>
            <NavBar></NavBar>
            <div className="register">
                <div className="register-container">
                    <input
                        type="text"
                        className="register-textBox"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="First Name"
                        required={true}
                    />
                    <input
                        type="text"
                        className="register-textBox"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Last Name"
                        required={true}
                        pattern="/[^@]+@[^@]+\./"
                    />
                    <input
                        type="text"
                        className="register-textBox"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="E-mail Address"
                        required={true}
                        minLength={6}
                    />
                    <input
                        type="password"
                        className="register-textBox"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        required={true}
                    />
                    <button className="register-button"
                        style={{ backgroundColor: backgroundColor }}
                        disabled={disabled}
                        onClick={registerConventionally}>
                        Register
                    </button>
                    <div
                        className="register-google"
                        onClick={loginWithGoogle}>
                        <img src={require("../img/google_logo.png")} />
                        <p>Register with Google</p>
                    </div>
                    <RegistrationPopover></RegistrationPopover>
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