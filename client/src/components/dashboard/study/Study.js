import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { loadStudy } from '../../../actions/study';
import { useState } from 'react';
import StudyCard from './StudyCard';


import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Fragment } from 'react';
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  intsructions: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

const Study = ({ match, loadStudy, loading, cards, cardDisplayed }) => {
  const classes = useStyles();

  useEffect(() => {
    loadStudy(match.params._id);
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <Box container className={classes.intsructions}>
      <Typography align='center' paddingTop={10}>Double click to tag card for deletion, click to flip</Typography>
      </Box>
      <Container className="classes.cardGrid" maxWidth="md">
        <Grid container spacing={4}>
          {loading ? (
            <Spinner />
          ) : (
            cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <StudyCard categoryId={match.params._id} card={card} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

Study.propTypes = {
  loadStudy: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  cardDisplayed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.study.loading,
  cards: state.study.cards,
  cardDisplayed: state.study.cardDisplayed,
});

export default connect(mapStateToProps, { loadStudy })(Study);
