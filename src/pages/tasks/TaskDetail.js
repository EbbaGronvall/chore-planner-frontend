import React, { useState, useEffect } from "react";
import styles from "../../styles/Task.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const TaskDetail = (props) => {
  const {
    assigned_to_username,
    description,
    due_date,
    id,
    is_task_giver,
    status,
    task_giver_username,
    title,
    taskPage,
    handleClose,
    handleOpenEdit,
  } = props;
  const currentUser = useCurrentUser();
  const is_assigned_to = currentUser?.username === assigned_to_username;
  const isUserAuthorized =
    is_assigned_to || task_giver_username === currentUser?.username;

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (assigned_to_username || task_giver_username) {
      setHasLoaded(true);
    }
  }, [assigned_to_username, task_giver_username]);

  return (
    <>
      {hasLoaded ? (
        <>
          {isUserAuthorized ? (
            <Card className={styles.Card}>
              <Card.Body>
                <Card.Title>To do: </Card.Title>
                <Card.Text>{title}</Card.Text>
                <Card.Title>Details:</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Title>Whos gonna do it:</Card.Title>
                {taskPage && (
                  <Card.Text>
                    {is_assigned_to
                      ? "You"
                      : is_task_giver
                      ? assigned_to_username
                      : null}
                  </Card.Text>
                )}
                <Card.Title>It needs to be done by:</Card.Title>
                <Card.Text>{due_date}</Card.Text>
                <Card.Title>Status:</Card.Title>
                <Card.Text>{status}</Card.Text>
                <Card.Subtitle className="mb-2">
                  The chore was set by:
                </Card.Subtitle>
                {taskPage && (
                  <Card.Text>
                    {is_task_giver
                      ? "You"
                      : !is_task_giver
                      ? task_giver_username
                      : null}
                  </Card.Text>
                )}

                <div className="d-flex justify-content-end">
                  {(is_task_giver || is_assigned_to) && (
                    <Button
                      onClick={handleOpenEdit}
                      className={`${btnStyles.Button} ${btnStyles.Green}`}
                    >
                      Edit the Chore
                    </Button>
                  )}

                  <Button
                    onClick={handleClose}
                    className={`${btnStyles.Button}  ${btnStyles.Green}`}
                  >
                    Close
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Container className={`${appStyles.Content}  ${styles.Text}`}>
              <h1>
                Sorry, only the people involved in a chore can see its details!
              </h1>
            </Container>
          )}
        </>
      ) : (
        <Container
          className={`${appStyles.Content} p-4 d-flex justify-content-center align-items-center`}
        >
          <Spinner
            className={appStyles.Spinner}
            animation="border"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </>
  );
};

export default TaskDetail;
