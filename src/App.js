import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TaskPage from "./pages/tasks/TaskPage";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import HouseholdCreateForm from "./pages/households/HouseholdCreateForm";


function App() {
	return (
		<div className={styles.App}>
			<NavBar />
			<Container className={styles.Main}>
				<Switch>
					<Route exact path="/" render={() => <h1>Home Page</h1>} />
					{/* Routes to the Noticeboard and tasks */}
					<Route
						exact
						path="/"
						render={() => <Noticeboard />}
					/>
					<Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
					<Route exact path="/tasks/:id" render={() => <TaskPage />} />
					{/* Routes to the household */}
					<Route exact path="/households/create" render={() => <HouseholdCreateForm />} />

					{/* Routes to signin and signup*/}
					<Route exact path="/signin" render={() => <SignInForm />} />
					<Route exact path="/signup" render={() => <SignUpForm />} />
					<Route render={() => <h1>Page not found!</h1>} />
				</Switch>
			</Container>
		</div>
	);
}

export default App;
