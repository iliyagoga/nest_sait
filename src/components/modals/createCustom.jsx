import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function CreateModal({handleClose, show, body, func,he}){
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {he}
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>{handleClose();func()}}>
              Создать
            </Button>
            <Button variant="secondary" onClick={()=>{handleClose()}}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  