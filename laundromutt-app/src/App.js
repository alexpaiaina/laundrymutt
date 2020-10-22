import React, { useEffect } from 'react';
import './App.css';
import { getAllClients } from './services/clients';
import Login from './screens/login/Login';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';

import { loginUser, registerUser, removeToken, verifyUser } from './services/auth';

import { Route, useHistory, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData)
    }
    handleVerify();
  }, [])

  const handleLogin = async (loginData) => {
    const userData = await loginUser(loginData);
    setCurrentUser(userData);
    history.push('/')
  }

  const handleRegister = async (registerData) => {
    const userData = await registerUser(registerData);
    setCurrentUser(userData);
    history.push('/')
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
  }

  return (
    <Layout
      currentUser={currentUser}
      handleLogout={handleLogout}
    >
      <Switch>
        <Route path='/login'>
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path='/register'>
          <Register handleRegister={handleRegister} />
        </Route>
        <Route path='/'>
          <MainContainer />
        </Route>
      </Switch>

    </Layout>
  );
}

export default App;
