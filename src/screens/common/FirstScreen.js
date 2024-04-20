import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions,Dimensions, Alert, KeyboardAvoidingView, ScrollView,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HostingImage from '../../../assets/hosting.png'
import Alien from '../../../assets/alien.png'
import { useNavigation } from '@react-navigation/native'



const devwidth = Dimensions.get('window').width
const deviceWidth = Math.round(Dimensions.get("window").width);


const FirstScreen = () => {
  const navigation = useNavigation()
 return(
   <View style={styles.root}>
     <Image 
     source={Alien}
     style={styles.partyLogo} />

     <Text style={styles.text}>Hosting and Finding events made easier </Text>
     
      <Pressable onPress={()=> navigation.navigate('loginpage')}>
<View style={styles.redblock}>
  <Text style={styles.redblocktext}> Get Started</Text>
</View>
      </Pressable>
     
   </View>
   
 )
}
const styles = StyleSheet.create({
root: {
  alignItems:'center',
  padding: 20,
  justifyContent:'center',
  backgroundColor:'#FCEBE6',
  flex:1
},
text:
{
color:'black',
fontWeight:'bold',
fontSize:16,
marginVertical:10,

} ,

partyLogo:{
  width:150,
  height:150,
  resizeMode: 'contain', // Specify the desired image resizing mode
    marginBottom: 10,
},  redblock: {
  
  //width: deviceWidth-(0.1*deviceWidth),
  width: 200,
  backgroundColor:'#6766FF', 
  height: 40,
  marginBottom:20,
  borderRadius:10,
  marginTop:15,
  alignItems:'center',
  justifyContent:'center',
 
},
redblocktext: {
fontSize: 18,
fontWeight: 'bold',
color: 'white',

},
})

export default FirstScreen;
