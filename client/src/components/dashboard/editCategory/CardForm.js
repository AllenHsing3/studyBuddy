import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addCard, loadCategory } from '../../../actions/category';
import { connect } from 'react-redux';

const CardForm = ({ categoryId, addCard, loadCategory }) => {
  const [formData, setFormData] = useState({
    front: '',
    back: '',
  });
  const { front, back } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addCard({ front, back, categoryId });
    // loadCategory(categoryId)
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          value={front}
          name="front"
          placeholder="Front of card"
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          value={back}
          name="back"
          placeholder="Back of card"
          onChange={(e) => onChange(e)}
        ></input>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

CardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
};

export default connect(null, { addCard, loadCategory })(CardForm);
