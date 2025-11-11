import { Modal } from "react-bootstrap";
import ProfileEditForm from "./ProfileEditForm";
import HouseholdCreateModal from "../households/HouseholdCreateModal";
import styles from "../../styles/Task.module.css";
import { useState } from "react";

const ProfileEditModal = ({ show, handleClose, profileProps }) => {
    const [showCreate, setShowCreate] = useState(false);
    const handleOpenCreate = () => {
    setShowCreate(true);
    handleClose();
  };
  const handleCloseCreate = () => {
    setShowCreate(false);
    handleClose();
  };
    return (
    <>
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
        <ProfileEditForm handleClose={handleClose} handleOpenCreate={handleOpenCreate} {...profileProps} />
      </Modal.Body>
    </Modal>
    <HouseholdCreateModal
        show={showCreate}
        handleClose={handleCloseCreate}
      />
      </>
  );
};

export default ProfileEditModal;