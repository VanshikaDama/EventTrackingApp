/*import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, TextInput } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import Input from '../../components/input';
import CustomButtons from '../../components/custombuttons';
import Constants from 'expo-constants'

//const URL = "http://192.168.0.105:5000"
const URL = "http://10.0.0.168:5000"

/*Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const SendNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const[userNotification, setUserNotification] = useState('')

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        <TextInput placeholder="Enter info here" value={userNotification} onChangeText={setUserNotification}></TextInput>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Greetings from Event Tracker",
      body: 'lunch ready',
      data: { data: 'KiNDLY VISISTT THE DINING HALL' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default SendNotifications*/







/*import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  console.log('sending')
  await fetch('https://fcm.googleapis.com/v1/projects/{eventtracker-26060}/messages:send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
     'Authorization': 'Bearer AAAAI0RxGzU:APA91bHKVfNi4ykTeInYydmccC-isS1WHzRKkHOVuIyv9LCnpqjAcPuUB21Wpxpf9mWwg6f5WoEtArv9vYc5KNFpqm7qsAULEcHQAZcY1d_HPdqDADSp2tdL5ZIHKpxLg818Qw3RTBIT',
   
  },
  body: JSON.stringify({
    message:{
    token : expoPushToken,
    notification: {
      title: "You've got mail",
      body: 'Hello world!',
    },
    data: {
      experienceId: '@vanshikadama/client',
      scopeKey: '@vanshikadama/client',
    },
    }  
  }),
});
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
     token = (await Notifications.getDevicePushTokenAsync()).data
   console.log("got token")
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function SendNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.message}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
} */

/*import React from 'react'
import firebaseConfig from '../../../firebase'
import firebase from 'firebase/compat'
import 'firebase/compat/firestore'
import {View,Text} from 'react-native'

const messaging = firebase.messaging();

const SendNotifications = () => {

  const requestPushNotificationPermission = async () => {
    try {
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('FCM Token:', token);
    } catch (error) {
      console.log('Permission not granted to send push notifications');
    }
  };
  requestPushNotificationPermission()
  return (
    <View>
      <Text>fghjnkm</Text>
    </View>
  )
}

export default SendNotifications*/

/*import React from 'react'
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const SendNotifications = () => {
  const sendPushNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Notification Title',
      body: 'Notification Body',
    };

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      console.log('Notification sent:', data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
          console.log('Permission not granted to send push notifications');
          return;
        }

        const { data: { expoPushToken } } = await Notifications.getExpoPushTokenAsync();
        console.log('Expo Push Token:', expoPushToken);

        sendPushNotification(expoPushToken); // Send a push notification after getting the token
      } catch (error) {
        console.log('Error registering for push notifications:', error);
      }
    };

    registerForPushNotifications();
  }, []);

  return (
    <View>
      <Text>fghjnkm</Text>
    </View>
  );
};

export default SendNotifications;*/

/*import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: expoPushToken,
      sound: 'default',
      title: "You've got mail",
      body: 'Hello world!',
      data: { data: 'goes here' },
    }),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);
  return token;
} 

export default function SendNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title}</Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}  */

import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet,TextInput,Pressable,Dimenisions,Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import Input from '../../components/input'
import { useRoute,useNavigation} from '@react-navigation/native';

import firebaseConfig from '../../../firebase'
import firebase from 'firebase/compat'
import 'firebase/compat/firestore'

import Icon from 'react-native-vector-icons/FontAwesome'

const db = firebase.firestore();




const SendNotifications= ()=>{
  console.log("got in")
  const[alltokens,setAllTokens] = useState([])
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notTitle,setNotTitle] =useState(' ');
  const[notBody, setNotBody] = useState(' ');
  const[notData,setNotData] = useState(' ')

  const route = useRoute()
  const {email,eventId} = route.params
const navigation = useNavigation()

  useEffect(
    () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,

      }),
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  


const getToken = async(eventId)=>{
  console.log(eventId)
  const tokensRef = db.collection('tokens')
  const querySnapshot = await tokensRef.where("eventId", '==',eventId).get()

  const toks = []
 
  for(const doc of querySnapshot.docs)
  {
    const queryemail = doc.data().email
    const attendeeRef =  db.collection('attendees')
    const attendeeSnapShot = await attendeeRef.where("eventId",'==',eventId)
                             .where('email','==',queryemail)
                             .get()
    console.log(queryemail)
    if(!attendeeSnapShot.empty)
    {
      const attendeeDoc = attendeeSnapShot.docs[0]
      const location = attendeeDoc.data().location;
      if(location==="inside")
      {
        toks.push(doc.data().token);
        console.log(doc.data().token)
      }
    }
  }
  setAllTokens(toks);
  console.log(toks)
  return toks;
}

const  sendPushNotification = async(tokens,notTitle,notBody,notData)=> {
 
  const message = tokens.map(token => ({
    to: token,
    sound: 'default',
    title: notTitle,
    body: notBody,
    data: {
      notData: notData,
    },
  }))

  console.log(message)
  

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  });
  Alert.alert('Success','Sent to everyone inside')
}


  return (
    <View style={styles.container}>
      <View style={styles.arrowButton}>
      <Pressable onPress={()=> navigation.navigate('myevents',{email:email})}>
      
     <Icon
     name="arrow-left"
     size={25}
     color="black"
     />
     
     </Pressable>
     </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Enter the title:</Text>
        <TextInput
        name="title"
        placeholder="Enter title:"
        value={notTitle}
       onChangeText={setNotTitle}
       style={{height:50, width:300, backgroundColor:'white', borderRadius:20,marginBottom:20, borderRadius : 10 , paddingHorizontal:10,paddingVertical:10}}
        />
        <Text>Enter the body:</Text>
        <TextInput
        multiline
        name="body"
        placeholder="Enter body:"
        value={notBody}
       onChangeText={setNotBody}
       style={{height:100, width:300,   backgroundColor:'white', borderRadius:20,marginBottom:20,borderRadius:10, borderRadius : 10 , paddingHorizontal:10,paddingVertical:10}}
     
        />
        <Text>Enter the Data:</Text>
        <TextInput
        name="data"
        placeholder="Enter data:"
        value={notData}
       onChangeText = {setNotData}
       style={{height:50, width:300, backgroundColor:'white', borderRadius:20,marginBottom:20, borderRadius : 10 , paddingHorizontal:10,paddingVertical:10}}
       
        />
        
      
      </View>
      <Pressable onPress={async()=> {
          const tokens   =await getToken(eventId)
          console.log(tokens)
                 await sendPushNotification(tokens,notTitle,notBody,notData);
          
        }}>
      <View style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send!</Text>
      </View>
      </Pressable>
      
      
    </View>
  );
} 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
      alignItems: 'center',
       justifyContent: 'space-around' ,
       backgroundColor:'#FCEBE6'
      
  },
  sendButton: {
    backgroundColor:'#AF7D7D',
    borderRadius:20,
    height:45,
    width:180,
    alignItems:'center',
    justifyContent:'center'
  },
  sendButtonText: {
  color:'white',
  fontWeight:'bold',
  fontSize:20
  },
  arrowButton: {
    position:'absolute',
    top:50,
    left:30,
   
  }, 
})

export default SendNotifications 

