import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Card } from "react-bootstrap";

import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefault";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import taskStyles from "../../styles/Task.module.css";
import { useCurrentUserProfile } from "../../contexts/CurrentUserProfileContext";
import { toast } from "react-toastify";

function TaskCreateForm() {
  const [errors, setErrors] = useState({});
  const currentUserProfile = useCurrentUserProfile();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: null,
    assigned_to: "",
  });

  const { title, description, due_date, assigned_to } = taskData;

  const history = useHistory();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");

        setProfiles(data.results);
      } catch (err) {
        //console.error(err);
      }
    };

    fetchProfiles();
  }, []);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (selectedDate) => {
    setTaskData((prevState) => ({
      ...prevState,
      due_date: selectedDate,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    const formattedDate = due_date ? format(due_date, "yyyy-MM-dd") : null;

    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", formattedDate);
    formData.append("assigned_to", assigned_to);

    try {
      const { data } = await axiosReq.post("/tasks/", formData);
      toast.success("Chore added successfully!");
      history.push(`/chores/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data?.error || {});
        if (err.response?.data?.details?.due_date) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            details: {
              ...prevErrors.details,
              due_date: err.response?.data?.details?.due_date,
            },
          }));
        }
      }
    }
  };
  const filteredProfiles = currentUserProfile
    ? profiles.filter(
        (profile) => profile.household === currentUserProfile.household
      )
    : [];

  if (!currentUserProfile) {
    return (
      <Container
        className={`${appStyles.Content} p-4 d-flex justify-content-center align-items-center`}
      >
        <Spinner className={appStyles.Spinner} animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (currentUserProfile?.role !== "Parent") {
    return (
      <Container fluid className={`${appStyles.Content} ${taskStyles.Text}`}>
        <h1>Sorry! Only a parent can create a task!</h1>
      </Container>
    );
  }
  return (
    <Card className={taskStyles.Card}>
      <h1>Plan a Chore</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label className={styles.Label}>Chore Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="What needs to be done?"
            className={styles.Input}
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Group controlId="description">
          <Form.Label className={styles.Label}>Chore Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Explain what needs to be done"
            className={styles.Input}
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.description?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Group controlId="due_date">
          <Form.Label className={styles.Label}>
            When do you need it done?
          </Form.Label>
          <div>
            <DatePicker
              showIcon
              icon="fa fa-calendar"
              dateFormat="dd/MM/yyyy"
              selected={due_date}
              onChange={handleDateChange}
              className={styles.Input}
            />
          </div>
        </Form.Group>
        {errors?.details?.due_date && errors.details.due_date.length > 0 && (
          <Alert variant="warning">{errors.details.due_date[0]}</Alert>
        )}
        {errors?.due_date && errors.due_date.length > 0 && (
          <Alert variant="warning">{errors.due_date[0]}</Alert>
        )}
        <Form.Group controlId="assigned_to">
          <Form.Label className={styles.Label}>Who is gonna do it?</Form.Label>

          <Form.Control
            as="select"
            className={styles.Input}
            name="assigned_to"
            value={assigned_to}
            onChange={handleChange}
          >
            <option value="">Select a household member</option>
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.member}
                </option>
              ))
            ) : (
              <option disabled>No members in your household</option>
            )}
          </Form.Control>
        </Form.Group>
        {errors?.assigned_to?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Button
          className={`${btnStyles.Button} ${btnStyles.Green} ${btnStyles.Wide}`}
          type="submit"
        >
          Set Chore
        </Button>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert variant="warning" key={idx} className="mt-3">
            {message}
          </Alert>
        ))}
      </Form>
    </Card>
  );
}

export default TaskCreateForm;
