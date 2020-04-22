import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export const Item = ({text, key}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text key={key} style={styles.text}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomColor: '#5859f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
  },
  text: {
    // color: '#4F50DC',
    fontSize: 18,
    marginVertical: 20,
    paddingLeft: 10,
  },
});
