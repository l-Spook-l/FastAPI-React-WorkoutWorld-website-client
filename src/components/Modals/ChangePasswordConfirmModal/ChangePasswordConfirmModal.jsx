import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangePasswordConfirmModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Пароль успешно сброшен!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Ваше сообщение об успешном сбросе пароля.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordConfirmModal;
