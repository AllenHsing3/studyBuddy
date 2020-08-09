import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { loadStudy } from '../../../actions/study';
import { useState } from 'react';
import StudyCard from './StudyCard';

const Study = ({ match, loadStudy, loading, cards, cardDisplayed }) => {
  useEffect(() => {
    loadStudy(match.params._id);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        cards.map((card) => (
          <StudyCard categoryId={match.params._id} card={card} />
        ))
      )}
    </div>
  );
};

Study.propTypes = {
  loadStudy: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  cardDisplayed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.study.loading,
  cards: state.study.cards,
  cardDisplayed: state.study.cardDisplayed,
});

export default connect(mapStateToProps, { loadStudy })(Study);
