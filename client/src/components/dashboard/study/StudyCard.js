import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flagCard } from '../../../actions/study';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
  },
  cardContent: {
    flexGrow: 1,
  },
  flipCard: {
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
  flipCardBack: {
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(360deg)',
  },
  markedCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'transparent',
    textShadow: '0 0 5px rgba(0,0,0,0.5)',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
}));

const StudyCard = ({
  card: { front, back, markedForDeletion, _id },
  categoryId,
  flagCard,
}) => {
  const classes = useStyles();
  const [side, toggleSide] = useState(true);
  const [cardFlip, toggleCardFlip] = useState(false);
  const [flagged, toggleFlag] = useState(markedForDeletion);
  const onClick = (e) => {
    e.preventDefault();
    flagCard(categoryId, _id);
    toggleFlag(!flagged);
  };
  return (
    <div>
      <Card
        onDoubleClick={(e) => onClick(e)}
        className={
          flagged
            ? `${classes.markedCard} ${classes.flipCard}`
            : side
            ? `${classes.flipCard} ${classes.flipCardBack}`
            : classes.card
        }
      >
        <CardContent onClick={(e) => toggleSide(!side)}>
          <Typography align="center">{side ? front : back}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

StudyCard.propTypes = {};

export default connect(null, { flagCard })(StudyCard);
