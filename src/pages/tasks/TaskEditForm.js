import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";

import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq, axiosRes } from "../../api/axiosDefault";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import taskStyles from "../../styles/Task.module.css";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";
import { toast } from "react-toastify";
import tasksPageStyles from "../../styles/TasksPage.module.css";

function TaskEditForm() {
	const [errors, setErrors] = useState({});
	const currentUserProfile = useCurrentUserProfile();

	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
		due_date: null,
		assigned_to: "",
		status: "",
	});
	const { title, description, due_date, assigned_to, status } = taskData;
	const [profiles, setProfiles] = useState([]);
	const history = useHistory();
	const { id } = useParams();
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const { data } = await axiosReq.get("/profiles/");
				setProfiles(data.results);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProfiles();
	}, []);

	useEffect(() => {
		const handleMount = async () => {
			console.log(currentUserProfile, taskData);
			try {
				const { data } = await axiosReq.get(`/tasks/${id}/`);
				const {
					title,
					description,
					due_date,
					status,
					assigned_to,
					task_giver,
				} = data;

				if (currentUserProfile.username === task_giver) {
					setTaskData({ title, description, due_date, status, assigned_to });
					setHasLoaded(true);
				}
			} catch (err) {
				console.log(err);
				toast.error("You are not authorized to edit this task.");
				history.push("/chores");
				setHasLoaded(true);
			}
		};
		setHasLoaded(false);
		const timer = setTimeout(() => {
			handleMount();
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [history, id]);

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

	const handleDelete = async () => {
		try {
			await axiosRes.delete(`/tasks/${id}/`);
			toast.success("Chore deleted successfully!");
			history.push("/chores/");
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();

		const formattedDate = due_date ? format(due_date, "yyyy-MM-dd") : null;

		formData.append("title", title);
		formData.append("description", description);
		formData.append("due_date", formattedDate);
		formData.append("status", status);
		formData.append("assigned_to", assigned_to);

		try {
			await axiosReq.put(`/tasks/${id}/`, formData);
			toast.success("Chore updated successfully!");
			history.push(`/chores/${id}`);
		} catch (err) {
			if (err.response?.status !== 401) {
				setErrors(err.response?.data?.error || {});
				if (err.response?.data?.details?.due_date) {
					setErrors((prevErrors) => ({
						...prevErrors,
						details: {
							...prevErrors.details,
							due_date: err.response?.data?.details?.due_date,
						},
					}));
				}
			}
		}
	};
	const filteredProfiles = currentUserProfile
		? profiles.filter(
				(profile) => profile.household === currentUserProfile.household
		  )
		: [];

	return hasLoaded ? (
		<Container className={appStyles.Content}>
			<h1>You're now editing a chore</h1>
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
				{errors?.details?.due_date && errors.details.due_date.length > 0 && (
					<Alert variant="warning">{errors.details.due_date[0]}</Alert>
				)}
				{errors?.due_date && errors.due_date.length > 0 && (
					<Alert variant="warning">{errors.due_date[0]}</Alert>
				)}
				<Form.Group>
					<Form.Label className={styles.Label}>
						How is the chore going?
					</Form.Label>
					<Form.Control
						as="select"
						className={styles.Input}
						name="status"
						value={status}
						onChange={handleChange}
					>
						<option value="">Update status</option>
						<option value="pending">Pending</option>
						<option value="in_progress">In Progress</option>
						<option value="completed">Completed</option>
					</Form.Control>
				</Form.Group>
				{errors?.status?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Form.Group controlId="assigned_to">
					<Form.Label className={styles.Label}>Who is gonna do it?</Form.Label>
					<Form.Control
						as="select"
						className={styles.Input}
						name="assigned_to"
						value={assigned_to}
						onChange={handleChange}
					>
						<option value="">Select a household member</option>
						{filteredProfiles.length > 0 ? (
							filteredProfiles.map((profile) => (
								<option key={profile.id} value={profile.id}>
									{profile.member}
								</option>
							))
						) : (
							<option disabled>No members in your household</option>
						)}
					</Form.Control>
				</Form.Group>
				{errors?.assigned_to?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Button
					className={`${btnStyles.Button} ${btnStyles.Pink} ${btnStyles.Wide} mb-4`}
					type="submit"
				>
					Update Chore
				</Button>
				<Button
					onClick={handleDelete}
					aria-label="delete"
					className={`${btnStyles.Button} ${btnStyles.Pink} ${btnStyles.Wide} mb-4`}
				>
					Delete Chore
				</Button>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert variant="warning" key={idx} className="mt-3">
						{message}
					</Alert>
				))}
			</Form>
		</Container>
	) : (
		<Container
			className={`${appStyles.Content}  ${taskStyles.Text} ${tasksPageStyles.Spinner}`}
		>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</Container>
	);
}

export default TaskEditForm;
