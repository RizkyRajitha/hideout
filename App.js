import React from 'react';
import RootNavigator from './navigation/index';

export default function App() {
  return <RootNavigator />;
}

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Button,
//   ToastAndroid,
//   TextInput,
//   AsyncStorage,
//   TouchableOpacity,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import TouchID from 'react-native-touch-id';
// const STORAGE_KEY = '@save_name';

// const App: () => React$Node = () => {
//   const optionalConfigObject = {
//     title: 'Authentication Required', // Android
//     imageColor: '#e00606', // Android
//     imageErrorColor: '#ff0000', // Android
//     sensorDescription: 'Touch sensor', // Android
//     sensorErrorDescription: 'Failed', // Android
//     cancelText: 'Cancel', // Android
//     // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
//     unifiedErrors: true, // use unified error messages (default false)
//     // passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
//   };

//   const [name, setname] = useState('');
//   const [text, settext] = useState('');
//   const addData = async () => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, text);
//       alert('Data successfully saved!');
//       // setname({name});
//     } catch (e) {
//       alert('Failed to save name.');
//     }
//   };

//   const getData = async () => {
//     try {
//       const name = await AsyncStorage.getItem(STORAGE_KEY);

//       console.log(name);
//       if (name !== null) {
//         // setname(name);
//       }
//     } catch (e) {
//       console.log(e);
//       alert('Failed to load name.');
//     }
//   };

//   const touchOuth = () => {
//     console.log('uuu lala');
//     ToastAndroid.show('holar', ToastAndroid.SHORT);
//     TouchID.isSupported(optionalConfigObject)
//       .then((res) => {
//         console.log(res);
//         if (res) {
//           TouchID.authenticate(
//             'to demo this react-native component',
//             optionalConfigObject,
//           )
//             .then((success) => {
//               console.log(success);
//               // Success code
//             })
//             .catch((error) => {
//               console.log(error);
//               // Failure code
//             });
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const onSubmitEditing = () => {
//     addData();
//   };

//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       {/* <SafeAreaView> */}
//       {/* <Button onPress={() => touchOuth()} title="press" />*/}
//       <Button onPress={() => getData()} title="getdata" />

//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           value={text}
//           placeholder="Type your name, hit enter, and refresh"
//           onChangeText={(e) => settext(e)}
//           onSubmitEditing={onSubmitEditing}
//         />
//         <Text style={styles.text}>Hello {text}!</Text>
//         {/* <TouchableOpacity
//             onPress={this.removeEverything}
//             style={styles.button}>
//             <Text style={styles.buttonText}>Clear Storage</Text>
//           </TouchableOpacity> */}
//       </View>
//       {/* </SafeAreaView> */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 20,
//     padding: 10,
//     backgroundColor: '#00ADCF',
//   },
//   input: {
//     padding: 15,
//     height: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     margin: 10,
//   },
//   button: {
//     margin: 10,
//     padding: 10,
//     backgroundColor: '#FF851B',
//   },
//   buttonText: {
//     fontSize: 14,
//     color: '#fff',
//   },

//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
