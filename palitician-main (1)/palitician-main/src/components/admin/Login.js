import React, { Fragment, useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { Link, useHistory, Redirect } from 'react-router-dom'

import { CustomLogin } from '../globalComponents';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles({
  backgroundBox: {
    height: '50vh',
    width: '100vw',
    backgroundColor: 'black',
    zIndex: '-1'
  },
  checking: {
    color: 'white'
  },
  loginContainer: {
    // zIndex: '1'
  }
})

export default function Login() {
  const [error, setError] = useState("");
  const { login, currentUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const classes = useStyles();
  const history = useHistory();
  // console.log("passref ", emailRef.current.value);
  console.log("Error ", error)
  const handle = async(e) => {
    e.preventDefault();
    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard")
    } catch {
      setError("Failed to log in");
    }
  }
  return (
    <Fragment>
      {currentUser && (
        <Redirect to='/dashboard' /> 
      )}
      <Grid item container justify="center" className={classes.loginContainer} >
          {/* <Typography className={classes.checking}>Hello</Typography> */}
          <CustomLogin emailRef={emailRef} passwordRef={passwordRef} submit={handle} />
      </Grid>
    </Fragment>
  );
}