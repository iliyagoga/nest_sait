import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MiddleModal({handleClose, show,  body, func,he}) {
  return (
    <Modal 
      show={show}
      onHide={handleClose} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {he}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>handleClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MiddleModal