import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';
import { db } from "../../firebase.config";
import {
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { 
  CustomCandidateProfile, 
  CustomCandidateStatement,
  CustomIssuesList,
  CustomBiographyList,
  CustomPlatformsList,
  CustomAchievementsList,
  CustomPartylistDescription,
  CustomFooter
} from '../globalComponents';

const useStyles = makeStyles({
  mainContainer: {
    padding: '1rem'
  },
  candidateProfileContainer: {
    padding: '0.5rem',
    marginBottom: '0.5rem',
    border: '2px solid #ED0799'
  },
  leftContainer: {
    paddingRight: '0.5rem'
  },
  rightContainer: {
    paddingLeft: '0.5rem'
  },
  designBox: {
    border: '1.5px solid #ED0799',
    padding: '0.5rem',
    marginBottom: '0.5rem'
  },
  regBox: {
    padding: '0.5rem',
    marginBottom: '0.5rem',
    paddingLeft: '1rem'
  },
  progressGrid: {
    width: '100vw',
    height: '100vh'
  }
});

export default function CandidateProfile(props) {
  const classes = useStyles();
  const { candidate, id } = useParams();
  const [selected, setSelected] = useState(-1);
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchDoc = async() => {
      const response = await db.collection("candidates").doc(id).get();
      const data = response.data();
      // console.log("Data: ", data);
      setProfile({...data});
    }
    fetchDoc();
  }, []);
  console.log("Profile: ", profile);
  const handleSelect = (e, i) => {
    setSelected(i);
  };
  console.log(selected);
  return (
    <Fragment>
      <Grid item container className={classes.mainContainer}>
        {!profile && (
          <Grid item container className={classes.progressGrid} justify='center' alignItems='center' >
            <CircularProgress  />
          </Grid>
        )}
        {profile && profile.position === "Partylist" && (
          <Fragment>
            <Grid item container direction='column' >
              <Grid item container direction='row' justify='center' className={classes.candidateProfileContainer} >
                <CustomCandidateProfile candidName={profile.name} position={profile.position}  />
              </Grid>
              <Grid item className={classes.regBox} >
                <CustomPartylistDescription description={profile.description} />
              </Grid>
            </Grid>
            
          </Fragment>
        )}
        {profile && profile.position !== "Partylist" && (
          <Fragment>
            <Grid item container direction='column' xs={12} sm={6} className={classes.leftContainer} >
              <Grid item container direction='row' justify='center' className={classes.candidateProfileContainer}>
                <CustomCandidateProfile candidName={profile.name} position={profile.position} age={profile.age} />
              </Grid>
              <Grid item className={classes.regBox} >
                <Typography variant='h5'>Education</Typography>
                <CustomBiographyList education={profile.tertiary} />
              </Grid>
              <Grid item className={classes.designBox}>
                <Typography variant='h5'>Achievements / Contributions</Typography>
                <CustomAchievementsList achievements={profile.achievements} />
              </Grid>
            </Grid>
            <Grid item container direction='column' xs={12} sm={6} className={classes.rightContainer} >
              <Grid item className={classes.regBox}>
                <Typography variant='h5'>Agenda</Typography>
                <CustomPlatformsList platforms={profile.platforms} />
              </Grid>
              <Grid item className={classes.designBox}>
                <Typography variant='h5'>Issues</Typography>
                <CustomIssuesList 
                  issues={profile.issues} 
                  selected={selected} 
                  handleSelect={setSelected} 
                />
              </Grid>
            </Grid>      
          </Fragment>
        )}
        
      </Grid>
      {profile && (
        <CustomFooter />
      )}
    </Fragment>
  );
}