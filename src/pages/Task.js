import React from "react";
import styles from "../styles/Task.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../styles/Button.module.css";
import appStyles from '../App.module.css'

const Task = (props) => {
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
	} = props;
  const currentUser = useCurrentUser();
  const is_assigned_to = currentUser?.username === assigned_to_username;

  if (!currentUser || (!is_assigned_to && !is_task_giver)) {
    return <Container className={`${appStyles.Content}  ${styles.Text}`} >
      <h1>Sorry, only the people involved in a task can see its details!</h1></Container>;
  }
	return (
    
		<Card className={styles.Card}>
			<Card.Body>
				<Card.Title>To do: </Card.Title>
				<Card.Text>{title}</Card.Text>
				<Card.Title>Details:</Card.Title>
				<Card.Text>{description}</Card.Text>
				<Card.Title>Who's gonna do it:</Card.Title>
				<Card.Text>{assigned_to_username}</Card.Text>
				<Card.Title>It needs to done by:</Card.Title>
				<Card.Text>{due_date}</Card.Text>
				<Card.Title>The task is:</Card.Title>
				<Card.Text>{status}</Card.Text>
				<Card.Subtitle className="mb-2">The task was set by:</Card.Subtitle>
				<Card.Text>{task_giver_username}</Card.Text>

				<div className="d-flex align-items-center">
					{is_task_giver && taskPage && (
						<Link to={`/tasks/${id}/edit`}>
							<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
								Edit the task
							</Button>
						</Link>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

export default Task;
