import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import {connect} from 'react-redux'
import { createCategory } from '../../actions/category';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle';

const NewCategory = ({text, setAlert, createCategory}) => {
    const [newCategory, setNewCategory] = useState('');
    const onChange = e => setNewCategory(e.target.value)
    const onSubmit = e => {
        e.preventDefault()
        if(newCategory == ''){
             setAlert('Please enter a deck name', 'danger')
        } else {
            createCategory(newCategory)
            setNewCategory('')
        }
    }
  
  return (
    <Container align='center'>
      <form onSubmit={(e) => onSubmit(e)}>
        <Typography>{text}</Typography>
        <TextField
          type="text"
          value={newCategory}
          onChange={(e) => onChange(e)}
        ></TextField>
        <Button type="submit"><AddCircleIcon /></Button>
      </form>
    </Container>
  );
};

NewCategory.propTypes = {
    setAlert: PropTypes.func.isRequired,
    createCategory: PropTypes.func.isRequired,
};

export default connect(null, {setAlert, createCategory})(NewCategory);
