import React, { useState, useEffect } from "react";
import styles from "../../styles/Task.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import tasksPageStyles from "../../styles/TasksPage.module.css";

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
		<Container>
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
									The task was set by:
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

								<div className="d-flex align-items-center">
									{is_task_giver && taskPage && (
										<Link to={`/tasks/${id}/edit`}>
											<Button
												className={`${btnStyles.Button}  ${btnStyles.Pink}`}
											>
												Edit the task
											</Button>
										</Link>
									)}
								</div>
							</Card.Body>
						</Card>
					) : (
						<Container className={`${appStyles.Content}  ${styles.Text}`}>
							<h1>
								Sorry, only the people involved in a task can see its details!
							</h1>
						</Container>
					)}
				</>
			) : (
				<Container
					className={`${appStyles.Content}  ${styles.Text} ${tasksPageStyles.Spinner}`}
				>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</Container>
			)}
		</Container>
	);
};

export default TaskDetail;
