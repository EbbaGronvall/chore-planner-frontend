import React from "react";
import Container from "react-bootstrap/Container";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import HomeAuth from "./HomeAuth";
import HomeUnAuth from "./HomeUnAuth";
import taskStyles from "../../styles/Task.module.css";

function HomePage() {
	const currentUser = useCurrentUser();

	return (
		<Container fluid className={taskStyles.Task}>
			{currentUser ? <HomeAuth /> : <HomeUnAuth />}
		</Container>
	);
}

export default HomePage;
