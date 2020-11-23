//steps for creating a reusable hook

//1. extract all logic to do with the aim of the hook in this case location
//2. make sure that you dont extract anything dependant on something that may not be present else where
//3. check jsx from place you extracted to find out the paramaters needed
//4. return needed variables in an array []  array is the hook convention
//5. abtract away specific functions like in this case addLocation needs to change to a generic callback as a paramater

import { useState, useEffect } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default (shouldTrack, callBack) => {
  //to get acesss to the sub value and be able to change it we set up local state

  const [error, setError] = useState(null);
  //saying fire this screen when we are isFocused on the track create screen
  //also refire when the call back changes from should record or not record
  useEffect(() => {
   
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        //subscriber is how we turn tracking on and off
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          //this call back function looks for a change in recording true or not
          //if it is true then the tracking records if it false it doesnt
          callBack
        );
        //set the state to the current on position

        if (!granted) {
          throw new Error("Location permission not granted");
        }
      } catch (err) {
        setError(err);
      }
    };

    if (shouldTrack) {
      //if we are on the screen run the tracking aka create a subscriber
      startWatching();
    } else {
      //other wise stop the tracking
      if (subscriber) {
        subscriber.remove();
      }
      //and reset the subscriber to null aka off
      subscriber = null;
    }
    //clean up function
    return () => {
      // to avoid creating multiple instances of subscribers that would use
      //all that battery and cpu
      if (subscriber) {
        subscriber.remove();
      }
    };
    //tracking will carry on until either screen moves or callback(store output of ) changes
  }, [shouldTrack, callBack]);
  return [error];
};
