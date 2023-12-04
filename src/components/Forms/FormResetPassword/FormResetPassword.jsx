import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { forgotUserPassword } from '../../../http/userAPI'
import style from './FormResetPassword.module.css'

const FormResetPassword = ({ onClose }) => {
  const [email, setEmail] = useState("")
  const [emailDirty, setEmailDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email cannot be empty')

  const [showMessageSuccessReset, setShowMessageSuccessReset] = useState(false)

  const [formValid, setFormValid] = useState(false)
  
  useEffect(() => {
    if (emailError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Invalid email')
    } else {
      setEmailError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true)
        break
    }
  }

  const resetPassword = () => {
    setShowMessageSuccessReset(true)
    forgotUserPassword(email)
  }

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        {showMessageSuccessReset
        ? <p>The password reset link has been successfully sent to the email. You can close the window.'</p>
        : <p>We will send you a link to reset your password.</p>
        }
        
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
      <div className={style.blockWithButtons}>
        <NavLink onClick={() => onClose()}>
          I remembered my password
        </NavLink>
        <Button disabled={!formValid} onClick={() => resetPassword()}>
          Reset password
        </Button>
      </div>
    </Form>
  )
}

export default FormResetPassword