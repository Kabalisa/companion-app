import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import GreetingsMessage from './GreetingsMessage';
import MessageDialog from './MessageDialog';
import InteractionMessage from './InteractionMessage';
import EventDurationQueryMessage from './EventDurationQueryMessage';
import { generateKey } from '../../../utils/helpers';

const interactionMessageStylingProps = {
  text: 'invite attendees for this meeting',
  icon: 'ios-calendar',
  AcceptedPrcolor: '#ffffff',
  NotAcceptedPrcolor: '#0459E4',
  AcceptedBgcolor: '#0459E4',
  NotAcceptedBgcolor: '#ECF1FA'
};
const Message = (props) => {
  const { currentMessage, action } = props;
  const { openAttendeesModal } = action;
  const { text, type } = currentMessage;
  const key = generateKey(text, type);
  return (
    <View>
      {
        {
          'true-false-false-false': (
            <InteractionMessage
              {...props}
              {...interactionMessageStylingProps}
              action={openAttendeesModal}
            />
          ),
          'false-false-true-false': <GreetingsMessage {...props} />,
          'false-true-false-false': <MessageDialog {...props} />,
          'false-false-false-true': <EventDurationQueryMessage {...props} />,
          'false-false-false-false': <MessageDialog position="left" {...props} />
        }[key]
      }
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
