import React from "react";
import taskStyles from "../../styles/Task.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import appStyles from "../../App.module.css";
import styles from "../../styles/Home.module.css";
import HomeInfo from "./HomeInfo";
import { Link } from "react-router-dom/cjs/react-router-dom";

const HomeUnAuth = () => {
	return (
		<>
			<Row>
				<Col className={`${taskStyles.Text} ${appStyles.Content} mb-4`}>
					<h1>Welcome to the Chore Planner</h1>
					<h3>
						To get started with your planning you need to {"\n"}
						<Link className={styles.Link} to="/signup">
							create an account
						</Link>{" "}
						or {"\n"}
						<Link className={styles.Link} to="/signin">
							log in!
						</Link>
					</h3>
				</Col>
			</Row>
			<HomeInfo />
		</>
	);
};

export default HomeUnAuth;
