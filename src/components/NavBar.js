import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
	const currentUser = useCurrentUser();
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
		<Navbar className={styles.NavBar} expand="md" fixed="top">
			<Container>
				<NavLink exact to="/">
					<Navbar.Brand className={styles.Brand}>ChorePlanner</Navbar.Brand>
				</NavLink>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
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