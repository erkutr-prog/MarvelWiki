import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {Items} from '../models/CommonTypes';
import {NavigationFunctionComponent} from 'react-native-navigation';

type Props = {
  data: Items;
  type: string;
  onPress: Function;
};

const DetailItemView: NavigationFunctionComponent<Props> = ({
  componentId,
  data,
  type,
  onPress
}) => {
  return (
    <TouchableOpacity style={{margin: 5, flex: 1}} onPress={() => onPress(data)}>
      <View style={styles.container}>
        <Text style={styles.nameText}>{data.name}</Text>
        {data.role !== undefined ? (
          <Text style={styles.roleText}>{data.role}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'beige',
    flex: 1 / 2,
    borderRadius: 18,
    flexDirection: 'row',
    padding: 10,
  },
  nameText: {
    marginRight: 'auto',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  roleText: {
    alignSelf: 'center',
    padding: 10,
  },
});

export default DetailItemView;
