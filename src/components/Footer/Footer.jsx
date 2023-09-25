import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-light">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Col>
          <Col md={4}>
            <h5 className="text-white">Follow Us</h5>
            <ul className="social-media">
              <li className="text-white">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  <FaFacebookF />
                </a>
              </li>
              <li className="text-white">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  <FaTwitter />
                </a>
              </li>
              <li className="text-white">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>123 Street, City, State, Country</p>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123 4567890</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="text-center">
              &copy; 2023 My Website. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
