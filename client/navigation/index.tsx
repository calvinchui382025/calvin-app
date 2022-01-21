/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import Stats from '../screens/Stats';
import Workouts from '../screens/Workouts';
import Forum from '../screens/Forum';
import Database from '../screens/Database';
import Tester from '../screens/Tester';
import LinkingConfiguration from './LinkingConfiguration';

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//======================================================
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
//======================================================
const Tab = createMaterialBottomTabNavigator();
const iconSize = 22;
//======================================================
function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      initialRouteName='Stats'
      backBehavior='order'
      shifting
      activeColor={Colors[colorScheme].tabIconSelected}
      inactiveColor={Colors[colorScheme].tabIconDefault}
    >
      <Tab.Screen 
        name="Stats" 
        component={Stats}
        options={{
          title: 'Stats',
          tabBarLabel: 'Stats',
          tabBarColor: '#fbec5d',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='stats-chart'
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Workouts" 
        component={Workouts}
        options={{
          title: 'Workouts',
          tabBarLabel: 'Workouts',
          tabBarColor: '#ffe135',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 
              name={'dumbbell'} 
              color={color} 
              size={iconSize} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Forum" 
        component={Forum}
        options={{
          title: 'Forum',
          tabBarLabel: 'Forum',
          tabBarColor: '#ffd800',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name={'forum'} 
              color={color} 
              size={iconSize} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Database" 
        component={Database}
        options={{
          title: 'Database',
          tabBarLabel: 'Database',
          tabBarColor: '#ffc40c',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 
              name={'database'} 
              size={iconSize} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Tester" 
        component={Tester}
        options={{
          title: 'Tester',
          tabBarLabel: 'Tester',
          tabBarColor: '#ffc40c',
          tabBarIcon: ({ color }) => (
            <MaterialIcons 
              name={'science'} 
              size={iconSize} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}