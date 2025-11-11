
import styles from "../../styles/HomePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import hoover from "../../assets/hoover.jpg";
import laundry from "../../assets/laundry.jpg";
import sweep from "../../assets/sweep.jpg";

function HomePage() {

	return (
		<>
      <Row className={`${styles.Row}`}>
        <Col className={styles.ImageCol} md={3} sm={12}>
          <Image
            src={hoover}
            alt="Hoover"
            fluid
            className={`${styles.Image} d-none d-md-block`}
          />
        </Col>
        <Col md={6} sm={12} className={styles.HeadingCol}>
          <h1>
            Welcome to <strong>ChorePlanner</strong>
          </h1>
          <p className={styles.Subheading}>
            Make household chores simple, fair, and organized. Plan tasks,
            assign them to your household members, and keep everyone in sync
            with your shared noticeboard.
          </p>
        </Col>
        <Col className={styles.ImageCol} md={3} sm={12}>
          <Image src={laundry} alt="Laundry" fluid className={styles.Image} />
        </Col>
      </Row>
      <br></br>
      <Row className={styles.Row}>
        <Col className={styles.HeadingCol} lg={4} md={8} sm={12}>
          <h2>We are here to help</h2>
          <p>
            With our tools, your household can effortlessly stay organized and
            on top of daily life. Plan your days together, delegate tasks, set
            deadlines, and keep track of everything that matters. Your household
            noticeboard becomes the central hub for communication, reminders,
            and collaboration, helping everyone stay connected and on schedule.
          </p>
        </Col>
        <Col className={styles.HeadingCol} lg={4} md={4} sm={12}>
          <Image
            src={sweep}
            alt="Sweeping"
            fluid
            className={styles.ImageRound}
          />
        </Col>
        <Col className={styles.HeadingCol} lg={4} md={12} sm={12}>
          <h2>Get started</h2>
          <p>
            If you are new here you need to create an account before you can
            start planning your life.
          </p>
          <Button
            href="/signup"
            className={`${btnStyles.Button}  ${btnStyles.Green} ${btnStyles.Wide}`}
          >
            Sign Up
          </Button>
        </Col>
      </Row>
    </>
	);
}

export default HomePage;
