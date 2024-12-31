import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
	useCurrentUser,
	useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { useCurrentUserProfile } from "../contexts/CurrentUserProfileContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/UseClickOutsideToggle";
import { toast } from "react-toastify";

const NavBar = () => {
	const currentUser = useCurrentUser();
	const setCurrentUser = useSetCurrentUser();
	const currentUserProfile = useCurrentUserProfile();

	const { expanded, setExpanded, ref } = useClickOutsideToggle();

	const handleSignOut = async () => {
		try {
			await axios.post("dj-rest-auth/logout/");
			setCurrentUser(null);
			toast.success("You've logged out");
		} catch (err) {
			//console.log(err);
		}
	};
	const loggedInIcons = (
		<>
			<NavLink
				className={styles.NavLink}
				activeClassName={styles.Active}
				to="/chores"
			>
				Noticeboard <i class="fa-solid fa-check"></i>
			</NavLink>
			<NavLink
				className={styles.NavLink}
				activeClassName={styles.Active}
				to={`/households/${currentUserProfile?.household_slug}`}
			>
				My Home <i class="fa-solid fa-house"></i>
			</NavLink>

			<NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
				Log Out <i class="fa-solid fa-arrow-right-from-bracket"></i>
			</NavLink>
			<NavLink
				className={styles.NavLink}
				to={`/profiles/${currentUser?.profile_id}`}
			>
				<Avatar src={currentUser?.profile_image} text="Your Page" height={35} />
			</NavLink>
		</>
	);
	const loggedOutIcons = (
		<>
			<NavLink
				className={styles.NavLink}
				activeClassName={styles.Active}
				to="/signin"
			>
				Log in <i class="fa-solid fa-arrow-right-to-bracket"></i>
			</NavLink>
			<NavLink
				className={styles.NavLink}
				activeClassName={styles.Active}
				to="/signup"
			>
				Join <i class="fa-solid fa-user-plus"></i>
			</NavLink>
		</>
	);

	return (
		<Navbar
			expanded={expanded}
			className={styles.NavBar}
			expand="md"
			fixed="top"
		>
			<Container fluid>
				<NavLink exact to="/">
					<Navbar.Brand className={styles.Brand}>ChorePlanner</Navbar.Brand>
				</NavLink>
				<Navbar.Toggle
					ref={ref}
					onClick={() => setExpanded(!expanded)}
					aria-controls="basic-navbar-nav"
				/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto text-left">
						{currentUser ? loggedInIcons : loggedOutIcons}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
