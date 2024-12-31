import React, { useState, useEffect } from "react";
import taskStyles from "../../styles/Task.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import tasksPageStyles from "../../styles/TasksPage.module.css";
import householdStyles from "../../styles/HouseholdStyles.module.css";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";

const HouseholdDetail = (props) => {
	const { name, slug, household_members } = props;
	const currentUserProfile = useCurrentUserProfile();

	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		if (currentUserProfile) {
			setHasLoaded(true);
		}
	}, [currentUserProfile]);
	const isAuthorized =
		currentUserProfile?.household_name &&
		name &&
		currentUserProfile.household_name === name;

	return (
		<>
			{hasLoaded ? (
				<>
					{isAuthorized ? (
						<Container className={appStyles.Content}>
							<h1 className="mb-4">{name}</h1>

							<h3 className="mb-4">Who lives here?</h3>

							{household_members.length > 0 ? (
								<ul className={`${householdStyles.NoBullet} mb-4`}>
									{household_members.map((member, index) => (
										<li key={index}>{member}</li>
									))}
								</ul>
							) : (
								<p>No members in this household.</p>
							)}

							<Link to={`/households/${slug}/edit`}>
								<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
									Edit the household
								</Button>
							</Link>
						</Container>
					) : (
						<Container className={`${appStyles.Content}  ${taskStyles.Text}`}>
							<h1>
								Sorry, only the members of a household can see its details!
							</h1>
						</Container>
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
		</>
	);
};

export default HouseholdDetail;
