import React, {useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  StatusBar,
  View,
  ActivityIndicator,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {AuthStack} from '../Navigation/StackNavigator';
import {useSelector} from 'react-redux';
import {
  selectCurrentToken,
  selectCurrentUser,
} from '../Screens/Login/authSlice';
import {BottomStack} from './TabNavigator';
const RootNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(false);
  // const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#ffffff' : '#0000ff'}
        />
      </View>
    );
  }

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {token === null || token === undefined ? (
          <AuthStack />
        ) : (
          <BottomStack />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default RootNavigation;
