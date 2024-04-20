

/*import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmLocation from '../screens/hostscreen/ConfirmLocation';
import EventRegistration from '../screens/hostscreen/EventRegistrations';
import SignUpPage from '../screens/common/SignUpPage';
import LoginPage from '../screens/common/LoginPage';
import MainPage from '../screens/common/MainPage';
import EventDisplay from '../screens/hostscreen/EventDisplay';
import EventScreen from '../screens/attendees/EventScreen';
import Scanner from '../screens/hostscreen/Scanner';
import PostRegistration from '../screens/hostscreen/PostRegistration';
import QRCodeScreen from '../screens/attendees/QRCodeScreen';
import InterestedForm from '../screens/attendees/InterestedForm';
import Tracking from '../screens/hostscreen/Tracking';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false }} >
      <Stack.Screen name="LoginPage" component={LoginPage}/>
      <Stack.Screen name="EventRegistration" component={EventRegistration}/>
      <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} /> 
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="EventScreen" component={EventScreen}/>
      <Stack.Screen name="MainPage" component={MainPage}/>
      <Stack.Screen name="EventDisplay"  component={EventDisplay}/>
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="PostReg" component={PostRegistration}/>
      <Stack.Screen name="QRScreen"  component={QRCodeScreen}/>
      <Stack.Screen name="Interested" component={InterestedForm}/>
      <Stack.Screen name="Tracking" component={Tracking}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation; */


import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "../screens/common/LoginPage";
import SignUpPage from "../screens/common/SignUpPage";
import MainPage from "../screens/common/MainPage";
import EventRegistration from '../screens/hostscreen/EventRegistrations';
import ConfirmLocation from '../screens/hostscreen/ConfirmLocation';
import MyEvents from "../screens/hostscreen/MyEvents";
import EventScreen from '../screens/attendees/EventScreen';
import InterestedForm from "../screens/attendees/InterestedForm";
import EventDescScreen from "../screens/attendees/EventDescScreen";
import QRCodeScreen from "../screens/attendees/QRCodeScreen";
import Scanner from '../screens/hostscreen/Scanner';
import InEvent from "../screens/attendees/InEvent";
import SendNotifications from "../screens/hostscreen/SendNotifications";
import TrackAttendees from "../screens/hostscreen/TrackAttendees";
import EditEvent from "../screens/hostscreen/EditEvent";
import FirstScreen from "../screens/common/FirstScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false }} >
      <Stack.Screen name="firstscreen" component={FirstScreen} />
      <Stack.Screen name="loginpage" component={LoginPage}/>
      <Stack.Screen name="signuppage" component={SignUpPage} />
      <Stack.Screen name="mainpage" component={MainPage}/>
      <Stack.Screen name="eventregistration" component={EventRegistration}/>
      <Stack.Screen name="confirmlocation" component={ConfirmLocation} /> 
      <Stack.Screen name="myevents" component={MyEvents} />
      <Stack.Screen name="eventscreen" component={EventScreen} />
      <Stack.Screen name="interested" component={InterestedForm} />
      <Stack.Screen name="eventdescscreen" component={EventDescScreen} />
      <Stack.Screen name="qrcodescreen" component={QRCodeScreen} />
      <Stack.Screen name="scanner" component={Scanner}/>
      <Stack.Screen name="inevent" component={InEvent}/>
      <Stack.Screen name="sendnotifications" component={SendNotifications} />
      <Stack.Screen name="trackattendees" component={TrackAttendees}/>
      <Stack.Screen name="editevent" component={EditEvent} />
     
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default Navigation; 