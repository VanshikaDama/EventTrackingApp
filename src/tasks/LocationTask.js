import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location';
import * as BackgroundFetch from 'expo-background-fetch'
//import {BackgroundFetch} from 'expo'
import { FetchResult } from 'expo-background-fetch';


const BACKGROUND_FETCH_TASK = 'background-fetch';

export const locationTask = async ({ data, error }) => {
    if (error) {
      console.log('There was an error in location task', error);
      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
    if (data) {
      const { locations } = data;
      console.log('Received locations:', locations);

    }
    console.log(BackgroundFetch.BackgroundFetchResult.NewData)
    
  };
  TaskManager.defineTask('locationTask',locationTask)
  export const startLocationTask = async () => {
    try {
      await Location.startLocationUpdatesAsync('locationTask', {
        accuracy: Location.Accuracy.High,
        timeInterval: 3000, // Update location every 5 seconds
        distanceInterval: 1, // Update location if the user moves by 5 meters
        deferredUpdatesInterval: 3000, // Minimum interval between updates when the app is in the background
        foregroundService: {
          notificationTitle: 'Tracking',
          notificationBody: 'Tracking in progress',
          notificationColor: '#ff0000', // Notification color (optional)
        },
      });
      console.log('Location task started');
    } catch (error) {
      console.log('Error starting location task:', error);
    }
  };
  
  export const stopLocationTask = async () => {
    try {
      await Location.stopLocationUpdatesAsync('locationTask');
      console.log('Location task stopped');
    } catch (error) {
      console.log('Error stopping location task:', error);
    }
  };