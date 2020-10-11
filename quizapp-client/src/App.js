//css
import './App.css';

//react
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//jwt-decode
import jwtDecode from 'jwt-decode';

//redux
import {Provider} from 'react-redux';
import store from './redux/store';

//material-ui
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//components
import Navbar from './components/Navbar';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import AuthRoute from './util/AuthRoute';

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

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    authenticated = false;
      window.location.href = '/login'
      
  } else {
    authenticated = true;
  }
}

// let authenticated;
// const token = localStorage.FBIdToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     authenticated = false;
//     window.location.href = '/login';
//   } else {
    
//     authenticated = true;
//   }
// }

function App () {
  //connect routes to components
  //set up theme provider and the navbar
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store = {store}>
      <div className="App">
      <Router>
      <Navbar/>
       
        <div className="container">
        
        <Switch>
          <Route exact path="/" component={home}/>
          <AuthRoute exact path="/login" component={login} authenticated ={authenticated}/>
          <AuthRoute exact path="/signup" component={signup} authenticated ={authenticated}/>
        </Switch>
        </div>
        
      </Router>
    </div>
      </Provider>
    
    </MuiThemeProvider>
  );
}

export default App;
