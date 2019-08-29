import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import GreetingsMessage from './GreetingsMessage';
import MessageDialog from './MessageDialog';
import InteractionMessage from './InteractionMessage';
import { generateKey } from '../../../utils/helpers';

const Message = (props) => {
  const { currentMessage, action } = props;
  const { openAttendeesModal } = action;
  const { text, type } = currentMessage;
  const key = generateKey(text, type);
  return (
    <View>
      {{
        'true-false-false': <InteractionMessage
          {...props}
          action={openAttendeesModal}
          text="invite attendees for this meeting"
          icon="ios-calendar"
          AcceptedPrcolor="#ffffff"
          NotAcceptedPrcolor="#0459E4"
          AcceptedBgcolor="#0459E4"
          NotAcceptedBgcolor="#ECF1FA"
        />,
        'false-false-true': <GreetingsMessage {...props} />,
        'false-true-false': <MessageDialog {...props} />,
        'false-false-false': <MessageDialog position="left" {...props} />
      }[key]}
    </View>
  );
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
