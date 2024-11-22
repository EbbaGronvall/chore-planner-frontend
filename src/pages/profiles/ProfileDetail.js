import React, { useState, useEffect } from "react";
import taskStyles from "../../styles/Task.module.css";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import tasksPageStyles from "../../styles/TasksPage.module.css";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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

	return (
		<Container>
			{hasLoaded ? (
				<>
					{is_member ? (
						<Card className={taskStyles.Card}>
							<Card.Body>
								<div>
									<Avatar
										src={currentUserProfile?.image}
										text="Your Page"
										height={40}
									/>
								</div>
								<Card.Title className="mb-4">{member}</Card.Title>

								<Card.Subtitle className="mb-4">{household_name}</Card.Subtitle>
								<Card.Text>{role}</Card.Text>
								<Card.Text>{}</Card.Text>

								<Link to={`/profiles/${id}/edit`}>
									<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
										Edit your profile
									</Button>
								</Link>
							</Card.Body>
						</Card>
					) : (
						<h1 className={taskStyles.Text}>
							Sorry, you can only see your own profile!
						</h1>
					)}
				</>
			) : (
				<Container
					className={`  ${taskStyles.Text} ${tasksPageStyles.Spinner}`}
				>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</Container>
			)}
		</Container>
	);
};

export default ProfileDetail;
