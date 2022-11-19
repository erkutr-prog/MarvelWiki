import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { ICharacters } from './../models/Characters'

type Props = {
  characterData: ICharacters
}

const CharacterView: NavigationFunctionComponent<Props> = ({ componentId, characterData }) => {

  const TopbarComponent = ({}) => {
    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <Text style={{color: 'white'}}>
          alksdfnşjksdnfjkşsdnf
        </Text>
      </View>
    )
  }

  const navigateToCharacterDetails = () => {
    /* Navigation.mergeOptions(componentId, {
      topBar: {
        background: {
          color: 'white',
          component: {
            name: 'TopButton',
            
          }
        }
      }
    }) */
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
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <Text style={styles.agentText} >{characterData.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.agentText}>{characterData.series.items.length.toString() + 'Series' }</Text>
          <Text style={[styles.agentText, {marginRight: 'auto'}]}>{characterData.comics.items.length.toString() + 'Comics' }</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,
    maxWidth: Dimensions.get('screen').width / 2
  },
  imageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#FD4556',
    margin: 10,
    flexDirection: 'column',
  },
  image: {
    width: 100, 
    height: 100, 
    margin: 10, 
    alignSelf: 'center'
  },
  agentText: {
    alignSelf: 'center', 
    fontWeight: '500',
    color: '#FFFBF5'
  }
});


export default CharacterView