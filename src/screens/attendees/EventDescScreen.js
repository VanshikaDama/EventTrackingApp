import React from 'react'
import{Text,ScrollView,View,StyleSheet,StatusBar, TextInput,Dimensions,Pressable} from 'react-native'

import { useState,useEffect } from 'react'
import CustomButtons from '../../components/custombuttons'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/header'
import firebase from 'firebase/compat'
import firebaseConfig from '../../../firebase'
import 'firebase/compat/firestore'
import { Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'



const db = firebase.firestore()
const devwidth = Dimensions.get('window').width


const EventDescScreen = () => {

  const navigation = useNavigation();
  const route=useRoute();

  const {eventId,email} = route.params

  let eve = {}
  const [eventData,setEventData] = useState(null)


  const onPressBack = () => {
    navigation.navigate('mainpage', {eventId:eventId,email:email})
  }


 const EventCard = ({hostName, eventName, desc, selectedDate, selectedStartTime, selectedEndTime}) => 
 {
  console.log(hostName)
  return(
    <View style={styles.container}>
      <View style={styles.arrowButton}>
   <Pressable  onPress={onPressBack}>
      <Icon 
      name='arrow-left'
      size={30}
      color="#000"
     
       />
     
      
     </Pressable>     
     </View>     
 <View style={styles.cardContainer}>
 
    <Text style={styles.text}>{eventName}</Text>
        <Text style={styles.text}><Text style={styles.label}>Hosted by:</Text> {hostName}</Text>
        <Text style={styles.text}><Text style={styles.label}>Date:</Text> {selectedDate}</Text>
        <Text style={styles.text}><Text style={styles.label}>Location & Description:</Text> {desc}</Text>
        <Text style={styles.text}><Text style={styles.label}>Starts at:</Text> {selectedStartTime}</Text>
        <Text style={styles.text}><Text style={styles.label}>Ends at:</Text>{selectedEndTime} </Text>
        <View style={styles.button}>
        <Button  title="Interested!" color='tomato' justifyContent='flex-end' onPress={()=> navigation.navigate('interested',{email:email,eventId:eventId})}/>
        </View>
        </View>
 </View>
  )
 }

useEffect(()=> {
  
  const fetching = async() => {

    // console.log(eventId,email)
    try{
    const docRef = await db.collection('events').doc(eventId).get();
    if(docRef.exists) {
    const eve = docRef.data();
    setEventData(eve)
    }
    
    }catch(err)
    {
     console.log(err)
    }
 }
 fetching()
 },[])

  return(
    <View style={styles.container}>
    
    <StatusBar barStyle="auto" />
  
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
{eventData &&
<EventCard
key={eventData.id}

 hostName={eventData.hostName}
eventName={eventData.eventName}
desc={eventData.desc}
// circleRadius={eventData.circleRadius}
selectedDate={eventData.selectedDate}
 selectedStartTime={eventData.selectedStartTime}
selectedEndTime={eventData.selectedEndTime}
// intervalTime={eventData.intervalTime}
/>
}
</ScrollView>

</View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFBFB',
        alignItems:'center',
        justifyContent:'center',
        
    }, 
    cardContainer: {
      width: devwidth-(0.1*devwidth),
    //  backgroundColor:'#a29bfe', //#a29bfe
    backgroundColor:"#AF7D7D",
      height: 700,
      marginBottom:20,
      borderRadius:20,
      padding:20,
      alignItems:'center',
      justifyContent:'center',
      shadowColor:'#000',
      shadowOffset: {
       width:10,
       height:10,
      },
      shadowOpacity:0.75,
      shadowRadius:10,
      elevation:9,
   },
   text: {
    fontWeight:'700',
    fontSize:20,
    fontStyle: 'italic',
    marginBottom:10,
    color:'white'
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
 button:{
  alignItems:'flex-end',
  marginTop:20
 },
 arrowButton: {
  position:'absolute',
        top:10,
        left:10}
})

export default EventDescScreen
