import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { ICharacters } from './../models/Characters'
import { colors } from './../assets/colors'

type Props = {
  characterData: ICharacters
}

const CharacterView: NavigationFunctionComponent<Props> = ({ componentId, characterData }) => {
  const navigateToCharacterDetails = () => {
    Navigation.push(componentId, {
      component: {
        name: 'CharacterDetails',
        passProps: {
          characterData
        }
      }
    })
  }


  return (
    <TouchableOpacity onPress={() => navigateToCharacterDetails()} style={styles.cardContainer}>
    <View
      style={styles.imageContainer}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{uri: characterData.thumbnail.path + '.' + characterData.thumbnail.extension}}
      />
    </View>
    <View style={styles.headerContainer}>
        <Text style={[styles.characterText, { fontWeight: 'bold' }]} numberOfLines={2} >{characterData.name}</Text>
      </View>
    <View style={styles.infoContainer}>
        <Text style={[styles.characterText, { alignSelf: 'flex-start',display: characterData.series.items.length > 0 ? 'flex' : 'none'}]}>{characterData.series.items.length.toString() + ' Series' }</Text>
        <Text style={[styles.characterText, {alignSelf: 'flex-end', display: characterData.comics.items.length > 0 ? 'flex' : 'none'}]}>{characterData.comics.items.length.toString() + ' Comics' }</Text>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    shadowColor: colors.TEXT,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    width: Dimensions.get('screen').width * 0.4,
    flexDirection: 'column',
    backgroundColor: colors.CHARACTER_BG,
    margin: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageContainer: {
    margin: 10,
    flexDirection: 'column',
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.4,
    height: 100
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject
  },
  characterText: {
    alignSelf: 'center', 
    fontWeight: '500',
    color: colors.TEXT
  },
  headerContainer: {
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  infoContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingTop: 10,
    margin: 5
  }
});


export default CharacterView