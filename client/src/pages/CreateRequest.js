import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import SingleSelect from "../components/SingleSelect";
import MultiSelect from "../components/MultiSelect";
import Axios from "axios";
import "../styles/CreateRequest.css";

function CreateRequest() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const { uid, isIdentifier, isOwner } = useParams();
    const [company, setCompany] = useState("");
    const [scopeType, setScopeType] = useState("");
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [identifierOptions, setIdentifierOptions] = useState([]);
    const [selectedIdentifiers, setSelectedIdentifiers] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    // Single select options
    const scopeOptions = [
        { value: "F", label: "Functional" },
        { value: "TE", label: "Technical" },
        { value: "CO", label: "Conversion" },
        { value: "G", label: "General" },
        { value: "CU", label: "Cutover" },
        { value: "TS", label: "Testing" }
    ];

    const deptOptions = [
        { value: "R", label: "Risk" },
        { value: "A", label: "Action" },
        { value: "I", label: "Issue" },
        { value: "D", label: "Decision" }
    ];

    const valueOptions = [
        { value: 1, label: "Low" },
        { value: 2, label: "Medium" },
        { value: 3, label: "High" },
        { value: 4, label: "Critical" }
    ];


    // Identifier functions
    const getIdentifiers = () => {
        Axios.get("http://localhost:3001/get-all-personnel", {
        }).then((response) => {
            populateIdentifierList(response.data);
        });
    };

    const populateIdentifierList = (identifierList) => {
        if (identifierList.length > 1) {
            let tempArray = [];
            for (let i = 0; i < identifierList.length; i++) {
                if (identifierList[i].pers_id !== uid) {
                    let value = identifierList[i].pers_id;
                    let label = identifierList[i].pers_fname + " " + identifierList[i].pers_lname;
                    let identifier = {
                        "value": value,
                        "label": label
                    };
                    tempArray.push(identifier);
                }
            }
            setIdentifierOptions(tempArray);
        }
    }

    // Selector callback handlers
    const handleScopeCallback = (scopeFromSelector) => {
        setScopeType(scopeFromSelector);
    }

    const handleDeptCallback = (deptFromSelector) => {
        setDepartment(deptFromSelector);
    }

    const handleValueCallback = (valueFromSelector) => {
        setValue(valueFromSelector);
    }

    const handleIdentifierCallback = (identifiersFromSelector) => {
        setSelectedIdentifiers(identifiersFromSelector);
    }

    const addRequest = () => {
        console.log("Adding request...");
        Axios.post("http://localhost:3001/create-request", {
            uid: uid,
            company: company,
            scopeType: scopeType,
            department: department,
            description: description,
            value: value
        }).then((response) => {
            setSubmitted(true);
            console.log("Request successfully added!!");
            if (selectedIdentifiers.length !== 0) {
                addIdentifications(response.data.insertId);
            }
        });
    };

    const addIdentifications = (requestID) => {
        console.log("Moving on to identifications...")
        for (let i = 0; i < selectedIdentifiers.length; i++) {
            Axios.post("http://localhost:3001/create-identification", {
                uid: selectedIdentifiers[i],
                req_id: requestID
            }).then((response) => {
                console.log("Identification successfully added!");
            });
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) {
            return navigate("/");
        } else {
            getIdentifiers();
        }
    }, [loading, user]);

    return (
        <Fragment>
            <NavBar
                visibility={"visible"}
                srDisabled={!isIdentifier}
                // TODO: Look into why isIdentifier and isOwner don't have the same behaviour
                orDisabled={!(isOwner === true)}>
            </NavBar>
            <div className="create-request">
                <div className="create-request-container">
                    <input
                        className="request-textBox"
                        type="text"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        maxLength={45}
                        required={true}
                        placeholder="Company Name">
                    </input>
                    <SingleSelect
                        name="scopes"
                        placeholder="Scope"
                        singleSelectOptions={scopeOptions}
                        selectedValue={handleScopeCallback}>
                    </SingleSelect>
                    <SingleSelect
                        name="departments"
                        placeholder="Department"
                        singleSelectOptions={deptOptions}
                        selectedValue={handleDeptCallback}>
                    </SingleSelect>
                    <textarea
                        className="request-textBox"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Description"
                        maxLength={500}
                        required={true}
                        style={{ marginTop: "10px", height: "150px" }}>
                    </textarea>
                    <SingleSelect
                        name="values"
                        placeholder="Value"
                        singleSelectOptions={valueOptions}
                        selectedValue={handleValueCallback}>
                    </SingleSelect>
                    <MultiSelect
                        name="identifiers"
                        placeholder="Add Identifiers"
                        multiSelectOptions={identifierOptions}
                        selectedValues={handleIdentifierCallback}
                    >
                    </MultiSelect>
                    <button
                        className="submit-request-button"
                        onClick={!submitted ? addRequest : null}>
                        Submit
                    </button>
                </div>
            </div>
        </Fragment >
    )
}

export default CreateRequest;