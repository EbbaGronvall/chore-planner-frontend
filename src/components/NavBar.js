import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
	return (
		<Navbar className={styles.NavBar} expand="md" fixed="top">
			<Container>
				<Navbar.Brand className={styles.Brand}>ChorePlanner</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto text-left">
						<Nav.Link>Noticeboard <i class="fa-solid fa-check"></i></Nav.Link>
						<Nav.Link>Your Home <i class="fa-solid fa-house"></i></Nav.Link>
						<Nav.Link>Log in <i class="fa-solid fa-arrow-right-to-bracket"></i></Nav.Link>
						<Nav.Link>Join <i class="fa-solid fa-user-plus"></i></Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
