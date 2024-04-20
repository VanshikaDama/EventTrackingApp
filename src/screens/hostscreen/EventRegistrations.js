import React from 'react'
import {View, Button, Dimensions,StyleSheet,ScrollView, Alert, Pressable} from 'react-native'
import { useState } from 'react'
//import ConfirmLocation from './ConfirmLocation'
import Input from '../../components/input'
import CustomButtons from '../../components/custombuttons'
import { useRoute } from '@react-navigation/native'
import Header from '../../components/header'
import Icon from 'react-native-vector-icons/FontAwesome'

import DateTimePickerModal from "react-native-modal-datetime-picker"

import { useNavigation } from '@react-navigation/native'
import MainPage from '../common/MainPage'
const deviceWidth = Math.round(Dimensions.get("window").width);
  
const EventRegistration = () => {

    const navigation= useNavigation()
 //   const {height} = useWindowDimensions();
    const route = useRoute()
    const {email} = route.params
   

  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  
 

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const[intervalTime,setIntervalTime] = useState('');
 
  const [eventName, setEventName] = useState('');
  const [hostName, setHostName] = useState('');
  const [desc, setDesc] = useState('');

 


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

 
  const handleDateConfirm = (date) => {
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };

  const handleStartTimeConfirm = (time) => {
    const newTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSelectedStartTime(newTime);
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (time) => {
    const newTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSelectedEndTime(newTime);
    hideEndTimePicker();
  };

 

 
const handleNextPage = () => {
  if(eventName&&hostName&&desc&& selectedDate&& selectedStartTime&& selectedEndTime && intervalTime )
  {
 navigation.navigate('confirmlocation', { eventName: eventName,
  hostName: hostName,
  desc:desc,
  selectedDate: selectedDate,
  selectedStartTime: selectedStartTime,
  selectedEndTime: selectedEndTime,
  intervalTime: intervalTime,
email:email})
 }else
 {
  Alert.alert('Cant register', 'All fields required')
 }
}
 
/*const data = {
  eventName: eventName,
  hostName: hostName,
  desc:desc,
  selectedDate: selectedDate,
  selectedStartTime: selectedStartTime,
  selectedEndTime: selectedEndTime,
  intervalTime: intervalTime,
}*/

const onPressReturn = () => {
  navigation.navigate('mainpage',{email:email})
}


    return (
      <View style={styles.container}>
          <View style={styles.arrowButton}>
          <Pressable onPress = {onPressReturn}>
            <Icon
            name='arrow-left'
            size={25}
            color="#000"
            />
            </Pressable>
         </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
       
         
        <Input placeholder="Name of the Event" value={eventName} setValue={setEventName}></Input>
        <Input placeholder="Host Name" value={hostName} setValue={setHostName}></Input>
        <Input placeholder="Enter Venue and describe event" value={desc} setValue={setDesc}></Input>
        <Input placeholder="Intervals(in minutes)" value={intervalTime} setValue={setIntervalTime} />
        
        <CustomButtons text={selectedDate ? selectedDate : 'Select Date'} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <CustomButtons text={selectedStartTime ? selectedStartTime : 'Start Time'} onPress={showStartTimePicker} />
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleStartTimeConfirm}
          onCancel={hideStartTimePicker}
        />
        <CustomButtons text={selectedEndTime ? selectedEndTime : 'End Time'} onPress={showEndTimePicker} />
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleEndTimeConfirm}
          onCancel={hideEndTimePicker}
        />
        
        
       
        <CustomButtons text= "Next" onPress={handleNextPage} />

        
     </ScrollView>
     </View>
    );
  };

  const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent: 'center',
   // alignItems: 'center',
    padding: 70,
    backgroundColor:'#F7E5E2'
    },
    
  arrowButton: {
    position:'absolute',
          top:50,
          left:20,
        zIndex:1,
      },
        scrollViewContent: {
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 20,
          marginTop:50,
        }
    
  })
  export default EventRegistration; 
  

