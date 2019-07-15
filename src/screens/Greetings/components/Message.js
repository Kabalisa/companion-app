import React from 'react';
import PropTypes from 'prop-types';
import GreetingsMessage from './GreetingsMessage';
import SystemMessage from './SystemMessage';
import UserMessage from './UserMessage';

const Message = (props) => {
  const { currentMessage } = props;

  if (currentMessage._id === 1) {
    return <GreetingsMessage {...props} />;
  }
  if (currentMessage.user._id !== 2) {
    return <UserMessage {...props} />;
  }
  return <SystemMessage {...props} />;
};

Message.propTypes = {
  currentMessage: PropTypes.shape({
    _id: PropTypes.number,
    user: PropTypes.objectOf(PropTypes.any)
  })
};

Message.defaultProps = {
  currentMessage: {}
};

export default Message;
