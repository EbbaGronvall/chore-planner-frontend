import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpForm = () => {
	const [signUpData, setSignUpData] = useState({
		username: "",
		password1: "",
		password2: "",
	});
	const { username, password1, password2 } = signUpData;

	const [errors, setErrors] = useState({});

	const history = useHistory();

	const handleChange = (event) => {
		setSignUpData({
			...signUpData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("/dj-rest-auth/registration/", signUpData);
			toast.success("New profile added successfully!");
			history.push("/signin");
		} catch (err) {
			setErrors(err.response?.data?.error);
		}
	};
	return (
		<Row className={styles.Row}>
			<Col className="my-auto py-2 p-md-2" md={6}>
				<Container className={`${appStyles.Content} p-4 `}>
					<h1 className={styles.Header}>sign up</h1>

					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="username">
							<Form.Label className="d-none">username</Form.Label>
							<Form.Control
								className={styles.Input}
								type="text"
								placeholder="Enter your name"
								name="username"
								value={username}
								onChange={handleChange}
							/>
						</Form.Group>
						{errors?.username?.map((message, idx) => (
							<Alert variant="warning" key={idx}>
								{message}
							</Alert>
						))}

						<Form.Group controlId="password1">
							<Form.Label className="d-none">Password</Form.Label>
							<Form.Control
								className={styles.Input}
								type="password"
								placeholder="Choose a Password"
								name="password1"
								value={password1}
								onChange={handleChange}
							/>
						</Form.Group>
						{errors?.password1?.map((message, idx) => (
							<Alert variant="warning" key={idx}>
								{message}
							</Alert>
						))}
						<Form.Group controlId="password2">
							<Form.Label className="d-none">Password</Form.Label>
							<Form.Control
								className={styles.Input}
								type="password"
								placeholder="Confirm Your Password"
								name="password2"
								value={password2}
								onChange={handleChange}
							/>
						</Form.Group>
						{errors?.password2?.map((message, idx) => (
							<Alert variant="warning" key={idx}>
								{message}
							</Alert>
						))}

						<Button
							className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Green}`}
							type="submit"
						>
							Sign Up
						</Button>
						{errors?.non_field_errors?.map((message, idx) => (
							<Alert variant="warning" key={idx} className="mt-3">
								{message}
							</Alert>
						))}
					</Form>
					<div className="mt-3">
					<Link className={styles.Link} to="/signin">
						Already have an account? <span>Sign in</span>
					</Link>
					</div>
				</Container>
				
			</Col>
		</Row>
	);
};

export default SignUpForm;
