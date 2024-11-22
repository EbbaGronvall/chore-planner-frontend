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

function App() {
	return (
		<div className={styles.App}>
			<NavBar />
			<Container fluid className={styles.Main}>
				<Switch>
					<Route exact path="/" render={() => <h1>Home Page</h1>} />
	{/* Routes to the Noticeboard and taskpages */}
					<Route
						exact
						path="/tasks"
						render={() => (
							<TasksPage message="No results found. Adjust your search" />
						)}
					/>
					<Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
					<Route exact path="/tasks/:id/edit" render={() => <TaskEditForm />} />
					<Route exact path="/tasks/:id" render={() => <TaskPage />} />
	{/* Routes to the householdpages */}
					<Route
						exact
						path="/households/create"
						render={() => <HouseholdCreateForm />}
					/>
					<Route
						exact
						path="/households/:slug/edit"
						render={() => <HouseholdEditForm />}
					/>
					<Route
						exact
						path="/households/:slug"
						render={() => <HouseholdPage />}
					/>
{/* Routes to the profilepages */}
					<Route
						exact
						path="/profiles/:id"
						render={() => <ProfilePage />}
					/>

	{/* Routes to signin and signup*/}
					<Route exact path="/signin" render={() => <SignInForm />} />
					<Route exact path="/signup" render={() => <SignUpForm />} />
			{/* Error pages */}
					<Route render={() => <h1>Page not found!</h1>} />
				</Switch>
			</Container>
		</div>
	);
}

export default App;
