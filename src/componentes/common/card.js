import React from 'react';
import PropTypes from 'prop-types'; 

import './card.css';

const Card = props => {
  const { cardTitle, image, imageAlt, description } = props;
  
  return (
    <div className='card__wrapper'>
      <h3>{cardTitle}</h3>
      {image && <img className='card__image' src={image} alt={imageAlt} />}
      <p>{description}</p>
    </div>
  );
};

Card.propTypes = {
  cardTitle: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  description: PropTypes.string
}

Card.defaultProps = {
  cardTitle: '',
  image: '',
  imageAlt: '',
  description: ''
};

export default Card;