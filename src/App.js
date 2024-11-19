import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route,Switch } from 'react-router-dom';
import './api/axiosDefault'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={()=> <h1>Home Page</h1>} />
          <Route exact path='/noticeboard' render={()=> <h1>Noticeboard</h1>} />
          <Route exact path='/households' render={()=> <h1>Your Home</h1>} />
          <Route exact path='/signin' render={()=> <SignInForm />} />
          <Route exact path='/signup' render={()=> <SignUpForm />} />
          <Route render={()=> <h1>Page not found!</h1>} />
        </Switch>
        
      </Container>
    </div>
  );
}

export default App;
