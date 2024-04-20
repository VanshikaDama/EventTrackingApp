import React from "react";
import{View,Text,Button,StyleSheet,Dimensions,ScrollView,TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import CustomButtons from "../../components/custombuttons";
import { useRoute } from "@react-navigation/native";
import { useEffect,useState } from "react";

import Icon from 'react-native-vector-icons/FontAwesome'
import { Pressable } from "react-native";
import Header from "../../components/header";


import firebase from 'firebase/compat'
import firebaseConfig from '../../../firebase'
import 'firebase/compat/firestore'

const db = firebase.firestore()
const devwidth = Dimensions.get('window').width
const deviceWidth = Math.round(Dimensions.get("window").width);

const MainPage = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const{email} = route.params
    console.log(email)
    const [events,setEvents]= useState([])

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


    const hostEvent = () => {
        navigation.navigate('eventregistration',{email: email})
    }
   
    const onCheckStatus = () => {
        navigation.navigate('myevents',{email:email})
       
    }

    const onPressInvitations = ()=> {
   navigation.navigate('qrcodescreen',{email:email})
    }

    const onPressScanner= () => {
       navigation.navigate('scanner',{email:email})
    }
    return (

        <View style= {styles.container}>
         <View style={styles.custHeader}></View>
         <Header label="     Event Tracker " />
    
    <View style={styles.redblock}>
        <Text style={styles.redblocktext}>
          Latest Events
        </Text>
        </View>    

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

            <View style={styles.panel}>

                                          
             <View style={styles.panelButtonAndText}>
               <Pressable onPress={onPressScanner}>
                <Icon name="camera" size={25} color="#000" style={styles.panelButton}  />
                </Pressable>
                <Text style={styles.text}>Scan</Text>
                </View>

                <View style={styles.panelButtonAndText}>
                <Pressable onPress= {hostEvent}>
                <Icon name="plus" size={25} color="#000" style={styles.panelButton} />
                </Pressable>
                <Text style={styles.text}>Host Event</Text>
                </View>

                <View style={styles.panelButtonAndText}>
                <Pressable onPress={onPressInvitations}>
                <Icon name="ticket" size={25} color="#000" style={styles.panelButton} />
                </Pressable>
                <Text style={styles.text}>Invites</Text>
                </View>
               

                <View style={styles.panelButtonAndText}>
                <Pressable onPress={onCheckStatus}>
                <Icon name="rocket" size={25} color="#000" style={styles.panelButton} />
                </Pressable>
                <Text style={styles.text}>My Events</Text>
                </View>

              
             
            </View>
        </View> 
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FCEBE6',
        flex:1,
       // justifyContent:'center',
        alignItems:'center',
    },
    /*scanner:{
        position:'absolute',
        top:10,
        right:10,
    }*/
    
    panel: {
       position: "absolute",
       bottom:0,
       left:0,
       right:0,
       flexDirection:"row",
       justifyContent: "space-between",
      alignItems: "center",
      height: 50,
     
     // backgroundColor:'#b5d9f2',
     backgroundColor:"#AF7D7D",
      elevation: 8,
    },
    panelButton:{
       color:'black',
        paddingVertical: 2,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    panelButtonAndText:{
        justifyContent: "center",
        alignItems: "center", 
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
   redblock: {
  
        //width: deviceWidth-(0.1*deviceWidth),
       /* width: devwidth,
        backgroundColor:'#AF7D7D', 
        height: 40,
        marginBottom:20,
        borderRadius:2,
        marginTop:0,
        alignItems:'center',
        justifyContent:'center',*/
        alignItems:'center',
        justifyContent:'center',
        marginBottom:18
       
     },
   redblocktext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    
   },
   cardContainer: {
    width: devwidth-(0.1*devwidth),
    backgroundColor:'white', //#a29bfe
    height: 60,
    marginBottom:20,
    borderRadius:10,
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
  fontWeight:'bold',
  fontSize:13,
  fontStyle: 'italic',
 },
 scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
 house: {
    position: 'absolute',
    top: 10,
    right: 10,
   
  }
    
})
export default MainPage 