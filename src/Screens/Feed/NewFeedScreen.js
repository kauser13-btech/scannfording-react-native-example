/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';

import {
  CustomTextInput,
  CommonButton,
  RectButton,
} from '../../Components/Inputs';

import {useDispatch} from 'react-redux';
import {DropdownComponent} from '../../Components/Inputs/DropdownComponent';
import {useSavePostMutation} from '../Feed/api/postsApiSlice';
import {appendPostData} from '../Feed/api/postsSlice';
import {setDraftData} from '../Feed/api/draftSlice';

const NewFeedScreen = ({navigation}) => {
  const [inputData, setInputData] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [images, setImages] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const [savePost, {isLoading}] = useSavePostMutation();
  const dispatch = useDispatch();
  const savePostData = async data => {
    const response = await savePost(data);
    dispatch(appendPostData(response.data.data));
    for (let i in images) {
      dispatch(
        setDraftData({
          ...images[i],
          post_id: response.data.data.id,
          queued_at: new Date(),
        }),
      );
    }
    navigation.goBack();
  };
  const updateImages = image => {
    setImages([...images, image]);
  };
  const navigateToCamera = () => {
    navigation.navigate('CameraScreen', {
      updateImages: updateImages,
    });
  };

  const navigateSanCamera = () => {
    navigation.navigate('CodeScaneer');
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View>
            <CustomTextInput
              onChangeInput={title => {
                setInputData({...inputData, title: title});
              }}
              title={'Project Title'}
              value={inputData.title}
              isDarkMode={isDarkMode}
            />

            <CustomTextInput
              onChangeInput={description => {
                setInputData({...inputData, description: description});
              }}
              title={'Project Desscription'}
              value={inputData.description}
              isDarkMode={isDarkMode}
            />

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <DropdownComponent
                onChangeInput={location => {
                  setInputData({...inputData, location: location});
                }}
                title={'Select Location'}
                value={inputData.location}
                isDarkMode={isDarkMode}
                data={[
                  {key: 1, value: 'Dhaka'},
                  {key: 2, value: 'Rajshahi'},
                ]}
                title={'Select  Location'}
              />
            </View>
            <View style={{flexWrap: 'wrap', padding: 10, flexDirection: 'row'}}>
              {images.map(image => {
                return (
                  <View style={{padding: 5}} key={image.id}>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{
                        uri: image.url,
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: "row",
              }}>
              <RectButton
                pressFunction={navigateToCamera}
                title={'Attach Image'}
              />
              <RectButton
                pressFunction={navigateSanCamera}
                title={'Scan Code'}
              />
            </View>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CommonButton
              loading={isLoading}
              pressFunction={async () => {
                await savePostData(inputData);
              }}
              title={'Save'}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

NewFeedScreen.options = {
  topBar: {
    visible: true,
    backButton: {
      showTitle: false,
    },
  },
  bottomTabs: {
    visible: false,
  },
};

export default NewFeedScreen;
