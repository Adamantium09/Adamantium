import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  Typography
} from '@material-ui/core';

import { Link, useRouteMatch, Switch, Route, useParams } from 'react-router-dom';

import Candidates from './Candidates';
import { CustomDiscoverCards } from '../globalComponents';
//images
import Seal_of_the_President from '../../images/Seal_of_the_President.png';
import Seal_of_the_Senate from '../../images/Seal_of_the_Senate.png';
import Seal_of_the_House from '../../images/Seal_of_the_House.png';

const useStyles = makeStyles({
  mainContainer: {
    padding: '5rem 1rem 1rem 1rem'
  },
  titleContainer: {
    borderBottom: '3px solid black',
    marginBottom: '2.5rem'
  },
  titleText: {

  }
})

export default function Discover(props) {
  let { url } = useRouteMatch();
  // console.log(useRouteMatch());
  // const { topic } = useParams();
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item container direction='column' className={classes.mainContainer}>
        <Grid item>
          <Typography className={{}} variant='h4' gutterBottom align='center'>Please Select the Category</Typography>
        </Grid>
        <Grid item container direction='row' justify='space-evenly'>
          <CustomDiscoverCards 
            name='president' 
            alt='Presidential' 
            imgSrc={Seal_of_the_President} 
            title='Presidential Candidates' 
            component={Link} 
            to={`${url}/presidential`}
          /> 
          <CustomDiscoverCards 
            name='senator' 
            alt='Senatorial' 
            imgSrc={Seal_of_the_Senate} 
            title='Senatorial Candidates' 
            component={Link}
            to={`${url}/senatorial`}
          />
          <CustomDiscoverCards 
            name='representative' 
            alt='Representative' 
            imgSrc={Seal_of_the_House} 
            title='House Candidates' 
            component={Link}
            to={`${url}/representative`}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}