import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Items} from '../models/CommonTypes';
import {NavigationFunctionComponent} from 'react-native-navigation';

type Props = {
  data: Items;
};

const DetailItemView: NavigationFunctionComponent<Props> = ({
  componentId,
  data,
}) => {
  return (
    <View style={{margin: 5, flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.nameText}>{data.name}</Text>
        {data.role !== undefined ? (
          <Text style={styles.roleText}>{data.role}</Text>
        ) : null}
      </View>
    </View>
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
