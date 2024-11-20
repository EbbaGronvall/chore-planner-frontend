import React, { useEffect, useState } from "react";

import { Form, Col, Row, Container, Spinner } from "react-bootstrap";
import taskStyles from "../../styles/Task.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/TasksPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Task from "./Task";

function TasksPage({ filter = "" }) {
	const [tasks, setTasks] = useState({ results: [] });
	const [hasLoaded, setHasLoaded] = useState(false);
	const { pathname } = useLocation();
    

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const { data } = await axiosReq.get(`/tasks/?${filter}`);
				setTasks(data);
				setHasLoaded(true);
			} catch (err) {
				console.log(err);
			}
		};
		setHasLoaded(false);
		fetchTasks();
	}, [filter, pathname]);

	return (
			<>
				{hasLoaded ? (
					<>
						{tasks.results.length ? (
							<Container className={taskStyles.Task}>
								<Row>
									{tasks.results.map((task) => (
										<Col 
											key={task.id} 
											xs={12} 
											sm={12} 
											md={6} 
											lg={4} 
                                            className="mb-4"
										>
											<Task {...task} setTasks={setTasks} />
										</Col>
									))}
								</Row>
							</Container>
						) : (
							<Container className={`${appStyles.Content}  ${taskStyles.Text}`}>
								<h1>Looks like there is nothing to do!</h1>
							</Container>
						)}
					</>
				) : (
					<Container
						className={`${appStyles.Content}  ${taskStyles.Text} ${styles.Spinner}`}
					>
						<Spinner animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</Container>
				)}
			</>
		
	);
}

export default TasksPage;
