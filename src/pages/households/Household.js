import React from "react";
import styles from "../../styles/Task.module.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";

const Household = (props) => {
	const { name, slug } = props;
	

	return (
		<Card className={styles.Card}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>

				<Card.Text></Card.Text>

				<div className="d-flex align-items-center">
					
						<Link to={`/households/${slug}/`}>
							<Button className={`${btnStyles.Button}  ${btnStyles.Pink}`}>
								See Details
							</Button>
						</Link>
					
				</div> 
			</Card.Body>
		</Card>
	);
};

export default Household;
