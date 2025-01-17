import React from "react";
import {View,Text, TextInput, StyleSheet} from 'react-native'
import { Controller } from "react-hook-form";

const CustomInput = ({control,name,rules={},placeholder, secureTextEntry}) => {
    return (
       
<Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field: {value,onChange,onBlur}, fieldState:{error}})=> (
            <>
            <View style={[styles.container, { borderColor: error ? 'red': '#e8e8e8'}]}>
           <TextInput 
           value = {value} 
           onChangeText = {onChange} 
           onBlur={onBlur} 
           placeholder={placeholder}
           style = {[styles.input,]}
           secureTextEntry={secureTextEntry}
           /> 
           </View>
           {error && (
           <Text style= {{color:'red', alignSelf:'stretch',justifyContent:'center',alignItems:'center'}}>{error.message || 'Error'}</Text>
           )}
           </>
     ) }/> 
        
        
    )
}
const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        width : '100%',
        borderColor: "#e8e8e8",
        borderWidth: 1, 
        borderRadius : 10,
        paddingHorizontal :30,
        paddingVertical:8,
        width:300,
        marginVertical:10,

    },
    input: {
      
    },
})

export default CustomInput;