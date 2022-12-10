import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Modal,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {IComics} from '../../models/Comics';
import {Items, Series} from '../../models/CommonTypes';
import DetailItemView from '../../components/DetailItemView';
import { ICharacters } from '../../models/Characters';
import api from './../../utils/Requests';
import { colors } from '../../assets/colors';

type Props = {
  comicsData: IComics;
};

const ComicsDetails: NavigationFunctionComponent<Props> = ({
  componentId,
  comicsData,
}) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: comicsData.title,
        },
      },
    });
  }, []);

  const getComicsInfo = () => {
    const title = 'Creators';
    return (
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                comicsData.thumbnail.path +
                '.' +
                comicsData.thumbnail.extension,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{comicsData.title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{comicsData.description}</Text>
        </View>
        {comicsData.creators.items.length > 0 ? HeaderComponent(title) : null}
      </View>
    );
  };

  const onPressCharacter = async(item: ICharacters) => {
    setLoading(true)
    const response = await api.get(
      `characters/${item.resourceURI.split('/').slice(-1)[0]}`
    );
    if (response !== undefined) {
      let characterData = response.data.data.results[0];
      Navigation.push(componentId, {
        component: {
          name: 'CharacterDetails',
          passProps: {
            characterData
          }
        }
      })
    }
    setLoading(false)
  }


  const CharacterList = () => {
    const title = 'Characters';
    return (
      <>
        {comicsData.characters.items.length > 0 ? (
          <FlatList
            data={comicsData.characters.items}
            renderItem={({item}) => (
              <DetailItemView componentId={componentId} data={item} type={'comics'} onPress={(item: ICharacters) => onPressCharacter(item)}  />
            )}
            keyExtractor={(item: Items) => item.name}
            ListHeaderComponent={HeaderComponent(title)}
          />
        ) : null}
        {getProfileButton()}
      </>
    );
  };

  const getProfileButton = () => {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(comicsData.urls[0].url)}
        style={styles.linkBtn}>
        <Text style={styles.linkText}>Marvel Profile</Text>
      </TouchableOpacity>
    );
  };

  const HeaderComponent = (title: string) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
      </View>
    );
  };

  const onPressCreator = async(item: Items) => {
    //TODO: Push to the creator detail screen
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
        data={comicsData.creators.items}
        renderItem={({item}) => (
          <DetailItemView componentId={componentId} data={item} type={'creators'} onPress={(item: Items) => onPressCreator(item) } />
        )}
        keyExtractor={(item: Items) => item.name}
        ListHeaderComponent={getComicsInfo}
        ListFooterComponent={CharacterList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: Dimensions.get('screen').width - 10,
    height: Dimensions.get('screen').height * 0.25,
    resizeMode: 'contain',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 12,
    margin: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  descriptionText: {
    fontSize: 12,
    margin: 10,
  },
  linkBtn: {
    width: Dimensions.get('screen').width - 10,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: 'red',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  headerContainer: {
    alignSelf: 'center',
    padding: 10,
  },
});

export default ComicsDetails;
