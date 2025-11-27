import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TasksPage from "./pages/tasks/TasksPage";
import TaskPage from "./pages/tasks/TaskPage";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import TaskEditForm from "./pages/tasks/TaskEditForm";
import HouseholdCreateForm from "./pages/households/HouseholdCreateForm";
import HouseholdPage from "./pages/households/HouseholdPage";
import HouseholdEditForm from "./pages/households/HouseholdEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import HomePage from "./pages/homepage/HomePage";
import NotFound from "./components/NotFound";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Container fluid className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          {/* Routes to the chorepages */}
          <Route
            exact
            path="/chores"
            render={() => (
              <TasksPage message="No results found. Adjust your search" />
            )}
          />
          {/*<Route
            exact
            path="/chores/create"
            render={() => <TaskCreateForm />}
          />
          <Route
            exact
            path="/chores/:id/edit"
            render={() => <TaskEditForm />}
          />
          <Route exact path="/chores/:id" render={() => <TaskPage />} />*/}
          {/* Routes to the householdpages */}
          {/*<Route
            exact
            path="/households/create"
            render={() => <HouseholdCreateForm />}
          />
          <Route
            exact
            path="/households/:slug/edit"
            render={() => <HouseholdEditForm />}
          />*/}
          <Route
            exact
            path="/households/:slug"
            render={() => <HouseholdPage />}
          />
          {/* Routes to the profilepages */}
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          {/*<Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />*/}
          {/* Routes to signin and signup*/}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* Error pages */}
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
