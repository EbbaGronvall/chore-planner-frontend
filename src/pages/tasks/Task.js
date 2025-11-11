import React from "react";
import styles from "../../styles/Task.module.css";
import Card from "react-bootstrap/Card";
import TaskDetailModal from "./TaskDetailModal";
import { useState } from "react";

const Task = (props) => {
  const { assigned_to_username, due_date, status, title } = props;
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card
        className={`${styles.Card} ${styles.CardZoom}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
      >
        <Card.Body>
          <Card.Title>To do: </Card.Title>
          <Card.Text>{title}</Card.Text>
          <Card.Title>Who's gonna do it:</Card.Title>
          <Card.Text>{assigned_to_username}</Card.Text>
          <Card.Title>It needs to be done by:</Card.Title>
          <Card.Text>{due_date}</Card.Text>
          <Card.Title>Status:</Card.Title>
          <Card.Text>{status}</Card.Text>
        </Card.Body>
      </Card>
      <TaskDetailModal
        show={showModal}
        handleClose={handleClose}
        taskProps={props}
      />
    </>
  );
};

export default Task;
