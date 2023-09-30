import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { Context } from "../../..";
import { login } from "../../../http/userAPI";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const FormLogin = observer(({ onSwitchForm, show, onHide }) => {
  const { user } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Были ли мы в ipnut
  const [emailDirty, setemailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  // Ошибка полей
  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [passwordError, setPasswordError] = useState("Password cannot be empty");

  // Общая проверка валидации формы
  const [formValid, setFormValid] = useState(false);

  const [loginError, setLoginError] = useState(false)

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const loginUser = () => {
    login(email, password).then((userData) => {
      user.setUser(userData)
      user.setIsAuth(true)
      setLoginError(false)
      onHide()
    })
    .catch(() => {
      setLoginError(true)
    });
  };

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Invalid email');
    } else {
      setEmailError('')
    }
  }

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
      case "email":
        setemailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title >Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {loginError && (
              <Form.Text className="text-danger">Invalid login or password</Form.Text>
          )}
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
              No account?
              <Button className="ms-2" type="button" onClick={onSwitchForm}>
                Sign up!
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button disabled={!formValid} onClick={() => loginUser()}>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default FormLogin;
