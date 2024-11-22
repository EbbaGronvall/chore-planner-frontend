import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from '../../App.module.css'
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import ProfileDetail from "./ProfileDetail";

function ProfilePage() {
	const { id } = useParams();
	const [profile, setProfile] = useState({ results: [] });

	useEffect(() => {
		const handleMount = async () => {
			try {
				const [{ data: profile }] = await Promise.all([
					axiosReq.get(`/profiles/${id}`),
				]);
				setProfile({ results: [profile] });
				console.log(profile);
			} catch (err) {
				console.log(err);
			}
		};
		handleMount();
	}, [id]);

	

	return (
		<Container fluid className={appStyles.Content}>
			
			<ProfileDetail {...profile.results[0]} setProfile={setProfile} profilePage />
			
		</Container>
	);
}

export default ProfilePage;
