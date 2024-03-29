import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {ICharacters} from '../../models/Characters';
import {Items} from '../../models/CommonTypes';
import DetailItemView from '../../components/DetailItemView';
import {IComics} from './../../models/Comics';
import api from './../../utils/Requests';
import { colors } from '../../assets/colors';

type Props = {
  characterData: ICharacters;
};

const CharacterDetails: NavigationFunctionComponent<Props> = ({
  componentId,
  characterData,
}) => {
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: characterData.name,
        },
      },
    });
  }, []);

  const getCharacterImage = () => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              characterData.thumbnail.path +
              '.' +
              characterData.thumbnail.extension,
          }}
          style={styles.image}
        />
      </View>
    );
  };

  const getCharacterDescription = () => {
    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{characterData.description}</Text>
      </View>
    );
  };

  const getProfileLinkButton = () => {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(characterData.urls[0].url)}
        style={styles.linkBtn}>
        <Text style={styles.linkText}>Marvel Profile</Text>
      </TouchableOpacity>
    );
  };

  const getCharacterStats = () => {
    const comicsCount = characterData.comics.items.length.toString();
    const storyCount = characterData.stories.items.length.toString();
    const eventCount = characterData.events.items.length.toString();
    return (
      <View style={{padding: 20}}>
        <Text style={{fontSize: 20}}>
          {characterData.name} has {comicsCount} comics, {storyCount} stories,{' '}
          {eventCount} events.
        </Text>
      </View>
    );
  };

  const Item = ({data}: {data: Items}) => (
    <TouchableOpacity style={styles.cardContainer}>
      <Text style={{fontWeight: 'bold', margin: 10, alignSelf: 'center'}}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );

  const InfoSection = () => {
    return (
      <>
        {getCharacterImage()}
        {characterData.description.length > 0
          ? getCharacterDescription()
          : null}
        {getCharacterStats()}
        <Text
          style={{fontWeight: 'bold', alignSelf: 'center', paddingBottom: 10}}>
          Comics of Characters
        </Text>
      </>
    );
  };

  const onPressComics = async (item: IComics) => {
    setLoading(true)
    const response = await api.get(
      `comics/${item.resourceURI.split('/').slice(-1)[0]}`
    );
    if (response !== undefined) {
      let comicsData = response.data.data.results[0];
      Navigation.push(componentId, {
        component: {
          name: 'ComicsDetails',
          passProps: {
            comicsData
          }
        }
      })
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        statusBarTranslucent={true}
        visible={isLoading}
        >
          <View style={{flex: 1, opacity: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,1)'}}>
              <ActivityIndicator style={{alignSelf: 'center'}} size='large'/>
              <Text style={{fontSize: 30, color: colors.DENEME_BG, fontWeight: 'bold'}}>
                 Loading
              </Text>
          </View>
      </Modal>
      <FlatList
        data={characterData.comics.items}
        renderItem={({item}) => (
          <DetailItemView componentId={componentId} data={item} type={'character'} onPress={(item: IComics) => onPressComics(item)} />
        )}
        keyExtractor={(item: Items) => item.name}
        ListHeaderComponent={InfoSection}
        ListFooterComponent={getProfileLinkButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: Dimensions.get('screen').height * 0.25,
    width: Dimensions.get('screen').width - 30,
    resizeMode: 'contain',
  },
  descriptionContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  description: {
    alignSelf: 'center',
    fontSize: 15,
  },
  linkBtn: {
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    height: 40,
    marginLeft: 5,
    marginBottom: 10,
  },
  linkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    width: Dimensions.get('screen').width - 30,
    borderRadius: 18,
    backgroundColor: 'beige',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default CharacterDetails;
