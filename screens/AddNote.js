import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  AsyncStorage,
} from 'react-native';
const API = 'https://gonotesrizky.herokuapp.com';

import NetInfo from '@react-native-community/netinfo';
export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  static navigationOptions = {
    headerTitle: "HIDE SOMETHING NEW",
    headerTintColor: 'white',
    headerStyle: {backgroundColor: '#212121'},
    headerTitleStyle: {
      marginTop: 11,
      textAlign: 'center',
      flexGrow: 1,
      color: 'white',
    },
  };

  addnote = () => {
    console.log(this.state.description + ' ' + this.state.title);

    NetInfo.fetch().then((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (state.isConnected) {
        var payload = JSON.stringify({
          note: this.state.description,
          title: this.state.title,
        });

        AsyncStorage.getItem('jwt')
          .then((tk) => {
            console.log(tk);
            fetch(`${API}/api/add`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: tk,
              },
              body: payload,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                this.props.navigation.navigate('Home');
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        var addedtime = new Date(new Date().toISOString());

        // var tzDifference = addedtime.getTimezoneOffset() + 5.5 * 60;
        // //convert the offset to milliseconds, add to targetTime, and make a new Date
        // var offsetTime = new Date(
        //   addedtime.getTime() + tzDifference * 60 * 1000,
        // );

        var offlinepayload = {
          offline: true,
          id: Math.floor(Math.random() * 10000),
          note: this.state.description,
          title: this.state.title,
          created: addedtime.toISOString(),
          updated: addedtime.toISOString(),
        };

        AsyncStorage.getItem('newofflinenotes')
          .then((previousofflineitems) => {
            console.log('offline new' + previousofflineitems);

            if (!previousofflineitems) {
              console.log('                  no previous offline notes ');

              var total = [offlinepayload];

              console.log(total);

              AsyncStorage.setItem('newofflinenotes', JSON.stringify(total))
                .then((ds) => {
                  console.log('dsdssd - ' + ds);
                  this.props.navigation.navigate('Home');
                })
                .catch((err) => console.log(err));
            } else {
              console.log('                  have previous offline notes ');

              var total = [offlinepayload, ...JSON.parse(previousofflineitems)];

              console.log(total);

              AsyncStorage.setItem('newofflinenotes', JSON.stringify(total))
                .then((ds) => {
                  console.log('dsdssd - ' + ds);
                  this.props.navigation.navigate('Home');
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  render() {
    return (
      <View style={styles.ParentView}>
        <ScrollView>
          <TextInput
            placeholderTextColor="#ffffff"
            onChangeText={(text) => this.setState({title: text})}
            style={styles.title}
            placeholder="What should we call it ?"
          />
          <TextInput
            placeholderTextColor="#ffffff"
            onChangeText={(text) => this.setState({description: text})}
            style={styles.description}
            multiline={true}
            numberOfLines={10}
            placeholder="Okay now what ?"
          />
        </ScrollView>

        <View style={styles.buttongroupview}>
          <TouchableOpacity
            style={styles.addbtn}
            onPress={() => this.addnote()}>
            <Text>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttongroupview: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },

  addbtn: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#5bcd04',
  },

  ParentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#212121',

    padding: 10,
  },
  title: {color: 'white', fontSize: 20, textAlignVertical: 'top'},
  description: {color: 'white', fontSize: 16, textAlignVertical: 'top'},
});
