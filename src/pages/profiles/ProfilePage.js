import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import ProfileDetail from "./ProfileDetail";
import HouseholdDetail from "../households/HouseholdDetail";
import ProfileEditModal from "./ProfileEditModal";
import HouseholdEditModal from "../households/HouseholdEditModal";

function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showHouseholdEditModal, setShowHouseholdEditModal] = useState(false);

  const handleOpenProfileEdit = () => setShowProfileEditModal(true);
  const handleCloseProfileEdit = () => setShowProfileEditModal(false);
  const handleOpenHouseholdEdit = () => setShowHouseholdEditModal(true);
  const handleCloseHouseholdEdit = () => setShowHouseholdEditModal(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: profile } = await axiosReq.get(`/profiles/${id}/`);
        setProfile({ results: [profile] });
        if (profile.household) {
          const { data: household } = await axiosReq.get(
            `/households/${profile.household}/`
          );
          setShowHouseholdEditModal({ results: [household] });
        } else {
        console.log("no household");
      }
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  return hasLoaded ? (
    <>
      <ProfileDetail
        {...profile.results[0]}
        setProfile={setProfile}
        profilePage
        onEditClick={handleOpenProfileEdit}
      />
      <br></br>
      <HouseholdDetail onEditClick={handleOpenHouseholdEdit} />
      <ProfileEditModal
        show={showProfileEditModal}
        handleClose={handleCloseProfileEdit}
      />
      <HouseholdEditModal
        show={showHouseholdEditModal}
        handleClose={handleCloseHouseholdEdit}
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

export default ProfilePage;
