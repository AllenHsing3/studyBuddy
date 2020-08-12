import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flagCard } from '../../../actions/study';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,

  },
  markedCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'transparent',
    textShadow: '0 0 5px rgba(0,0,0,0.5)'
    
  }
}));

const StudyCard = ({
  card: { front, back, markedForDeletion, _id },
  categoryId,
  flagCard,
}) => {
  const classes = useStyles();
  const [side, toggleSide] = useState(true);
  const [flagged, toggleFlag] = useState(markedForDeletion);
  const onClick = (e) => {
    e.preventDefault();
    flagCard(categoryId, _id);
    toggleFlag(!flagged);
  };
  return (
    <div>
      <Card onDoubleClick={(e) => onClick(e)} className={flagged ? classes.markedCard: classes.card}>
        <CardContent onClick={(e) => toggleSide(!side)}>
          <Typography align='center'>{side ? front : back}</Typography>
        </CardContent>
        <CardActions>
          {/* <Button onDoubleClick={(e) => onClick(e)}>
            {flagged ? 'Flagged' : 'Flag'}
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
};

StudyCard.propTypes = {};

export default connect(null, { flagCard })(StudyCard);
