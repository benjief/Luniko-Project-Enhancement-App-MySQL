import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Axios from "axios";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import SubmittedRequestCard from "../components/SubmittedRequestCard";
import "../styles/SubmittedRequests.css";

function OwnedRequests() {
    const [user, loading] = useAuthState(auth);
    const [rendering, setRendering] = useState(false);
    const navigate = useNavigate();
    const { uid, isIdentifier, isOwner } = useParams();
    const [submittedRequests, setSubmittedRequests] = useState([]);
    const [messageContent, setMessageContent] = useState("You haven't yet submitted any requests!");

    const getSubmittedRequests = () => {
        Axios.get(`http://localhost:3001/get-submitted-requests-for-id/${uid}`, {
        }).then((response) => {
            // console.log(response.data);
            setSubmittedRequests(response.data);
            if (response.length !== 0) {
                setMessageContent("Your submitted requests:");
            }
            // console.log(submittedRequests);
        });
    };

    useEffect(() => {
        if (loading || rendering) return;
        if (!user || !uid) {
            return navigate("/");
        } else {
            getSubmittedRequests();
        }
    }, [loading, user, rendering, uid]);

    return (
        rendering ?
            <div className="loading-spinner">
                <Hypnosis
                    className="spinner"
                    color="var(--lunikoOrange)"
                    width="100px"
                    height="100px"
                    duration="1.5s" />
            </div> :
            <Fragment>
                <NavBar
                    visibility={"visible"}
                    srDisabled={!(isIdentifier === "true" || isIdentifier === true)}
                    orDisabled={!(isOwner === "true" || isOwner === true)}
                    createRequestLink={`/create-request/${uid}/${isIdentifier}/${isOwner}`}
                    submittedRequestsLink={`/submitted-requests/${uid}/${isIdentifier}/${isOwner}`}>
                </NavBar>
                <div className="submitted-requests">
                    <div className="submitted-requests-container">
                        {submittedRequests.map((val, key) => {
                            return <div className="submitted-request-card">
                                <SubmittedRequestCard
                                    key={key}
                                    orderKey={key}
                                    id={val.req_id}
                                    dateSubmitted={val.req_date}
                                    lastUpdated={val.req_updated}
                                    status={val.req_approved === "1" || val.req_approved === 1 ? "approved" : val.req_rejected === 1 ? "rejected" : "submitted"}
                                    submitter={val.req_submitter}
                                    scopeType={val.req_scope_type}
                                    department={val.req_dept}
                                    description={val.req_descr}
                                    value={val.req_value}
                                    comments={val.req_comments === "" || val.req_comments === null ? "None" : val.req.comments}>
                                </SubmittedRequestCard>
                            </div>
                        })}
                    </div>

                </div>
            </Fragment>
    );
}

export default OwnedRequests;