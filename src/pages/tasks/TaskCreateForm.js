import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Alert, Container } from "react-bootstrap";

import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefault";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function TaskCreateForm() {
	const [errors, setErrors] = useState({});

	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
		due_date: null,
		assigned_to: "",
	});
	const { title, description, due_date, assigned_to } = taskData;

	const history = useHistory();

	const handleChange = (event) => {
		setTaskData({
			...taskData,
			[event.target.name]: event.target.value,
		});
	};

	const handleDateChange = (selectedDate) => {
		setTaskData((prevState) => ({
			...prevState,
			due_date: selectedDate,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();

		const formattedDate = due_date ? format(due_date, "yyyy-MM-dd") : null;

		formData.append("title", title);
		formData.append("description", description);
		formData.append("due_date", formattedDate);
		formData.append("assigned_to", assigned_to);

		try {
			const { data } = await axiosReq.post("/tasks/", formData);
			history.push(`/tasks/${data.id}`);
		} catch (err) {
			console.log(err);
			if (err.response?.status !== 401) {
				setErrors(err.response?.data);
			}
		}
	};

	return (
		<Container className={appStyles.Content}>
			<h1>Let's Plan Some Chores</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="title">
					<Form.Label className={styles.Label}>Chore Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="What needs to be done?"
						className={styles.Input}
						name="title"
						value={title}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors?.title?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Form.Group controlId="description">
					<Form.Label className={styles.Label}>Chore Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Explain what needs to be done"
						className={styles.Input}
						name="description"
						value={description}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors?.description?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Form.Group controlId="due_date">
					<Form.Label className={styles.Label}>
						When do you need it done?
					</Form.Label>
					<div>
						<DatePicker
							showIcon
							icon="fa fa-calendar"
							dateFormat="dd/MM/yyyy"
							selected={due_date}
							onChange={handleDateChange}
							className={styles.Input}
						/>
					</div>
				</Form.Group>
				{errors?.due_date?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				{/* These options are going to be household members */}
				<Form.Group controlId="assigned_to">
					<Form.Label className={styles.Label}>Who is gonna do it?</Form.Label>
					<Form.Control
						as="select"
						className={styles.Input}
						name="assigned_to"
						value={assigned_to}
						onChange={handleChange}
					>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</Form.Control>
				</Form.Group>
				{errors?.assigned_to?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Button
					className={`${btnStyles.Button} ${btnStyles.Pink} ${btnStyles.Wide}`}
					type="submit"
				>
					Set Task
				</Button>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert variant="warning" key={idx} className="mt-3">
						{message}
					</Alert>
				))}
			</Form>
		</Container>
	);
}

export default TaskCreateForm;
