import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Alert, Container } from "react-bootstrap";

import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefault";
import {
	useCurrentUserProfile,
	useSetCurrentUserProfile,
} from "../../contexts/CurrentUserProfileContext";
import { toast } from "react-toastify";

function HouseholdCreateForm() {
	const [errors, setErrors] = useState({});
	const currentUserProfile = useCurrentUserProfile();
	const setCurrentUserProfile = useSetCurrentUserProfile();

	const [householdData, setHouseholdData] = useState({
		name: "",
		slug: "",
	});
	const { name, slug } = householdData;

	const history = useHistory();
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
			const { data } = await axiosReq.post("/households/", formData);
			if (currentUserProfile) {
				setCurrentUserProfile({
					...currentUserProfile,
					household_slug: data.slug,
					household_name: data.name,
				});
			}
			toast.success("Household added successfully!");
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

	return (
		<Container className={appStyles.Content}>
			<h1>Add a Household</h1>
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
					<Form.Label className={styles.Label}>Pick a Slug*</Form.Label>
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
				<p className={styles.Label}>
					A slug is what shows at the end of the websites url.
				</p>

				<Button
					className={`${btnStyles.Button} ${btnStyles.Pink} ${btnStyles.Wide}`}
					type="submit"
				>
					Add Household
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

export default HouseholdCreateForm;
