import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteCategory } from '../../actions/category';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Card from '@material-ui/core/Card';
const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
}));

const Category = ({
  categories: { categoryName, _id, cards },
  deleteCategory,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const classes = useStyles();
  const handleClick = (e) => {
    e.preventDefault();
    if(confirmDelete === false) return setConfirmDelete(true)
    if(confirmDelete) deleteCategory(_id);
  };
  const { counter, message1, message2 } = confirmDelete;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.card}>
          <Avatar className={classes.avatar}>
            <LibraryBooksIcon backgroundColor='white' color='primary'/>
          </Avatar>
          <Typography
            component="div"
            whiteSpace="normal"
            align="center"
            component="h1"
            variant="h5"
          >
            {categoryName}
          </Typography>
          <Grid container justify='center' maxWidth={9}>
            <Button width={3} color="primary" className={classes.submit}>
              <Link href={`study/${_id}`}>Study</Link>
            </Button>
            <Button width={3} color="primary" className={classes.submit}>
              <Link href={`/editDeck/${_id}`}>Edit</Link>
            </Button>
            <Button
              onClick={(e) => handleClick(e)}
              width={3}
              color="primary"
              className={classes.submit}
            >{confirmDelete ? " You Sure?" : "Delete"}</Button>
          </Grid>
        </Card>
      </div>
    </Grid>

    // <div>
    //   <h2>{categoryName}</h2>
    //   <button><Link to={`study/${_id}`}>Study</Link></button>
    //   <button>
    //     <Link to={`/editDeck/${_id}`}>Edit</Link>
    //   </button>
    //   <button onClick={(e) => handleClick(e)}>{message1}</button>
    // </div>
  );
};

Category.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory })(Category);
