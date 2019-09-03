import React from 'react';
import { View } from 'react-native';
import MessageDialog from './MessageDialog';
import SuggestionMessage from './SuggestionMessage';
import {
  interactionMessageProps,
  interactionMessageDefaultProps
} from './propsDefinition';

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
  ...interactionMessageProps
};

InteractionMessage.defaultProps = {
  ...interactionMessageDefaultProps,
  AcceptedPrcolor: '',
  NotAcceptedPrcolor: '',
  AcceptedBgcolor: '',
  NotAcceptedBgcolor: ''
};

export default InteractionMessage;
