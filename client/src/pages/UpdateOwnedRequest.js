import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import MaterialSingleSelect from "../components/MaterialSingleSelect";
import BootstrapPopover from "../components/BootstrapPopover";
import Axios from "axios";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import {
    getStatus,
    getScopeType,
    getDepartment,
    getValue,
    getEffort,
    getPriority,
    getApprovalStatus
} from "../components/DecoderFunctions";
// import { stringify } from "@firebase/util";
import UpdateOwnedRequestCard from "../components/UpdateOwnedRequestCard";
import "../styles/SelectorComponents.css";
import "../styles/CardComponents.css";
import "../styles/InputComponents.css";
import "../styles/UpdateOwnedRequest.css";

function UpdateOwnedRequest() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const { uid, isIdentifier, isOwner, reqID } = useParams();
    const [rendering, setRendering] = useState(true);
    const [requestDetails, setRequestDetails] = useState([]);
    const [value, setValue] = useState("");
    const [effort, setEffort] = useState("");
    const [priority, setPriority] = useState(0);
    const [approved, setApproved] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [reasonRejected, setReasonRejected] = useState("");
    const [status, setStatus] = useState("");
    const [comments, setComments] = useState("");
    // const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
    const [rejectDisabled, setRejectDisabled] = useState(true);
    const [updated, setUpdated] = useState(false);
    const [updateButtonText, setUpdateButtonText] = useState("Update");
    const [updateButtonColor, setUpdateButtonColor] = useState("var(--lunikoOrange");
    const [transitionElementOpacity, setTransitionElementOpacity] = useState("100%");
    const [transtitionElementVisibility, setTransitionElementVisibility] = useState("visible");

    // Update button
    // const activateUpdate = () => {
    //     setUpdateButtonColor("var(--lunikoOrange)");
    //     setUpdateButtonDisabled(false);
    // }

    // const deactivateUpdate = () => {
    //     setUpdateButtonColor("#BFBFBF");
    //     setUpdateButtonDisabled(true);
    // }

    const getRequestDetails = (id) => {
        Axios.get(`http://localhost:3001/get-request-details-for-id/${id}`, {
        }).then((response) => {
            // console.log(response.data);
            setRequestDetails(response.data);
            console.log(response.data);
            if (response.data.rsn_rejected && response.data.rsn_rejected.length > 0) {
                setRejectDisabled(false);
            }
            setPriority(response.data.value * response.data.effort);
            setRendering(false);
        });
    };

    // Single select options
    const effortOptions = [
        { value: 0, label: "TBD" },
        { value: 1, label: "Low" },
        { value: 2, label: "Medium" },
        { value: 3, label: "High" }
    ];

    const statusOptions = [
        { value: "C", label: "Completed" },
        { value: "P", label: "In Progress" },
        { value: "I", label: "Issue" },
        { value: "N", label: "Not Started" }
    ];

    const approvalOptions = [
        { value: 0, label: "Yes" },
        { value: 1, label: "No" }
    ];

    // Selector callback handlers
    const handleStatusCallback = (statusFromSelector) => {
        setStatus(statusFromSelector);
    }

    const handleEffortCallback = (effortFromSelector) => {
        setEffort(effortFromSelector);
        setPriority(effortFromSelector * value);
    }

    const handleApprovedCallback = (approvedFromSelector) => {
        setApproved(approvedFromSelector);
    }

    const handleRejectedCallback = (rejectedFromSelector) => {
        setRejected(rejectedFromSelector);
    }

    const handleReasonRejectedChange = (reasonRejectedFromTextArea) => {
        setReasonRejected(reasonRejectedFromTextArea);
        let regex = new RegExp("[a-zA-Z]");
        reasonRejectedFromTextArea.length > 0 && regex.test(reasonRejectedFromTextArea)
            ? setRejectDisabled(false)
            : setRejectDisabled(true);
    }

    const handleCommentsChange = (commentsFromTextArea) => {
        setComments(commentsFromTextArea);
    }

    const updateRequest = (idFromSelector) => {
        console.log("Updating request...");
        Axios.post(`http://localhost:3001/update-owned-request`, {
            effort: effort,
            approved: approved,
            rejected: rejected,
            reasonRejected: reasonRejected,
            status: status,
            comments: comments,
            id: idFromSelector
        }).then((response) => {
            setUpdated(true);
            console.log("Request successfully updated!");
            handleSuccessfulUpdate();
        });
    };

    const handleSuccessfulUpdate = () => {
        setUpdateButtonColor("rgb(0, 191, 32)");
        // setTimeout(() => {
        //     setSubmitButtonText("Request Submitted!");
        // }, 500);
        setTimeout(() => {
            // Go back to owned requests page
            navigate(-1);
        }, 1000);
    }

    useEffect(() => {
        if (loading) {
            return;
        } if (!user) {
            return navigate("/");
        } if (rendering) {
            getRequestDetails(reqID);
        } else {
            setTransitionElementOpacity("0%");
            setTransitionElementVisibility("hidden");
        }
    }, [loading, user, rendering]);

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
                <div
                    className="transition-element"
                    style={{
                        opacity: transitionElementOpacity,
                        visibility: transtitionElementVisibility
                    }}>
                </div>
                <NavBar
                    visibility={"visible"}
                    srDisabled={!(isIdentifier === "true" || isIdentifier === true)}
                    orDisabled={!(isOwner === "true" || isOwner === true)}
                    createRequestLink={`/create-request/${uid}/${isIdentifier}/${isOwner}`}
                    submittedRequestsLink={`/submitted-requests/${uid}/${isIdentifier}/${isOwner}`}
                    ownedRequestsLink={`/owned-requests/${user?.uid}/${isIdentifier}/${isOwner}`}>
                </NavBar>
                <div className="update-owned-request">
                    <div className="update-owned-request-container">
                        {requestDetails.map((val, key) => {
                            return <div className="update-owned-request-card">
                                <UpdateOwnedRequestCard
                                    key={key}
                                    id={val.req_id}
                                    status={getStatus(val.req_status)}
                                    statusOptions={statusOptions}
                                    selectedStatus={handleStatusCallback}
                                    dateSubmitted={val.req_date}
                                    lastUpdated={val.req_updated}
                                    company={val.req_company}
                                    submitter={val.req_submitter}
                                    scopeType={getScopeType(val.req_scope_type)}
                                    department={val.req_dept}
                                    description={val.req_descr}
                                    value={getValue(val.req_value)}
                                    effort={getEffort(val.req_effort)}
                                    effortOptions={effortOptions}
                                    selectedEffort={handleEffortCallback}
                                    priority={getPriority(priority)}
                                    approved={getApprovalStatus(val.req_approved.data[0])}
                                    rejected={getApprovalStatus(val.req_rejected.data[0])}
                                    rejectDisabled={rejectDisabled}
                                    approvalOptions={approvalOptions}
                                    selectedApproved={handleApprovedCallback}
                                    selectedRejected={handleRejectedCallback}
                                    reasonRejected={val.rsn_rejected === null ? "" : val.rsn_rejected}
                                    updatedReasonRejected={handleReasonRejectedChange}
                                    comments={val.req_comments === null ? "" : val.req_comments}
                                    updatedComments={handleCommentsChange}
                                    requestToUpdate={updateRequest}>
                                </UpdateOwnedRequestCard>
                            </div>
                        })}
                        {/* <button
                            className="update-request-button"
                            // disabled={updateButtonDisabled}
                            // TODO: this might not be super necessary
                            onClick={!updated ? updateRequest : null}
                            style={{ backgroundColor: updateButtonColor }}>
                            {updateButtonText}
                        </button>
                        <BootstrapPopover
                            popoverText=
                            {[<strong>All identifiers </strong>, "added to this request will be ",
                                "able to view it and receive updates pertaining to it."]}>
                        </BootstrapPopover> */}
                    </div>
                </div>
            </Fragment >
    );
}

export default UpdateOwnedRequest;