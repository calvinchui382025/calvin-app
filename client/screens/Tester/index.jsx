import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as TesterScreenActions } from './reducer';
import * as TesterScreenSelectors from './selectors';
import Toast from 'react-native-toast-message';

import { Icon } from 'react-native-elements';
import { StyleSheet, ScrollView, View, Modal, Pressable } from 'react-native';
import { Text } from '../../components/Themed';
import * as Location from 'expo-location';
import axios from 'axios';
//======================================================
export default function Tester({ navigation }) {
  const dispatch = useDispatch();
  const counter = useSelector(TesterScreenSelectors.getCounter);
  const dbCounter = useSelector(TesterScreenSelectors.getDBCounter);

  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [location, setLocation] = useState();
  const [locationCoordinates, setLocationCoordinates] = useState();
  const [locationName, setLocationName] = useState();

  const addCounter = () => {
    dispatch(TesterScreenActions.setCounter(counter + 1));
  }
  const subtractCounter = () => {
    dispatch(TesterScreenActions.setCounter(counter - 1));
  }
  const enableWeatherModal = () => {
    if(locationCoordinates){
      setShowWeatherModal(true);
    }
  }
  const hideWeatherModal = () => {
    setShowWeatherModal(false);
  }

  const fetchWeather = () => {
    const { coords } = locationCoordinates;
    const { latitude, longitude } = coords;
    const weatherResult = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=8dd1bae28744ab1d233b8901ac42215f`)
                                .then((res) => {
                                  console.log(res);
                                }).catch((err) => {
                                  console.log(err);
                                })

    // console.log({weatherResult});
  }

  const fetchLocationInfo = () => {
    console.log('fetchLocationInfo()')
    const { coords } = locationCoordinates;
    const { latitude, longitude } = coords;
    const API_KEY = 'AIzaSyAC6_z8V3K9DN-XKugwsp4jbeW3-u25n0A';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=postal_code&key=${API_KEY}`;
    console.log({url});
    axios.get(url)
      .then(res => {
        console.log('locationResult:', res)
        const { data } = res;
        const { results } = data;
        const { formatted_address } = results[0];
        setLocationName(formatted_address);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: `The value saved in the database is ${dbCounter}`
    })
  }, [dbCounter])

  useEffect(() => {
    if(locationCoordinates){
      console.log({locationCoordinates});
      fetchLocationInfo();
    }
  }, [locationCoordinates])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let locationCoordinates = await Location.getCurrentPositionAsync({});
      setLocationCoordinates(locationCoordinates);
    })();
  }, [])

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text
        style={styles.title}
      >
        Counter
      </Text>
      <View
        style={styles.counterGroup}
      >
        <Icon
          size={40}
          type='material'
          name='remove'
          color='blue'
          onPress={() => subtractCounter()} 
        />
        <Text
          style={styles.counter}
        >{counter}</Text>
        <Icon
          size={40}
          type='material'
          name='add'
          color='blue'
          onPress={() => addCounter()} 
        />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(0,0,0,0.8)" />
      <Text
        style={styles.title}
      >
        Weather
      </Text>
      <Icon
        size={40}
        type='material'
        name='cloud'
        color='gold'
        onPress={() => enableWeatherModal()} 
      />
      <Modal
        visible={showWeatherModal}
        onRequestClose={() => hideWeatherModal()}
        onShow={() => fetchWeather()}
      >
        <View
          style={styles.container}
        >
          <Text

          >
            This is the Weather Modal
          </Text>
          <Text>
            Location: {locationName}
          </Text>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => hideWeatherModal()}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
        </View>
      </Modal>
    </ScrollView>
  )
}
//======================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 36,
  },
  counterGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});