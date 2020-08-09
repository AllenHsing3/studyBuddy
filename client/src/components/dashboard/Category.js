import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteCategory } from '../../actions/category';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Category = ({
  categories: { categoryName, _id, cards },
  deleteCategory,
}) => {
  const [confirmDelete, setConfirmDelete] = useState({
    counter: 1,
    message1: 'Delete',
    message2: 'Really?',
  });
  const handleClick = (e) => {
    e.preventDefault();
    deleteCategory(_id);
  };
  const { counter, message1, message2 } = confirmDelete;
  return (
    <div>
      <h2>{categoryName}</h2>

      <button><Link to={`study/${_id}`}>Study</Link></button>
      <button>
        <Link to={`/editDeck/${_id}`}>Edit</Link>
      </button>
      <button onClick={(e) => handleClick(e)}>{message1}</button>
    </div>
  );
};

Category.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory })(Category);
