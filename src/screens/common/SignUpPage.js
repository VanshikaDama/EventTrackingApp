import React from "react";
import  {View,Text,StyleSheet,Alert,Dimensions,useWindowDimensions,Pressable,Image} from 'react-native'
import CustomInput from '../../components/custominput'
import CustomButtons from '../../components/custombuttons'
import { useState,useEffect } from "react";
import {useForm, Controller} from 'react-hook-form'
import {useNavigation} from '@react-navigation/native'
import Input from "../../components/input";
import firebase from "firebase/compat";
//import 'firebase/compat/database'
//import firebaseConfig from "../../../firebase";
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
  
import Icon from "react-native-vector-icons/FontAwesome";

import CakeLogo from '../../../assets/birthday-cake.png'


const db = firebase.firestore()
const auth = firebase.auth()
const devwidth = Dimensions.get('window').width
const deviceWidth = Math.round(Dimensions.get("window").width);


const SignUpPage = () => {

const navigation = useNavigation();
const[email, setEmail ] = useState('')
const[password, setPassword] = useState('')



const CreateAccount = async() => {

 
   if(email&& password)
   {
   try{
   const credentials = await auth.createUserWithEmailAndPassword(email,password)
   const user = credentials.user
   await db.collection("users").add({email: user.email})
   console.log("data stored")
   navigation.navigate('loginpage',{email:email})
   }catch(err)
   {
    Alert.alert('Failed','Email or Password badly formated')
   }}else
   {
    Alert.alert('Failed','Email or Password Missing ')
   }
}
return (
  <View style= {styles.root}>
  
  
    <View style={styles.arrowButton}>
                <Pressable onPress={()=> navigation.navigate('loginpage')}>
                    <Icon
                    name="arrow-left"
                    size={30}
                    color="#000"></Icon>
                </Pressable>
            </View>
            
            <Image
   source={CakeLogo}
   style={styles.partyLogo}/>
       <Text style={styles.text}>Create a new Account</Text>
       <Input 
       name="email"
       placeholder="Email"
       value={email}
       setValue={setEmail}
       />
        <Input
        name="password"  
        placeholder="Password" 
        secureTextEntry = {true}
        value={password}
        setValue={setPassword}
       
         />

        <CustomButtons 
        text="Create Account" 
        onPress = {CreateAccount}>
       </CustomButtons>
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
   fontSize:20,
  marginVertical:10,
   
   } ,
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
  position:"absolute",
  left:20,
  top:35
},
partyLogo:{
  width:130,
  height:130,
  resizeMode: 'contain', // Specify the desired image resizing mode
    marginBottom: 10,
}
})


export default SignUpPage; 
