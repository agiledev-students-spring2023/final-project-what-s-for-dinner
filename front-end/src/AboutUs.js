import React from "react";
import "./AboutUs.css";
import { Link } from 'react-router-dom';
//terms of service page
const AboutUs = props => {
    return (
        <div className="AboutUs">
            <h1>About Us</h1>
            <p>Thanks for checking out our app!</p>
            <p>We are a team of college students who wanted to build something that would help us eat healthier and improve our cooking skills at the same time.</p>
            <p>However, the reason we developed this specefic app is to be able to cook with limited ingredients.</p>
            <p>The goal of this app is to be able to find recipes based on the limited number of ingredients most college students possess.</p>
            <p>We all have a passion for cooking and our goal is that by using this app, you can develop one too</p>
            <p>If you have any suggestions, comments, or just want to get in contact with us, please do so below:</p>
            <li className="ContactLink"><Link to="/contactus">Contact Us</Link></li>
        </div>
    );
    }
export default AboutUs;