import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Login/LoginScreen';
import FeedScreen from '../Screens/Feed/FeedScreen';
import FeedDetailScreen from '../Screens/Feed/FeedDetailScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProfileScreen from '../Screens/Home/ProfileScreen';
import NotificationScreen from '../Screens/Home/NotificationScreen';
import NewFeedScreen from '../Screens/Feed/NewFeedScreen';
import CameraScreen from '../Screens/Camera/CameraScreen';
import CodeScaneer from '../Screens/Camera/CodeScaneer';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        orientation: 'portrait',
      }}>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
        name="FeedScreen"
        component={FeedScreen}
      />
      <Stack.Screen
        options={{
          title: 'Detail Screen',
        }}
        name="FeedDetailScreen"
        component={FeedDetailScreen}
      />
      <Stack.Screen
        options={{
          title: 'NewFeedScreen',
        }}
        name="NewFeedScreen"
        component={NewFeedScreen}
      />
      <Stack.Screen
        options={{
          title: 'New Feed',
          headerShown: false,
        }}
        name="CameraScreen"
        component={CameraScreen}
      />
      <Stack.Screen
        options={{
          title: 'CodeScaneer',
          headerShown: false,
        }}
        name="CodeScaneer"
        component={CodeScaneer}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export {AuthStack, FeedStack, HomeStack};
