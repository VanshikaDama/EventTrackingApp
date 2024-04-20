import React from "react";
import {View,TextInput,StyleSheet} from 'react-native'

const Input = ({value,setValue, placeholder, secureTextEntry,keyboardType}) => {
   
            return (
                <View style={styles.container}>
                    <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder} 
                    style={styles.input}
                    secureTextEntry = {secureTextEntry}
                    keyboardType={keyboardType} />
                    </View>
    )
}
const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        width : '100%',
        borderColor: "#e8e8e8",
        borderWidth: 1, 
        borderRadius : 5,
        paddingHorizontal :30,
        paddingVertical:10,
        width:300,
        marginVertical:5,
    },
    input: {
     
    },
})

export default Input;