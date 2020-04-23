import React from 'react';
import PropTypes from 'prop-types'; 
import './message.scss';

const Message = props => {
  const { messageText, messageStatusClassName } = props;
  
  return (
    <div className="message__wrapper">
      <p className={`message__wrapper--${messageStatusClassName}`}>{messageText}</p>
    </div>
  );
};

Message.propTypes = {
  messageText: PropTypes.string,
  messageStatusClassName: PropTypes.oneOf(['info', 'warning', 'error'])
}

Message.defaultProps = {
  messageText: '',
  messageStatusClassName: 'info'
};

export default Message;