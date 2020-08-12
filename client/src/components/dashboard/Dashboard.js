import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadAllCategories } from '../../actions/category';
import Spinner from '../layout/Spinner';
import Category from './Category';
import NewCategory from './NewCategory';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Dashboard = ({
  loadAllCategories,
  category: { categories, loading },
}) => {
  useEffect(() => {
    loadAllCategories();
  }, []);
  const classes = useStyles();
  const [renderForm, toggleForm] = useState(false);
  return (
    <div>
      {categories.length == 0 && !loading ? (
        <NewCategory text={"Let's get started! Please make your first deck:"} />
      ) : (
        <Grid className={classes.paper} container justify="center">
          {renderForm == false ? (
            <Button
              color="primary"
              style={{ justifyContent: 'center' }}
              onClick={() => toggleForm(!renderForm)}
            >
              Add Deck
            </Button>
          ) : (
            <NewCategory text={''} />
          )}
        </Grid>
      )}
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {categories.map((categories) => (
                <Category key={categories._id} categories={categories} />
              ))}
            </Grid>
          </Container>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  loadAllCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { loadAllCategories })(Dashboard);
