/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TabView, TabBar} from 'react-native-tab-view';
import LatestFeed from './Components/LatestFeed';
import PopularFeed from './Components/PopularFeed';
import MyFeed from './Components/MyFeed';

const FeedScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'latest', title: 'Latest Feed'},
    {key: 'popular', title: 'Popular Feed'},
    {key: 'myfeed', title: 'My Feed'},
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('NewFeedScreen');
          }}
          title="New Feed"
        />
      ),
    });
  }, [navigation]);

  const handleDetailView = data => {
    navigation.navigate('FeedDetailScreen', {post: data});
  };

  const _renderTabBar = props => {
    return (
      <TabBar
        style={{
          ...styles.tabbar,
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        }}
        labelStyle={styles.label}
        tabStyle={styles.tab}
        indicatorStyle={styles.indicator}
        {...props}
      />
    );
  };

  const _renderScene = ({route}) => {
    switch (route.key) {
      case 'latest':
        return (
          <LatestFeed
            hnadleDetailView={handleDetailView}
            isDarkMode={isDarkMode}
          />
        );
      case 'popular':
        return <PopularFeed isDarkMode={isDarkMode} />;
      case 'myfeed':
        return <MyFeed isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={_renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width, height: layout.height}}
        renderTabBar={_renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },

  tabbar: {
    backgroundColor: '#3f51b5',
  },
  indicator: {
    backgroundColor: '#1577F2',
  },
  label: {
    fontWeight: '400',
    fontSize: 12,
    color: '#1577F2',
  },
  tabStyle: {
    width: 'auto',
  },
});

FeedScreen.options = {
  topBar: {
    visible: true,
    rightButtons: [
      {
        id: 'newAppraisal',
        //   icon: iconsMap.plus,
        enabled: true,
        disableIconTint: false,
        // color: 'white',
        disabledColor: 'black',
        testID: 'newAppraisalClickTest',
        text: 'Post',
      },
    ],
  },
};

export default FeedScreen;
