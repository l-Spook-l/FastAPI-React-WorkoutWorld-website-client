import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registration } from "../../../http/userAPI";
import { MAIN_ROUTE } from "../../../utils/consts";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';


const FormRegister = observer(({ onSwitchForm, show, onHide }) => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Были ли мы в ipnut
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  // Ошибка полей
  const [firstNameError, setFirstNameError] = useState("First name cannot be empty");
  const [lastNameError, setLastNameError] = useState("Last name cannot be empty");
  const [emailError, setEmailError] = useState("Email cannot be empty");
  const [passwordError, setPasswordError] = useState("Password cannot be empty");

  // Общая проверка валидации формы
  const [formValid, setFormValid] = useState(false);


  useEffect(() => {
    if (firstNameError || lastNameError || passwordError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [firstNameError, lastNameError, passwordError, emailError]);

  const registerUser = () => {
    registration(firstName, lastName, email, password).then((userData) => {
      onSwitchForm()
      navigate(MAIN_ROUTE);
    })
    .catch((error) => {
      switch (Object.keys(error.response.data)[0]) {
        case "email":
          setEmailError(error.response.data['email'][0][0].toUpperCase() + error.response.data['email'][0].slice(1))
          break
        case "password":
          setPasswordError(error.response.data['password'][0][0].toUpperCase() + error.response.data['password'][0].slice(1))
          break
      }
    });
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
    if (e.target.value.length < 5) {
      setFirstNameError("First name must be longer than 5 characters");
      if (!e.target.value) {
        setFirstNameError("First name cannot be empty");
      }
    } else {
      setFirstNameError("");
    }
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
    if (e.target.value.length < 5) {
      setLastNameError("Last name must be longer than 5 characters");
      if (!e.target.value) {
        setLastNameError("Last name cannot be empty");
      }
    } else {
      setLastNameError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Password must be longer than 8 characters");
      if (!e.target.value) {
        setPasswordError("Password cannot be empty");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "firstName":
        setFirstNameDirty(true);
        break;
      case "lastName":
        setLastNameDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              onBlur={(e) => blurHandler(e)}
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => emailHandler(e)}
            />
            {emailDirty && emailError && (
              <Form.Text className="text-danger">{emailError}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              onBlur={(e) => blurHandler(e)}
              name="firstName"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => firstNameHandler(e)}
            />
            {firstNameDirty && firstNameError && (
              <Form.Text className="text-danger">{firstNameError}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              onBlur={(e) => blurHandler(e)}
              name="lastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => lastNameHandler(e)}
            />
            {lastNameDirty && lastNameError && (
              <Form.Text className="text-danger">{lastNameError}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
            <Form.Control
              onBlur={(e) => blurHandler(e)}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => passwordHandler(e)}
            />
            <Button className="ms-3" variant="outline-secondary" onClick={toggleShowPassword}>
            {showPassword ? <AiOutlineEye style={{fontSize: '20px'}}/> :<AiOutlineEyeInvisible style={{fontSize: '20px'}}/> }
            </Button>
            
            </InputGroup>
            {passwordDirty && passwordError && (
              <Form.Text className="text-danger">{passwordError}</Form.Text>
            )}
          </Form.Group>
         
          <Row className="mt-2">
            <Col md={8} className="d-flex">
              Already a member?
              <Button className="ms-2" type="button" onClick={onSwitchForm}>
                Log In!
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button disabled={!formValid} onClick={() => registerUser()}>
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default FormRegister;
