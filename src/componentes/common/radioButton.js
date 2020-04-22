import React from 'react';
import PropTypes from 'prop-types';
import './radioButton.scss';

const RadioButton = (props) => {
  const { checked, onChange } = props;

  return (
    <div className="radio-button__wrapper">
      <div className="radio-button__section">
        <input
          className="radio-button__input"
          type="radio"
          id="all"
          name="mediaRadioButtons"
          value="all"
          checked={checked === 'all'}
          onChange={onChange}
        />
        <label htmlFor="all">All</label>
      </div>

      <div className="radio-button__section">
        <input
          className="radio-button__input"
          type="radio"
          id="images"
          name="mediaRadioButtons"
          value="image"
          checked={checked === 'image'}
          onChange={onChange}
        />
        <label htmlFor="images">Images</label>
      </div>

      <div className="radio-button__section">
        <input
          className="radio-button__input"
          type="radio"
          id="audios"
          name="mediaRadioButtons"
          value="audio"
          checked={checked === 'audio'}
          onChange={onChange}
        />
        <label htmlFor="audios">Audios</label>
      </div>

      <div className="radio-button__section">
        <input
          className="radio-button__input"
          type="radio"
          id="videos"
          name="mediaRadioButtons"
          value="video"
          checked={checked === 'video'}
          onChange={onChange}
        />
        <label htmlFor="videos">Videos</label>
      </div>
    </div>
  );
};

RadioButton.propTypes = {
  checked: PropTypes.string,
  onChange: PropTypes.func,
};

RadioButton.defaultProps = {
  checked: 'all',
  onChange: () => {},
};

export default RadioButton;
