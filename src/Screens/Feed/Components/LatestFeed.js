/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, memo, useEffect} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Article from './Article';
import {useLazyGetPostsQuery} from '../api/postsApiSlice';
import {
  selectPostsList,
  selectPostsPagination,
  setPostData,
} from '../api/postsSlice';
const LatestFeed = ({isDarkMode, hnadleDetailView}) => {
  const [page, setPage] = useState(0);
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: '100%',
          backgroundColor: isDarkMode ? '#181919' : '#CED0CE',
          // marginLeft: "14%"
        }}
      />
    );
  };

  const renderFooter = () => {
    if (!isFetching) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const [getPosts, result] = useLazyGetPostsQuery();
  const {data, isFetching, refetch} = result;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setPostData(data));
    }
  }, [data]);

  const handleRefresh = async () => {
    setPage(1);
  };

  useEffect(() => {
    getPosts(page);
  }, [page]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const posts = useSelector(selectPostsList);
  const pagination = useSelector(selectPostsPagination);
  const handleLoadMore = async () => {
    if (!isFetching && pagination.current_page) {
      if (pagination.current_page < pagination.last_page) {
        if (pagination.current_page === page) {
          setPage(pagination.current_page + 1);
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <Article
            hnadleDetailView={hnadleDetailView}
            post={item}
            isDarkMode={isDarkMode}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
        onRefresh={handleRefresh}
        refreshing={isFetching}
        onMomentumScrollBegin={() => {
          //   this.onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%'
  },
});

export default memo(LatestFeed);
