import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import HouseholdDetail from "./HouseholdDetail";

function HouseholdPage() {
	const { slug } = useParams();
	const [household, setHousehold] = useState({ results: [] });

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

	return (
		<Container fluid className={appStyles.Content}>
			<HouseholdDetail
				{...household.results[0]}
				setHousehold={setHousehold}
				householdPage
			/>
		</Container>
	);
}

export default HouseholdPage;
