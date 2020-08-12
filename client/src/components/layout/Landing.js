import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    margin: 'auto',
  },
  landing: {
    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(99,156,255,1) 0%, rgba(255,255,255,1) 100%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
}));

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles();
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box
      overflow="hidden !important"
      height="92.7vh"
      display="flex"
      flexDirection="column"
      justifyContent='center'
      className={classes.landing}
    >
      <Typography color='black' align='center'>
        <h1>Welcome to StudyBuddy!</h1>
        <h2>a flashcard leaning tool</h2>
      </Typography>
    </Box>
    // <Box component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //   </div>
    // </Box>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {})(Landing);
