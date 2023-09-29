import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import style from './MainPageContactFrom.module.css'

const MainPageContactFrom = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете добавить логику отправки данных на сервер или другую необходимую обработку
    console.log('Отправленные данные:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} md="6" className="mb-3" controlId="formName">
          <Form.Label className={style.label}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={style.formStyle}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" className="mb-3" controlId="formEmail">
          <Form.Label className={style.label}>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your e-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={style.formStyle}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label className={style.label}>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={style.formStyle}
          />
        </Form.Group>
      </Row>

      <Button variant="success" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default MainPageContactFrom;

