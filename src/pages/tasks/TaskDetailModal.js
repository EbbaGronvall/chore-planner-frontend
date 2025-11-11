import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TaskDetail from "./TaskDetail";
import TaskEditModal from "./TaskEditModal";
import styles from "../../styles/Task.module.css";

const TaskDetailModal = ({ show, handleClose, taskProps }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleOpenEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

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
          <TaskDetail
            {...taskProps}
            taskPage={true}
            handleClose={handleClose}
            handleOpenEdit={handleOpenEdit}
          />
        </Modal.Body>
      </Modal>
      <TaskEditModal
        show={showEdit}
        handleClose={handleCloseEdit}
        taskProps={taskProps}
      />
    </>
  );
};

export default TaskDetailModal;
