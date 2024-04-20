/*import React, { useState } from 'react';
import { View, TextInput, Button,StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const API_KEY='e7934177faff68cc525fbfd8a0edf9d2'

const MapScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleSearch = () => {
    // Implement MapmyIndia search API to get coordinates based on searchText
    // For example:
     fetch(`https://apis.mapmyindia.com/advancedmaps/v1/${API_KEY}/geo_code?addr=${searchText}`)
      .then(response => response.json())
       .then(data => {
        const { lat, lng } = data.results[0].location;
        setCoordinates({ latitude: lat, longitude: lng });
      })
      .catch(error => console.log(error));
  };

  return (
    <View style = {styles.container}>
      <MapView 
              style={styles.map} 
              region={region} 
              loadingEnabled={true}  
              initialRegion={region}></MapView>
             
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingHorizontal: 10 }}
        onChangeText={text => setSearchText(text)}
        value={searchText}
        placeholder="Enter location"
      />
      <Button title="Search" onPress={handleSearch} />
      {coordinates && (
        <MapView style={{ flex: 1 }}>
          <Marker coordinate={coordinates} />
        </MapView>
      )}
    </View>
  )

export default MapScreen*/