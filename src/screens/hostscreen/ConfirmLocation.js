import React from 'react';
import { View, Button, TextInput, TouchableOpacity, Text,StyleSheet,Dimensions,Alert } from 'react-native';
import MapView, { Marker,Circle} from 'react-native-maps';
import * as Location from 'expo-location';
import CustomButtons from '../../components/custombuttons';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute} from '@react-navigation/native';
import firebase from 'firebase/compat';
import 'firebase/compat/firestore'

const db = firebase.firestore();


// in this code location is the coords component containing latitude and longitude of the 
//place you entered initially set to the region of your device, region is the whole region considered initially for the map and place is where the map marks after you enter location values
//place is the location you entered
const ConfirmLocation = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { eventName,hostName,desc,selectedDate,selectedStartTime,selectedEndTime,intervalTime,email} = route.params
   
  
    const [location, setLocation] = useState(null);
    const [region,setRegion] = useState(null);
    const [place,setPlace] = useState('');
    
    const [circleRadius,setCircleRadius]= useState(1000) //1000m or 1km
    const[customRadius,setCustomRadius] = useState('');
    
   

   const HostEvent =async () => {
     console.log(location.latitude)
     console.log(location.longitude)
   
     /*to post event details to the database
       axios.post(`${URL}/api/registerEvent`,{ eventName,hostName,desc,selectedDate,selectedStartTime,selectedEndTime,intervalTime,latitude: location.latitude,longitude: location.longitude, circleRadius})
       .then(res=> {
        console.log(res)},
        navigation.navigate('PostReg',{email:email}),
        Alert.alert("Your event is registered", "Check all your events here")
        ).catch(error => {
           console.log('error in the front end',error)
        } 
        )*/

        const event = {eventName,hostName,email,desc,selectedDate,selectedStartTime,selectedEndTime,intervalTime,latitude: location.latitude,longitude: location.longitude, circleRadius}
        try{
           const existingEvent = await db.collection('events')
           .where('email','==',email)
           .where('hostName','==',hostName)
           .where('selectedDate','==',selectedDate)
           .where('selectedStartTime','==',selectedStartTime)
           .get()
           if(existingEvent.empty)
           {
            await db.collection('events').add(event);
            Alert.alert('Event hosted!','Check your details')
            navigation.navigate('mainpage',{email:email})
           }else{
            Alert.alert('Duplicate Event, An event has already been registered with these credentials')
           }
        }catch(err)
        {
console.log("Error loading your event",err)
Alert.alert("Failed","There was a problem . Try again later :((")
        }
        
      
    }

     

    useEffect( () => {
        (async() => {
            await Location.requestForegroundPermissionsAsync({});
            const {coords} = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
            const {latitude,longitude} = coords;
            setLocation({latitude,longitude})
           setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
           });
        
    }) ();
    },[])
    
    const handleSearch = async() => {
        if(place.trim()===""){
            return;
        }

    const encodedPlaceName = encodeURIComponent(place)
    const apiKey = "AjicUPFESegTli8Cu-MYCfD-ULBOYMP6P7Lk5UUHH4KWH1P6a2nYro5yZgCccdRc" 
    const searchURL = `https://dev.virtualearth.net/REST/v1/Locations?query=${encodedPlaceName}&key=${apiKey}` 
   // const apiKey ="e7934177faff68cc525fbfd8a0edf9d2"
    //const searchURL = `https://apis.mapmyindia.com/advancedmaps/v1/${apiKey}/places/geocode?address=${encodedPlaceName}`
    console.log(searchURL)
    try{
        const response = await fetch(searchURL)
        const text = await response.text();

        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
        }
    
        if (text.trim() === '') {
          throw new Error('Empty response received from the API');
        }
    
        const data = JSON.parse(text);
        //const data = await response.json()
  
    if(data && data.resourceSets && data.resourceSets.length>0 && data.resourceSets[0].resources && data.resourceSets[0].resources.length>0)
    {
        const {coordinates} = data.resourceSets[0].resources[0].point;
        if(coordinates && coordinates.length === 2)
        {
            const latitude = coordinates[0]
            const longitude = coordinates[1]
           
            console.warn(latitude)
            console.warn(longitude)
            setLocation({latitude,longitude})
            setRegion({
             latitude,
             longitude,
             latitudeDelta:0.0922,
             longitudeDelta:0.0421,
            })
    
        }
    }else {
        Alert.alert('Location not found ')
    }
    }catch(err)
    {
        Alert.alert('Error finding..')
        console.log(err)
    }
    }
//in this code u have 2 radii. First is circleRadius and second is custonRadius
// customRadius is the input radius in textInput since it expects a string always
// this radius is updated by hook setcustomradius and the function below
//the other radius circleRadius is the integer form of the radius to mark on map
//this radius is changed using setcircleradius and it converts customradius
//and converts it to integer to mark on the map.

    const handleCustomRadiusChange = (text) => {
      setCustomRadius(text);
    }

    const handleSetCustomRadius = () => {
      const intRadius = parseInt(customRadius)
      if(!isNaN(intRadius))
      {
        setCircleRadius(intRadius)
      }else{
        Alert.alert('Nope','Enter better radius :/')
      }
    }

    const handleMapPress = (coordinate) => {
      setLocation(coordinate);
    }

    const handleMarkerDragEnd = (coordinate) => {
      setLocation({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      });
      console.log(coordinate.latitude)
      console.log(coordinate.longitude)
    }

   
  
        return (
            <View style = {styles.container}>
              <MapView 
              style={styles.map} 
              region={region} 
              loadingEnabled={true}  
              initialRegion={region}
              onPress= {(e) => handleMapPress(e.nativeEvent.coordinate)}>

          {location &&
           <Marker 
           coordinate={location}
            title= "Your Location" 
            draggable
            onDragEnd={(e)=> handleMarkerDragEnd(e.nativeEvent.coordinate)}
            />
            }
          {location &&
           <Circle
           center={location} 
          radius={circleRadius}
          fillColor="rgba(0,0,255,0.2)"
          strokeColor='rgba(0,0,255,0.2)'
           />
           }
           </MapView>  
           
           <View style={styles.searchContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Search for a place"
        value={place}
        onChangeText={setPlace}
      />
      <Button style={styles.button} title="Find Location" onPress={handleSearch} />
    </View>

    {location && (
      <View style={styles.radiusContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Radius"
          value={customRadius}
          onChangeText={handleCustomRadiusChange}
          keyboardType="numeric"
        />
        <Button style={styles.button} title="Mark Radius" onPress={handleSetCustomRadius} />
      </View>
    )}
           
        <CustomButtons text="HOST EVENT" onPress={HostEvent} />
          </View>
    
    
        )
          }
    
     const styles = StyleSheet.create({
      button: {
        padding:30,
        marginVertical:10,
        alignItems :'center',
        borderRadius:5,
   }, 
   hostContainer:{
     justifyContent:'flex-end',
   },
     container: {
        flex: 1,
       justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#F7E5E2'
      },
      map: {
        flex:1,
        width: Dimensions.get('window').width,
        marginTop:"25%",
       // height: Dimensions.get('window').height,
      },
      searchContainer: {
        position: 'absolute',
        top: 50, 
        width: '70%',
        paddingHorizontal: 16,
      },
      input: {
       
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlign: 'center', // Center the text horizontally
        paddingLeft: 5, // Add left padding for space from the edge
        paddingRight:5,
        marginBottom: 10, // Add marginBottom to create space between the search bar and the button
      },
     
    });

export default ConfirmLocation; 
