import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  Paper,
  Grid,
  Typography,
  Toolbar,
  Button,
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  OutlinedInput,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  TextField,
  RootRef,
  ListSubheader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import logo from '../images/PiNK PANDA.png';;

const useStyles = makeStyles({
  mainText: {
    fontSize: '1.5rem'
  },
  subText: {
    fontSize: '1rem'
  },
  spacer: {
    width: '35rem'
  },
  paper: {
    height: '4rem',
    // width: '100em',
    backgroundColor: '#bd137e',
    padding: '0px 0.5rem 0px 0.5rem'
  },
  titleName: {
    color: 'white',
    fontSize: '1.75rem'
  },
  dateText: {
    textAlign: 'right'
  },
  footer: {
    marginTop: '5rem',
    backgroundColor: '#700a4b',
    height: '100%',
    width: '100%',
    paddingLeft: '0.5rem',
    color: 'white' 
  },
  discoverCardContainer: {
    width: '15rem',
    height: '15rem'
  },
  discoverCardAction: {
    height: '100%',
  },
  discoverText: {
    fontSize: '1.20rem'
  },
  discoverCardMedia: {
    height: '10rem'
  },
  sealDisplay: {
    height: '5rem',
    width: '5rem',
    margin: '5px'
  },
  categoryDisplayPaper: {
    maxWidth: '20rem',
    padding: '10px',
    border: '2px solid #ED0799'
  },
  categoryName: {
    color: '#700A4B',
    fontWeight: '500'
  },
  candidateCard: {
    width: '9rem',
    height: '9rem',
    margin: '10px',
    border: '0.2rem solid rgb(84, 35, 66)'
  },
  candidateActionArea: {
    width: 'inherit',
    height: 'inherit'
  },
  candidateAvatar: {
    height: '5rem',
    width: '5rem',
    marginTop: '0.5rem'
  },
  candidateText: {
    margin: '10px 0px 12px 0px',
    fontWeight: '500'
  },
  candidateStandDetail: {
    marginLeft: '2rem'
  },
  candidateIssueText: {
    fontSize: '2.25rem',
    color: '#700A4B'
  },
  candidateProfileAvatar: {
    height: '4rem',
    width: '4rem'
  },
  candidateProfileTextContainer: {
    marginLeft: '1rem'
  },
  candidateProfileSubtext: {
    fontWeight: '400'
  },
  partylistDescription: {
    fontWeight: '400',
    paddingLeft: '5px'
  },
  loginCard: {
    width: '20rem',
    height: '20rem',
    padding: '2rem',
    margin: '2rem 0 2rem 0',
    border: '0.30rem solid #ED0799'
  },
  loginTextfieldContainer: {
    marginBottom: '1.25rem'
  },
  loginButtonContainer: {
    marginTop: '2rem'
  },
  inputField: {
    width: '13rem'
  },
  addFieldButton: {
    color: '#B50E78',
    border: '2px solid rgba(181, 14, 120, 0.50)',
    '&:hover': {
      color: 'white',
      backgroundColor: '#700a4b'
    }
  },
  list: {
    width: '100%'
  },
  subheaderText: {
    fontSize: '1.5rem'
  },
  listItem: {
    paddingLeft: '1rem'
  },
  loginButton: {
    marginTop: '1rem',
    color: 'white',
    backgroundColor: '#700a4b',
    '&:hover': {
      color: 'white',
      backgroundColor: '#700a4b'
    }
  },
})

export const CustomAppBar = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.paper} elevation={4} square={true}>
        <Toolbar disableGutters >
          <Avatar alt='Pink Panda' src={logo} />
          <Typography className={classes.titleName}>PiNK PANDA</Typography>
          {/* <div className={classes.spacer} /> */}
          {/* <Typography className={classes.dateText}>Date today</Typography> */}
        </Toolbar>
      </Paper>
    </Fragment>
  );
};

export const CustomFooter = (props) => {
  const { isLanding } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Paper elevation={0} square className={classes.footer}>
        <Toolbar disableGutters>
          <Fragment>
            <Typography>
              DISCLAIMER:
              Palitician and its developers do not endorse any of the candidates in the site
            </Typography>
            {isLanding && (
              <Fragment>
                <Typography className={classes.spacer} />
                <Link to='/login' style={{textDecoration: 'none'}} >
                  <Button size='small' >Admin?</Button>
                </Link>
              </Fragment>
            )}
          </Fragment>
        </Toolbar>
      </Paper>
    </Fragment>
  );
}

export const CustomDiscoverCards = (props) => {
  const { alt, imgSrc, title, name, component, to } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Card elevation={4} className={classes.discoverCardContainer} >
        <CardActionArea className={classes.discoverCardAction} component={component} to={to} >
          <CardMedia 
            component='img'
            alt={alt}
            image={imgSrc}
            title={alt}
            name={name}
            onClick={() => console.log(name)}
            className={classes.discoverCardMedia}
          />
          <CardContent>
            <Typography className={classes.discoverText} align='center'>{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fragment>
  );
};

export const CustomSealDisplay = (props) => {
  const {src, alt} = props;
  const classes = useStyles();
  return (
    <Fragment>
      <img 
        src={src}
        alt={alt}
        className={classes.sealDisplay}
      />
    </Fragment>
  );
};

export const CustomDisplayCategory = (props) => {
  const { category } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Paper elevation={2} className={classes.categoryDisplayPaper}>
        <Typography align='center' variant='h5' className={classes.categoryName}>{category}</Typography>
      </Paper>
    </Fragment>
  );
};

export const CustomCandidateCards = (props) => {
  // console.log("CustomCandidateCards: ", props);
  const { candidates } = props;
  const classes = useStyles();
  let { url } = useRouteMatch();
  const candidatesList = [...candidates]
    .sort((a, b) => a.name > b.name ? 1 : -1)
    .map((item, index) => (
    <Fragment>
      <Card className={classes.candidateCard} key={index}>
         <CardActionArea className={classes.candidateActionArea} 
            component={Link} 
            to={`${url}/${item.name}/${item.id}`} 
            onClick={() => console.log("clicked: ", item.name)}
          >
          <Grid item container direction='column' alignItems='center' >
            <Avatar className={classes.candidateAvatar} />
            <Typography className={classes.candidateText} align='center' gutterBottom >{item.name}</Typography>
          </Grid>
         </CardActionArea>
       </Card>
    </Fragment>
  ))
  return (
    <Fragment>
      {candidatesList}
    </Fragment>
  );
};

export const CustomCandidateAvatar = (props) => {
  const { sName, sAvatar, component, to } = props;
  const classes = useStyles();
  return (
    <Fragment>
       <Card className={classes.candidateCard}>
         <CardActionArea className={classes.candidateActionArea} 
            component={component} 
            to={to} 
            onClick={() => console.log("clicked: ", sName)}
          >
          <Grid item container direction='column' alignItems='center' >
            <Avatar className={classes.candidateAvatar} />
            <Typography className={classes.candidateText}>{sName}</Typography>
          </Grid>
         </CardActionArea>
       </Card>
    </Fragment>
  );
};

export const CustomIssuesList = (props) => {
  // console.log("CustomIssuesList", props);
  const { issues, selected, handleSelect, button } = props;
  const classes = useStyles();
  const issuesList = [...issues].map((item, index) => (
    <Fragment key={index}>
      <ListItem button selected={selected === index} onClick={() => handleSelect(index)} >
        <ListItemText className={classes.candidateIssueText} primary={item.name} />
        {selected === index ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={selected === index} timeout="auto" unmountOnExit>
        <Typography className={classes.candidateStandDetail}>{item.description}</Typography>
      </Collapse>
      <Divider component='li' />
    </Fragment>
  ));
  return (
    <Fragment>
      <List>
        {issuesList}
      </List>
    </Fragment>
  );
};

export const CustomPlatformsList = (props) => {
  const { platforms } = props;
  const classes = useStyles();
  const platformsList = [...platforms].map((item, index) => (
    <Fragment key={index}>
      <ListItem>
        <ListItemText primary={item} />
      </ListItem>
      <Divider component='li' />
    </Fragment>
  ));
  return (
    <Fragment>
      <List>
        {platformsList}
      </List>
    </Fragment>
  );
};

export const CustomCandidateProfile = (props) => {
  const { candidName, position, src, age } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item >
        <Avatar className={classes.candidateProfileAvatar} />
      </Grid>
      <Grid item className={classes.candidateProfileTextContainer} >
        {position === 'Partylist' && (
          <Typography variant='h4'>{candidName}</Typography>
        )}
        {position !== 'Partylist' && (
          <Typography variant='h4' >{candidName}, {age}</Typography>
        )}
        <Typography variant='h6' className={classes.candidateProfileSubtext} >Running for {
            position 
          }
        </Typography>
      </Grid>
    </Fragment>
  );
};

export const CustomCandidateStatement = (props) => {
  const { statement } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Typography>Candidate's Statement</Typography>
      <Typography>{statement}</Typography>
    </Fragment>
  );
};

export const CustomBiographyList = (props) => {
  // console.log("Custom Biography: ", props);
  const { education } = props;
  const classes = useStyles();
  // console.log(education.preSchool.achievements);
  const educationList = [...education].map((item, index) => (
    <Fragment key={index}>
      <ListItem >
        <ListItemText primary={item} />
      </ListItem>
      <Divider component='li' />
    </Fragment>
  ));
  return (
    <Fragment>
      <Grid item>
        <List >
          {educationList}
        </List>
      </Grid>
    </Fragment>
  );
};

export const CustomAchievementsList = (props) => {
  const { achievements } = props;
  const classes = useStyles();
  const achievementsList = [...achievements].map((item, index) => (
    <Fragment key={index}>
      <ListItem>
        <ListItemText primary={item} />
      </ListItem>
      <Divider />
    </Fragment>
  ));
  return (
    <Fragment>
      <List>
        {achievementsList}
      </List>
    </Fragment>
  );
};

export const CustomPartylistDescription = (props) => {
  const { description } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Typography gutterBottom variant='h6' className={classes.partylistDescription}>{description}</Typography>
    </Fragment>
  );
};

export const CustomPartylistDisplay = (props) => {
  const { partylist } = props;
  console.log("Partylist Display: ", props);
  const partylistList = [...partylist].map((item, index) => (
    <Fragment key={index}>
      <ListItem >
        <Grid item container direction='column' >
          <Grid item container direction='row' alignItems='center' >
            <Grid item>
              <Avatar />
            </Grid>
            <Grid item>
              <Typography variant='h4'>{item.name}</Typography>
            </Grid>
          </Grid>
          <Grid item >
            <Typography >{item.description}</Typography>
          </Grid>  
        </Grid>
      </ListItem>
      <Divider component='li' />
    </Fragment>
  ))
  const classes = useStyles();
  return (
    <Fragment>
      <List >
        {partylistList}
      </List>
    </Fragment>
  );
}

export const CustomLogin = (props) => {
  const { emailRef, passwordRef, submit } = props;
  console.log(props)
  const classes = useStyles();
  return (
    <Fragment>
      <Card variant="outlined" className={classes.loginCard} >
        <Grid item container direction="column"  >
          <Grid item container direction='row' justify='center' className={classes.loginTextfieldContainer} >
            <Typography variant='h5' align='center'>Welcome, PiNK PANDA!</Typography>
            <Avatar src={logo} alt={"pink panda"} />
          </Grid>
          <Grid item className={classes.loginTextfieldContainer} >          
            <TextField 
              name="email"
              label="Email"
              type='email'
              inputRef={emailRef}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item className={classes.loginTextfieldContainer} >
            <TextField 
              name="password"
              label='Password'
              type='password'
              inputRef={passwordRef}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item container justify='space-evenly' className={classes.loginButtonContainer} >
            <Grid item  >
              <Button className={classes.loginButton} onClick={submit} variant='outlined' >Login</Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  );
}

export const CustomInputField = (props) => {
  const { handler, index, ...rest } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <TextField 
        variant='outlined'
        className={classes.inputField}
        onChange={(e) => handler(index, e)}
        {...rest}
      />
    </Fragment>
  );
};

export const CustomButtonFields = (props) => {
  const { description, index, handler, ...rest } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Button 
        onClick={(e) => handler(index, e)}
        disabled={description === 'Delete' && !index ? true : false}
        variant='outlined'
        className={description === 'Add' ? classes.addFieldButton : 'default'}
        {...rest}
      >
        {description}
      </Button>
    </Fragment>
  );
};

export const CustomNameDisplay = (props) => {
  const { name, handler } = props;
  const classes = useStyles();
  const sortArr = [
    "President",
    "Vice President",
    "Senator",
    "House Representative",
    "Partylist"
  ];
  const sortingFunc = (a, b) => {
    if (sortArr.indexOf(a.position) === sortArr.indexOf(b.position)){
      return a.name > b.name ? 1 : -1;
    }
    return sortArr.indexOf(a.position) - sortArr.indexOf(b.position);
  }
  const nameList = [...name]
    .sort(sortingFunc)
    .map((item, index) => (
    <Fragment key={index}>
      <ListItem button onClick={() => handler(item)} >
        <ListItemText primary={item.name} />
      </ListItem>
      <Divider />
    </Fragment>
  ))
  const list = [...sortArr].map((header, index) => (
    <List className={classes.list} key={index} subheader={<ListSubheader className={classes.subheaderText} disableSticky>{header}</ListSubheader>} >
      {
        name.sort(sortingFunc).map((item, index) => (
          <Fragment key={index}>
            {item.position === header && (
              <ListItem  button onClick={() => handler(item)} >
                <ListItemText className={classes.listItem} primary={item.name} />
              </ListItem>
            )}
            
          </Fragment>
        ))
      }
    </List>
  ))
  return (
    <Fragment>
      {/* <List >
        {nameList}
      </List> */}
      {list}
    </Fragment>
  )
}

export const CustomDialog = (props) => {
  const { open, handler, status } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Dialog fullWidth open={open} keepMounted onClose={handler} >
        <DialogContent>
          <Typography variant='h5'>Operation has {status === 'success' ? "Succeeded":"Failed" }!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handler} >Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}