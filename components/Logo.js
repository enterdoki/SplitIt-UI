import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/bill.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 85,
    height: 85,
    marginBottom: 12,
  },
});

export default memo(Logo);
