
import { StyleSheet, Text, View,SafeAreaView} from 'react-native';
import Navigation from './src/navigation/navigation';

import { locationTask } from './src/tasks/LocationTask';
import * as TaskManager from 'expo-task-manager'






TaskManager.defineTask('locationTask', locationTask)

export default function App() {
  return (

    <SafeAreaView style={styles.container}>
<Navigation/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backfaceVisibility: '#e6e6fa',
    justifyContent:'center',
  }
});
