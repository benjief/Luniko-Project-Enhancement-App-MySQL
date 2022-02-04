import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Axios from "axios";
import "../styles/SubmittedRequests.css";

function SubmittedRequests() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const { uid, isIdentifier, isOwner } = useParams();


    useEffect(() => {
        if (loading) return;
        if (!user)
            return navigate("/");
    }, [loading, user]);

    return (
        <Fragment>
            <NavBar>
                visibility={"visible"}
                srDisabled={!(isIdentifier === "true")}
                orDisabled={!(isOwner === "true")}
                createRequestLink={`/create-request/${uid}/${isIdentifier}/${isOwner}`}
                submittedRequestsLink={`/submitted-requests/${uid}/${isIdentifier}/${isOwner}`}>
            </NavBar>
        </Fragment>
    );
}

export default SubmittedRequests;