import { Modal } from "react-bootstrap";
import TaskEditForm from "./TaskEditForm";
import styles from "../../styles/Task.module.css";

const TaskEditModal = ({ show, handleClose, taskProps }) => {
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
            <TaskEditForm {...taskProps} handleClose={handleClose} />
        </Modal.Body>
    </Modal>
  );
}

export default TaskEditModal;