import { Modal } from "react-bootstrap";
import TaskCreateForm from "./TaskCreateForm";
import styles from "../../styles/Task.module.css";

const TaskCreateModal = ({ show, handleClose }) => {
    
    return (
    <Modal
    show={show}
    onHide={handleClose}
    centered
    size="lg"
    backdrop={true}
    keyboard={true}
    contentClassName={styles.ModalContent}
  >
        <Modal.Body>
            <TaskCreateForm handleClose={handleClose} />
        </Modal.Body>
    </Modal>
  );
}

export default TaskCreateModal;