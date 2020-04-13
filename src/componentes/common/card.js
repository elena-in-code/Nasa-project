import React from 'react';
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

export default Card;