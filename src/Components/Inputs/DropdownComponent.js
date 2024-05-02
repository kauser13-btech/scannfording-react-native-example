import React from 'react';
import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
export const DropdownComponent = ({
  title,
  value,
  isDarkMode,
  onChangeInput,
  data,
}) => {
  return (
    <View style={{width: '95%'}}>
      <SelectList
        setSelected={onChangeInput}
        data={data}
        save={value}
        label={title}
      />
    </View>
  );
};
