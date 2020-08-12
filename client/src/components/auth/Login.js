import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = ({login, isAuthenticated}) => {
   const classes = useStyles()
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const { email, password } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      login(email, password)
   };

   if(isAuthenticated) return <Redirect to='/dashboard'/>
   return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}  noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={(e) => onChange(e)}
  
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={(e) => onChange(e)}
              value={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href='/register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
//    return (
//       <div>
//          <form onSubmit={(e) => onSubmit(e)}>
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
//             <button type="submit">Submit</button>
//          </form>
//       </div>
//    );
// };

Login.propTypes = {
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
