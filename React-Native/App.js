import React from 'react';
import { StyleSheet, Text, View,ScrollView, Dimensions } from 'react-native';
import MyHeader from './components/MyHeader';
import { TextInput,Card, List, Button } from 'react-native-paper';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SearchScreen from './components/SearchScreen';
import HomeScreen from './components/HomeScreen';
import SettingScreen from './components/settings';
import AddFarm from  './components/addfarm'
import Plant from './components/plants'
import Pest from './components/pests'
import SideMenu from './components/sidemenu'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Login from './components/LoginScreen'
import Signup from './components/SignupScreen'
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator} from 'react-navigation-stack';
import CameraPage from './components/image'
import Profile from './components/profile'
import fetchimages from './components/restaurantimages'
import Write from './components/writepost'
import ContactUs from './components/contactus'
import Posts from './components/posts'
import * as fire from 'firebase';
import NotificationsScreen from './components/notifications';
import ProfileScreen from './components/profile';
import ImagePickerExample from './components/uploadpic';
import ViewFarm from './components/viewFarm';
import Example from './components/alert'
import PestDetection from './components/pestdet'
import UploadPest from './components/uploadPest'

var firebaseConfig = {
  apiKey: "AIzaSyDkeSnOObjCEKe0BCsZhzlC3ysVL9oYftw",
  authDomain: "notifications-903a4.firebaseapp.com",
  databaseURL: "https://notifications-903a4.firebaseio.com",
  projectId: "notifications-903a4",
  storageBucket: "notifications-903a4.appspot.com"
};

if(!fire.app.length){
fire.initializeApp(firebaseConfig);

}

const navOptionHandler =(navigation) =>({
  headerShown:false
})

const stackNav = createStackNavigator({
 Home:{
   screen:HomeScreen,
   navigationOptions:navOptionHandler
   
 },
 Search:{
   screen:SearchScreen,
   navigationOptions:navOptionHandler
 },

 Camera:{
   screen:CameraPage,
   navigationOptions:navOptionHandler
 },
 Upload:{
   screen:ImagePickerExample,
   navigationOptions:navOptionHandler
 },
 UploadPest:{
   screen:UploadPest,
   navigationOptions:navOptionHandler
 },
 Search:{
   screen:SearchScreen,
   navigationOptions:navOptionHandler
 },

  

},

)





const TabNavigator = createBottomTabNavigator({
  "Home": stackNav,
   "Detection" :PestDetection,
  
  'Community':fetchimages,
  "Profile":ProfileScreen,
  
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`
  
      } else if (routeName === 'Detection') {
        iconName = `md-search`;
      }
      else if (routeName === 'Add Farm') {
        iconName = `md-add-circle`;
      }
      else if (routeName === 'Settings') {
        iconName = `md-settings`;
      }
      else if (routeName === 'Profile') {
        iconName = `md-person`;
      }
      else if (routeName === 'Community') {
        iconName = `md-people`;
      }
      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),

  tabBarOptions: {
    inactiveTintColor: 'gray',
    activeTintColor: 'green',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'light-green',
    },
  }
}
);
const MainStack = createStackNavigator({

 
  
  Home:{
    screen:TabNavigator,
    navigationOptions:navOptionHandler
  },
  Plant:{
    screen:Plant,
    navigationOptions:navOptionHandler
  },
  Pest:{
    screen:Pest,
    navigationOptions:navOptionHandler
  },
  Posts:{
    screen:fetchimages,
    navigationOptions:navOptionHandler
  },
  Write:{
    screen:ContactUs,
    navigationOptions:navOptionHandler
  },
  PostDetails:{
    screen:Posts,
    navigationOptions:navOptionHandler
  },
  ViewFarm:{
    screen:ViewFarm,
    navigationOptions:navOptionHandler
  },
  AddFarm:{
    screen:AddFarm,
    navigationOptions:navOptionHandler
  },
  Profile:{
    screen:ProfileScreen,
    navigationOptions:navOptionHandler
  },
  Settings:{
    screen:SettingScreen,
    navigationOptions:navOptionHandler
  }
},{initialRouteName:'Home'})

const appDrawer = createDrawerNavigator({
  drawer:MainStack,
  navigationOptions:navOptionHandler
},
{
  contentComponent:SideMenu,
  drawerWidth: Dimensions.get('window').width * 3/4
})

const authStack = createStackNavigator({
 
  Login:{
    screen:Login,
    navigationOptions:navOptionHandler
  },
  Signup:{
    screen:Signup,
    navigationOptions:navOptionHandler
  },
  
},{
 
})


const Mainapp = createSwitchNavigator({
  app:appDrawer,
  auth:authStack
},{
  initialRouteName:'auth'
})

export default createAppContainer(Mainapp);