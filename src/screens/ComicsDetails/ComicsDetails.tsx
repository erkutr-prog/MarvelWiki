import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {IComics} from '../../models/Comics';
import {Items, Series} from '../../models/CommonTypes';
import DetailItemView from '../../components/DetailItemView';

type Props = {
  comicsData: IComics;
};

const ComicsDetails: NavigationFunctionComponent<Props> = ({
  componentId,
  comicsData,
}) => {
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

  const CharacterList = () => {
    const title = 'Characters';
    return (
      <>
        {comicsData.characters.items.length > 0 ? (
          <FlatList
            data={comicsData.characters.items}
            renderItem={({item}) => (
              <DetailItemView componentId={componentId} data={item} />
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

  return (
    <View style={styles.container}>
      <FlatList
        data={comicsData.creators.items}
        renderItem={({item}) => (
          <DetailItemView componentId={componentId} data={item} />
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
