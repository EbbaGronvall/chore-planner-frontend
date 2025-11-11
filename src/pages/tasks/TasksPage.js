import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import formStyles from "../../styles/Forms.module.css";
import taskStyles from "../../styles/Task.module.css";
import appStyles from "../../App.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Task from "./Task";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";

function TasksPage({ filter = "" }) {
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const currentUserProfile = useCurrentUserProfile();
  const no_slug = !currentUserProfile?.household_slug;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let url = `/tasks/?${filter}search=${query}`;
        if (selectedFilter) {
          url += `&status=${selectedFilter}`;
        }
        if (selectedOrder) {
          url += `&ordering=${selectedOrder}`;
        }
        const { data } = await axiosReq.get(url);
        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, selectedFilter, selectedOrder, pathname]);

  return (
    <Row className="mb-3">
      {!no_slug ? (
        <Form
          className={`w-100 ${formStyles.SearchBar} ${formStyles.Form}`}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Row className="w-100">
            <Form.Group as={Col} xs={12} sm={12} md={7} className="mb-3">
              <i className={`fas fa-search ${formStyles.SearchIcon}`} />
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="Search Name or Task"
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} sm={8} md={3} className="mb-3">
              <Form.Control
                as="select"
                className={`${formStyles.Input} ${formStyles.FormControl}`}
                value={selectedFilter}
                onChange={(event) => setSelectedFilter(event.target.value)}
              >
                <option value="">All tasks</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={12} sm={4} md={2} className="mb-3">
              <Form.Control
                as="select"
                className={formStyles.Input}
                value={selectedOrder}
                onChange={(event) => setSelectedOrder(event.target.value)}
              >
                <option value="">Sort By</option>
                <option value="title">Title</option>
                <option value="due_date">Due Date</option>
                <option value="status">Status</option>
                <option value="assigned_to__member__username">Assignee</option>
              </Form.Control>
            </Form.Group>
            {currentUserProfile?.role === "Parent" && (
              <Form.Group as={Col} xs={12} sm={12} md={12} className="mb-3">
                <Link to={`/chores/create`}>
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Green} ${btnStyles.Wide}`}
                  >
                    Add a new Chore
                  </Button>
                </Link>
              </Form.Group>
            )}
          </Form.Row>
        </Form>
      ) : (
        <></>
      )}
      {hasLoaded ? (
        <Row>
          {tasks.results.length && !no_slug ? (
            <InfiniteScroll
              className="d-flex flex-wrap"
              children={tasks.results.map((task) => (
                <Col
                  key={task.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={`${taskStyles.Task} mb-4`}
                >
                  <Task {...task} setTasks={setTasks} />
                </Col>
              ))}
              dataLength={tasks.results.length}
              loader={
                <Container
                  className={`${appStyles.Content} p-4 d-flex justify-content-center align-items-center`}
                >
                  <Spinner
                    className={appStyles.Spinner}
                    animation="border"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </Container>
              }
              hasMore={!!tasks.next}
              next={() => fetchMoreData(tasks, setTasks)}
            />
          ) : (
            <>
              {" "}
              {!no_slug ? (
                <Container
                  fluid
                  className={`${appStyles.Content}  ${taskStyles.Text}`}
                >
                  <h1>Looks like there is nothing to do!</h1>
                </Container>
              ) : (
                <div className={`${appStyles.Content} ${taskStyles.Text}`}>
                  <h2>Sorry</h2>
                  <h3>
                    You need to be part of a household to be able to plan
                    chores!
                  </h3>
                  <Link to={`/profiles/${currentUserProfile?.id}/edit`}>
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Green} ${btnStyles.Wide}`}
                    >
                      Update your profile
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </Row>
      ) : (
        <Container
          className={`${appStyles.Content} p-4 d-flex justify-content-center align-items-center`}
        >
          <Spinner
            className={appStyles.Spinner}
            animation="border"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </Row>
  );
}

export default TasksPage;
