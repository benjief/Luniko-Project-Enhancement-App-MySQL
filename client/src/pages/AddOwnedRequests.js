import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Axios from "axios";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import AddToOwnedRequestsCard from "../components/AddToOwnedRequestsCard";
// import { map } from "@firebase/util";
import "../styles/AddOwnedRequests.css";


function AddOwnedRequests() {
    const [user, loading] = useAuthState(auth);
    const [rendering, setRendering] = useState(true);
    const navigate = useNavigate();
    const { uid, isIdentifier, isOwner } = useParams();
    const [unownedRequests, setUnownedRequests] = useState([]);
    const [requestOwners, setRequestOwners] = useState(new Map());
    const [messageContent, setMessageContent] = useState("No requests available!");
    const [transitionElementOpacity, setTransitionElementOpacity] = useState("100%");
    const [transtitionElementVisibility, setTransitionElementVisibility] = useState("visible");
    // const [pageTransitionTime, setPageTransitionTime] = useState("0s");
    const [cardContainerOpacity, setCardContainerOpacity] = useState("100%");
    const [pageMessageopacity, setPageMessageOpacity] = useState("100%");

    const getUnownedRequests = () => {
        Axios.get(`http://localhost:3001/get-unowned-requests-for-id/${uid}`, {
        }).then((response) => {
            setUnownedRequests(response.data);
            if (response.data.length !== 0) {
                setMessageContent("Available Requests:");
                getRequestOwners(response.data);
            }
            setRendering(false);
        });
    };

    const getRequestOwners = (unownedRequestList) => {
        let tempMap = new Map();
        for (let i = 0; i < unownedRequestList.length; i++) {
            Axios.get(`http://localhost:3001/get-request-owners-for-id/${unownedRequestList[i].req_id}`, {
            }).then((response) => {
                if (response.data.length !== 0) {
                    let req_id = unownedRequestList[i].req_id;
                    let owners = [];
                    for (let i = 0; i < response.data.length; i++) {
                        owners.push(response.data[i].req_owner);
                    }
                    tempMap.set(req_id, owners);
                    setRequestOwners(tempMap);
                }
                setRendering(false);
            });
        }
    };

    const getOwnerList = (id) => {
        let ownerList = "";
        let returnedOwners = requestOwners.get(id);
        if (returnedOwners) {
            for (let i = 0; i < returnedOwners.length; i++) {
                ownerList += returnedOwners[i];
                ownerList += i !== returnedOwners.length - 1 ? "<br />" : "";
            }
        }
        return ownerList;
    }

    const handleAddRequestCallback = (requestFromCard) => {
        Axios.post("http://localhost:3001/create-ownership", {
            uid: uid,
            req_id: requestFromCard
        }).then((response) => {
            console.log("Ownership successfully added!");
            setUnownedRequests(unownedRequests.filter((val) => {
                return val.req_id !== requestFromCard;
            }));
            if (unownedRequests.length === 1) {
                setPageMessageOpacity("0%");
                setTimeout(() => {
                    setMessageContent("No more requests available!");
                    setPageMessageOpacity("100%")
                }, 300);
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

    useEffect(() => {
        if (loading) return;
        if (!user || !uid) {
            return navigate("/");
        }
        if (rendering) {
            getUnownedRequests();
        }
        else {
            setTransitionElementOpacity("0%");
            setTransitionElementVisibility("hidden");
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
                <div className="unowned-requests">
                    <p
                        className="page-message"
                        style={{ opacity: pageMessageopacity }}>
                        {messageContent}</p>
                    <div
                        className="unowned-requests-container">
                        {/* style={{ opacity: cardContainerOpacity }}> */}
                        {unownedRequests.map((val, key) => {
                            return <div
                                className="unowned-request-card"
                                /*style={{ opacity: cardContainerOpacity }}*/>
                                <AddToOwnedRequestsCard
                                    key={key}
                                    id={val.req_id}
                                    dateSubmitted={val.req_date}
                                    lastUpdated={val.req_updated}
                                    status={val.req_rejected.data[0] === 1 ? "Rejected" : getStatus(val.req_status)}
                                    submitter={val.req_submitter}
                                    owners={getOwnerList(val.req_id)}
                                    scopeType={getScopeType(val.req_scope_type)}
                                    department={getDepartment(val.req_dept)}
                                    description={val.req_descr}
                                    value={getValue(val.req_value)}
                                    comments={val.req_comments === "" || val.req_comments === null ? "None" : val.req.comments}
                                    added={handleAddRequestCallback}>
                                </AddToOwnedRequestsCard>
                            </div>
                        })}
                    </div>

                </div>
            </Fragment >
    );
}

export default AddOwnedRequests;