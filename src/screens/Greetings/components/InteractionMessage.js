import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MessageDialog from './MessageDialog';
import SuggestionMessage from './SuggestionMessage';

const InteractionMessage = (props) => {
  const {
    action,
    text,
    icon,
    AcceptedPrcolor,
    NotAcceptedPrcolor,
    AcceptedBgcolor,
    NotAcceptedBgcolor
  } = props;
  return (
    <View>
      <MessageDialog {...props} />
      <SuggestionMessage
        action={action}
        text={text}
        icon={icon}
        AcceptedPrcolor={AcceptedPrcolor}
        NotAcceptedPrcolor={NotAcceptedPrcolor}
        AcceptedBgcolor={AcceptedBgcolor}
        NotAcceptedBgcolor={NotAcceptedBgcolor}
      />
    </View>
  );
};

InteractionMessage.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  action: PropTypes.func,
  AcceptedPrcolor: PropTypes.string,
  NotAcceptedPrcolor: PropTypes.string,
  AcceptedBgcolor: PropTypes.string,
  NotAcceptedBgcolor: PropTypes.string
};

InteractionMessage.defaultProps = {
  text: '',
  icon: '',
  action: () => {},
  AcceptedPrcolor: '',
  NotAcceptedPrcolor: '',
  AcceptedBgcolor: '',
  NotAcceptedBgcolor: ''
};

export default InteractionMessage;
