import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { db } from "../../firebase.config";

import {
  CustomSealDisplay, 
  CustomDisplayCategory, 
  CustomCandidateAvatar,
  CustomCandidateCards,
  CustomCandidateProfile,
  CustomPartylistDisplay,
  CustomFooter
} from '../globalComponents';

import Seal_of_the_President from '../../images/Seal_of_the_President.png';
import Seal_of_the_Vice_President from '../../images/Seal_of_the_Vice_President.png';
import Seal_of_the_Senate from '../../images/Seal_of_the_Senate.png';
import Seal_of_the_House from '../../images/Seal_of_the_House.png';
import { Category } from '@material-ui/icons';

const useStyles = makeStyles({
  mainContainer: {
    padding: '0.5rem'
  },
  image:{
    height: '100%'
  },
  mainText: {
    fontWeight: '500'
  },
  guideContainer: {
    border: '2px solid rgb(237, 7, 153)',
    padding: '0.5rem',
    maxHeight: '85vh'
  },
  guideMainText: {
    color: '#700A4B',
    fontWeight: '500'
  },
  qualificationContainer: {
    paddingLeft: '0.5rem',
    marginBottom: '0.5rem'
  },
  avatarContainer: {
    padding: '0.25rem'
  },
  isPartyButton: {
    margin: '0rem 1rem 0rem 1rem'
  },
  isPartyButtonActive: {
    margin: '0rem 1rem 0rem 1rem',
    backgroundColor: '#700a4b',
    color: 'white',
    '&:hover': {
      color: 'black'
    }
  }
})
export default function Candidates(props) {
  let { cat } = useParams();
  const [category, setCategory] = useState(cat);
  const [candidates, setCandidates] = useState();
  const [vp, setVp] = useState();
  const [partylist, setPartylist] = useState();
  const [isParty, setIsParty] = useState(false);
  // console.log(candidates);
  const position = category === 'presidential' ? 'President'
      : category === 'senatorial' ? 'Senator'
      : 'House Representative';
  // console.log(`Position ${position}`);
  console.log("Partylist ", partylist);
  const fetch = async() => {
    const response = await db.collection("candidates").where("position", "==", `${position}`).get();
    const dataObj = [];
    response.docs.forEach((item) => {
      let objID = item.id;
      let obj = {...item.data(), ['id']: objID};
      dataObj.push(obj);
    });
    setCandidates(dataObj);
  };
  const fetchVp = async() => {
    const response = await db.collection("candidates").where("position", "==", "Vice President").get();
    const dataObj = [];
    response.docs.forEach((item) => {
      let objID = item.id;
      let obj = {...item.data(), ['id']: objID};
      dataObj.push(obj);
    });
    setVp(dataObj);
  };
  const fetchPartylist = async() => {
    const response = await db.collection("candidates").where("position", "==", "Partylist").get();
    const dataObj = [];
    response.docs.forEach((item) => {
      let objID = item.id;
      let obj = {...item.data(), ['id']: objID};
      dataObj.push(obj);
    });
    setPartylist(dataObj);
  };
  useEffect(() => {
    fetch();
    fetchVp();
    fetchPartylist();
  }, []);
  // console.log(isParty)
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item container direction='column' className={classes.mainContainer}>
        {category === 'presidential' && (
          <Fragment>
            <Grid item container justify='center' alignItems='center'>
              <Grid item >
                <CustomSealDisplay src={Seal_of_the_President} alt={'Seal of the President'} />
              </Grid>
              <Grid item > 
                <Typography variant='h4' className={classes.mainText}>The Executive</Typography>
              </Grid>
              <Grid item >
                <CustomSealDisplay src={Seal_of_the_Vice_President} alt={'Seal of the President'} />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container xs={12} sm={8} >
                <Grid item container direction='column'>
                  <Grid item >
                    <CustomDisplayCategory category={'Presidential Candidates'} />
                  </Grid>
                  <Grid item container direction='row' className={classes.avatarContainer} justify='center' >
                    {!candidates && (
                      <Grid item container className={classes.progressGrid} justify='center' alignItems='center' >
                        <CircularProgress  />
                      </Grid>
                    )}
                    {candidates && (
                      <CustomCandidateCards candidates={candidates} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={4} className={classes.guideContainer}>
                <Grid item>
                  <Typography className={classes.guideMainText} align='center' variant='h5'>Executive Branch</Typography>
                  <Typography align='center' gutterBottom>
                    The executive branch is composed of the President and the Vice President who are elected by direct
                    popular vote and serve a term of six years
                  </Typography>
                </Grid>
                <Grid item container justify='center'>
                  <Typography className={classes.guideMainText} align='center' variant='h5'>Guide</Typography>
                </Grid>
                <Grid item container>
                  <Typography variant='h6' className={classes.guideMainText}>The President</Typography>
                  <Typography gutterBottom className={classes.qualificationContainer}>
                    The President is the Head of the State and Head of Government, and functions as the commander-in-chief
                    of the Armed Forces of the Philippines.
                  </Typography>
                  <Typography variant='h6' className={classes.guideMainText}>Qualifications:</Typography>
                  <Grid item container direction='column' className={classes.qualificationContainer}>
                    <Typography>- natural born Filipino</Typography>
                    <Typography>- a registered voter</Typography>
                    <Typography>- able to read and write</Typography>
                    <Typography>- 40 years of age</Typography>
                    <Typography>- resided in the country ten years prior to election</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container >
              <Grid item container xs={12} sm={8} >
                <Grid item container direction='column'>
                    <Grid item >
                      <CustomDisplayCategory category={'Vice Presidential Candidates'} />
                    </Grid>
                    <Grid item container direction='row' className={classes.avatarContainer} justify='center' >
                      {vp && (
                        <CustomCandidateCards candidates={vp} />
                      )}
                    </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={4} className={classes.guideContainer}>
                <Grid item container>
                  <Typography variant='h6' className={classes.guideMainText}>The Vice President</Typography>
                  <Typography gutterBottom className={classes.qualificationContainer}>
                    The Vice President is mandated to assume presidency in case of death, disability, or
                    resignation of the President, and may be assigned a cabinet position. 
                  </Typography>
                  <Typography variant='h6' className={classes.guideMainText}>Qualifications:</Typography>
                  <Grid item container direction='column' className={classes.qualificationContainer}>
                    <Typography>- natural born Filipino</Typography>
                    <Typography>- a registered voter</Typography>
                    <Typography>- able to read and write</Typography>
                    <Typography>- 40 years of age</Typography>
                    <Typography>- resided in the country ten years prior to election</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        )}
        {category === 'senatorial' && (
          <Fragment>
            <Grid item container justify='center' alignItems='center'>
              <Grid item >
                <CustomSealDisplay src={Seal_of_the_Senate} alt={'Seal of the Senate'} />
              </Grid>
              <Grid item > 
                <Typography variant='h4' className={classes.mainText}>The Senate</Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container xs={12} sm={8} >
                <Grid item container direction='column'>
                  <Grid item >
                    <CustomDisplayCategory category={'Senatorial Candidates'} />
                  </Grid>
                  <Grid item container direction='row' className={classes.avatarContainer} justify='center' >
                    {!candidates && (
                      <Grid item container className={classes.progressGrid} justify='center' alignItems='center' >
                        <CircularProgress  />
                      </Grid>
                    )}
                    {candidates && (
                      <CustomCandidateCards candidates={candidates} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={4} className={classes.guideContainer}>
                <Grid item>
                  <Typography className={classes.guideMainText} align='center' variant='h5'>Senate Chamber</Typography>
                  <Typography align='center' gutterBottom>
                    The Senate is the upper house of Congress. The Senate is composed of 24 senators who are elected at-large with the country
                    as one district under plurality-at-large voting.
                  </Typography>
                </Grid>
                <Grid item container justify='center'>
                  <Typography className={classes.guideMainText} align='center' variant='h5'>Guide</Typography>
                </Grid>
                <Grid item container>
                  <Typography variant='h6' className={classes.guideMainText}>The Senate</Typography>
                  <Typography gutterBottom className={classes.qualificationContainer}>
                    The Senate decides matters of national interest; represents the interest of the people in their states or territories
                    ; proposes, debates, and votes on bills and amendments; examines issues in committees; and closely examines the executive
                    government.
                  </Typography>
                  <Typography variant='h6' className={classes.guideMainText}>Qualifications:</Typography>
                  <Grid item container direction='column' className={classes.qualificationContainer}>
                    <Typography>- natural born Filipino</Typography>
                    <Typography>- a registered voter</Typography>
                    <Typography>- able to read and write</Typography>
                    <Typography>- at least 35 years of age</Typography>
                    <Typography>- resided in the country for not less than two years preceding the day of election</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        )}
        {category === 'representative' && (
          <Fragment>
            <Grid item container justify='center' alignItems='center'>
              <Grid item >
                <CustomSealDisplay src={Seal_of_the_House} alt={'Seal of the House of Representatives'} />
              </Grid>
              <Grid item > 
                <Typography variant='h4' className={classes.mainText}>The House of Representatives</Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container xs={12} sm={8} >
                <Grid item container direction='column'>
                  <Grid item container direction='row' alignItems='center' >
                    <CustomDisplayCategory category={'Representative Candidates'} />
                    <Grid item >
                      <Button className={isParty ? classes.isPartyButton : classes.isPartyButtonActive} variant='outlined' onClick={() => setIsParty(false)} >District</Button>
                    </Grid>
                    <Grid item >
                      <Button className={isParty ? classes.isPartyButtonActive : classes.isPartyButton} variant='outlined' onClick={() => setIsParty(true)} >Partylist</Button>
                    </Grid>
                  </Grid>
                  {!candidates && (
                    <Grid item container className={classes.progressGrid} justify='center' alignItems='center' >
                      <CircularProgress  />
                    </Grid>
                  )}
                  {candidates && !isParty && (
                    <Fragment>
                      <Grid item container direction='row' className={classes.avatarContainer} justify='center' >
                        <CustomCandidateCards candidates={candidates} />
                      </Grid>
                    </Fragment>
                  )}
                  {partylist && isParty && (
                    <Fragment>
                      <Grid item container direction='column' >
                        <CustomPartylistDisplay partylist={partylist} />
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={4} className={classes.guideContainer}>
                <Grid item>
                  <Typography className={classes.guideMainText} align='center' variant='h5'>House of Representatives</Typography>
                  <Typography align='center' gutterBottom>
                    The House of Representatives is the lower house of Congress. The House is composed of not more than 250 members,
                    unless otherwise stated by law, who shall be elected from legislative districts of the Philippines.
                  </Typography>
                </Grid>
                <Grid item container justify='center'>
                  <Typography className={classes.guideMainText} align='center' variant='h5'>Guide</Typography>
                </Grid>
                <Grid item container>
                  <Typography variant='h6' className={classes.guideMainText}>The House</Typography>
                  <Typography gutterBottom className={classes.qualificationContainer}>
                    The House is responsible for making enabling laws to make sure that the spirit of the Constitution is upheld in
                    the country, and at times, to amend or change the Constitution itself.
                  </Typography>
                  <Typography variant='h6' className={classes.guideMainText}>Qualifications:</Typography>
                  <Grid item container direction='column' className={classes.qualificationContainer}>
                    <Typography>- natural born Filipino</Typography>
                    <Typography>- a registered voter in his/her district (except Partylist)</Typography>
                    <Typography>- able to read and write</Typography>
                    <Typography>- at least 25 years of age</Typography>
                    <Typography>- resided in the country for not less than one year preceding the day of election</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        )}
      </Grid>
      <CustomFooter />
    </Fragment>
  );
}