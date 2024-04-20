import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'

const Card = () => {
  return (
   <View style={styles.cardContainer}>
    
   </View>
  )
}

const devwidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    cardContainer: {
       width: devwidth-(0.1*devwidth),
       backgroundColor:'#a29bfe',
       height: 300,
       borderRadius:20,
       shadowColor:'#000',
       shadowOffset: {
        width:10,
        height:10,
       },
       shadowOpacity:0.75,
       shadowRadius:10,
       elevation:9,
    }
})
export default Card
