import React from 'react';
import PropTypes from 'prop-types';
import GreetingsMessage from './GreetingsMessage';
import SuggestionMessage from './SuggestionMessage';
import SystemMessage from './SystemMessage';
import UserMessage from './UserMessage';

const Message = (props) => {
  const { currentMessage } = props;

  if (currentMessage.type === 'suggestion') {
    return <SuggestionMessage text={currentMessage.text} icon="md-walk" />;
  }
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
    user: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string,
    text: PropTypes.any.isRequired,
    _id: PropTypes.any
  })
};

Message.defaultProps = {
  currentMessage: {
    type: null
  }
};

export default Message;
