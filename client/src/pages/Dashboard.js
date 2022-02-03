import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, logout } from "../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
import NavBar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const [firstName, setFirstName] = useState("");
    const [isIdentifier, setIsIdentifier] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [srBackgroundColor, setSRBackgroundColor] = useState("#BFBFBF");
    const [orBackgroundColor, setORBackgroundColor] = useState("#BFBFBF");
    const navigate = useNavigate();

    const getPersonnelInfoWithID = (id) => {
        Axios.get(`http://localhost:3001/get-personnel-with-id/${id}`, {
        }).then((response) => {
            setFirstName(response.data[0].pers_fname);
            if (response.data[0].pers_is_identifier.data[0] === 1) {
                setIsIdentifier(true);
                setSRBackgroundColor("var(--lunikoBlue)");
            }
            if (response.data[0].pers_is_owner.data[0] === 1) {
                setIsOwner(true);
                setORBackgroundColor("var(--lunikoBlue)");
            }
        });
    }

    useEffect(() => {
        if (loading) return;
        if (!user) {
            return navigate("/");
        } else {
            getPersonnelInfoWithID(user?.uid);
        }

    }, [loading, user]);

    return (
        <Fragment>
            <NavBar
                visibility={"visible"}
                srDisabled={!isIdentifier}
                orDisabled={!isOwner}>
            </NavBar>
            <div className="dashboard">
                <div className="dashboard-container">
                    <p>Welcome, <b>{firstName}</b>!</p>
                    <Link to={`/create-request/${user?.uid}/${isIdentifier}/${isOwner}`}>
                        <button
                            className="add-request-button">
                            Create Request
                        </button>
                    </Link>
                    <button
                        className="submitted-requests-button"
                        disabled={!isIdentifier}
                        style={{ backgroundColor: srBackgroundColor }}>
                        Submitted Requests
                    </button>
                    <button
                        className="owned-requests-button"
                        disabled={!isOwner}
                        style={{ backgroundColor: orBackgroundColor }}>
                        Owned Requests
                    </button>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </Fragment >
    );
}

export default Dashboard;