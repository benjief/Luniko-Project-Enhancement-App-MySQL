import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, logout } from "../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
import NavBar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
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
            if (response.data[0].pers_is_identifier === 1) {
                setIsIdentifier(true);
                setSRBackgroundColor("var(--lunikoBlue)");
            }
            if (response.data[0].pers_is_owner === 1) {
                setIsOwner(true);
                setORBackgroundColor("var(--lunikoBlue)");
            }
        });
    }

    // const fetchUserName = async () => {
    //     try {
    //         // Fetch and set personnel first name
    //         getPersonnelInfoWithID(user?.uid);

    //         // const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    //         // const doc = await getDocs(q);
    //         // const data = doc.docs[0].data();
    //         // setName(data.name);
    //     } catch (err) {
    //         console.error(err);
    //         alert("An error occured while fetching user data");
    //     }
    // };

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
            <NavBar></NavBar>
            <div className="dashboard">
                <div className="dashboard-container">
                    <p>Welcome, <b>{firstName}</b>!</p>
                    <Link to="/create-request/" state={{ uid: user?.uid }}>
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