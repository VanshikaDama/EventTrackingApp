import React, { useEffect } from 'react'
import {View,Text,StatusBar,StyleSheet,ScrollView,Dimensions, Button} from 'react-native'
import { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../../components/header'
import { Pressable } from 'react-native'
//import Card from '../../components/card'

import firebase from 'firebase/compat'
import firebaseConfig from '../../../firebase'
import 'firebase/compat/firestore'


import Icon from 'react-native-vector-icons/FontAwesome'

const db = firebase.firestore();
const deviceWidth = Math.round(Dimensions.get("window").width);
const MyEvents = () => {

  const route = useRoute();
  const {email} = route.params
  const navigation = useNavigation()

  const[events,setEvents] = useState([])

  const EventCard = ({eventId,eventName,hostName,selectedDate,desc,selectedStartTime,selectedEndTime,intervalTime,circleRadius}) => {
    return(

      <View style={styles.cardContainer}>
        <Text style={styles.text}>{eventName}</Text>
        <Text style={styles.text}><Text style={styles.label}>Hosted by:</Text> {hostName}</Text>
        <Text style={styles.text}><Text style={styles.label}>Date:</Text> {selectedDate}</Text>
        <Text style={styles.text}><Text style={styles.label}>Location & Description:</Text> {desc}</Text>
        <Text style={styles.text}><Text style={styles.label}>Starts at:</Text> {selectedStartTime}</Text>
        <Text style={styles.text}><Text style={styles.label}>Ends at:</Text>{selectedEndTime} </Text>
        <Text style={styles.text}><Text style={styles.label}>Interval Time Space: </Text>{intervalTime}</Text>
        <Text style={styles.text}><Text style={styles.label}>Radius of area:</Text> {circleRadius}</Text>
        <Pressable  onPress={()=>navigation.navigate('sendnotifications',{email:email,eventId:eventId})}>
        <View style={styles.redbutton}>
<Text style={styles.buttonText}>Send notifications</Text>
        </View>
        </Pressable>

        <Pressable onPress= {()=>navigation.navigate('trackattendees',{email:email,eventId:eventId})}>
        <View style={styles.redbutton}>
<Text style={styles.buttonText}>Track Users</Text>
        </View>
        </Pressable>
      
        <Pressable onPress= {()=>navigation.navigate('editevent',
        {email:email,
        eventId:eventId,
        hostName: hostName,
        selectedDate: selectedDate,
        desc:desc,
        selectedStartTime: selectedStartTime,
        selectedEndTime:selectedEndTime,
        intervalTime:intervalTime,
        circleRadius:circleRadius
        })}>
        <View style={styles.redbutton}>
<Text style={styles.buttonText}>Update Event</Text>
        </View>
        </Pressable>
      </View>
    )
  }

  useEffect(()=> {

    //fetching events
  const fetchEvents = async() => {
    try{
      const querySnapshot = await db.collection('events')
      .where('email','==',email).get()
      
      const fetchedEvents = querySnapshot.docs.map(doc => {
        const eve = doc.data()
        eve.id = doc.id
        return eve
      })
      setEvents(fetchedEvents)
     console.log(fetchedEvents)
    }catch(err)
    {
      console.log("Error fetching events",err);
    }
  }
fetchEvents();
},[])

const onPressReturn = () => {
  navigation.navigate('mainpage',{email:email})
}

  return (
   
   <View style={styles.container}>
    <View style={styles.custHeader}></View>
    <Header label="          My Events" />
    <View style={styles.arrowButton}>
          <Pressable onPress = {onPressReturn}>
            <Icon
            name='arrow-left'
            size={25}
            color="#000"
            />
            </Pressable>
         </View>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
     {events.map ((eve) => (
      <EventCard
      key={eve.id}
      eventId = {eve.id}
      hostName={eve.hostName}
      eventName={eve.eventName}
      desc={eve.desc}
      circleRadius={eve.circleRadius}
      selectedDate={eve.selectedDate}
      selectedStartTime={eve.selectedStartTime}
      selectedEndTime={eve.selectedEndTime}
      intervalTime={eve.intervalTime}
      />
     ))}
     </ScrollView>
   </View>

  )
}
const devwidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FCEBE6",
        alignItems:'center',
        //justifyContent:'center',
        
    }, 
    cardContainer: {
      width: devwidth-(0.1*devwidth),
      backgroundColor:'#AF7D7D', //#a29bfe
      height: 600,
      marginBottom:20,
      borderRadius:20,
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
   text: {
    fontWeight:'700',
    fontSize:20,
    fontStyle: 'italic',
    color:'white',
    paddingBottom:5,
    paddingTop:5
   },
   
   label: {
    
    textAlign: 'left',
   
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
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
    redbutton: {
      backgroundColor:'#6766FF',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 15,
      marginTop: 10,
      zIndex:1,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
})

export default MyEvents
