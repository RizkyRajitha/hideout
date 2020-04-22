import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
  TextInput,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';

const API = 'https://gonotesrizky.herokuapp.com';
class Login extends Component {
  state = {
    email: '',
    password: '',
    logedin: true,
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: null,
      drawerLockMode: 'locked-closed',
      headerTitle: 'HIDEOUT',
      headerTitleStyle: {
        marginTop: 14,
        flexGrow: 1,
        color: '#ffffff',
      },
      headerStyle: {backgroundColor: '#212121'},
    };
  };

  setToken = async (token) => {
    await AsyncStorage.setItem('jwt', token).then(async (val) => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      // props.navigation.navigate('AddTask');
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    // this.backHandler.remove();
  }

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go Exit', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    AsyncStorage.getItem('jwt')
      .then((tk) => {
        console.log(tk);

        if (tk) {
          this.props.navigation.replace('Home');
          this.setState({logedin: true});
        } else {
          this.setState({logedin: false});
        }
      })
      .catch((err) => console.log(err));
  }

  onLogin = () => {
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          this.setToken(data.token);
          this.props.navigation.replace('Home');
        } else if (data.msg === 'Invalid_password') {
          Alert.alert('Invalid password');
        } else if (data.msg === 'Invalid_email') {
          Alert.alert('Invalid Email');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <View style={styles.sidenavmainview}>
        {!this.state.logedin ? (
          <>
            <Image
              style={styles.profilePicture}
              source={require('../assets/cabin.png')}
            />
            <StatusBar backgroundColor="#212121" barStyle="light-content" />
            <View>
              <TextInput
                textContentType="username"
                style={styles.TextInputstyle}
                placeholderTextColor="#ffffff"
                placeholder="Username"
                onChangeText={(email) => this.setState({email: email})}
              />
              <TextInput
                textContentType="password"
                secureTextEntry={true}
                style={styles.TextInputstyle}
                placeholderTextColor="#ffffff"
                placeholder="Password"
                onChangeText={(password) => this.setState({password: password})}
              />

              <View style={styles.buttongroupview}>
                <TouchableOpacity
                  style={styles.loginbtn}
                  onPress={() => {
                    this.onLogin();
                  }}>
                  <Text>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 0.1}}></View>
          </>
        ) : null}
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  buttongroupview: {
    // flexDirection:"row",
    // flex: 5,
    marginTop: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  TextInputstyle: {textAlign: 'center', color: '#ffffff'},
  loginbtn: {
    width: 160,

    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#5bcd04',
  },
  sidenavmainview: {
    padding: 20,
    backgroundColor: '#212121',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  profilePicture: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    // borderRadius: 100,
  },
});
