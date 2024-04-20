/*import React from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

const PostRegistration = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const{email } = route.params;
    console.log(email)
  return (
    <View style={styles.container}>
        <Text>
         <Button title='Start Tracking' onPress={()=> navigation.navigate('Tracking', {email:email})}></Button>
        </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
export default PostRegistration */
