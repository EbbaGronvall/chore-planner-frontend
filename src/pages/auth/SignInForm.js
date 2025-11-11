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
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from "react-toastify";

function SignInForm() {
	const setCurrentUser = useSetCurrentUser();

	const [signInData, setSignInData] = useState({
		username: "",
		password: "",
	});
	const { username, password } = signInData;

	const [errors, setErrors] = useState({});

	const history = useHistory();

	const handleChange = (event) => {
		setSignInData({
			...signInData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post("/dj-rest-auth/login/", signInData);
			setCurrentUser(data.user);
			toast.success("You logged in succesfully!");
			history.push("/");
		} catch (err) {
			setErrors(err.response?.data?.error);
		}
	};
	return (
		<Row className={styles.Row}>
			<Col className="my-auto py-2 p-md-2" md={6}>
				<Container className={`${appStyles.Content} p-4 `}>
					<h1 className={styles.Header}>Sign in</h1>

					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="username">
							<Form.Label className="d-none">username</Form.Label>
							<Form.Control
								className={styles.Input}
								type="text"
								placeholder="Enter username"
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

						<Form.Group controlId="password">
							<Form.Label className="d-none">Password</Form.Label>
							<Form.Control
								className={styles.Input}
								type="password"
								placeholder="Password"
								name="password"
								value={password}
								onChange={handleChange}
							/>
						</Form.Group>
						{errors?.password?.map((message, idx) => (
							<Alert variant="warning" key={idx}>
								{message}
							</Alert>
						))}

						<Button
							className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Green}`}
							type="submit"
						>
							Sign In
						</Button>
						{errors?.non_field_errors?.map((message, idx) => (
							<Alert variant="warning" key={idx} className="mt-3">
								{message}
							</Alert>
						))}
					</Form>
					<div className="mt-3">
					<Link className={styles.Link} to="/signup">
						Not a member yet? <span>Sign up here</span>
					</Link>
					</div>
				</Container>
			</Col>
		</Row>
	);
}

export default SignInForm;
