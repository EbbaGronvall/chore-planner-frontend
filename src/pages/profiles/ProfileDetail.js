import React, { useState, useEffect } from "react";
import taskStyles from "../../styles/Task.module.css";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import tasksPageStyles from "../../styles/TasksPage.module.css";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";

const ProfileDetail = (props) => {
	const { id, member, household_name, role } = props;
	const currentUserProfile = useCurrentUserProfile();
	const currentUser = useCurrentUser();

	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		if (currentUserProfile) {
			setHasLoaded(true);
		}
	}, [currentUserProfile]);
	const is_member = currentUser?.username === member;

	return hasLoaded ? (
		<>
			{is_member ? (
				<Container className={`${appStyles.Content}`}>
					<h1 className="mb-4">
						<Avatar src={currentUserProfile?.image} text={member} height={40} />
					</h1>

					<p className="mb-4">
						Household Name: {household_name}
						<br />
						Your role: {role}
					</p>

					<Link to={`/profiles/${id}/edit`}>
						<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
							Edit your profile
						</Button>
					</Link>
				</Container>
			) : (
				<Container className={`${appStyles.Content}  ${taskStyles.Text}`}>
					<h1 className={taskStyles.Text}>
						Sorry, you can only see your own profile!
					</h1>
				</Container>
			)}
		</>
	) : (
		<Container className={`  ${taskStyles.Text} ${tasksPageStyles.Spinner}`}>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</Container>
	);
};

export default ProfileDetail;
