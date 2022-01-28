import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
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

    useEffect(() => {
        if (loading) return;
        if (user) {
            setVisibility("visible");
        }

        // if (!user) {
        //     navItems.style.visibility = "hidden";
        //     navbarToggler.style.visibility = "hidden";
        // } else {
        //     navItems.style.visibility = "hidden";
        //     navbarToggler.style.visibility = "hidden";
        // }
    }, [loading, user, visibility]);

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
                        <NavLink href="/components/">
                            View
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">
                            Logout
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default NavBar;