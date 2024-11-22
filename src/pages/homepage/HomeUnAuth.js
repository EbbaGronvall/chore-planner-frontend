import React from 'react'
import taskStyles from '../../styles/Task.module.css'
import { Row, Col, Card } from 'react-bootstrap'
import appStyles from '../../App.module.css'
import styles from '../../styles/Home.module.css'

const HomeUnAuth = () => {
  return (
    <>
    <Row>
        <Col ><h1 className={`${taskStyles.Text} ${appStyles.Content}`}>Welcome to Chore Planner</h1></Col>
    </Row>
    <Row>
    <Col>
            <Card className={`${styles.Blue} mb-4`}>
                <Card.Body>
                    <Card.Title>
                        Our Concept
                    </Card.Title>
                    <Card.Text>
                        We are here to help you plan your everyday life.
                        Guests coming over next weekend? Easily deligate the chores to your familymembers with our tools.
                        It is also super easy to keep track of both your and the rest of the households chores with our noticeboard where all the chores are gathered in one place!
                    </Card.Text>
                </Card.Body>
            </Card>
            
            </Col>
            <Col>
            <Card className={`${styles.Green} mb-4`}>
                <Card.Body>
                    <Card.Title>
                        Why did I create Chore Planner?
                    </Card.Title>
                    <Card.Text>
                        Growing up I often got into trouble for forgetting to do what my parents told me. Now that I am all grown up I wanted to help other kids to remember what chores where assigned to them!
                    </Card.Text>
                </Card.Body>
            </Card></Col>
    </Row>
    </>
  )
}

export default HomeUnAuth