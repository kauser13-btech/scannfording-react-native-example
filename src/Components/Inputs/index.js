import React from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getIcon} from '../../Utils/iconLoader';

export const TextFieldInput = ({
  textChangeFunction,
  value,
  title,
  isDarkMode,
}) => {
  return (
    <TextInput
      style={{
        ...styles.input,
        color: isDarkMode ? Colors.white : Colors.black,
        borderColor: isDarkMode ? Colors.white : Colors.black,
      }}
      onChangeText={textChangeFunction}
      value={value}
      placeholder={title}
    />
  );
};

export const CommonButton = ({pressFunction, title, loading = false}) => {
  return (
    <Pressable style={styles.button} onPress={pressFunction}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.btnLabel}>{title}</Text>
      )}
    </Pressable>
  );
};

export const RectButton = ({pressFunction, title, loading = false}) => {
  return (
    <Pressable style={styles.buttonRect} onPress={pressFunction}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.btnLabel}>{title}</Text>
      )}
    </Pressable>
  );
};

export const SendButton = ({pressFunction, title}) => {
  return (
    <Pressable style={styles.sendButton} onPress={pressFunction}>
      {getIcon('send', 20, '#ffffff')}
    </Pressable>
  );
};

export const CustomTextInput = ({title, value, isDarkMode, onChangeInput}) => {
  return (
    <TextInput
      style={{
        ...styles.input,
        color: isDarkMode ? Colors.lighter : Colors.darker,
        borderColor: isDarkMode ? Colors.lighter : Colors.darker,
      }}
      onChangeText={onChangeInput}
      value={value}
      placeholder={title}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#081C66',
    width: 120,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 20,
  },
  sendButton: {
    backgroundColor: '#081C66',
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRect: {
    backgroundColor: '#081C66',
    width: 150,
    height: 50,
    // borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
