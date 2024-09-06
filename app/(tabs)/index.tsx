import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styles from '@/styles/location';


export default function HomeScreen() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const options = { accuracy: 6, distanceInterval: 0.3 }
      Location.watchPositionAsync(options, () => {
        console.log('Realtime Location', location);
        setLocation(location)
      })


    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {location && <MapView region={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.0001,
      }} style={styles.map}>

        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={'This is Hasnain mawia'}
          description={'Iam in DHA Phase II'}
        />

      </MapView>}
    </View>
  );
}

