import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { url } from '../../constants/URLS';
import { Text } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//======================================================
const iconSize = 50;
//======================================================
export default function Database({ navigation }: RootTabScreenProps<'TabFour'>) {
  
  const [refreshing, setRefreshing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    testFetch();
  }

  const testFetch = async () => {
    // setRefreshing(true);
    setConnected(false);
    setServerMessage('');
    const configObj = {
      method: 'get',
      url: `${url}/api`,
    };
    try {
      // @ts-ignore
      const response = await axios(configObj);
      setConnected(true);
      setRefreshing(false);
      const { data } = response;
      const { message } = data;
      setServerMessage(message);
    } catch (err) {
      setRefreshing(false);
      console.log(err);
    }
  }

  useEffect(() => {
    testFetch();
  }, []);
  
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
      <Text>This is the database screen</Text>
      <Text>Pull screen down to test API</Text>
      { refreshing && (
        <ActivityIndicator
          size="large"
          color="gold"
        />
      )}
      { !refreshing ? (
        <MaterialCommunityIcons 
          name={connected ? 'check' : 'close-thick'}
          color={connected ? 'green' : 'red'}
          size={iconSize}
        />
      ) : (
        <MaterialCommunityIcons 
        name={connected ? 'check' : 'close-thick'}
        color={'#0000'}
        size={iconSize}
      />
      )
    }
      <Text>{serverMessage}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
