import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import {connect} from 'react-redux'
import { createCategory } from '../../actions/category';

const NewCategory = ({text, setAlert, createCategory}) => {
    const [newCategory, setNewCategory] = useState('');
    const onChange = e => setNewCategory(e.target.value)
    const onSubmit = e => {
        e.preventDefault()
        if(newCategory == ''){
             setAlert('Please enter a deck name', 'danger')
        } else {
            createCategory(newCategory)
        }
    }
  
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>{text}</label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => onChange(e)}
        ></input>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

NewCategory.propTypes = {
    setAlert: PropTypes.func.isRequired,
    createCategory: PropTypes.func.isRequired,
};

export default connect(null, {setAlert, createCategory})(NewCategory);
