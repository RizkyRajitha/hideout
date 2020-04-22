import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  StyleSheet,
  Image,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import {handleCheckedit} from '../util/helper';
import {ScrollView} from 'react-native-gesture-handler';

export default class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.title,
      note: this.props.navigation.state.params.note,
      // selectedCategory: this.props.navigation.state.params.category_name,
    };
  }

  // componentDidMount() {
  //   this.backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.backAction,
  //   );
  // }

  // componentWillMount() {
  //   this.backHandler.remove();
  // }

  titleChange = (value) => {
    this.setState({
      title: value,
    });

    console.log('title changed = ' + value);

    handleCheckedit(
      this.props.navigation.state.params.id,
      this.state.note,
      this.props.navigation.state.params.offline,
      value,
    );
  };

  noteChange = (value) => {
    this.setState({
      note: value,
    });

    console.log(this.props.navigation.state.params);

    handleCheckedit(
      this.props.navigation.state.params.id,
      value,
      this.props.navigation.state.params.offline,
      this.state.title,
    );

    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
  };

  static navigationOptions = {
    headerTintColor: 'white',
    headerTitle: 'EDIT THIS HIDEOUT',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow: 1,
    },
    headerTitleStyle: {
      marginTop: 11,
      flexGrow: 1,
      color: '#ffffff',
    },
    headerStyle: {backgroundColor: '#212121'},
    headerRight: (
      <TouchableOpacity style={{marginRight: 15}}>
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/7/7f/Emma_Watson_2013.jpg',
          }}
        />
      </TouchableOpacity>
    ),
  };

  render() {
    return (
      <View style={styles.ParentView}>
        <ScrollView style={styles.scrollview}>
          <TextInput
            style={styles.title}
            value={this.state.title}
            onChangeText={this.titleChange}
            placeholder="ADD TITLE ..."
            placeholderTextColor="#ffffff"
          />
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.description}
            value={this.state.note}
            multiline={true}
            numberOfLines={10}
            onChangeText={this.noteChange}
            placeholder="whats on your mind sire"
          />
        </ScrollView>
        <View style={styles.timesview}>
          <Text style={styles.timeviewtext}>
            {' '}
            Created :{' '}
            {moment(this.props.navigation.state.params.created).fromNow()}
          </Text>
          <Text style={styles.timeviewtext}>
            {' '}
            Updated :{' '}
            {moment(this.props.navigation.state.params.updated).fromNow()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ParentView: {
    flex: 1,
    backgroundColor: '#212121',
  },
  title: {
    margin: 10,
    fontSize: 20,
    textAlignVertical: 'top',
    color: 'white',
  },
  description: {
    margin: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    color: 'white',
  },

  timeviewtext: {
    fontSize: 10,
    color: 'white',
  },

  timesview: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
});
