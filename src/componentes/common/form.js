import React from 'react';
import './form.css';

const Form = props => {
  const { onClick, value, onChange } = props;
  
  return (
    <div className='form__container'>
      <label>
        <input className='form__input' type="text" value={value} onChange={onChange} />
      </label>
      <button className='form__button' onClick={onClick}>
        Search
      </button>
    </div>
  );
};

export default Form;
