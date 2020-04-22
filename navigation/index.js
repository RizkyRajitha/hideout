import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Login from '../screens/login';
import {Home} from '../screens/home';
import EditNote from '../screens/EditNote';
import AddNote from '../screens/AddNote';
import CustomeDrawer from '../screens/CustomeDrawer';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
      },
      headerLeft: null,
    },
    Home: Home,
    AddNote: AddNote,
    EditNote: EditNote,
  },
  {headerLayoutPreset: 'center'},
);

const AppNavigator = createDrawerNavigator(
  {
    Home: StackNavigator,
  },
  {
    contentComponent: CustomeDrawer,
  },
);

const RootNavigator = createAppContainer(AppNavigator);

export default RootNavigator;
