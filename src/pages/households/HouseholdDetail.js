import React, { useState, useEffect } from "react";
import styles from "../../styles/Task.module.css";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import tasksPageStyles from "../../styles/TasksPage.module.css";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";

const HouseholdDetail = (props) => {
	const { name, slug, id, householdPage, household_members } = props;
	const currentUserProfile = useCurrentUserProfile()
    
	const [hasLoaded, setHasLoaded] = useState(false);
    
	useEffect(() => {
		if (currentUserProfile) {
			setHasLoaded(true);
		}
	}, [currentUserProfile]);
	const isAuthorized = 
		currentUserProfile?.household && 
		name &&
		currentUserProfile.household === name

	return (
		<Container>
			{hasLoaded ? (
				<>
					<Card className={styles.Card}>
						<Card.Body>
							<Card.Title className="mb-4">{name}</Card.Title>

							<Card.Subtitle className="mb-4">Who lives here?</Card.Subtitle>
                            <Card.Text>{household_members}</Card.Text>
							{isAuthorized && (
							<div className="d-flex align-items-center">
								<Link to={`/households/${slug}/edit`}>
									<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
										Edit the task
									</Button>
								</Link>
							</div>)}
						</Card.Body>
					</Card>
                    
                 
				</>
			) : (
				<Container
					className={`${appStyles.Content}  ${styles.Text} ${tasksPageStyles.Spinner}`}
				>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</Container>
			)}
		</Container>
	);
};

export default HouseholdDetail;
