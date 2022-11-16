import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { IComics } from '../models/Comics'

type Props = {
    comicsData: IComics
}

const ComicsView: NavigationFunctionComponent<Props> = ({componentId, comicsData}) => {


    const navigateToComicDetails = () => {
        Navigation.push(componentId, {
            component: {
                name: 'ComicsDetails',
                passProps: {
                    comicsData
                }
            }
        })
    }

  return (
    <TouchableOpacity onPress={() => navigateToComicDetails()} style={{flex: 1, flexDirection: 'row', backgroundColor: 'beige', width: Dimensions.get('screen').width - 10, borderRadius: 20, alignSelf: 'center', marginVertical: 20, height: 250, marginHorizontal: 20}}>
        <View style={{flexDirection: 'column'}}>
            <Image source={{uri: comicsData.thumbnail.path + '.' + comicsData.thumbnail.extension}} style={{height: 50, width: 50}}/>
        </View>
        <View style={{alignSelf: 'center', flexDirection: 'column'}}>
            <Text style={{color: 'black'}}>
                {comicsData.title}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ComicsView