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
    const [navItems, setNavItems] = useState(null);
    const [navbarToggler, setNavbarToggler] = useState(null);

    useEffect(() => {
        console.log(user);
        if (loading) return;
        if (!user) {
            navItems.style.visibility = "hidden";
            navbarToggler.style.visibility = "hidden";
            setNavItems(document.getElementsByClassName("me-auto")[0]);
            setNavbarToggler(document.getElementsByClassName("navbar-toggler")[0]);
        }

        // if (!user) {
        //     navItems.style.visibility = "hidden";
        //     navbarToggler.style.visibility = "hidden";
        // } else {
        //     navItems.style.visibility = "hidden";
        //     navbarToggler.style.visibility = "hidden";
        // }
    }, [user]);

    return (
        <Navbar
            // color="success"
            dark
            expand="md"
            fixed=""
            light
        >
            <NavbarBrand href="/home">
                <img className="test" src={require("../img/logo_exp.png")} alt="Luniko"></img>
            </NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse navbar isOpen={isOpen}>
                <Nav
                    className="me-auto"
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