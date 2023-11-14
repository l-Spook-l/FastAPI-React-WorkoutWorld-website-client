import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import style from './ResetUserPassword.module.css'
import { resetUserPassword } from '../../http/userAPI';

const ResetUserPassword = () => {
  const token = useParams()
  console.log('token', token.token)

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("Password cannot be empty")

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const resetPassword  = () => {
    resetUserPassword(token.token, password)
  }

  return (
    <Container fluid className={style.container}>
    <div>
      <Form className={style.formBlock}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
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
          </Form.Group>
        
          <Row className="mt-2">
            <Col className="d-flex justify-content-end">
              <Button variant="success" onClick={() => resetPassword()}>
                Reset password
              </Button>
            </Col>
          </Row>
        </Form>
    </div>
    </Container>
  )
}

export default ResetUserPassword


