import React from 'react'
import {View,Text,Button,Alert,Pressable,StyleSheet,Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import  { useEffect, useState } from 'react';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/FontAwesome'

//for location
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

//for database
import firebaseConfig from '../../../firebase'
import firebase from 'firebase/compat'
import 'firebase/compat/firestore'

//for notifications
import * as Notifications from 'expo-notifications'


//stopwatch for attendance
import { Stopwatch } from 'react-native-stopwatch-timer'

const db = firebase.firestore();
const deviceWidth = Math.round(Dimensions.get("window").width);
const LOCATION_TASK_NAME = 'background-location-task';


export default function InEvent() {

  //whether location tracking is happening or not
  const [isUpdating, setIsUpdating] = useState(false);

  const route = useRoute()
  const{eventId,email} = route.params
  console.log(eventId)
  console.log(email)

  //whether timer is running or not
  const[isTimerRunning,setIsTimerRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0);


//first hook for location tracking
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      await Location.requestBackgroundPermissionsAsync();
    // fetchEventDetails()
      TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        
        if (data) {
          const { locations } = data;
          const{latitude,longitude} = locations[0].coords;
         console.log(latitude)
         console.log(longitude) 
       
    
          console.log('Latitude:',latitude);
          console.log('Longitude:',longitude)
          checkLocationRadius(latitude,longitude)
          const userId = email
          try{
            const docRef = db.collection('locations').doc(userId);
            const docSnapshot = await docRef.get();
           if(!docSnapshot.exists)
           {
            await docRef.set({
              latitude,
              longitude,
              eventId
            })
            
            console.log('user added');
           }else
           {
          
            await docSnapshot.ref.update({
              latitude,
              longitude
            })
           }
            
          }catch(err)
          {
            console.log(err)
          }
        

        }
      });
    })();
  }, []);



  //second hook for time interval
  useEffect(()=> {
    let interval;

    if(isTimerRunning)
    {
     interval = setInterval (()=> {
        setElapsedTime((prevtime) => prevtime+1)
        console.log('Time interval:', elapsedTime);
      },1000)
    }
    return () =>{
       clearInterval(interval)
    }
  },[isTimerRunning, elapsedTime]);




  

  const getEventTimings = async() => {
  const  event = await db.collection('events')
  .where(firebase.firestore.FieldPath.documentId(),'==',eventId)
  .get()

if(!event.empty)
{

const doc = event.docs[0]

const startTime = doc.data().selectedStartTime;
const endTime = doc.data().selectedEndTime;
const intervalTime = doc.data().intervalTime;
const date = doc.data().selectedDate;

const startHour  = parseInt(startTime.split(':')[0]);
const startMinute = parseInt(startTime.split(':')[1])
const endHour = parseInt(endTime.split(':')[0])
const endMinute = parseInt(endTime.split(':')[1])
const breakTime = parseInt(intervalTime)

const hourIntervalinMin = Math.abs(startHour - endHour) *60
const MinInterval  = Math.abs(startMinute - endMinute)
 eventInterval = hourIntervalinMin + MinInterval- breakTime ;
return {eventInterval, endTime};

}}



 //location tracking related code. To start updates
  const startLocationUpdates = async () => {
   
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 1000, // update every 5 seconds
      distanceInterval: 1, // update if the user moves 1 meter
      deferredUpdatesInterval: 1000, // update even when the app is in the background
      deferredUpdatesDistance: 1, // update if the user moves 1 meters in the background
      showsBackgroundLocationIndicator: true,
    });
    setIsUpdating(true);
    const {eventInterval} = await getEventTimings()
    console.log('Location updates started.');
    console.log(`For ${eventInterval} minutes`)
  };


  //location stop
  const stopLocationUpdates = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    setIsUpdating(false);
  setIsTimerRunning(false)
    console.log('Location updates stopped.');
    const user = await db.collection('attendees')
    .where('email','==',email)
    .where('eventId','==',eventId)
    .get()
    if(!user.empty)
    {
     userref = user.docs[0].ref;
    await userref.update({location:'untracked'})
    if(elapsedTime/60 >= eventInterval)
    {
      await userref.update({Attendance:'Yes'})
    }else{
      await userref.update({Attendance:'No'})
    }
    }
   
  };


  //pushnotifications related code(receiving them) , getting expopushtoken
  const  registerForPushNotificationsAsync= async() => {
    
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
    storeToken(token);
  }


const compareTimings = async() => {
  const {endTime} = await getEventTimings();
  const currentTime = new Date()
  console.log(currentTime)
  const endHr = parseInt(endTime.split(':')[0])
  const endMin = parseInt(endTime.split(':')[1])
  console.log(endHr)
  console.log(endMin)
  const currHr = currentTime.getHours();
  const currMin = currentTime.getMinutes();
  console.log(currHr)
  console.log(currMin)
  

  if((currHr> endHr) || (currHr === endHr && currMin >=endMin))
  {
    console.log(false)
    return false;
    
  }else
  {
    console.log(true)
    return true;
  }
}

  //storing the token that is generated to each device. these tokens are stored in the db with the eventId and when
  // the host wants to send notifications it sends to the devices whose token ids are stored
  const storeToken = async(token) => {
    await db.collection('tokens').add({token:token, eventId: eventId, email:email});
  }


//to check location radius whether inside or outside and also to fetch all the event details
 const checkLocationRadius = async(latitude,longitude) => {

  const  wantedEvent = await db.collection('events')
  .where(firebase.firestore.FieldPath.documentId(),'==',eventId)
  .get()

if(!wantedEvent.empty)
{

const doc = wantedEvent.docs[0]
const fixedlatitude = doc.data().latitude;
const fixedlongitude = doc.data().longitude;
const circleRadius = doc.data().circleRadius
console.log(fixedlatitude,fixedlongitude,circleRadius)
let userref;
const distance = calculateDistance(latitude, longitude, fixedlatitude, fixedlongitude);
const metredis = distance*1000
console.log(metredis)
console.log(distance)
const user = await db.collection('attendees')
.where('email','==',email)
.where('eventId','==',eventId)
.get()
if(!user.empty)
{
 userref = user.docs[0].ref;

if (metredis > circleRadius && compareTimings()) {
  await userref.update({location:'outside'})
   setIsTimerRunning(false)
   Alert.alert('Alert', `You are outside the event radius by ${metredis}m`);

}else if(metredis<circleRadius && compareTimings() )
{
  
  await userref.update({location:'inside'})
  setIsTimerRunning(true)
  
}else if(!compareTimings())
{

  Alert.alert('Time up!','Thankyou for joining us today! :)))))))')
 stopLocationUpdates();
}
 }}}


 //math formula for checking distance
 const calculateDistance = (lat1, lon1, lat2, lon2) => {
  console.log('checking')
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

  return (
    <View style={styles.container}>
      <View style={styles.custHeader}></View>

      <Header label = "           Welcome attendee!" />
      <View style={styles.cardContainer}>
      <Text style={styles.text}>* Kindly press on start updates to mark your attendance</Text>
      <Text style={styles.text}>* Do not stop the updates until the event ends or you will not receive attendance</Text>
      <Text style={styles.text}>* Press on get notifications to get latest updates for your event from your host.You will be receiving notifications only if you are inside the event and have started updates</Text>
      <Text style={styles.text}> Enjoy!!</Text>
      
      {!isUpdating ? (
        <View>
        <Pressable onPress={startLocationUpdates}>
        <View style={styles.blueButton}>
     <Text style={styles.blueButtonText}>Start Updates</Text>
     </View>
      </Pressable>
     </View>
      ) : (
        <View>
        <Pressable onPress={stopLocationUpdates}>
        <View style={styles.blueButton}>
     <Text style={styles.blueButtonText}>Stop Updates</Text>
     </View>
      </Pressable>
     </View>

      )}
  

<Pressable>
<View style={styles.blueButton}>
 <Text style={styles.blueButtonText} onPress={registerForPushNotificationsAsync}>Get Notifications!</Text>
 
</View>
 </Pressable>

 </View>
 </View>
  );
}

const styles =  StyleSheet.create({
  container:{
      flex:1,
      alignItems:'center',
      //justifyContent:'center',
      backgroundColor:'#FCEBE6'
  },
 custHeader: {
    width: deviceWidth,
    height:'3%',
   // backgroundColor:"#bfc2cc",
   backgroundColor:'white',
    justifyContent:'flex-end', //vertical align
    alignItems:'center', //horizontal alignment
   paddingBottom:10
},
arrowButton: {
  position:'absolute',
        top:38,
        left:20,
      zIndex:1,
    },
blueButton: {
     backgroundColor:'#6766FF',
     borderRadius:5,
     height:50,
     width:130,
     alignItems:'center',
     justifyContent:'center',
     marginBottom:10
    },
 blueButtonText:{
      color:'white',
      fontWeight:'bold',
      fontSize:18
    }, 
cardContainer: {
      width: deviceWidth-(0.1*deviceWidth),
      backgroundColor:'#AF7D7D', //#a29bfe
      height: 620,
      marginBottom:20,
      borderRadius:25,
      padding:20,
      alignItems:'center',
      justifyContent:'flex-start',
      shadowColor:'#000',
      shadowOffset: {
       width:5,
       height:5,
      },
      shadowOpacity:0.75,
      shadowRadius:5,
      elevation:8,
   },
   text:
   {
    color:'white',
    fontWeight:'bold',
    fontStyle:'italic',
    fontSize:20,
    marginBottom:20,
    marginTop:30
   }
})
