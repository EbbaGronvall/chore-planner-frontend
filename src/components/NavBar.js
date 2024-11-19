import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
	useCurrentUser,
	useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import UseClickOutsideToggle from "../hooks/UseClickOutsideToggle";

const NavBar = () => {
	const currentUser = useCurrentUser();
	const setCurrentUser = useSetCurrentUser();

	const {expanded, setExpanded, ref } = UseClickOutsideToggle()

	const handleSignOut = async () => {
		try {
			await axios.post("dj-rest-auth/logout/");
			setCurrentUser(null);
		} catch (err) {
			console.log(err);
		}
	};
	const loggedInIcons = (
		<>
			<NavLink
				className={styles.NavLink}
				activeClassName={styles.Active}
				to="/noticeboard"
			>
				Noticeboard <i class="fa-solid fa-check"></i>
			</NavLink>
			<NavLink
				className={styles.NavLink}
				activeClassName={styles.Active}
				to="/households"
			>
				Your Home <i class="fa-solid fa-house"></i>
			</NavLink>

			<NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
				Log Out <i class="fa-solid fa-arrow-right-from-bracket"></i>
			</NavLink>
			<NavLink
				className={styles.NavLink}
				to={`/profiles/${currentUser?.profile_id}`}
			>
				<Avatar src={currentUser?.profile_image} text="Your Page" height={40} />
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
			<Container>
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
