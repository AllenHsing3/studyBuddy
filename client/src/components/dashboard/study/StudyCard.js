import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flagCard } from '../../../actions/study';

const StudyCard = ({
  card: { front, back, markedForDeletion, _id },
  categoryId,
  flagCard,
}) => {
  const [side, toggleSide] = useState(true);
  const onClick = (e) => {
    e.preventDefault();
    flagCard(categoryId, _id);
  };
  return (
    <div>
      <div onClick={(e) => toggleSide(!side)}>{side ? front : back}</div>
      <button onClick={(e) => onClick(e)}>
        <i class="fas fa-check"></i>
      </button>
    </div>
  );
};

StudyCard.propTypes = {};

export default connect(null, { flagCard })(StudyCard);
