import React from "react";
import styles from "../App.module.css";
import taskStyles from "../styles/Task.module.css";

const NotFound = () => {
	return (
		<div className={`${styles.Content} ${taskStyles.Text}`}>
			<h1>Sorry! The page does not exist.</h1>
		</div>
	);
};

export default NotFound;
