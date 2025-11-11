import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import HouseholdDetail from "./HouseholdDetail";
import taskStyles from "../../styles/Task.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function HouseholdPage() {
  const { slug } = useParams();
  const [household, setHousehold] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: household }] = await Promise.all([
          axiosReq.get(`/households/${slug}`),
        ]);
        setHousehold({ results: [household] });
        setHasLoaded(true);
      } catch (err) {
        toast.error("You have to add a household to your profile first!");
        history.push(`/profiles/${currentUser.profile_id}/edit`);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [slug, history, currentUser]);

  return hasLoaded ? (
    <>
      <HouseholdDetail
        {...household.results[0]}
        setHousehold={setHousehold}
        householdPage
      />
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

export default HouseholdPage;
