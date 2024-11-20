import React from "react";
import styles from "../../styles/Task.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const Task = (props) => {
	const {
		assigned_to_username,
		due_date,
		id,
		status,
		title,
		is_task_giver
	} = props;
	const currentUser = useCurrentUser();
	const is_assigned_to = currentUser?.username === assigned_to_username;
	
	return (
		
		<Card className={styles.Card}>
			<Card.Body>
				<Card.Title>To do: </Card.Title>
				<Card.Text>{title}</Card.Text>
				<Card.Title>Who's gonna do it:</Card.Title>
				<Card.Text>{assigned_to_username}</Card.Text>
				
				<Card.Title>It needs to be done by:</Card.Title>
				<Card.Text>{due_date}</Card.Text>
				<Card.Title>Status:</Card.Title>
				<Card.Text>{status}</Card.Text>
				

				<div className="d-flex align-items-center">
					{(is_task_giver || is_assigned_to) && (
						<Link to={`/tasks/${id}/`}>
							<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
								See Details
							</Button>
						</Link>)}
						
				</div>
			</Card.Body>
		</Card>
		
	);
};

export default Task;
