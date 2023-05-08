import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = props => {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/termsofservice">Terms of Service</Link>
        <span>|</span>
        <Link to="/contactus">Contact Us</Link>
      </div>
      <div className="reserved">
        <Link to="/allrightsreserved">©All Rights Reserved 2023</Link>
      </div>
    </footer>
  );
};
export default Footer;
