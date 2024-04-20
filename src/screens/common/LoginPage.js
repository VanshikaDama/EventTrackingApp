import React from "react";
import  {View,Text,StyleSheet,Image,Dimensions,useWindowDimensions,Alert,KeyboardAvoidingView,Pressable} from 'react-native'
import Logo from '../../../assets/ticket.png'
import CustomInput from '../../components/custominput'
import CustomButtons from '../../components/custombuttons'
import {useForm, Controller} from 'react-hook-form'
import { useState } from "react";
import Input from "../../components/input";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";
import firebaseConfig from "../../../firebase";
import Header from "../../components/header";
import Icon from 'react-native-vector-icons/FontAwesome'

import PartyLogo from '../../../assets/party-hat.png'

const EMAIL_REGEX = /^[\w.+\-]+@gmail\.com$/
const devwidth = Dimensions.get('window').width
const deviceWidth = Math.round(Dimensions.get("window").width);


const LoginPage = () => {

const navigation = useNavigation();
const {height} = useWindowDimensions();

const {
    control,
    handleSubmit,
    formState: {errors}
} = useForm();



const db = firebase.firestore()
const auth = firebase.auth()

const onSignInPressed= async(data) => {
  
  auth.signInWithEmailAndPassword(data.email,data.password)
 .then(userCredentials => {
    const user = userCredentials.user;
    console.log(user.email)
    Alert.alert('Success', 'Welcome In')
    navigation.navigate('mainpage',{email:user.email })
 }).catch((error) =>
 {
    console.log(error)
    Alert.alert('SignInFailed','Invalid Email or Password')
 })
 
}


    const CreateAccount = () => {
    
      navigation.navigate('signuppage')
      }

   
 return (
   
        <View style= {styles.root}>
           
            <View style={styles.custHeader}></View>
            <Image
           source={PartyLogo}
           style={styles.partyLogo} />
        <View style={styles.container}>
        
       <CustomInput 
            name="email"
            placeholder="Email"
            control={control}
           rules={{required:'Email required', pattern:{value: EMAIL_REGEX, message:'Email is invalid'}}}
        />    
        <CustomInput
            name="password"  
            placeholder="Password" 
            secureTextEntry = {true}
           control = {control}
           rules = {{required:'Password required', minLength: {value:3, message:'Password should be minimum 3 letters'}}}
         />

        <CustomButtons 
        text="SignIn" 
        onPress = {handleSubmit(onSignInPressed)}>
       </CustomButtons>
          
        <Text style={{padding: 10}}>Do not have an account? Create one!</Text>
        <CustomButtons text="Create Account" onPress = {CreateAccount}></CustomButtons>
        </View>   
        </View>
      
    )
 }

const styles = StyleSheet.create({
    root: {
        alignItems:'center',
       
        backgroundColor:'#FCEBE6',
        flex:1,
        //justifyContent:'center'
    },
logo : {
        width : '70%',
        maxWidth: 300,
      maxHeight: 200,
       
    },
    text:
   {
    color:'black',
   fontWeight:'bold',
   fontSize:25,
  marginVertical:10,
   
   } ,
   const:{
    flex: 1,
   },custHeader: {
    width: deviceWidth,
    height:'3%',
   // backgroundColor:"#bfc2cc",
   backgroundColor:'white',
    justifyContent:'flex-end', //vertical align
    alignItems:'center', //horizontal alignment
   paddingBottom:10
},
container: {
    alignItems:'center',

    backgroundColor:'#FCEBE6',
    flex:1,
    //justifyContent:'center'
},
partyLogo:{
    marginTop:100,
    width:130,
    height:130,
    resizeMode: 'contain', // Specify the desired image resizing mode
     
  }
    
})


export default LoginPage 


