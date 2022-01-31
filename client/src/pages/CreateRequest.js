import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import NavBar from "../components/Navbar";
import ScopeSelect from "../components/ScopeSelect";
import DeptSelect from "../components/DeptSelect";
import ValueSelect from "../components/ValueSelect";
import IdentifierSelect from "../components/IdentifierSelect";
import "../styles/CreateRequest.css";

function CreateRequest() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const { uid } = location.state;

    useEffect(() => {
        if (loading) return;
        if (!user) {
            return navigate("/");
        }
    }, [loading, user]);

    return (
        <Fragment>
            <NavBar></NavBar>
            <div className="create-request">
                <div className="create-request-container">
                    <input
                        className="request-textBox"
                        type="text"
                        placeholder="Company Name">
                    </input>
                    <ScopeSelect></ScopeSelect>
                    <DeptSelect></DeptSelect>
                    <textarea
                        className="request-textBox"
                        type="text"
                        placeholder="Description"
                        maxLength={500}
                        style={{ marginTop: "10px", height: "150px" }}>
                    </textarea>
                    <ValueSelect></ValueSelect>
                    <textarea
                        className="request-textBox"
                        type="text"
                        placeholder="Comments"
                        maxLength={500}
                        style={{ marginTop: "10px", height: "150px" }}>
                    </textarea>
                    <IdentifierSelect></IdentifierSelect>
                    <button
                        className="submit-request-button">
                        Submit
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateRequest;