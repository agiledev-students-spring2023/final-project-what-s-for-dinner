import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

//links to the footer pages which are terms of service, contanct us, and all rights reserved
const Footer = props => {
    return (
        <footer>
        <Link to="/termsofservice">Terms of Service</Link>
        <Link to="/contactus">Contact Us</Link>
        <Link to="/allrightsreserved">©All Rights Reserved 2023</Link>
        </footer>
    );
    }
export default Footer;