import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import HouseholdDetail from "./HouseholdDetail";
import taskStyles from "../../styles/Task.module.css";
import taskPageStyles from "../../styles/TasksPage.module.css";

function HouseholdPage() {
	const { slug } = useParams();
	const [household, setHousehold] = useState({ results: [] });
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		const handleMount = async () => {
			try {
				const [{ data: household }] = await Promise.all([
					axiosReq.get(`/households/${slug}`),
				]);
				setHousehold({ results: [household] });
				setHasLoaded(true);
			} catch (err) {
				console.log(err);
			}
		};
		setHasLoaded(false);
		const timer = setTimeout(() => {
			handleMount();
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [slug]);

	return hasLoaded ? (
		<Container fluid className={appStyles.Content}>
			<HouseholdDetail
				{...household.results[0]}
				setHousehold={setHousehold}
				householdPage
			/>
		</Container>
	) : (
		<Container
			fluid
			className={`${appStyles.Content}  ${taskStyles.Text} ${taskPageStyles.Spinner}`}
		>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</Container>
	);
}

export default HouseholdPage;
