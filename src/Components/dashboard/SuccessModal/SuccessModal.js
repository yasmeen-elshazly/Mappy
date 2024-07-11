import React from 'react';
import { Modal, Button, CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

function SuccessModal({ show, onClose, onLoginClick }) {
  return (
    <Modal show={show} onHide={onClose} centered >
      <Modal.Body className="d-flex flex-column align-items-center">
      <CloseButton onClick={onClose} className="position-absolute top-0 end-0 m-3" />
        <h2 className='mt-3'>Success!</h2>
        <FontAwesomeIcon
          className='my-3'
          icon={faCircleCheck}
          style={{ color: '#157347' }}
          size="6x"
        />
        <p> Your account has been created successfully.</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="success" onClick={onLoginClick}>
          Login Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SuccessModal;