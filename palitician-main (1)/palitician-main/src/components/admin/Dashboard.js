import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  Button,
  IconButton,
  TextField
} from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { db } from "../../firebase.config";
import { 
  CustomInputField, 
  CustomButtonFields, 
  CustomIssuesList,
  CustomBiographyList,
  CustomPlatformsList,
  CustomAchievementsList,
  CustomNameDisplay,
  CustomDialog
 
} from '../globalComponents';

const useStyles = makeStyles({
  formContainer: {
    border: '2px solid #700A4B'
  }, 
  regCard: {
    padding: '1rem',
    minHeight: '25rem',
    border: '3px solid #ED0799'
  },
  mainContainer: {
    padding: '1rem'
  },
  partylistCard: {
    padding: '15% 15%',
    minHeight: '10rem',
    border: '3px solid #ED0799'
  },
  searchCard: {
    minHeight: '10rem',
    maxHeight: '38rem',
    border: '3px solid #ED0799',
    padding: '1rem',
    overflow: 'auto'
  },
  displayText: {
    margin: '0 0.5rem 0 0.5rem'
  },
  addButton: {
    marginTop: '1rem',
    color: 'white',
    backgroundColor: '#700a4b',
    '&:hover': {
      color: 'white',
      backgroundColor: '#700a4b'
    }
  },
  selectText: {
    marginTop: '2rem'
  },
  logout: {
    marginTop: '0.5rem',
    color: '#B50E78',
    border: '2px solid rgba(181, 14, 120, 0.50)',
    '&:hover': {
      color: 'white',
      backgroundColor: '#700a4b'
    }
  },
  deleteBtn: {
    '&:hover': {
      color: 'white',
      backgroundColor: 'black'
    }
  }
})

export default function Dashboard() {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const { history } = useHistory();

  // States
  const [errors, setErrors] = useState("");
  const [isAdded, setIsAdded] = useState();
  const [ power, setPower ] = useState(1);
  const [data, setData] = useState({
    name: "",
    position: "",
    achievements: [''], //
    age: "",
    issues: [
      {
        name: '',
        description: ''
      }
    ], //
    party: '',
    platforms: [''], //
    tertiary: [''] //
  });
  const [partylist, setPartylist] = useState({
    name: "",
    description: "",
    position: 'Partylist'
  });
  const [search, setSearch] = useState();
  const [candidateData, setCandidateData] = useState();
  const [displayData, setDisplayData] = useState();
  const [selected, setSelected] = useState(-1);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  // console.log(candidateData);
  console.log("Display Data: ", displayData);
  // console.log("search state: ", search)
  
  const addData = async(data) => {
    const response = await db.collection("candidates").add(data)
    .then((res) => updateAddChanges())
    .catch((err) => failedAction())
  };
  const searchData = () => {
    const data = [...candidateData].find((item) => {
      return item.name === search;
    })
    // console.log("searched data: ", data)
    setDisplayData(data);
    setSearch();
  };
  const deleteData = async() => {
    const response = await db.collection("candidates").doc(`${displayData.id}`).delete()
    .then(() => clearData())
    .catch((err) => failedAction())
  }
  const fetch = async() => {
    const dataObj = [];
    const response = await db.collection("candidates").orderBy("position").get()
    .then((res) => {
      res.docs.forEach(item => {
        // console.log(item.data())
        // console.log(item.id);
        let dataID = item.id;
        let object = {...item.data(), id: dataID};
        dataObj.push(object);
      })
      setCandidateData(dataObj);
    })
    .catch((err) => failedAction())
  }
  useEffect(() => {
    fetch();
  }, [])

  // Functions
  const clearData = () => {
    console.log("Successfully deleted");
    setStatus('success')
    setDisplayData();
    setOpen(true)
    fetch();
  }
  const updateAddChanges = () => {
    console.log("Successfully added");
    setStatus('success')
    setOpen(true)
    fetch();
  }
  const failedAction = () => {
    setStatus('failed')
    setOpen(true);
  }

  // Handlers
  const handleSearch = (index, e) => {
    setSearch(e.target.value);
  }
  const handleSelect = (e, i) => {
    setSelected(i);
  };
  const handleLogout = async(e) => {
    setErrors('');
    try {
      await logout();
      history.push('/')
    } catch{
      setErrors("Failed to log out")
    }
  };
  const handleIssuesInput = (index, e) => {
    const val = [...data.issues];
    val[index][e.target.name] = e.target.value;
    setData({...data, issues: [...val]})
  };
  const handleArrayInput = (index, e) => {
    // const element = e.target.name
    const val = [...data[e.target.name]];
    val[index] = e.target.value;
    // console.log("Array input: ", val)
    setData({...data, [e.target.name]: [...val]})
  };
  const handleTextChange = (index, e) => {
    setData({...data, [e.target.name]: e.target.value})
  };
  const handlePartylist = (index, e) => {
    setPartylist({...partylist, [e.target.name]: e.target.value})
  };
  const handleAddArrayField = (index, e) => {
    // e.currentTarget.name
    const element = e.currentTarget.name;
    setData({...data, [element]: [...data[element], '' ]})
  };
  const handleDeleteArrayField = (index, e) => {
    const element = e.currentTarget.name;
    const val = [...data[element]];
    val.splice(index, 1);
    setData({...data, [element]: [...val]})
  };
  const handleAddObjectField = (index, e) => {
    const element = e.currentTarget.name;
    setData({...data, [element]: [...data[element], {name: '', description: ''}]});
  };
  const handleDeleteObjectField = (index, e) => {
    const element = e.currentTarget.name;
    const val = [...data[element]];
    val.splice(index, 1);
    setData({...data, [element]: [...val]})
  };
  const handleDialog = () => {
    setOpen(!open)
  }

  // Lists of Arrays
  const issuesList = [...data.issues].map((item, index) => (
    <Grid item container alignItems='center' key={index} >
      <CustomInputField label='Name' name='name' handler={handleIssuesInput} index={index} />
      <CustomInputField label='Description' name='description' handler={handleIssuesInput} index={index} />
      <CustomButtonFields 
        handler={handleDeleteObjectField} 
        description='Delete'
        index={index}
        name='issues'
      />
      <CustomButtonFields 
        handler={handleAddObjectField} 
        description='Add'
        index={index}
        name='issues'
      />
    </Grid>
  ));
  const platformsList = [...data.platforms].map((item, index) => (
    <Grid item container alignItems='center' key={index} >
      <CustomInputField label='Platform' name='platforms' handler={handleArrayInput} index={index} />
      <CustomButtonFields 
        handler={handleDeleteArrayField} 
        description='Delete'
        index={index}
        name='platforms'
      />
      <CustomButtonFields 
        handler={handleAddArrayField} 
        description='Add'
        index={index}
        name='platforms'
      />
    </Grid>
  ));
  const achievementsList = [...data.achievements].map((item, index) => (
    <Grid item container alignItems='center' key={index} >
      <CustomInputField label="Achievement" name='achievements' handler={handleArrayInput} index={index} />
      <CustomButtonFields 
        handler={handleDeleteArrayField} 
        description='Delete'
        index={index}
        name='achievements'
      />
      <CustomButtonFields 
        handler={handleAddArrayField} 
        description='Add'
        index={index}
        name='achievements'
      />
    </Grid>
  ));
  const tertiaryList = [...data.tertiary].map((item, index) => (
    <Grid item container alignItems='center' key={index} >
      <CustomInputField label='Tertiary' name='tertiary' handler={handleArrayInput} index={index} />
      <CustomButtonFields 
        handler={handleDeleteArrayField} 
        description='Delete'
        index={index}
        name='tertiary'
      />
      <CustomButtonFields 
        handler={handleAddArrayField} 
        description='Add'
        index={index}
        name='tertiary'
      />
    </Grid>
  ));
  const name = [];
  if (candidateData){
    [...candidateData].forEach((item, index) => (
      name.push(item.name)
    ))
  }
  return (
    <Fragment>
      <Grid item container direction='column' className={classes.mainContainer} >
        <Grid item container justify='center' alignItems='center' >
          <Grid item >
            <IconButton disabled={power === 1 ? true : false} onClick={() => setPower(power - 1)}  >
              <ArrowLeft fontSize='large' />
            </IconButton>
          </Grid>
          <Grid item >
            <Typography variant='h5'>{power === 1 ? "Add Data" : "Delete Data"}</Typography>
          </Grid>
          <Grid item >
            <IconButton disabled={power === 2 ? true : false} onClick={() => setPower(power + 1)} >
              <ArrowRight fontSize='large' />
            </IconButton>
          </Grid>
        </Grid>
        { power === 1 && (
          <Grid item container direction='row' alignItems='center' spacing={4} >
            <Grid item sm={6} className={classes.cardContainer} >
              <Card className={classes.regCard} variant='outlined' >
                <Grid item container direction='column' alignItems='center' >
                  <Grid item container direction='column' >
                    <Typography gutterBottom >Basic Info:</Typography>
                    <Grid item container justify='center' spacing={2} >
                      <Grid item >
                        <CustomInputField label='Name' name='name' handler={handleTextChange} />
                      </Grid>
                      <Grid item >
                        <CustomInputField inputProps={{ style: {maxWidth: '3rem'}}} label='Age' name='age' handler={handleTextChange} />
                      </Grid>
                      <Grid item >
                        <CustomInputField label='Position' name='position' handler={handleTextChange} />
                      </Grid>
                      <Grid item >
                        <CustomInputField label='Party' name='party' handler={handleTextChange} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container direction='column' >
                    <Typography gutterBottom >Education:</Typography>
                    <Grid item container justify='center' >
                      {tertiaryList}
                    </Grid>
                  </Grid>
                  <Grid item container direction='column' >
                    <Typography gutterBottom >Achievements:</Typography>
                    <Grid item container justify='center' >
                      {achievementsList}
                    </Grid>
                  </Grid>
                  <Grid item container direction='column' >
                    <Typography gutterBottom >Platforms:</Typography>
                    <Grid item container justify='center' >
                      {platformsList}
                    </Grid>
                  </Grid>
                  <Grid item container direction='column' >
                    <Typography gutterBottom >Issues:</Typography>
                    <Grid item container justify='center' >
                      {issuesList}
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Button variant='outlined' className={classes.addButton} onClick={() => addData(data)} >Add Data</Button>
                    
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item sm={6} className={classes.cardContainer} >
              <Card className={classes.partylistCard} variant='outlined' >
                <Grid item container direction='column' >
                  <Grid item >
                    <Typography>Partylist</Typography>
                  </Grid>
                  <Grid item container direction='column' >
                    <Grid item container direction='row' >
                      <Grid item >
                        <CustomInputField label='Partylist Name' name='name' handler={handlePartylist} />
                      </Grid>
                      <Grid item >
                        <CustomInputField label='Description' name='description' handler={handlePartylist} />
                      </Grid>
                    </Grid>
                    <Grid item >
                      <Button variant='outlined' className={classes.addButton} onClick={() => addData(partylist)} >Add Data</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        )}
        {power === 2 && (
          <Grid item container direction='row' alignItems='center' spacing={4} >
            <Grid item sm={6} className={classes.cardContainer} >
              <Card className={classes.searchCard} variant='outlined' >
                <Grid item container direction='row' alignItems='center' >
                  <Grid item >
                    <CustomInputField label='Search...' handler={handleSearch} />
                  </Grid>
                  <Grid item >
                    <Button onClick={() => searchData()} >Search</Button>
                  </Grid>
                </Grid>
                <Grid item container >
                  {candidateData && (
                    <CustomNameDisplay name={candidateData} handler={setDisplayData} />
                  )}
                </Grid>
              </Card>
            </Grid>
            <Grid item sm={6} className={classes.cardContainer} >
              <Card className={classes.searchCard} variant='outlined' >
                <Grid item container >
                  <Grid item container justify='center' >
                    <Button className={classes.deleteBtn} variant='outlined' onClick={() => deleteData()} >Delete</Button>
                  </Grid>
                  <Grid item container justify='center' >
                    {!displayData && (
                      <Fragment>
                        <Grid item container justify='center' alignItems='center' >
                          <Typography variant='h4' className={classes.selectText}>Please select a candidate</Typography>
                        </Grid>
                      </Fragment>
                    )}
                    {displayData && (
                      <Fragment>
                        <Grid item className={classes.displayText} >
                          <Typography>Name:</Typography>
                          <TextField 
                            variant='filled'
                            inputProps={{ style: { padding: "10px 12px", maxWidth: '18rem', width: '18rem' } }}
                            InputProps={{ readOnly: true }}
                            value={displayData.name}
                          />
                        </Grid>
                        <Grid item className={classes.displayText} >
                          {displayData.position !== "Partylist" && (
                            <Fragment>
                              <Typography>Age:</Typography>
                              <TextField 
                                variant='filled'
                                inputProps={{ style: { padding: "10px 12px", maxWidth: '3rem' } }}
                                InputProps={{ readOnly: true }}
                                value={displayData.age}
                              />
                            </Fragment>
                          )}
                        </Grid>
                        <Grid item className={classes.displayText} >
                          <Typography>Position:</Typography>
                          <TextField 
                            variant='filled'
                            inputProps={{ style: { padding: "10px 12px", maxWidth: '8.5rem' } }}
                            InputProps={{ readOnly: true }}
                            value={displayData.position}
                          />
                        </Grid>
                        <Grid item className={classes.displayText} >
                          {displayData.position !== "Partylist" && (
                            <Fragment>
                              <Typography>Party:</Typography>
                              <TextField 
                                variant='filled'
                                inputProps={{ style: { padding: "10px 12px", maxWidth: '9rem' } }}
                                InputProps={{ readOnly: true }}
                                value={displayData.party}
                              />
                            </Fragment>
                          )}
                        </Grid>
                      </Fragment>
                    )}
                  </Grid>
                  <Grid item container direction='column' >
                    <Grid item >
                      {displayData && displayData.position !== "Partylist" && (
                        <Fragment>
                          <Typography>Education:</Typography>
                          <CustomBiographyList education={displayData.tertiary} />
                        </Fragment>
                      )}
                      {displayData && displayData.position === "Partylist" && (
                        <Fragment>
                          <Typography>Description:</Typography>
                          <Typography>{displayData.description}</Typography>
                        </Fragment>
                      )}
                    </Grid>
                    <Grid item >
                      {displayData && displayData.position !== "Partylist" && (
                        <Fragment>
                          <Typography>Agenda:</Typography>
                          <CustomPlatformsList platforms={displayData.platforms} />
                        </Fragment>
                      )}
                    </Grid>
                    <Grid item >
                      {displayData && displayData.position !== "Partylist" && (
                        <Fragment>
                          <Typography>Achievements / Contributions:</Typography>
                          <CustomAchievementsList achievements={displayData.achievements} />
                        </Fragment>
                      )}
                    </Grid>
                    <Grid item >
                      {displayData && displayData.position !== "Partylist" && (
                        <Fragment>
                          <Typography>Issues:</Typography>
                          <CustomIssuesList 
                            issues={displayData.issues} 
                            handleSelect={setSelected}
                            selected={selected}
                          />
                        </Fragment>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        )}
        <Grid item container justify='center' >
          <Button className={classes.logout} onClick={handleLogout} variant='outlined' >Logout</Button>
        </Grid>
      </Grid>
      {open && (
        <CustomDialog 
          open={open}
          handler={handleDialog}
          status={status}
        />
      )}
    </Fragment>
  );
}