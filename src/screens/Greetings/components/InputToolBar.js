import React from 'react';

import { InputToolbar } from 'react-native-gifted-chat';
import styles from './styles';

const InputBox = props => (
  <InputToolbar
    {...props}
    placeholder="Say something ..."
    primaryStyle={styles.inputPrimary}
    containerStyle={styles.inputToolBar}
  />
);

export default InputBox;
