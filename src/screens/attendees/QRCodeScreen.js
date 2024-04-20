import React, { useState,useEffect } from 'react'
import {View,Text,StyleSheet,ScrollView,Button,Pressable,Dimensions} from 'react-native'
import { useRoute } from '@react-navigation/native'
import firebaseConfig from '../../../firebase';
import QRCode from 'react-native-qrcode-svg';
import firebase from 'firebase/compat';
import 'firebase/compat/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';

const db = firebase.firestore()
const deviceWidth = Math.round(Dimensions.get("window").width);

const QRCodeScreen = () => {

  const route = useRoute();
const {email} = route.params
const navigation = useNavigation();



const[qrDataList,setQrDataList] = useState([])
const[qrEventDetails, setQrEventDetails] = useState([])
const[loading, setLoading] = useState(true)
const[qrStatusList,setQrStatusList] = useState([])
const [isTracking,setIsTracking] = useState(false)

useEffect(()=> {
  fetchQrs({email});
},[email]);


const fetchEventDetailsForQr = async({eventId}) => {

  try {
    //checking for a doc with given eventId so that i can print eventDate and Name underneath qr
    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();

    // if such doc is found we add its details into our array keeping the previous details as it is
    if (eventDoc.exists) {
      const eventData = eventDoc.data();
      setQrEventDetails((prevDetails) => ({
        ...prevDetails,
        [eventId]: eventData  // Store event details using eventId as key
      }));
      console.log('check')
    }

    setLoading(false);
  } catch (err) {
    console.log(err);
  }
}

//go back to exploring page
const onPressexplore = () => {
  console.log("exploring")
  navigation.navigate('eventscreen',{email:email})
}


//to generate qrs
const fetchQrs = async({email}) => {
  try{
    //checking a doc with given email , if found we try to get
    //qrjson strings which will be used to converted to qrs
    const querySnapshot=  await db
                          .collection('attendees')
                         .where('email','==',email)
                         .get();
    const qrlist=[];
    const qrStatusList = []

    querySnapshot.forEach((doc)=> {
      const qrCodeJSONString = doc.data().qrCodeJSONString;
    
      if(qrCodeJSONString){
        // if found we take eventId of that doc and qrCodeJSONString generate QR
        // in this code there is a mistake since i already have eventId in the qrCodeJSONStrinf
        // i have taken it again in qrData so work it out
        // the reason i took eventId again is because i have to check lateron for events with this eventId
      const qrData =
      {
        qrCodeJSONString : doc.data().qrCodeJSONString,
        eventId : doc.data().eventId
        
      } 
      const details = JSON.parse(qrCodeJSONString)
    
    // Taking this because i want to display track me button only if scanning is success. 
    //the Status cannot be included up or QR will be generated for that as well
    //We check status of Attendee if 'InEvent' then this button displays
      const qrStatusData = {
        qrData: qrData,
        Status : doc.data().Status,
        docId: doc.id
      }
      qrlist.push(qrData)
      fetchEventDetailsForQr({eventId :qrData.eventId})
      qrStatusList.push(qrStatusData)   
    
      //attaching snapshot listener to check for change in status
      const docRef = db.collection('attendees').doc(qrStatusData.docId)
      const unsubscribe = docRef.onSnapshot((snapshot)=>{
      const newStatus = snapshot.data().Status
      if(newStatus === 'Scanned')
      {
        const updatedQrStatusList = qrStatusList.map((qrStatus) => {
          if (qrStatus.docId === doc.id) {
            return { ...qrStatus, Status: newStatus };
           
      }
      return qrStatus;
      })
      setQrStatusList(updatedQrStatusList);
}
    })
    // Store the unsubscribe function to detach the listener later
    qrStatusData.unsubscribe = unsubscribe;
  }
});

   setQrDataList(qrlist)
   setQrStatusList(qrStatusList)
    setLoading(false)
    }catch(err)
    {
      console.log(err)
    }

    
}
const onPressBack = () => {
  navigation.navigate('mainpage',{email:email})
}
const onPressTrack = ({eventId,email}) => {
  console.log("Letsssss track")
  console.log(eventId)
  console.log(email)
  navigation.navigate('inevent',{eventId: eventId, email:email})
}
 const onPressReturn = () => {
  navigation.navigate('mainpage',{email:email})
 }

  return (
  
     <View style={styles.container}>
      <View style={styles.custHeader}></View>
      <View style={styles.arrowButton}> 
      <Pressable onPress={onPressBack} >
      <Icon 
      name="arrow-left"
      size={20}
      color="#000"
      />
      </Pressable>
      </View>
      <Header label="           Invitations"/>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    {!loading && (
  qrDataList.map((qrData, index) => {
    console.log('check2');
    const matchingEvent = qrEventDetails[qrData.eventId]
    const qrStatus = qrStatusList[index]
    if (matchingEvent && qrStatus) {
    
      return (
        <View key={index} style={styles.qrs}>
          <QRCode key={index} value={JSON.stringify(qrData)} size={180} />
          <View key={matchingEvent.eventId} style={styles.text} >
            <Text>EventName: {matchingEvent.eventName}</Text>
           <Text>Event Date: {matchingEvent.selectedDate}</Text>
            {qrStatus.Status === 'Scanned' ? (
              <Pressable>
              <View style={styles.redbutton}>
           <Text style={styles.buttonText}
           onPress={() =>
            onPressTrack(
            {
             eventId: qrData.eventId,
             email:email
            }
            )
          }>Hop In!</Text>
            
           </View>
           </Pressable>
          ) : (
            <View style={styles.silverButton}>
              <Text style={styles.buttonText}>Cant Enter</Text>
            </View>
          )}
          </View>
        </View>
      );
    } else {
      return null;
    }
  })
)}
</ScrollView>
  
</View>
   
  )
}

const styles= StyleSheet.create({
  container: {
 
  flex:1,
 // alignItems: 'center',
  justifyContent:'center',
  backgroundColor:'#F7E5E2'
  },
 outerView: {
 
  flex:1
 },
  qrs: {
   marginBottom:100
  },
  text:{
    marginTop:10
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop:50,
  },
  explore: {
    position:'absolute',
        top:40,
        right:20,
        backgroundColor:'#F7E5E2',
  },silverButton: {
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  redbutton: {
    backgroundColor:'#AF7D7D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
        top:40,
        left:20,
      zIndex:1,}


})


export default QRCodeScreen


