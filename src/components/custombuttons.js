import React from 'react'
import { Text , View, StyleSheet, Pressable} from 'react-native'


const CustomButtons = ({onPress,text}) => {
    return (
<Pressable onPress={onPress} style = {styles.container} >
    <Text style={styles.text}>
        {text}
    </Text>
</Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
           backgroundColor: "#AF7D7D",
           width: 300,
           padding:10,
           marginVertical:10,
           alignItems :'center',
           borderRadius:5,
    },
    text: {
          fontWeight: 'bold',
          color: 'white',
    }
})
export default CustomButtons