import React from 'react';
import { Modal, Button, CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../../APIs/Config';
import './SuccessModal.css'

function SuccessModal({ show, onClose, score }) {
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
  const formattedDate = formatDate();
  return (
    <Modal show={show} onHide={onClose} centered animation size='lg'>
      <Modal.Body className="d-flex flex-column align-items-center">
        <CloseButton onClick={onClose} className="position-absolute top-0 end-0 m-3" />

        <FontAwesomeIcon
          className='mt-3'
          icon={faCircleCheck}
          style={{ color: '#157347' }}
          size="3x"
        />
        <h2 className='mt-3'>Well done! You Completed The Game</h2>

        <div className="scoreContainer">
          <FontAwesomeIcon className='starIcon' icon={faStar} bounce size="3x" style={{ color: "#FFD43B" }} />
          <h5 className='score'>Score: {score}</h5>
        </div>
        <h5>Timer: {score}</h5>
        <h5>Game: Africa countries</h5>
        <h5>Date: {formattedDate}</h5>

      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button className='mb-3' variant="outline-success">Play again</Button>
      </Modal.Footer>
    </Modal>
    //  axiosInstance
    //  .post("/Scores", score)
    //  .then((result) => {
    //      console.log(result);
    //      setShowSuccessModal(true);
    //  })
    //  .catch((error) =>
    //      // console.log(error)
    //      setError(error.response)
    //  );
  );
}
export default SuccessModal;