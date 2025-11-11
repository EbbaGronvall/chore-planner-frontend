import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Image from "react-bootstrap/Image";
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
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import taskStyles from "../../styles/Task.module.css";
import {
  useCurrentUserProfile,
  useSetCurrentUserProfile,
} from "../../contexts/CurrentUserProfileContext";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from "react-toastify";

function ProfileEditForm() {
  const [errors, setErrors] = useState({});
  const currentUserProfile = useCurrentUserProfile();
  const setCurrentUserProfile = useSetCurrentUserProfile();
  const imageFile = useRef();
  const [hasLoaded, setHasLoaded] = useState(false);

  const setCurrentUser = useSetCurrentUser();

  const [profileData, setProfileData] = useState({
    household_name: "",
    role: "",
    image: "",
    household_slug: "",
  });
  const [households, setHouseholds] = useState([]);
  const { household_name, role, image, household_slug } = profileData;
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: userProfile }, { data: householdsData }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get("/households/"),
          ]);

        const { household_name, role, image, household_slug } = userProfile;

        setProfileData({ household_name, role, image, household_slug });
        setHouseholds(householdsData.results);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [history, id, currentUserProfile]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("role", role);
    formData.append("household_slug", household_slug);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUserProfile((currentUserProfile) => ({
        ...currentUserProfile,
        profile_image: data.image,
        household_name: data.household_name,
        household_slug: data.household_slug,
      }));
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
        household_name: data.household_name,
        household_slug: data.household_slug,
      }));

      toast.success("Profile updated successfully!");

      history.push(`/profiles/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data?.error);
      }
    }
  };

  return hasLoaded ? (
    <>
      {currentUserProfile && parseInt(id) === currentUserProfile.id ? (
        <Card className={taskStyles.Card}>
          <h1>Edit</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <figure>
                <Image src={image} fluid />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="household_slug">
              <Form.Label className={styles.Label}>
                Household Name: {household_name}
              </Form.Label>
              <div>
                {households.length > 0 && (
                  <Form.Control
                    as="select"
                    value={household_slug}
                    name="household_slug"
                    onChange={handleChange}
                    className={styles.Input}
                  >
                    <option value="">Select an existing household</option>
                    {households.map((household) => (
                      <option key={household.slug} value={household.slug}>
                        {household.name}
                      </option>
                    ))}
                  </Form.Control>
                )}
                <Link to="/households/create">
                  <Button className={`${btnStyles.Button} ${btnStyles.Green}`}>
                    Create New Household
                  </Button>
                </Link>

                {household_slug && (
                  <Link to={`/households/${household_slug}/edit`}>
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Green}`}
                    >
                      Edit Household
                    </Button>
                  </Link>
                )}
              </div>
            </Form.Group>
            {errors?.household_name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="role">
              <Form.Label className={styles.Label}>
                Your role in the household
              </Form.Label>
              <Form.Control
                as="select"
                className={styles.Input}
                name="role"
                value={role}
                onChange={handleChange}
              >
                <option value="">Select Your Role</option>
                {[
                  { value: "Parent", label: "Parent" },
                  { value: "Child", label: "Child" },
                ].map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {errors?.role?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Green} ${btnStyles.Wide} mb-4`}
              type="submit"
            >
              Update Profile
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Card>
      ) : (
        <Container fluid className={`${appStyles.Content}  ${taskStyles.Text}`}>
          <h2>Sorry</h2>
          <h3>You can only edit your own profile</h3>
        </Container>
      )}
    </>
  ) : (
    <Container
      className={`${appStyles.Content} p-4 d-flex justify-content-center align-items-center`}
    >
      <Spinner className={appStyles.Spinner} animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default ProfileEditForm;
