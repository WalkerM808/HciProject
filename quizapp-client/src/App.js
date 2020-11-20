//css
import './App.css';

//react
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//jwt-decode
import jwtDecode from 'jwt-decode';

//redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions'; 

//material-ui
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//components
import Navbar from './components/Navbar';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import takeQuiz from './pages/takeQuiz';
import AuthRoute from './util/AuthRoute';
import myQuizzes from './pages/myQuizzes';
import createQuiz from './pages/createQuiz';

//axios
import axios from 'axios';

//create a material-ui theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#424242',
      main: '#424242',
      dark: '#424242',
      contrastText: '#fff'
    },
    secondary: {
      light: '#78909c',
      main: '#78909c',
      dark: '#78909c',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

axios.defaults.baseURL = 'https://us-central1-quiz-db-808.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
      window.location.href = '/login'
      
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}



class App extends Component {
  render() {
    return (
          <MuiThemeProvider theme={theme}>
            <Provider store = {store}>
            <div className="App">
            <Router>
            <Navbar/>
             
              <div className="container">
              
              <Switch>
                <Route exact path="/" component={home}/>
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/takeQuiz/:Id" component={takeQuiz} />
                <Route exact path="/users" component={myQuizzes} />
                <Route exact path="/create" component={createQuiz} />
              </Switch>
              </div>
              
            </Router>
          </div>
            </Provider>
          
          </MuiThemeProvider>
        );
  }
}

export default App;
