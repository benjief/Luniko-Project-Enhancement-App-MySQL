import React, { useState, useEffect } from "react";
import { logout } from "../firebase";
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

function NavBar({ visibility = "hidden", srDisabled = true, orDisabled = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const disabledNavLinkColor = "rgba(228, 228, 228, 0.6)";

    // Manipulating DOM elements directly isn't encouraged, but I don't have a choice here
    useEffect(() => {
        if (srDisabled) {
            document.getElementsByClassName("sr-nav-link")[0].style.setProperty("color", disabledNavLinkColor, "important");
        }
        if (orDisabled) {
            document.getElementsByClassName("or-nav-link")[0].style.setProperty("color", disabledNavLinkColor, "important");
        }
    });

    return (
        <Navbar
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
        </Navbar >
    );
}

export default NavBar;