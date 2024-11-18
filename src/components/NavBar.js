import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<Navbar className={styles.NavBar} expand="md" fixed="top">
			<Container>
				<NavLink exact to="/">
					<Navbar.Brand className={styles.Brand}>ChorePlanner</Navbar.Brand>
				</NavLink>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto text-left">
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
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
