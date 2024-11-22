import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import {
	Form,
	Button,
	Alert,
	Container,
	Spinner,
	Image,
} from "react-bootstrap";

import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefault";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import taskStyles from "../../styles/Task.module.css";
import {
	useCurrentUserProfile,
	useSetCurrentUserProfile,
} from "../../contexts/CurrentUserProfileContext";

function ProfileEditForm() {
	const [errors, setErrors] = useState({});
	const currentUserProfile = useCurrentUserProfile();
	const setCurrentUserProfile = useSetCurrentUserProfile();
	const imageFile = useRef();

	const [profileData, setProfileData] = useState({
		member: "",
		household_name: "",
		role: "",
		image: "",
	});
	const { member, household_name, role, image } = profileData;
	const history = useHistory();
	const { id } = useParams();
	const no_slug = !currentUserProfile?.household_slug;

	useEffect(() => {
		const handleMount = async () => {
			try {
				const { data } = await axiosReq.get(`/profiles/${id}/`);
				const { member, household_name, role, image } = data;

				currentUserProfile
					? setProfileData({ member, household_name, role, image })
					: history.push("/");
			} catch (err) {
				console.log(err);
			}
		};
		handleMount();
	}, [history, id, currentUserProfile]);

	const handleChange = (event) => {
		setProfileData({
			...profileData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();

		formData.append("household_name", household_name);
		formData.append("role", role);

		if (imageFile?.current?.files[0]) {
			formData.append("image", imageFile?.current?.files[0]);
		}

		try {
			const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
			setCurrentUserProfile((currentUserProfile) => ({
				...currentUserProfile,
				profile_image: data.image,
			}));
			history.push(`/profiles/${id}`);
		} catch (err) {
			console.log(err);
			if (err.response?.status !== 401) {
				setErrors(err.response?.data);
			}
		}
	};

	if (!currentUserProfile) {
		return (
			<Container
				fluid
				className={`${appStyles.Content}  ${taskStyles.Text} ${styles.Spinner}`}
			>
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	return (
		<Container className={appStyles.Content}>
			<h1>{member}, You are now editing your Profile</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<figure>
						<Image src={image} fluid />
					</figure>
					<div>
						<Form.Label
							className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
							htmlFor="image-upload"
						>
							Change the image
						</Form.Label>
					</div>
					<Form.File
						id="image-upload"
						ref={imageFile}
						accept="image/*"
						onChange={(e) => {
							if (e.target.files.length) {
								setProfileData({
									...profileData,
									image: URL.createObjectURL(e.target.files[0]),
								});
							}
						}}
					/>
				</Form.Group>

				<Form.Group controlId="household_name">
					<Form.Label className={styles.Label}>
						Household Name: {household_name}
					</Form.Label>
					{!no_slug ? (
					<div>
					
						<Link to={`/households/${currentUserProfile?.household_slug}/edit`}>
							<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
								Edit Household
							</Button>
						</Link>
						</div>
					) : ( 
					<div>
						<Link to={'/households/create'}>
							<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
								Add Household
							</Button>
						</Link>
						</div> 
					
					)}
				</Form.Group>
				{errors?.household_name?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Form.Group controlId="role">
					<Form.Label className={styles.Label}>
						Your role in the household
					</Form.Label>
					<Form.Control
						as="select"
						className={styles.Input}
						name="role"
						value={role}
						onChange={handleChange}
					>
						<option value="">Select Your Role</option>
						{[
							{ value: "Parent", label: "Parent" },
							{ value: "Child", label: "Child" },
						].map((choice) => (
							<option key={choice.value} value={choice.value}>
								{choice.label}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				{errors?.household_name?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Button
					className={`${btnStyles.Button} ${btnStyles.Pink} ${btnStyles.Wide} mb-4`}
					type="submit"
				>
					Update Profile
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

export default ProfileEditForm;
