import React from 'react';
import {
  Image, SafeAreaView, Text, View, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Slide = ({
  slideImg,
  page1,
  page2,
  page3,
  slideTitle,
  bodyText,
  subBody,
  skipOnBoarding
}) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerFlex}>
      <Image style={styles.header} source={slideImg} resizeMode="contain" />
      <View style={styles.pagination}>
        <View style={styles[page1]} />
        <View style={styles[page2]} />
        <View style={styles[page3]} />
      </View>
    </View>
    <View style={styles.body}>
      <View style={styles.alignBody}>
        <Text style={styles.title}>{slideTitle}</Text>
        <Text style={styles.bodyText}>{bodyText}</Text>
        <Text style={styles.boldText}>{subBody}</Text>
      </View>
      <Text style={styles.buttomText}>Swipe right to continue</Text>
      <TouchableOpacity
        onPress={skipOnBoarding}
        style={{ marginTop: 10 }}
      >
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <Text
            style={{
              ...styles.buttomText,
              textDecorationLine: 'underline'
            }}
          >
            Skip
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

Slide.propTypes = {
  slideImg: PropTypes.node.isRequired,
  page1: PropTypes.string.isRequired,
  page2: PropTypes.string.isRequired,
  page3: PropTypes.string.isRequired,
  slideTitle: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  subBody: PropTypes.string,
  skipOnBoarding: PropTypes.func.isRequired
};

Slide.defaultProps = {
  subBody: ''
};

export default Slide;
