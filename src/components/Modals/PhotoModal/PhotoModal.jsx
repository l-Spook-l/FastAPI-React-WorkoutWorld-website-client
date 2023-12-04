import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const PhotoModal = ({ image, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Body>
        <Image src={process.env.REACT_APP_API_URL + image} fluid />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PhotoModal;
