import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from '../../App.module.css'
import styles from "../../styles/Task.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import HouseholdDetail from "./HouseholdDetail";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";

function HouseholdPage() {
	const { slug } = useParams();
	const [household, setHousehold] = useState({ results: [] });
	const currentUserProfile = useCurrentUserProfile()

	useEffect(() => {
		const handleMount = async () => {
			try {
				const [{ data: household }] = await Promise.all([
					axiosReq.get(`/households/${slug}`),
				]);
				setHousehold({ results: [household] });
				console.log(household);
			} catch (err) {
				console.log(err);
			}
		};
		handleMount();
	}, [slug]);

	const householdData = household.results[0];
	const isAuthorized = 
		currentUserProfile?.household && 
		householdData?.name &&
		currentUserProfile.household === householdData.name

	return (
		<Container fluid className={styles.Task}>
			{isAuthorized ? (
			<HouseholdDetail {...household.results[0]} setHousehold={setHousehold} householdPage />
			) : ( <Container className={`${appStyles.Content}  ${styles.Text}`}>
				<h1>
					Sorry, only members of the household can see its details!
				</h1>
			</Container>)}
		</Container>
	);
}

export default HouseholdPage;
