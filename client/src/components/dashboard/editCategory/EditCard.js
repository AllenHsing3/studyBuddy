import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCard, loadCategory, editCard } from '../../../actions/category';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import FlagIcon from '@material-ui/icons/Flag';
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

const EditCard = ({
  card: { front, back, _id, markedForDeletion },
  categoryId,
  deleteCard,
  loadCategory,
  editCard,
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    editFront: front,
    editBack: back,
  });
  const { editFront, editBack } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onDelete = async (e) => {
    e.preventDefault();
    await deleteCard(categoryId, _id);
    loadCategory(categoryId);
  };

  const onEdit = async (e) => {
    e.preventDefault();
    await editCard({ categoryId, _id, editFront, editBack });
    loadCategory(categoryId);
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container xs="12">
            <Grid item xs="6">
              <TextField
                margin="normal"
                value={editFront}
                onChange={(e) => onChange(e)}
                label="Front"
                name="editFront"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs="6">
              <TextField
                margin="normal"
                fullWidth
                name="editBack"
                onChange={(e) => onChange(e)}
                value={editBack}
                label="Back"
                type="editBack"
              />
            </Grid>
            <Grid container justify="flex-end">
              <Button
                type="submit"
                color="secondary"
                className={classes.submit}
                onClick={(e) => onEdit(e)}
                variant='outlined'
              >
                Confirm_Edit
              </Button>
              <Button
                onClick={(e) => onDelete(e)}
                type="submit"
                variant="contained"
                color={markedForDeletion? "secondary": "primary"}
                className={classes.submit}
              >
                {markedForDeletion ? <FlagIcon />: <DeleteIcon />}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    // <div>
    //   <form>
    //     <input
    //       type="text"
    //       name="editFront"
    //       value={editFront}
    //       onChange={(e) => onChange(e)}
    //     ></input>
    //     <input
    //       type="text"
    //       name="editBack"
    //       value={editBack}
    //       onChange={(e) => onChange(e)}
    //     ></input>
    //     <button type="submit" onClick={(e) => onEdit(e)}>
    //       Edit
    //     </button>
    //     <button type="submit" onClick={(e) => onDelete(e)}>
    //       {markedForDeletion ? 'Flagged' : 'Delete'}
    //     </button>
    //   </form>
    // </div>
  );
};

EditCard.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
};

export default connect(null, { deleteCard, loadCategory, editCard })(EditCard);
