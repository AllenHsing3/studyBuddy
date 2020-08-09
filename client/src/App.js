import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import EditCategory from './components/dashboard/editCategory/EditCategory';
import Study from './components/dashboard/study/Study';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path='/editDeck/:_id' component={EditCategory} />
            <Route exact path='/study/:_id' component={Study} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
