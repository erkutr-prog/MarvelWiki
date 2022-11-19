import {View, Text, Dimensions} from 'react-native';
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
      <View
        style={{
          backgroundColor: 'beige',
          flex: 1 / 2,
          borderRadius: 18,
          flexDirection: 'row',
          padding: 10
        }}>
        <Text
          style={{
            marginRight: 'auto',
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          {data.name}
        </Text>
        {data.role !== undefined ? (
          <Text style={{alignSelf: 'center', padding: 10}}>{data.role}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default DetailItemView;
