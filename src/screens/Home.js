import React from 'react';
import {
  View, Image, SafeAreaView, Text
} from 'react-native';
import styles from '../shared/styles/splashLogin';
import AndelaLogo from '../assets/andela.png';
import AppLogo from '../assets/icon.png';

const Home = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <View style={styles.appLogoContainer}>
        <Image source={AppLogo} style={styles.appLogo} />
      </View>
    </View>

    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Companion</Text>
      </View>
      <View style={styles.andelaLogoContainer}>
        <Image
          source={AndelaLogo}
          style={styles.andelaLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  </SafeAreaView>
);

export default Home;
