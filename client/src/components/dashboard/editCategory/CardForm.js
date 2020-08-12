import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addCard, loadCategory } from '../../../actions/category';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { setAlert } from '../../../actions/alert';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const CardForm = ({ categoryId, addCard, loadCategory, setAlert }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    front: '',
    back: '',
  });
  const { front, back } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
   if(front=='' || back == '') return setAlert('Please fill in both fields', 'danger')
    addCard({ front, back, categoryId })
    setFormData({
      front:'',
      back: ''
    });
  };
  return (
    <Container component="main">
    <CssBaseline />
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
        <Grid container xs="12">
          <Grid item xs="6">
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="front"
              value={front}
              onChange={(e) => onChange(e)}
              label="Front"
              name="front"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs="6">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="back"
              onChange={(e) => onChange(e)}
              value={back}
              label="Back"
              type="back"
              id="back"
            />
          </Grid>
          <Grid container justify='center' >
            <Button
              type="submit"
              color="primary"
              className={classes.submit}
            >
              <AddCircleIcon fontSize='large'/>
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
  );
};

CardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addCard, loadCategory, setAlert })(CardForm);
