import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Task.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import TaskDetail from "./TaskDetail";

function TaskPage() {
	const { id } = useParams();
	const [task, setTask] = useState({ results: [] });

	useEffect(() => {
		const handleMount = async () => {
			try {
				const [{ data: task }] = await Promise.all([
					axiosReq.get(`/tasks/${id}`),
				]);
				setTask({ results: [task] });
			} catch (err) {
				//console.log(err);
			}
		};
		handleMount();
	}, [id]);

	return (
		<Container fluid className={styles.Task}>
			<TaskDetail {...task.results[0]} setTask={setTask} taskPage />
		</Container>
	);
}

export default TaskPage;
