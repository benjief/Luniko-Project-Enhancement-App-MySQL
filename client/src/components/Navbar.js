import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Collapse
} from "reactstrap";
import "../styles/Navbar.css";

function NavBar() {
    const [user, loading, error] = useAuthState(auth);
    const [isOpen, setIsOpen] = useState(false);
    const [visibility, setVisibility] = useState("hidden");
    const [srDisabled, setSRDisabled] = useState(true);
    const [orDisabled, setORDisabled] = useState(true);
    const [srNavLinkColor, setSRNavLinkColor] = useState("rgba(228, 228, 228, 0.6)");
    const [orNavLinkColor, setORNavLinkColor] = useState("rgba(228, 228, 228, 0.6)");

    const getPersonnelInfoWithID = (id) => {
        Axios.get(`http://localhost:3001/get-personnel-with-id/${id}`, {
        }).then((response) => {
            if (response.data[0].pers_is_identifier === 1) {
                setSRDisabled(false);
                setSRNavLinkColor("white");
            }
            if (response.data[0].pers_is_owner === 1) {
                setORDisabled(false);
                setORNavLinkColor("white");
            }
        });
    }

    useEffect(() => {
        if (loading) return;
        if (user) {
            setVisibility("visible");
            getPersonnelInfoWithID(user?.uid);
            let srNavLink = document.getElementsByClassName("sr-nav-link")[0];
            let orNavLink = document.getElementsByClassName("or-nav-link")[0];
            srNavLink.style.setProperty("color", srNavLinkColor, "important");
            orNavLink.style.setProperty("color", orNavLinkColor, "important");
        }

        // if (!user) {
        //     navItems.style.visibility = "hidden";
        //     navbarToggler.style.visibility = "hidden";
        // } else {
        //     navItems.style.visibility = "hidden";
        //     navbarToggler.style.visibility = "hidden";
        // }
    }, [loading, user, visibility, orNavLinkColor, srNavLinkColor]);

    return (
        <Navbar
            // color="success"
            dark
            expand="md"
            fixed=""
            light
        >
            <NavbarBrand href="/">
                <img className="test" src={require("../img/logo_exp.png")} alt="Luniko"></img>
            </NavbarBrand>
            <NavbarToggler
                onClick={() => { setIsOpen(!isOpen) }}
                style={{ visibility: visibility }}
            />
            <Collapse navbar isOpen={isOpen}>
                <Nav
                    className="me-auto"
                    style={{ visibility: visibility }}
                    navbar
                >
                    <NavItem>
                        <NavLink href="/components/">
                            Create
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            href="/components/"
                            className="sr-nav-link"
                            disabled={srDisabled}>
                            Submitted
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            href="/components/"
                            className="or-nav-link"
                            disabled={orDisabled}>
                            Owned
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={logout}>
                            Logout
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default NavBar;