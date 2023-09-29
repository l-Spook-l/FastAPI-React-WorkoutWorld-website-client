import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import style from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={style.container}>
      <p className="text-center">
        &copy; 2023 My Website. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
