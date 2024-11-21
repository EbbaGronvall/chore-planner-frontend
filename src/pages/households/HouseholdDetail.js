import React, { useState, useEffect } from "react";
import taskStyles from "../../styles/Task.module.css";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import tasksPageStyles from "../../styles/TasksPage.module.css";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";

const HouseholdDetail = (props) => {
	const { name, slug, household_members } = props;
	const currentUserProfile = useCurrentUserProfile()
    
	const [hasLoaded, setHasLoaded] = useState(false);
    
	useEffect(() => {
		if (currentUserProfile) {
			setHasLoaded(true);
		}
	}, [currentUserProfile]);
	const isAuthorized = 
		currentUserProfile?.household_name && 
		name &&
		currentUserProfile.household_name === name

	return (
		<Container>
			{hasLoaded ? (
				<>
					{isAuthorized ? (
					<Card className={taskStyles.Card}>
						<Card.Body>
							<Card.Title className="mb-4">{name}</Card.Title>

							<Card.Subtitle className="mb-4">Who lives here?</Card.Subtitle>
                            <Card.Text>{household_members.length > 0 ? (
                                        <ul>
                                            {household_members.map((member, index) => (
                                                <li key={index}>{member}</li>
                                            ))}
                                        </ul>
                                    	) : (
											<p>No members in this household.</p>
										)}
									</Card.Text>
							
							
								<Link to={`/households/${slug}/edit`}>
									<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
										Edit the household
									</Button>
								</Link>
							
						</Card.Body>
					</Card>
                    
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
		</Container>
	);
};

export default HouseholdDetail;
