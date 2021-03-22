import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { db } from "./firebase.config";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
//Router
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { CustomAppBar, CustomFooter } from './components/globalComponents';
import LandingPage from './components/pages/LandingPage';
import Discover from './components/pages/Discover';
import Candidates from './components/pages/Candidates';
import CandidateProfile from './components/pages/CandidateProfile';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  body: {
    margin: '0px',
    padding: '0px',
    overflowX: 'hidden'
  },
});



function App() {
  const classes = useStyles();
  const fetchData = async() => {
    const response = await db.collection("candidates").get();
    // console.log("Response: ", response);
    // response.docs.forEach((doc) => console.log(`fetchData: `, doc.data().education));
    //save this in a state
  };
  const userId = "4nVxvpgHVzSbhgHZZ8bT";
  const fetchEducation = async() => {
    const response = await db.collection(`candidates/${userId}/education`).get();
    response.docs.forEach((item) => console.log("fetchEduc: ", item.data()))
  };

  useEffect(() => {
    fetchData();
    // fetchEducation();
  });
  // const { currentUser } = useAuth();
  return (
    <Fragment>
      <AuthProvider>
        <Router>
          <Grid container className={classes.body} direction='column'>
            <Grid item>
              {/* BUG: something makes this wider than the viewport, creating an x-scroll, temp fix was with overflowX:hidden */}
              <CustomAppBar />
            </Grid>
            <Switch>
              <Grid item container >
                <Route exact path='/'>
                  <LandingPage />
                </Route>
                <Route exact path='/login' >
                  <Login /> 
                </Route>
                <PrivateRoute exact path='/dashboard' >
                  <Dashboard />
                </PrivateRoute>
                <Route exact path='/discover'>
                  <Discover />
                </Route>
                <Route exact path='/discover/:cat'>
                  <Candidates />
                </Route>
                <Route exact path='/discover/:cat/:candidate/:id'>
                  <CandidateProfile />
                </Route>
              </Grid>
            </Switch>
            
          </Grid>
        </Router>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
