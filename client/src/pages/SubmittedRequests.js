import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Axios from "axios";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import SubmittedRequestCard from "../components/SubmittedRequestCard";
import "../styles/SubmittedRequests.css";

function SubmittedRequests() {
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
            if (response.data.length !== 0) {
                setMessageContent("Your submitted requests:");
            }
            // console.log(submittedRequests);
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
                    <p className="page-message">{messageContent}</p>
                    <div className="submitted-requests-container">
                        {submittedRequests.map((val, key) => {
                            return <div className="submitted-request-card">
                                <SubmittedRequestCard
                                    key={key}
                                    id={val.req_id}
                                    dateSubmitted={val.req_date}
                                    lastUpdated={val.req_updated}
                                    status={val.req_rejected.data[0] === 1 ? "Rejected" : getStatus(val.req_status)}
                                    submitter={val.req_submitter}
                                    scopeType={getScopeType(val.req_scope_type)}
                                    department={getDepartment(val.req_dept)}
                                    description={val.req_descr}
                                    value={getValue(val.req_value)}
                                    rsn_rejected={val.rsn_rejected ? val.rsn_rejected : ""}
                                    comments={val.req_comments === "" || val.req_comments === null ? "None" : val.req.comments}>
                                </SubmittedRequestCard>
                            </div>
                        })}
                    </div>

                </div>
            </Fragment>
        // <div className="submitted-requests-container">
        //     <p className="page-message">{messageContent}</p>
        //     {submittedRequests.map((val, key) => {
        //         return <div
        //             key={key}
        //             className="request-info-container"
        //             style={{ visibility: submittedRequests.length === 0 ? "hidden" : "visible", marginTop: key === 0 ? "0" : "20px" }}>
        //             <p className="request-id">
        //                 <b>Request ID</b><br />{val.req_id}
        //             </p>
        //             <p className="request-date-submitted">
        //                 <b>Request Submitted</b><br />{val.req_date}
        //             </p>
        //             <p className="request-last-updated">
        //                 <b>Request Updated</b><br />{val.req_updated}
        //             </p>
        //         </div>
        //     })}
        // </div>
        // </Fragment >
    );
}

export default SubmittedRequests;