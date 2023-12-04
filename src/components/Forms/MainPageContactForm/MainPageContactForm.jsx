import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import style from './MainPageContactForm.module.css'
import { sendMessageToAdmin } from '../../../http/userAPI';

const MainPageContactForm = () => {
  const [lastSentTime, setLastSentTime] = useState(null)
  const [showError, setShowError] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const changeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const submitData = (e) => {
    e.preventDefault()
    const currentTime = new Date().getTime();
    if (!lastSentTime || currentTime - lastSentTime >= 3 * 60 * 1000) {
      sendMessageToAdmin(formData.name, formData.email, formData.message).catch((error) => {
        if (error.response.status === 429) {
          setShowError(true)
        }
      })
      setLastSentTime(currentTime)
      setShowError(false)
    } else {
      setShowError(true)
    }
  }

  return (
    <Form className={style.containerForm} onSubmit={submitData}>
      <Row>
        <Form.Group as={Col} md="6" className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={changeData}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" className="mb-3" controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your e-mail"
            name="email"
            value={formData.email}
            onChange={changeData}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={changeData}
          />
        </Form.Group>
      </Row>

      <Row className='d-flex'>
        <button className={style.button} type="submit">
          Send
        </button>
        {showError && <p className={style.showErrorMessage}>You have already sent a message. Please wait for 3 minutes before sending another message.</p>}
      </Row>
    </Form>
  )
}

export default MainPageContactForm;
