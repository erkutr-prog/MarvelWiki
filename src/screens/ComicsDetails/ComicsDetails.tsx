import { View, Text, Image, Dimensions, FlatList, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { IComics } from '../../models/Comics'
import { Items, Series } from '../../models/CommonTypes'
import DetailItemView from '../../components/DetailItemView'

type Props = {
    comicsData: IComics
}

const ComicsDetails: NavigationFunctionComponent<Props> = ({componentId, comicsData}) => {

    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                title: {
                    text: comicsData.title
                }
            }
        })
    }, [])


    const getComicsInfo = () => {
        const title = 'Creators'
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                    <Image source={{uri: comicsData.thumbnail.path + '.' + comicsData.thumbnail.extension}} style={{width: Dimensions.get('screen').width - 10, height: Dimensions.get('screen').height * 0.25, resizeMode: 'contain'}}/>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Text style={{fontSize: 12, margin: 10, alignSelf: 'center', fontWeight: 'bold'}}>
                        {comicsData.title}
                    </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Text style={{fontSize: 12, margin: 10}}>
                        {comicsData.description}
                    </Text>
                </View>
                {
                    comicsData.creators.items.length > 0 
                    ?
                    HeaderComponent(title)
                    : 
                    null
                }
            </View>
        )
    }

    const CharacterList = () => {
        const title = 'Characters'
        return (
            <>
                {comicsData.characters.items.length > 0 
                    ?
                    <FlatList
                        data={comicsData.characters.items}
                        renderItem={({item}) => <DetailItemView componentId={componentId} data={item}/>}
                        keyExtractor={(item: Items) => item.name}
                        ListHeaderComponent={HeaderComponent(title)}
                    />
                    :
                    null
                }
                {getProfileButton()}
            </>
        )
    }

    const getProfileButton = () => {
        return (
            <TouchableOpacity onPress={() => Linking.openURL(comicsData.urls[0].url)} style={{width: Dimensions.get('screen').width - 10, borderRadius: 10, marginLeft: 10, backgroundColor: 'red', height: 30, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: 'white', alignSelf: 'center'}}>
                    Marvel Profile
                </Text>
            </TouchableOpacity>
        )
    }

    const HeaderComponent = (title: string) => {
        return (
            <View style={{alignSelf: 'center', padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>
                    {title}
                </Text>
            </View>
        )
    }


    return (
        <View style={{flex: 1}}>
            <FlatList
                data={comicsData.creators.items}
                renderItem={({item}) => <DetailItemView componentId={componentId} data={item}/>}
                keyExtractor={(item: Items) => item.name}
                ListHeaderComponent={getComicsInfo}
                ListFooterComponent={CharacterList}
            />
        </View>
    )
}

export default ComicsDetails