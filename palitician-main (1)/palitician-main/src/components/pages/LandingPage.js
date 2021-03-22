import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import {
  Typography,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { CustomFooter } from '../globalComponents';
import FLAG from '../../images/FLAG.jpg';

const useStyles = makeStyles({
  firstContainer: {
    padding: '0.5rem',
    borderBottom: '2px solid rgba(181, 14, 120, 0.5) '
  },
  welcomeContainer: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  aboutContainer: {
    maxWidth: '75rem',
    marginTop: '1.5rem'
  },
  titleText: {
    fontWeight: '500'
  },
  subText: {
    fontWeight: '400'
  },
  flagImage: {
    height: '20rem',
    width: '30rem'
  },
  discoverButton: {
    color: '#B50E78',
    border: '2px solid rgba(181, 14, 120, 0.50)',
    '&:hover': {
      color: 'white',
      backgroundColor: '#700a4b'
    }
  }
})

export default function LandingPage() {
  const { path, url } = useRouteMatch();
  const { currentUser, logout } = useAuth();
  const [errors, setErrors] = useState('');
  // console.log(`currentUser ${ currentUser.uid !== undefined ? 'true' : 'false'}`)
  const { history } = useHistory();
  const classes = useStyles();
  const handleLogout = async(e) => {
    setErrors('');
    try {
      await logout();
      history.push('/')
    } catch{
      setErrors("Failed to log out")
    }
  }
  return (
    <Fragment>
      <Grid item container className={classes.firstContainer}>
        <Grid item container justify='center' sm={6}>
            <Grid item container alignItems='center' direction='column' className={classes.welcomeContainer}>
              <Typography gutterBottom variant='h4'>Welcome to</Typography>
              <Typography gutterBottom variant='h2' className={classes.titleText}>
                <LocalLibraryOutlinedIcon fontSize='large' />
                Palitician
                <LocalLibraryOutlinedIcon fontSize='large' />
              </Typography>
              <Typography variant='h6' className={classes.subText}>Know Your Candidates!</Typography>
            </Grid>
          </Grid>
          <Grid item container sm={6}>
            <img className={classes.flagImage} alt='Philippine Flag' src={FLAG} />
          </Grid>
      </Grid>
      <Grid item container justify='center'>
        <Grid item container direction='column' alignItems='center' className={classes.aboutContainer}>
          <Typography align='center' gutterBottom variant='h4'>
            The Palitician website aims to provide every Filipino voter
            comprehensive, truthful, and reliable information about the politicians
            running for national government positions.
          </Typography>
          <Typography gutterBottom variant='h6' align='center' className={classes.subText}>
            The site will gather information from reliable sources, such as news channels and first hand resources,
            and consolidate them in a single, readable, and convenient manner.
          </Typography>
          <Link to='/discover' style={{textDecoration: 'none'}}>
          <Button variant='outlined' size='large' className={classes.discoverButton} >
            Discover Candidates
            <NavigateNextOutlinedIcon />
          </Button>
          </Link>
          
        </Grid>
      </Grid>
      <CustomFooter isLanding />
    </Fragment>
  );
}