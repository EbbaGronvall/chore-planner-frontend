import React from "react";
import taskStyles from "../../styles/Task.module.css";
import { Row, Col, Card } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import HomeInfo from "./HomeInfo";
import styles from "../../styles/Home.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const HomeAuth = () => {
	const currentUser = useCurrentUser();
	console.log("Current User:", currentUser);
	return (
		<>
			<Row>
				<Col className={`${taskStyles.Text} ${appStyles.Content} mb-2`}>
					<h1 className="mb-4">Welcome Back {currentUser.username}</h1>
					<h2 className="mb-4">What do you want to do today?</h2>
				</Col>
			</Row>

			<Row>
				<Col>
					<Card className={`${styles.Purple} ${styles.Card} mb-4`}>
						<Card.Body>
							<Card.Title>
								<Link className={styles.Link} to={`/chores/create`}>
									Plan some chores?
								</Link>
							</Card.Title>
							<Card.Text>
								<p>
									Or just look at your {"\n"}
									<Link className={styles.Link} to={`/chores`}>
										current ones?
									</Link>
								</p>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card className={`${styles.Yellow} ${styles.Card} mb-4`}>
						<Card.Body>
							<Card.Title>
								Maybe you need to {"\n"}{" "}
								<Link
									className={styles.Link}
									to={`/profiles/${currentUser.profile_id}/edit`}
								>
									update your profile?
								</Link>
							</Card.Title>
							<Card.Text>
								<p>
									Or maybe you just want to {"\n"}
									<Link
										className={styles.Link}
										to={`/profiles/${currentUser.profile_id}`}
									>
										admire it..
									</Link>
								</p>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<HomeInfo />
		</>
	);
};

export default HomeAuth;
