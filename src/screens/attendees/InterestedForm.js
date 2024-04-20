import React from 'react'
import {View,Text,StyleSheet,TextInput,Button,Alert, Pressable} from 'react-native'
import { useRoute } from '@react-navigation/native' 
import { useState } from 'react'
import Input from '../../components/input'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

import firebase from 'firebase/compat'
import firebaseConfig from '../../../firebase'
import 'firebase/compat/firestore'


import QRCode from 'react-native-qrcode-svg'


const db = firebase.firestore();


const InterestedForm = () => {

    const route = useRoute();
    const {email,eventId} = route.params
    const navigation = useNavigation();

  
    const[attName,setAttName] = useState('')
    const[attAge,setAttAge] = useState('')
    const[attEd,setAttEd] = useState('')
    const[attAdd,setAttAdd] = useState('')
    const[attContact, setAttContact] = useState('')
   
const onPressBack = () => {
  navigation.navigate('eventdescscreen',{eventId:eventId, email:email})
}

const storeQRDetails= async({email,eventId,attName}) => {
try{
   const qrData = {
    email,
    eventId,
    attName
   };
   //stringifying the data and storing it in db to be fetched and converted to qrcodes whenevr needed
   const qrDataString = JSON.stringify(qrData);
   // in this case i want it to be found since i want to attach my string to that particular doc
   const existingAttendee = await db
   .collection('attendees')
   .where('email', '==', email)
   .where('eventId', '==', eventId)
   .get(); 
   
   if(!existingAttendee.empty)
   {
    const attendeeDoc = existingAttendee.docs[0];
    await attendeeDoc.ref.update({qrCodeJSONString: qrDataString,   Status: 'Unattended'})
   }
}catch(err)
{
    console.log('Error generating qr',err);
}
}

    const onPressRegister= async({attName,attAge,attEd,attAdd,attContact}) => {
        try{
          if(attName && attAge &&attEd && attAdd && attContact)
          {
    const attendee = {eventId,email,attName,attAge,attEd,attAdd,attContact}
     const existingAttendee = await db.collection('attendees')
     .where('email', '==', email)
     .where('eventId','==',eventId)
     .get();

     //in this case i want it to be empty because i dont want same person to register twice
     if(existingAttendee.empty)
     {
      await db.collection('attendees').add(attendee)
    await  storeQRDetails({email,eventId,attName});
      Alert.alert('Saved!','Continue exploring.Check out your invite!',[
        { text: 'OK', onPress: () =>  navigation.navigate('qrcodescreen',{email:email})}
      ])
     
     }else{
        Alert.alert('Attendee Exists','Have you already registered for this event?')
     }}
     else{
      Alert.alert('Cannot register','All fields are required')
     }
    
        }catch(err)
        {

            console.log("Error in front end while interested in an event",err)
            Alert.alert("Failed","Try again later")
        }

    }
  return (
    <View style={styles.container}>
      <View style={styles.arrowButton}>
        <Pressable onPress={onPressBack}>
        <Icon
        name="arrow-left"
        size={30}
        color="#000"
        />
       </Pressable>
      </View>
        <Text style={styles.text}>Register Now!!!</Text>
        <Input  placeholder='Name:' value={attName} setValue={setAttName} ></Input>
        <Input placeholder="Age:"  value={attAge} setValue={setAttAge}></Input>
        <Input placeholder="Academic Qualifications" value={attEd} setValue={setAttEd} ></Input>
        <Input placeholder="Address:" value={attAdd} setValue={setAttAdd} />
        <Input placeholder="Contact Number" value={attContact} setValue={setAttContact} />
        <Button color='tomato' title='REGISTER' onPress={() => onPressRegister({attName,attAge,attEd,attAdd,attContact})}></Button>
       
        
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#F7E5E2'
    },text:{
        fontWeight:'bold',
        fontSize:25,
        paddingBottom:20
      
    }, arrowButton: {
      position:'absolute',
            top:10,
            left:10}
})
export default InterestedForm 
