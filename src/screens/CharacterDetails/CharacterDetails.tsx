import { View, Text, Image, Dimensions, ScrollView, FlatList, SafeAreaView, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { ICharacters } from '../../models/Characters'
import { Items } from '../../models/CommonTypes';

type Props = {
    characterData: ICharacters
}

const CharacterDetails: NavigationFunctionComponent<Props> = ({componentId, characterData}) => {


    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                title: {
                    text: characterData.name
                }
            }
        })
    }, [])


    const getCharacterImage = () => {
        return (
            <View style={{ flexDirection: 'column', padding: 20,justifyContent: 'center', alignItems: 'center'}}>
                <Image source={{uri: characterData.thumbnail.path + '.' + characterData.thumbnail.extension}} style={{height: Dimensions.get('screen').height * 0.25, width: Dimensions.get('screen').width - 30, resizeMode: 'contain'}}/>
            </View>
        )
    }


    const getCharacterDescription = () => {
        return (
            <View style={{flexDirection: 'column', padding: 20}}>
                <Text style={{alignSelf: 'center', fontSize: 15}}>
                    {characterData.description}
                </Text>
            </View>
        )
    }

    const getProfileLinkButton = () => {
        return (
            <TouchableOpacity onPress={() => Linking.openURL(characterData.urls[0].url)} style={{borderRadius: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', marginRight: 10, height: 40, marginLeft: 5, marginBottom: 10}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Marvel Profile
                </Text>
            </TouchableOpacity>
        )
    }

    const getCharacterStats = () => {
        const comicsCount = characterData.comics.items.length.toString();
        const storyCount = characterData.stories.items.length.toString();
        const eventCount = characterData.events.items.length.toString();
        return  (
            <View style={{padding: 20}}>
                <Text style={{fontSize: 20}}>
                    {characterData.name} has {comicsCount} comics, {storyCount} stories, {eventCount} events.
                </Text>
            </View>
        )
    }

    const Item = ({data}: {data: Items}) => (
        <TouchableOpacity style={{width: Dimensions.get('screen').width - 30, borderRadius: 18, backgroundColor: 'beige', alignSelf: 'center', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', margin: 10, alignSelf: 'center'}}>
                {data.name}
            </Text>
        </TouchableOpacity>
    )


    const InfoSection = () => {
        return (
            <>
                {getCharacterImage()}
                {characterData.description.length > 0 ?
                getCharacterDescription()
                : 
                null    
                }
                {getCharacterStats()}
                {getProfileLinkButton()}
                <Text style={{fontWeight: 'bold', alignSelf: 'center', paddingBottom: 10}}>
                    Comics of Characters
                </Text>
            </>
        )
    }


    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
                data={characterData.comics.items}
                renderItem={({item}) => <Item data={item}/>}
                keyExtractor={(item: Items) => item.name}
                ListHeaderComponent={InfoSection}
            />
        </View>
    )
}

export default CharacterDetails