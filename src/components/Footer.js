import React from "react";
import '../App.css';
import logo from '../assets/images/barco-logo.png';
import { GlobeAltIcon } from '@heroicons/react/outline';

const Footer = () => (
    <div className="footer">
        <a href="https://barco.com"><img src={logo} className="barco-logo ml-5" alt="barcologo" /></a>
    </div>
);

export default Footer;