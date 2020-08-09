import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import EditCard from './EditCard';
import { loadCategory } from '../../../actions/category';
import Spinner from '../../layout/Spinner';

const EditCategory = ({ match, loadCategory, editCategory, editLoading }) => {
  useEffect(() => {
    loadCategory(match.params._id);
  }, []);
  const [cardsSet, setCardSet] = useState(editCategory);

  return (
    <div>
      {editLoading ? (
        <Spinner />
      ) : (
        editCategory.cards.map((card) => (
          <EditCard key={card._id} card={card} categoryId={match.params._id} />
        ))
      )}
      <CardForm categoryId={match.params._id} />
    </div>
  );
};

EditCategory.propTypes = {
  loadCategory: PropTypes.func.isRequired,
  editLoading: PropTypes.bool.isRequired,
  editCategory: PropTypes.object,
};

const mapStateToProps = (state) => ({
  editCategory: state.category.editCategory,
  editLoading: state.category.editLoading,
});
export default connect(mapStateToProps, { loadCategory })(EditCategory);
