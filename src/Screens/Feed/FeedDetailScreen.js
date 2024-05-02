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
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TabView, TabBar} from 'react-native-tab-view';
import ArticleDetail from './Components/Article/ArticleDetail';
import { Grid } from '../../Components/Images/Grid';
import { Messsaging } from './Components/Messsaging';
const FeedDetailScreen = ({route, navigation}) => {
  const {post} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'article', title: 'Detail'},
    {key: 'images', title: 'Images'},
    {key: 'messsaging', title: 'Message'},
    {key: 'myfeed1', title: 'Location'},
  ]);

  useEffect(() => {}, []);

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
        scrollEnabled
      />
    );
  };

  const _renderScene = ({route}) => {
    switch (route.key) {
      case 'article':
        return <ArticleDetail post={post} isDarkMode={isDarkMode} />;
      case 'images':
        return <Grid images={post.images} isDarkMode={isDarkMode} />;
      case 'messsaging':
        return <Messsaging isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={_renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
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
    borderColor: 2,
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

FeedDetailScreen.options = {
  topBar: {
    visible: true,
    backButton: {
      showTitle: false,
    },
    title: {
      color: {
        light: '#1577F2',
        dark: '#1577F2',
      },
      text: 'Feed Detail',
    },
  },
  bottomTabs: {
    visible: false,
  },
};

export default FeedDetailScreen;
