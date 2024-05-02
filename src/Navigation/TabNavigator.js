import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FeedStack, HomeStack} from './StackNavigator';
import NotificationScreen from '../Screens/Home/NotificationScreen';

const BottomStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={({route}) => ({
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            // console.log(routeName)
            if (
              routeName === 'NewFeedScreen' ||
              routeName === 'CameraScreen' ||
              routeName === 'FeedDetailScreen'
            ) {
              return {display: 'none'};
            }
            return;
          })(route),
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
        //  options={{ title: 'Overview', headerShown: false }}
        name="Home"
        component={FeedStack}
      />
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: 'Feed',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={({route}) => ({
          // headerShown: false,
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export {BottomStack};
