import React, { useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { CircularProgressWithChild } from 'react-native-circular-progress-indicator';
import { generateRandomInteger } from '../../constants/utilities';
//======================================================
export default function Workouts({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [refreshing, setRefreshing] = useState(false);
  const [randomValue, setRandomValue] = useState( generateRandomInteger() );
  const [randomValue2, setRandomValue2] = useState( generateRandomInteger() );
  const [randomValue3, setRandomValue3] = useState( generateRandomInteger() );

  const onRefresh = () => {
    setRefreshing(true);
    setRandomValue(generateRandomInteger());
    setRandomValue2(generateRandomInteger());
    setRandomValue3(generateRandomInteger());
    setRefreshing(false);
  }

  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
      >
      <Text>
        This is the workouts screen
      </Text>
      <CircularProgressWithChild
        {...props}
        value={randomValue}
        maxValue={100}
        radius={125}
        activeStrokeColor={'#e84118'}
        inActiveStrokeColor={'#e84118'}
        circleBackgroundColor={'#0000'}
      >
        <CircularProgressWithChild
          {...props}
          value={randomValue2}
          maxValue={100}
          radius={100}
          activeStrokeColor={'#badc58'}
          inActiveStrokeColor={'#badc58'}
          circleBackgroundColor={'#0000'}
        >
        <CircularProgressWithChild
          {...props}
          value={randomValue3}
          maxValue={100}
          radius={75}
          activeStrokeColor={'#18dcff'}
          inActiveStrokeColor={'#18dcff'}
          circleBackgroundColor={'#0000'}
        />
      </CircularProgressWithChild>
      </CircularProgressWithChild>
    </ScrollView>
  );
}
//======================================================
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
