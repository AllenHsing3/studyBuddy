import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const useStyles = makeStyles((theme) => ({
   '@global': {
     ul: {
       margin: 0,
       padding: 0,
       listStyle: 'none',
     },
   },
   appBar: {
     borderBottom: `1px solid ${theme.palette.divider}`,
   },
   toolbar: {
     flexWrap: 'wrap',
   },
   toolbarTitle: {
     flexGrow: 1,
   },
   link: {
     margin: theme.spacing(1, 1.5),
   },

 }));


const Navbar = ({isAuthenticated, logout}) => {
   const classes = useStyles();

   const authLinks = (
      <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
            <Button href='/dashboard' >studyBuddy<ImportContactsIcon /></Button>
          </Typography>
          <Button href="/dashboard" color="primary" variant="outlined" className={classes.link}>
            Home
          </Button>
          <Button href="/" onClick={e => logout(e)} color="primary" variant="outlined" className={classes.link}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      </React.Fragment>
   )

   const guestLinks = (
      <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
          <Button href='/' >studyBuddy<ImportContactsIcon /></Button>
          </Typography>
          <Button href="/register" color="primary" variant="outlined" className={classes.link}>
            Register
          </Button>
          <Button href="/login" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      </React.Fragment>
   //    <ul>
   //    <li>
   //       <Link to="/">Home</Link>
   //    </li>
   //    <li>
   //       <Link to="/register">Register</Link>
   //    </li>
   //    <li>
   //       <Link to="/login">Login</Link>
   //    </li>
   // </ul>
   )

   return (
      <Fragment>
         {isAuthenticated? authLinks : guestLinks}
      </Fragment>
   );
};

Navbar.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logout})(Navbar);
