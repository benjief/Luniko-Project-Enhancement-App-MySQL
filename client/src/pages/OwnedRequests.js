import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Axios from "axios";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import OwnedRequestCard from "../components/OwnedRequestCard";
import "../styles/OwnedRequests.css";

function OwnedRequests() {
    const [user, loading] = useAuthState(auth);
    const [rendering, setRendering] = useState(false);
    const navigate = useNavigate();
    const { uid, isIdentifier, isOwner } = useParams();
    const [ownedRequests, setOwnedRequests] = useState([]);
    const [messageContent, setMessageContent] = useState("You aren't the owner of any requests!");

    const getOwnedRequests = () => {
        Axios.get(`http://localhost:3001/get-owned-requests-for-id/${uid}`, {
        }).then((response) => {
            // console.log(response.data);
            setOwnedRequests(response.data);
            if (response.length !== 0) {
                setMessageContent("Your owned requests:");
            }
        });
    };

    const getStatus = (statusCode) => {
        let status = statusCode === "C" ? "Completed"
            : statusCode === "P" ? "In Progress"
                : statusCode === "I" ? "Issue"
                    : "Not Started";

        return status;
    }

    const getDepartment = (deptCode) => {
        let dept = deptCode === "R" ? "Risk"
            : deptCode === "A" ? "Action"
                : deptCode === "I" ? "Issue"
                    : "Decision";

        return dept;
    }

    const getScopeType = (scopeCode) => {
        let scope = scopeCode === "F" ? "Functional"
            : scopeCode === "TE" ? "Technical"
                : scopeCode === "CO" ? "Conversion"
                    : scopeCode === "G" ? "General"
                        : scopeCode === "CU" ? "Cutover"
                            : "Testing";

        return scope;
    }

    const getValue = (valueCode) => {
        let value = valueCode === 0 ? "TBD"
            : valueCode === 1 ? "Low"
                : valueCode === 2 ? "Medium"
                    : valueCode === 3 ? "High"
                        : "Critical";

        return value;
    }

    const getEffort = (effortCode) => {
        let effort = effortCode === 0 ? "TBD"
            : effortCode === 1 ? "Low"
                : effortCode === 2 ? "Medium"
                    : "high";

        return effort;
    }

    useEffect(() => {
        if (loading || rendering) return;
        if (!user || !uid) {
            return navigate("/");
        } else {
            getOwnedRequests();
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
                    submittedRequestsLink={`/submitted-requests/${uid}/${isIdentifier}/${isOwner}`}
                    ownedRequestsLink={`/owned-requests/${user?.uid}/${isIdentifier}/${isOwner}`}>
                </NavBar>
                <div className="owned-requests">
                    <p className="page-message">{messageContent}</p>
                    <div className="owned-requests-container">
                        {ownedRequests.map((val, key) => {
                            return <div className="owned-request-card">
                                <OwnedRequestCard
                                    key={key}
                                    id={val.req_id}
                                    status={val.req_rejected.data[0] === 1 ? "rejected" : getStatus(val.req_status)}
                                    dateSubmitted={val.req_date}
                                    lastUpdated={val.req_updated}
                                    company={val.req_company}
                                    submitter={val.req_submitter}
                                    scopeType={getScopeType(val.req_scope_type)}
                                    department={getDepartment(val.req_dept)}
                                    description={val.req_descr}
                                    value={getValue(val.req_value)}
                                    effort={getEffort(val.req_effort)}
                                    priority={val.req_priority}
                                    approved={val.req_approved.data[0] === 1 ? "Approved" : "Unapproved"}
                                    rejected={val.req_rejected.data[0] === 1 ? "Rejected" : "Not Rejected"}
                                    rsn_rejected={val.rsn_rejected ? val.rsn_rejected : "None"}
                                    comments={val.req_comments === "" || val.req_comments === null ? "None" : val.req.comments}>
                                </OwnedRequestCard>
                            </div>
                        })}
                    </div>

                </div>
            </Fragment>
    );
}

export default OwnedRequests;