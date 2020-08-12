import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {register} from '../../actions/auth'
import {setAlert} from '../../actions/alert'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
   return (
     <Typography variant="body2" color="textSecondary" align="center">
       {'Allen Hsing © '}
       <Link color="inherit" href="https://material-ui.com/">
         studyBuddy
       </Link>{' '}
       {new Date().getFullYear()}
       {'.'}
     </Typography>
   );
 }

 const useStyles = makeStyles((theme) => ({
   paper: {
     marginTop: theme.spacing(8),
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
   },
   avatar: {
     margin: theme.spacing(1),
     backgroundColor: theme.palette.secondary.main,
   },
   form: {
     width: '100%', // Fix IE 11 issue.
     marginTop: theme.spacing(3),
   },
   submit: {
     margin: theme.spacing(3, 0, 2),
   },
 }));


const Register = ({register, setAlert, isAuthenticated}) => {
   const classes = useStyles()
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
   });

   const { name, email, password, password2 } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = (e) => {
      e.preventDefault();
      if(password !== password2){
         setAlert('Passwords do not match', "danger")
      } else {
         register({name, email, password})
      }
   };

   if(isAuthenticated) return <Redirect to='/' />
   return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  value={password2}
                  onChange={(e) => onChange(e)}
                />
              </Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

//    return (
//       <div>
//          <form onSubmit={(e) => onSubmit(e)}>
//             <input
//                name="name"
//                type="text"
//                value={name}
//                onChange={(e) => onChange(e)}
//                placeholder="Name"
//             ></input>
//             <input
//                name="email"
//                type="text"
//                value={email}
//                onChange={(e) => onChange(e)}
//                placeholder="Email"
//             ></input>
//             <input
//                name="password"
//                type="password"
//                value={password}
//                onChange={(e) => onChange(e)}
//                placeholder="Password"
//             ></input>
//             <input
//                name="password2"
//                type="password"
//                value={password2}
//                onChange={(e) => onChange(e)}
//                placeholder="Please confirm password"
//             ></input>
//             <button type="submit">Submit</button>
//          </form>
//       </div>
//    );
// };

Register.propTypes = {
    register:PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register, setAlert})(Register);
