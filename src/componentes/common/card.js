import React from 'react';
import PropTypes from 'prop-types';

import './card.scss';

const Card = (props) => {
  const { cardTitle, image, imageAlt, description, audio } = props;

  return (
    <div className="card__wrapper">
      <h3>{cardTitle}</h3>
      {image && <img className="card__image" src={image} alt={imageAlt} />}
      {audio && <audio controls src={audio} />}
      <p>{description}</p>
    </div>
  );
};

Card.propTypes = {
  cardTitle: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  description: PropTypes.string,
  audio: PropTypes.string,
};

Card.defaultProps = {
  cardTitle: '',
  image: '',
  imageAlt: '',
  description: '',
  audio: '',
};

export default Card;
