import React from 'react';
import PropTypes from 'prop-types';
import GreetingsMessage from './GreetingsMessage';
import MessageDialog from './MessageDialog';
import InteractionMessage from './InteractionMessage';

const Message = (props) => {
  const { currentMessage, action } = props;
  const { openAttendeesModal } = action;
  if (currentMessage.text === 'Do you want to invite people to the meeting?') {
    return (
      <InteractionMessage
        {...props}
        action={openAttendeesModal}
        text="invite attendees for this meeting"
        icon="ios-calendar"
        AcceptedPrcolor="#ffffff"
        NotAcceptedPrcolor="#0459E4"
        AcceptedBgcolor="#0459E4"
        NotAcceptedBgcolor="#ECF1FA"
      />
    );
  }
  if (currentMessage._id === 1) {
    return <GreetingsMessage {...props} />;
  }
  if (currentMessage.user._id !== 2) {
    return <MessageDialog {...props} />;
  }
  return <MessageDialog position="left" {...props} />;
};

Message.propTypes = {
  currentMessage: PropTypes.shape({
    user: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string,
    text: PropTypes.any,
    _id: PropTypes.any
  }),
  action: PropTypes.shape({
    openAttendeesModal: PropTypes.func.isRequired
  })
};

Message.defaultProps = {
  currentMessage: {
    type: null,
    text: ''
  },
  action: () => {}
};

export default Message;
