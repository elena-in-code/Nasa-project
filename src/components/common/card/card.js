import React from 'react';
import PropTypes from 'prop-types';

import './card.scss';

const Card = (props) => {
  const { cardTitle, image, imageAlt, description, audio, video, key } = props;

  return (
    <div className="card__wrapper" key={key}>
      <h3>{cardTitle}</h3>
      {image && !video && (
        <img className="card__image" src={image} alt={imageAlt} />
      )}
      {audio && <audio controls src={audio} />}
      {video && (
        <video
          className="card__image"
          controls
          src={video}
          width="100%"
          type="video/mp4"
          poster={image}
        />
      )}
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
  video: PropTypes.string,
  key: PropTypes.string,
};

Card.defaultProps = {
  cardTitle: '',
  image: '',
  imageAlt: '',
  description: '',
  audio: '',
  video: '',
  key: '',
};

export default Card;
