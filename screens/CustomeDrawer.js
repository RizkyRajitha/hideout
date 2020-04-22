import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

class CustomeDrawer extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.sidenavmainview}>
        <Image
          style={styles.profilePicture}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/7/7f/Emma_Watson_2013.jpg',
          }}
        />
        <View style={styles.buttongroupview}>
          <Text style={styles.credits}>RiZKY's </Text>
          <Text style={styles.credits}>HIDEOUT</Text>
        </View>
        <View style={styles.buttongroupview}>
          <TouchableOpacity
            style={styles.logoutbtn}
            onPress={() => {
              AsyncStorage.removeItem('jwt');
              this.props.navigation.navigate('Login');
            }}>
            <Text>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CustomeDrawer;

const styles = StyleSheet.create({
  buttongroupview: {
    // flexDirection:"row",
    // flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },

  logoutbtn: {
    width: 160,

    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#5bcd04',
  },
  sidenavmainview: {
    backgroundColor: '#212121',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 100,
  },
  credits: {
    color: 'white',
  },
});
