import React from 'react'
import {View,Text,StyleSheet,TextInput, Alert, Pressable, ScrollView,Dimensions} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import firebaseConfig from '../../../firebase';
import firebase from 'firebase/compat';
import 'firebase/compat/firestore'

import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../../components/header'


const db = firebase.firestore()
    const deviceWidth = Math.round(Dimensions.get("window").width);

const EditEvent = () => {

    const navigation = useNavigation()
    

    const route = useRoute()
    const{email,
        eventId,
        hostName,
        selectedDate,
        desc,
        selectedStartTime,
        selectedEndTime,
        intervalTime,
        circleRadius } = route.params

        const[hName, setHName] = useState(hostName)
        const[sDate,setSDate] = useState(selectedDate)
        const[des,setDes] = useState(desc)
        const[sStartTime,setSStartTime] = useState(selectedStartTime)
        const[sEndTime,setSEndTime] = useState(selectedEndTime)
        const[iTime,setITime] = useState(intervalTime)
        const[cRadius,setCRadius] = useState(circleRadius.toString())
       
        const afterChanges = async() => {

      //  const findEventRef = db.collection('events')
       // const querySnapshot = await findEventRef.where(firebase.firestore.FieldPath.documentId(),'==',eventId).get()
  if(hName&& sDate && des && sStartTime && sEndTime && iTime && cRadius)
  {
       try{
        await db.collection('events').doc(eventId).update({
            hostName:hName,
            selectedDate: sDate,
            desc : des,
            selectedStartTime: sStartTime,
            selectedEndTime: sEndTime,
            intervalTime: iTime,
            circleRadius:parseInt(cRadius)

        })
        Alert.alert('Success','Your event has been updated!')
       }catch(err)
       {
       console.log(err)
       }}else{
        Alert.alert('Cannot update','All the fields must be present or the event does not exist')
       }
       }
        



    const deleteEventConfirm = async(eventId) => {
        Alert.alert('Confirmation','Are you sure you want to delete the event? Once deleted it cannot be recovered :/',
        [{
            text: 'Cancel',
            style:'cancel'
            },
            {
                text:"Yes",
                onPress : async() => {
                    try{
                        await db.collection('events').doc(eventId).delete()
                        
                        Alert.alert("Deleted","Your event was deleted  ")
                          }catch(err)
                          {
                               console.log(err)
                          }
            }}
        ],
        {cancelable:true})
    }

   

  return (
   <View style={styles.container}>
    <View style={styles.custHeader}></View>
    <Header label="            Update Event"></Header>
      <View style={styles.arrowButton}>
      <Pressable  onPress={()=>navigation.navigate('myevents',{email:email})}>
        
       <Icon 
       name='arrow-left'
       size={30}
       color='black'/>
  
        </Pressable>
        </View>

    <ScrollView contentContainerStyle={styles.scrollViewContent}
    showsVerticalScrollIndicator={false}>
       

    <Text style={styles.text}>HostName</Text>
    <TextInput name="hostName" value={hName} onChangeText={setHName} style={styles.input}></TextInput>
    <Text style={styles.text}>Event Date</Text>
    <TextInput name="eventDate" value={sDate} onChangeText={setSDate} style={styles.input}></TextInput>
    <Text style={styles.text}>Event Description and Venue</Text>
    <TextInput name="Event Desc" value={des} onChangeText={setDes} style={styles.desinput}></TextInput>
    <Text style={styles.text}>Start Time</Text>
    <TextInput name="sStartTime" value={sStartTime} onChangeText={setSStartTime} style={styles.input}></TextInput>
    <Text style={styles.text}>End Time</Text>
    <TextInput name="sEndTime" value={sEndTime} onChangeText={setSEndTime} style={styles.input}></TextInput>
    <Text style={styles.text}>Interval timings(in min)</Text>
    <TextInput name="iTime" value={iTime} onChangeText={setITime} style={styles.input}></TextInput>
    <Text style={styles.text}>Radius(m)</Text>
    <TextInput name="radius" value={cRadius} onChangeText={setCRadius} style={styles.input}></TextInput>

    <Pressable onPress ={() =>afterChanges(hName,sDate,des,sStartTime,sEndTime,iTime,cRadius)}>
    <View style={styles.brownButton}>
   <Text style={styles.brownButtonText}>Update</Text>
    </View>
    </Pressable>
    <Pressable onPress ={() =>deleteEventConfirm(eventId)}>
    <View style={styles.brownButton}>
   <Text style={styles.brownButtonText}>Delete </Text>
    </View>
    </Pressable>
    </ScrollView>
   </View>
  
  )
}

const styles = StyleSheet.create({
    container:{
       
        backgroundColor:"#FCEBE6",
        justifyContent:'center',
        //alignItems:'center',
        flex:1
    },input:{
        backgroundColor:'white',
        height:50,
        width:300,
        borderRadius:10,
        padding:10,
        marginBottom:20
    }, desinput: {
        
        backgroundColor:'white',
        height:70,
        width:300,
        borderRadius:10,
        padding:10,
        marginBottom:30
    }, brownButton: {
        height:48,
        width:140,
        borderRadius:10,
        backgroundColor:'#AF7D7D',
        marginTop:20,
        alignItems:'center',
        justifyContent:"center"

    },brownButtonText: {
        color:'white',
        fontWeight:"bold",
        fontSize:18
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingBottom: 100,
        marginTop:30
       
      },
      text:
      {
        color:'black',
        fontSize:15,
        fontWeight:'bold',
        marginBottom:10
      },
      arrowButton: {
        position:'absolute',
       left:20,
       top:40,
      
      }, custHeader: {
        width: deviceWidth,
        height:'3%',
       // backgroundColor:"#bfc2cc",
       backgroundColor:'white',
        justifyContent:'flex-end', //vertical align
        alignItems:'center', //horizontal alignment
       paddingBottom:10
    },
})

export default EditEvent
