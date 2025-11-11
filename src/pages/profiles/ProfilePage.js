import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import ProfileDetail from "./ProfileDetail";
import taskStyles from "../../styles/Task.module.css";

function ProfilePage() {
	const { id } = useParams();
	const [profile, setProfile] = useState({ results: [] });
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		const handleMount = async () => {
			try {
				const [{ data: profile }] = await Promise.all([
					axiosReq.get(`/profiles/${id}`),
				]);
				setProfile({ results: [profile] });
				setHasLoaded(true);
			} catch (err) {
				//console.log(err);
			}
		};
		setHasLoaded(false);
		const timer = setTimeout(() => {
			handleMount();
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [id]);

	return hasLoaded ? (
		<>
			<ProfileDetail
				{...profile.results[0]}
				setProfile={setProfile}
				profilePage
			/>
		</>
	) : (
		<Container
			className={`${appStyles.Content}  ${taskStyles.Text} ${appStyles.Spinner}`}
		>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</Container>
	);
}

export default ProfilePage;
