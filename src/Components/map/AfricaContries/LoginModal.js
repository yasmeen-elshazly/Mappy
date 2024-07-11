import React from 'react';
import { Modal, Button, CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './SuccessModal.css'
import { Navigate } from 'react-router-dom';

function LoginModal({ show, onClose, score }) {
  const formatDate = () => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    return new Date().toLocaleDateString('en-US', options);
  };
  
  return (
    <Modal show={show} onHide={onClose} centered animation size='lg'>
      <Modal.Body className="d-flex flex-column align-items-center">
        <CloseButton onClick={onClose} className="position-absolute top-0 end-0 m-3" />
        <h2 className='mt-3'>Login first</h2>
        <Button variant="outline-success" onClick={Navigate('/login')}>Login</Button>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button className='mb-3' variant="outline-success">Play again</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default LoginModal;