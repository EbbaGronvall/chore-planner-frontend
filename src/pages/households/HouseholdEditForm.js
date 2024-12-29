import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";

import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefault";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import taskStyles from "../../styles/Task.module.css";
import {
	useCurrentUserProfile,
	useSetCurrentUserProfile,
} from "../../contexts/CurrentUserProfileContext";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from "react-toastify";
import tasksPageStyles from "../../styles/TasksPage.module.css"

function HouseholdEditForm() {
	const [errors, setErrors] = useState({});
	const currentUserProfile = useCurrentUserProfile();
	const setCurrentUserProfile = useSetCurrentUserProfile();
	const setCurrentUser = useSetCurrentUser();

	const [householdData, setHouseholdData] = useState({
		name: "",
		slug: "",
	});
	const { name, slug } = householdData;
	const history = useHistory();
	const { slug: urlSlug } = useParams();

	useEffect(() => {
		const handleMount = async () => {
			try {
				const { data } = await axiosReq.get(`/households/${urlSlug}/`);
				const { name, slug } = data;

				currentUserProfile
					? setHouseholdData({ name, slug })
					: toast.error("You can only edit your own household"), history.push("/");
			} catch (err) {
				console.log(err);
			}
		};
		handleMount();
	}, [history, urlSlug, currentUserProfile]);

	const handleChange = (event) => {
		setHouseholdData({
			...householdData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();

		formData.append("name", name);
		formData.append("slug", slug);

		try {
			const { data } = await axiosReq.put(`/households/${urlSlug}/`, formData);
			setCurrentUserProfile((currentUserProfile) => ({
				...currentUserProfile,
				household_name: data.name,
				household_slug: data.slug,
			}));
			setCurrentUser((currentUser) => ({
				...currentUser,
				household_name: data.name,
				household_slug: data.slug,
			}));
			toast.success("Household updated successfully!");
			history.push(`/households/${data.slug}/`);
		} catch (err) {
			if (err.response?.status !== 401) {
				setErrors(err.response?.data?.error || {});

				if (err.response?.data?.details?.name) {
					setErrors((prevErrors) => ({
						...prevErrors,
						name: err.response?.data?.details?.name,
					}));
				}

				if (err.response?.data?.details?.slug) {
					setErrors((prevErrors) => ({
						...prevErrors,
						slug: err.response?.data?.details?.slug,
					}));
				}
			}
		}
	};

	if (!currentUserProfile) {
		return (
			<Container
				fluid
				className={`${appStyles.Content}  ${taskStyles.Text} ${tasksPageStyles.Spinner}`}
			>
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	return (
		<Container className={appStyles.Content}>
			<h1>You're now editing your household</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.Label className={styles.Label}>Household Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="ex. Home Sweet Home"
						className={styles.Input}
						name="name"
						value={name}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors?.name?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Form.Group controlId="slug">
					<Form.Label className={styles.Label}>Slug*</Form.Label>
					<Form.Control
						type="text"
						placeholder="ex. home-sweet-home"
						className={styles.Input}
						name="slug"
						value={slug}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors?.slug?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}

				<Button
					className={`${btnStyles.Button} ${btnStyles.Pink} ${btnStyles.Wide} mb-4`}
					type="submit"
				>
					Update Household
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

export default HouseholdEditForm;
