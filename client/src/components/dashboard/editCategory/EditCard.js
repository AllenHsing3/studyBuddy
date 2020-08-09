import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCard, loadCategory, editCard } from '../../../actions/category';

const EditCard = ({
  card: { front, back, _id, markedForDeletion },
  categoryId,
  deleteCard,
  loadCategory,
  editCard,
}) => {
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
    <div>
      <form>
        <input
          type="text"
          name="editFront"
          value={editFront}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          name="editBack"
          value={editBack}
          onChange={(e) => onChange(e)}
        ></input>
        <button type="submit" onClick={(e) => onEdit(e)}>
          Edit
        </button>
        <button type="submit" onClick={(e) => onDelete(e)}>
          {markedForDeletion ? 'Flagged' : 'Delete'}
        </button>
      </form>
    </div>
  );
};

EditCard.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
};

export default connect(null, { deleteCard, loadCategory, editCard })(EditCard);
