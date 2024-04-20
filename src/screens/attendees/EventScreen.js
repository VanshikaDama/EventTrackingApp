import React from 'react'
import{Text,ScrollView,View,StyleSheet,StatusBar, TextInput,Dimensions,TouchableOpacity} from 'react-native'

import { useState,useEffect } from 'react'
import CustomButtons from '../../components/custombuttons'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/header'
import firebase from 'firebase/compat'
import firebaseConfig from '../../../firebase'
import 'firebase/compat/firestore'

const db = firebase.firestore()
const devwidth = Dimensions.get('window').width

const ExploreEvents = () => {
  
    const navigation = useNavigation();
    const route = useRoute();
    const{email} = route.params
    const [events,setEvents]= useState([])
    console.log(email)

useEffect(()=> {
    const fetchDetails = async() => {

        try{
     const querySnapshot = await db.collection('events').get();
    const fetched = querySnapshot.docs.map((doc) => {
     const eve = doc.data();
     eve.id = doc.id;
     
     return eve
    })
setEvents(fetched)
console.log(events)}catch(err)
    {
 console.log("Cannot fetch events for user",err);
    }
    }
    fetchDetails();
},[])


const onInterested= ({eventId,email}) => {

    navigation.navigate('eventdescscreen',{eventId: eventId,email:email})
}

const EventCard = ({eventId,eventName,selectedDate}) => {
return(
    <TouchableOpacity style={styles.cardContainer} onPress={()=> onInterested({eventId,email})} >
     <Text style={styles.text}><Text style={styles.label}>Event Name:</Text> {eventName}</Text>
        <Text style={styles.text}><Text style={styles.label}>Date:</Text> {selectedDate}</Text>
        </TouchableOpacity>
)}

    return(
        <View style={styles.container}>
             <Header label="Events" />
             <StatusBar barStyle="auto" />
             <ScrollView contentContainerStyle={styles.scrollViewContent}>
     {events.map ((eve) => (
      <EventCard
      key={eve.id}
     eventId={eve.id}
     // hostName={eve.hostName}
      eventName={eve.eventName}
     // desc={eve.desc}
     // circleRadius={eve.circleRadius}
      selectedDate={eve.selectedDate}
     // selectedStartTime={eve.selectedStartTime}
     // selectedEndTime={eve.selectedEndTime}
     // intervalTime={eve.intervalTime}
      />
     ))}
     </ScrollView>
        </View>
    )

}
  

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
        alignItems:'center',
        //justifyContent:'center',
        
    }, 
    cardContainer: {
      width: devwidth-(0.1*devwidth),
      backgroundColor:'white', //#a29bfe
      height: 70,
      marginBottom:20,
      borderRadius:20,
      alignItems:'center',
      justifyContent:'flex-start',
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
    fontWeight:'bold',
    fontSize:18,
    fontStyle: 'italic',
   },
   label: {
    
    textAlign: 'left',
   
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }
})
export default ExploreEvents 
