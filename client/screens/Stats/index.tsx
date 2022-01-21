import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import CircularProgress from 'react-native-circular-progress-indicator';
import { generateRandomInteger, wait } from '../../constants/utilities';
//======================================================
export default function Stats({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [refreshing, setRefreshing] = useState(false);
  const [randomValue, setRandomValue] = useState( generateRandomInteger() );
  const [randomValue2, setRandomValue2] = useState( generateRandomInteger() );
  const [randomValue3, setRandomValue3] = useState( generateRandomInteger() );
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count < 5) {
      setRandomValue(generateRandomInteger());
      setRandomValue2(generateRandomInteger());
      setRandomValue3(generateRandomInteger());
      wait(3000).then(() => {
        setCount(count + 1);
      })
    }
  }, [count]);

  const onRefresh = () => {
    setRefreshing(true);
    setCount(0);
    setRefreshing(false);
  }

  const speedColor = randomValue > 60 ? 'red' : 'gold';
  const speedTextColor = randomValue > 60 ? 'red' : 'grey';
  const moneyColor = '#2ecc71';
  const percentageColor = 'cornflowerblue';

  const props = {
    radius: 60,
    duration: 3000,
    maxValue: 100,
    activeStrokeWidth: 15,
    inActiveStrokeWidth: 10,
    showProgressValue: true,
    clockwise: true,
  }

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
      <Text>
        This is the stats screen
      </Text>
      <CircularProgress
        {...props}
        value={randomValue}
        textColor={speedTextColor}
        title={'MPH'}
        titleColor={speedTextColor}
        titleFontSize={10}
        titleStyle={{
          fontWeight: 'bold'
        }}
        circleBackgroundColor={'#0000'}
        activeStrokeColor={speedColor}
        inActiveStrokeColor={'lightgrey'}
      />
      <CircularProgress
        {...props}
        value={randomValue2}
        valuePrefix={'$'}
        textColor={moneyColor}
        title={''}
        titleColor={moneyColor}
        titleFontSize={10}
        titleStyle={{ }}
        circleBackgroundColor={'#0000'}
        activeStrokeColor={moneyColor}
        inActiveStrokeColor={moneyColor}
        inActiveStrokeOpacity={0.2}
      />
      <CircularProgress
        {...props}
        value={randomValue3}
        valueSuffix={'%'}
        textColor={percentageColor}
        title={''}
        titleColor={percentageColor}
        titleFontSize={10}
        titleStyle={{
          fontWeight: 'bold'
        }}
        circleBackgroundColor={'#0000'}
        activeStrokeColor={percentageColor}
        inActiveStrokeColor={percentageColor}
        inActiveStrokeOpacity={0.2}
      />
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
