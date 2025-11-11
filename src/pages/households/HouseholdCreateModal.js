import { Modal } from "react-bootstrap";
import HouseholdCreateForm from "./HouseholdCreateForm";
import styles from "../../styles/Task.module.css";

const HouseholdCreateModal = ({ show, handleClose, householdProps }) => {
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
        <HouseholdCreateForm handleClose={handleClose} {...householdProps} />
      </Modal.Body>
    </Modal>
  );
};

export default HouseholdCreateModal;