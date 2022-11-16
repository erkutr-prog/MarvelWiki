import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Items } from '../models/CommonTypes'
import { NavigationFunctionComponent } from 'react-native-navigation'

type Props = {
    data: Items
}

const DetailItemView: NavigationFunctionComponent<Props> = ({componentId, data}) => {
  return (
    <View style={{backgroundColor: 'beige', width: Dimensions.get('screen').width - 10, height: 20, borderRadius: 18, margin: 5}}>
        <Text style={{marginRight: 'auto', marginLeft: 8, fontWeight: 'bold'}}>
            {data.name}
        </Text>
    </View>
  )
}

export default DetailItemView