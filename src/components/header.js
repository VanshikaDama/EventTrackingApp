import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'

const Header = (props) => {
  return (
    <View style= {styles.container}>
        <Text style={styles.labelStyle}>{props.label}</Text>
    </View>
  )
}

const deviceWidth = Math.round(Dimensions.get("window").width);

const styles= StyleSheet.create({
    container: {
        width: deviceWidth,
        height:'6%',
        backgroundColor:"#AF7D7D",
        justifyContent:'flex-end', //vertical align
        alignItems:'flex-start', //horizontal alignment
        marginBottom:30,
        paddingBottom:10,
        paddingLeft:20,
    },
    labelStyle:{
    fontSize:22,
    fontWeight:'bold',
    position:'absolute',
 textAlign:'left',
    paddingBottom:10,
    color:'white'
    }
})
export default Header
