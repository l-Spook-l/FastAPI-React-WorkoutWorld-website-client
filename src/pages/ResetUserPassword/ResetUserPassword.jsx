import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import style from './ResetUserPassword.module.css'
import { resetUserPassword } from '../../http/userAPI';
import ChangePasswordConfirmModal from '../../components/Modals/ChangePasswordConfirmModal/ChangePasswordConfirmModal';
import { MAIN_ROUTE } from '../../utils/consts';

const ResetUserPassword = () => {
  const token = useParams()

  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [tokenError, setTokenError] = useState(false)

  const [formValid, setFormValid] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [passwordError, setPasswordError] = useState("Password cannot be empty")

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [passwordError])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "password":
        setPasswordDirty(true)
        break;
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Password must be longer than 8 characters")
      if (!e.target.value) {
        setPasswordError("Password cannot be empty")
      }
    } else {
      setPasswordError("")
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const resetPassword  = () => {
    resetUserPassword(token.token, password).then(() => {
      setShowModal(true)
    }).catch((error) => {
      if (error.response.data.detail === 'RESET_PASSWORD_BAD_TOKEN' ) {
        setTokenError(true)
      } else {
        setTokenError(false)
      }
    })
  }

  const closeModal = () => {
    setShowModal(false)
    navigate(MAIN_ROUTE)
  }

  return (
    <Container fluid className={style.container}>
    <div>
        <Form className={style.formBlock}>
          {tokenError &&  (
          <p className="text-danger">
            Sorry, there was an error while resetting your password. 
            Your password reset link might be expired or invalid. 
            Please try requesting a password reset again or contact support for assistance.
          </p>
        )}
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
            <Col className="d-flex justify-content-end">
              <Button variant="success" disabled={!formValid} onClick={() => resetPassword()}>
                Reset password
              </Button>
            </Col>
          </Row>
        </Form>
    </div>
    <ChangePasswordConfirmModal show={showModal} close={closeModal}/>
    </Container>
  )
}

export default ResetUserPassword


