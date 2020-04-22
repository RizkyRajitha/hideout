import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage,
  Button,
  BackHandler,
  Alert,
  SafeAreaView,
  ToastAndroid,
  YellowBox,
} from 'react-native';
// import {Item} from '../src/components/item';
import NoteCard from '../src/components/card';
import Sorting from '../src/components/Sorting';
import NetInfo from '@react-native-community/netinfo';
import {getofflinedata, handleCheck} from '../util/helper';
import {NavigationEvents} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
  'AsyncStorage', // TODO: Remove when fixed
  'Deprecation ', // TODO: Remove when fixed
]);
const API = 'https://gonotesrizky.herokuapp.com/';
export class Home extends Component {
  state = {
    notes: [],
    isConnected: false,
    refreshing: false,
    modalVisible: false,
  };

  componentDidMount() {
    AsyncStorage.getItem('jwt')
      .then((tk) => {
        if (!tk) {
          this.props.navigation.replace('Login');
        }
        this.refresh();
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          this.backAction,
        );
        // this.refresh();
        this.netinfoUnsubscribe = NetInfo.addEventListener(
          this.handleConnectivityChange,
        );
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    // this.backHandler.remove();
    if (this.netinfoUnsubscribe) {
      this.netinfoUnsubscribe();
      this.netinfoUnsubscribe = null;
    }
  }

  handleConnectivityChange = (connection) => {
    if (connection.isConnected) {
      ///offlinesyncadd
      handleCheck();
    }
  };

  _onRefresh = () => {
    this.setState({refreshing: true});

    console.log('refreshing....');

    this.refresh();
  };

  refresh = () => {
    // AsyncStorage.removeItem('newofflinenotes').then()

    NetInfo.fetch().then((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (state.isConnected) {
        AsyncStorage.getItem('jwt').then((tk) => {
          console.log(tk);
          fetch(`${API}/api/getall`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: tk,
            },
          })
            .then((res) => {
              console.log(res);
              if (!res.ok) {
              } else {
                return res.json();
              }
            })
            .catch((err) => console.log(err.status))
            .then((data) => {
              console.log(data);

              AsyncStorage.setItem('data', JSON.stringify(data))
                .then((st) => {
                  console.log(st);
                  console.log('updated notes');
                  ToastAndroid.show('Refreshed', ToastAndroid.SHORT);
                })
                .catch((err) => console.log(err));

              this.setState({notes: data, refreshing: false});
              // this.setState({});
              // setnotes(data);
            })
            .catch((err) => console.log(err));
        });
      } else {
        getofflinedata().then((offlinedata) => {
          console.log('render data offline');
          this.setState({notes: offlinedata.reverse(), refreshing: false});
          // ToastAndroid.show('Refreshed offline data', ToastAndroid.SHORT);
          // this.setState({});
        });
      }
    });
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 100,
              marginLeft: 15,
            }}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/7/7f/Emma_Watson_2013.jpg',
            }}
          />
        </TouchableOpacity>
      ),
      headerTitle: 'HIDEOUT',
      headerTitleStyle: {
        marginTop: 11,
        flexGrow: 1,
        color: '#ffffff',
      },
      headerStyle: {backgroundColor: '#212121'},
    };
  };

  handlecardnavigation = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  };

  handleNavigation = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    this.props.navigation.navigate('AddNote');
  };

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

  onlongPressCard = (noteid) => {
    console.log('delete - ' + noteid);
    this.setModalVisible(true);
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.parentView}>
        <NavigationEvents
          onDidFocus={() => {
            BackHandler.addEventListener('hardwareBackPress', this.backAction);
            console.log('I am triggered');
            this.refresh();
          }}
        />
        <StatusBar backgroundColor="#212121" barStyle="light-content" />

        {/* <Button
          title="debug"
          onPress={() => {
            AsyncStorage.getAllKeys().then((keys) => {
              console.log(keys);
              AsyncStorage.multiGet(keys).then((data) => console.log(data));
            });
            // AsyncStorage.multiGet();
          }}
        />
        <Button
          title="cleare edit offline"
          onPress={() => {
            AsyncStorage.removeItem('newofflineedits').then((keys) => {
              // console.log(keys);
              // AsyncStorage.multiGet(keys).then((data) => console.log(data));
            });
            // AsyncStorage.multiGet();
          }}
        />

        <Button
          title="cleare all data"
          onPress={() => {
            AsyncStorage.removeItem('newofflineedits').then((keys) => {
              // console.log(keys);
              // AsyncStorage.multiGet(keys).then((data) => console.log(data));
            });
            AsyncStorage.removeItem('data').then((keys) => {
              // console.log(keys);
              // AsyncStorage.multiGet(keys).then((data) => console.log(data));
            });
            AsyncStorage.removeItem('newofflinenotes').then((keys) => {
              // console.log(keys);
              // AsyncStorage.multiGet(keys).then((data) => console.log(data));
            });
            // AsyncStorage.multiGet();
          }}
        /> */}

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <StatusBar backgroundColor="black" barStyle="dark-content" />
          <View style={styles.popUp}>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.add}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.close}>close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <FlatList
              style={styles.flatList}
              data={this.state.notes}
              numColumns={1}
              keyExtractor={(item) =>
                item.id ? item.id.toString() : parseInt(Math.random() * 10)
              }
              renderItem={({item}) => {
                return (
                  <NoteCard
                    onlongPressCard={this.onlongPressCard}
                    handlecardnavigation={this.handlecardnavigation}
                    item={item}
                    navigation={this.props.navigation}
                  />
                );
              }}
            />
          </ScrollView>
        </SafeAreaView>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={this.handleNavigation}>
          <Text style={styles.actionButtonLogo}>+</Text>
        </TouchableOpacity>
        <View style={styles.bittempading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: '#212121',
    flex: 1,
    position: 'relative',
  },
  search: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 50,
    paddingHorizontal: 25,
    fontSize: 20,
  },
  flatList: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  actionButton: {
    width: 70,
    height: 70,
    backgroundColor: '#5bcd04',
    borderRadius: 100,
    position: 'absolute',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    right: 30,
    // backgroundColor: '#47E10C',
  },
  actionButtonLogo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  isLoading: {
    marginTop: 100,
  },
  isError: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 100,
  },
  bittempading: {
    marginBottom: 10,
  },
  addCategory: {
    paddingLeft: 40,
    marginVertical: 15,
    flexDirection: 'row',
  },
  textAdd: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    left: 20,
    bottom: 2,
  },
  popUp: {
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    elevation: 20,
    borderRadius: 5,
    paddingVertical: 15,
    top: '30%',
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 20,
    right: 20,
  },
  close: {
    fontSize: 20,
    color: 'grey',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  add: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  categoryInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#00D4AA',
    marginHorizontal: 40,
    fontSize: 17,
    padding: 15,
  },
});
