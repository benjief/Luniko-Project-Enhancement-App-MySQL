import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { auth, logout } from "../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
import NavBar from "./Navbar";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [firstName, setFirstName] = useState("");
    const navigate = useNavigate();

    const getPersonnelInfoWithID = (id) => {
        Axios.get(`http://localhost:3001/get-personnel-with-id/${id}`, {
        }).then((response) => {
            setFirstName(response.data[0].pers_fname);
        });
    }

    const fetchUserName = async () => {
        try {
            // Fetch and set personnel first name
            getPersonnelInfoWithID(user?.uid);

            // const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            // const doc = await getDocs(q);
            // const data = doc.docs[0].data();
            // setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    });

    return (
        <Fragment>
            <NavBar></NavBar>
            <div className="dashboard">
                <div className="dashboard-container">
                    <p>Welcome, {firstName}!</p>
                    <button className="dashboard-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;