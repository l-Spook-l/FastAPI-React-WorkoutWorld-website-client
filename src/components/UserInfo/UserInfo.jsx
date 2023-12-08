import React, { useContext, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import style from "./UserInfo.module.css"
import { observer } from "mobx-react-lite";
import { forgotUserPassword, updateUserData } from "../../http/userAPI";
import { NavLink } from "react-router-dom";
import { ADMIN_PANEL_ROUTE } from "../../utils/consts";

const UserInfo = observer(() => {
  const { user } = useContext(Context)

  const [editFirstLastName, setEditFirstLastName] = useState(false)
  const [editPhoneNumberEmail, setEditPhoneNumberEmail] = useState(false)
  const [editPassword, setEditPassword] = useState(false)

  const [firstName, setFirstName] = useState(user.user.first_name)
  const [lastName, setLastName] = useState(user.user.last_name)
  const [phoneNumber, setPhoneNumber] = useState(user.user.phone)
  const [email, setEmail] = useState(user.user.email)

  const [emailError, setEmailError] = useState(false)

  const [messageResetPassword, setMessageResetPassword] = useState(false)

  const updateFirstLastName = () => {
    updateUserData({first_name: firstName, last_name: lastName})
    setEditFirstLastName(false)
  }

  const updatePhoneNumberEmail = () => {
    updateUserData({ phone: phoneNumber, email: email })
      .then(() => {
        setEditPhoneNumberEmail(false)
        setEmailError(false)
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setEmailError(true)
        }
      })
  }

  const resetPassword = () => {
    setMessageResetPassword(true)
    forgotUserPassword(email)
    setEditPassword(false)
  }

  return (
    <Container className={style.forContainer}>
      <div className={style.headerBlock}>
        <h2>Personal information</h2>
        {user.user.is_superuser && <NavLink to={ADMIN_PANEL_ROUTE}>Admin panel</NavLink>}
      </div>
      <Accordion alwaysOpen defaultActiveKey='0'>
        <Accordion.Item eventKey="0" className="mb-2">
          <Accordion.Header>Personal information</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={4}>
              <p>Last name</p>
              {editFirstLastName
                ? <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                : lastName
                }
              </Col>
              <Col md={4}>
                <p>First name</p>
                {editFirstLastName
                ? <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                : firstName
                }
              </Col>
              <Col md={4}></Col>
            </Row>
            {editFirstLastName 
            ? <div>
                <Button onClick={() => updateFirstLastName()} className="mt-4 me-2 bg-success">Save</Button>
                <Button onClick={() => setEditFirstLastName(false)} className="mt-4 bg-success">Cancel</Button>
              </div>
            : <Button onClick={() => setEditFirstLastName(true)} className="mt-4 bg-success">Edit</Button>
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="mb-2">
          <Accordion.Header className="border-top">Contacts</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={3}>
                <p>Mobile phone</p>
                {editPhoneNumberEmail
                ? <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                : phoneNumber
                }
              </Col>
              <Col md={3}>
                <p>Email</p>
                {editPhoneNumberEmail
                ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                : email
                }
              </Col>
              {emailError && <p className={style.messageError}>You have entered the wrong email address. Please try again.</p>}
            </Row>
            {editPhoneNumberEmail 
            ? <div>
                <Button onClick={() => updatePhoneNumberEmail()} className="mt-4 me-2 bg-success">Save</Button>
                <Button onClick={() => setEditPhoneNumberEmail(false)} className="mt-4 bg-success">Cancel</Button>
              </div>
            : <Button onClick={() => setEditPhoneNumberEmail(true)} className="mt-4 bg-success">Edit</Button>
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3" className="mb-2">
          <Accordion.Header className="border-top">Password</Accordion.Header>
          <Accordion.Body>
            {editPassword 
            ? <div>
                <Button onClick={() => resetPassword()} className="mt-4 me-2 bg-success">Reset Password</Button>
                <Button onClick={() => setEditPassword(false)} className="mt-4 bg-success">Cancel</Button>
              </div>
            : <Button onClick={() => setEditPassword(true)} className="mt-4 bg-success">Change password</Button>
            }
            <p>{messageResetPassword && 'We will send you a link to reset your password.'}</p>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </Container>
  )
})

export default UserInfo;
