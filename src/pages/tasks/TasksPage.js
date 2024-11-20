import React, { useEffect, useState } from "react";

import { Form, Col, Row, Container, Spinner } from "react-bootstrap";
import formStyles from "../../styles/Forms.module.css";
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

	const [query, setQuery] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("");
	const [selectedOrder, setSelectedOrder] = useState("");

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				let url = `/tasks/?${filter}search=${query}`;
				if (selectedFilter) {
					url += `&status=${selectedFilter}`;
				}
				if (selectedOrder) {
					url += `&ordering=${selectedOrder}`;
				}
				const { data } = await axiosReq.get(url);
				setTasks(data);
				setHasLoaded(true);
			} catch (err) {
				console.log(err);
			}
		};
		setHasLoaded(false);
		const timer = setTimeout(() => {
			fetchTasks();
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [filter, query, selectedFilter, selectedOrder, pathname]);

	return (
		<Container fluid className="mb-4">
			<Row className="mb-3">
				<Form
					className={`w-100 ${styles.SearchBar}`}
					onSubmit={(event) => event.preventDefault()}
				>
					<Form.Row className="w-100">
						<Form.Group as={Col} xs={12} sm={12} md={7} className="mb-3">
							<i className={`fas fa-search ${styles.SearchIcon}`} />
							<Form.Control
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								type="text"
								className="mr-sm-2"
								placeholder="Search Name or Task"
							/>
						</Form.Group>
						<Form.Group as={Col} xs={12} sm={8} md={3} className="mb-3">
							<Form.Control
								as="select"
								className={`${formStyles.Input} ${formStyles.FormControl}`}
								value={selectedFilter}
								onChange={(event) => setSelectedFilter(event.target.value)}
							>
								<option value="">All tasks</option>
								<option value="pending">Pending</option>
								<option value="in_progress">In Progress</option>
								<option value="completed">Completed</option>
							</Form.Control>
						</Form.Group>
						<Form.Group as={Col} xs={12} sm={4} md={2} className="mb-3">
							<Form.Control
								as="select"
								className={formStyles.Input}
								value={selectedOrder}
								onChange={(event) => setSelectedOrder(event.target.value)}
							>
								<option value="">Sort By</option>
								<option value="title">Title</option>
								<option value="due_date">Due Date</option>
								<option value="status">Status</option>
								<option value="assigned_to__member__username">Assignee</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>
				</Form>
				{hasLoaded ? (
					<>
						{tasks.results.length ? (
							<Container fluid className={taskStyles.Task}>
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
			</Row>
		</Container>
	);
}

export default TasksPage;
