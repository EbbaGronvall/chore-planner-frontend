import { Modal } from "react-bootstrap";
import HouseholdEditForm from "./HouseholdEditForm";
import styles from "../../styles/Task.module.css";

const HouseholdEditModal = ({ show, handleClose, householdProps }) => {
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
        <HouseholdEditForm handleClose={handleClose} {...householdProps} />
      </Modal.Body>
    </Modal>
  );
};

export default HouseholdEditModal;