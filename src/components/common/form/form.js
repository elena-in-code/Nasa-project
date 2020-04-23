import React from 'react';
import PropTypes from 'prop-types'; 
import './form.scss';

const Form = props => {
  const { onClick, value, onChange, buttonText, showInput } = props;
  
  return (
    <div className='form__container'>
      <label>
        {showInput && <input id='form__input' className='form__input' type="text" value={value} onChange={onChange} placeholder="Start typing..." />}
      </label>
      <button className='form__button' onClick={onClick}>
        {buttonText} 
      </button>
    </div>
  );
};

Form.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  showInput: PropTypes.bool
}

Form.defaultProps = {
  onClick: PropTypes.func,
  value: '',
  onChange: PropTypes.func,
  buttonText: '',
  showInput: false
};

export default Form;
