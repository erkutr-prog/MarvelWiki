import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {IComics} from '../models/Comics';
import {colors} from '../assets/colors';

type Props = {
  comicsData: IComics;
};

const ComicsView: NavigationFunctionComponent<Props> = ({
  componentId,
  comicsData,
}) => {
  const navigateToComicDetails = () => {
    Navigation.push(componentId, {
      component: {
        name: 'ComicsDetails',
        passProps: {
          comicsData,
        },
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={() => navigateToComicDetails()}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              comicsData.thumbnail.path + '.' + comicsData.thumbnail.extension,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{comicsData.title}</Text>
        <Text style={styles.description} numberOfLines={7}>
          {comicsData.description !== ''
            ? comicsData.description
            : 'No Description'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.DETAIL_ITEM_BG,
    width: Dimensions.get('screen').width - 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 20,
    height: 200,
    marginHorizontal: 20,
  },
  imageContainer: {
    flex: 0.25,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 0.75,
    margin: 10,
  },
  header: {
    color: colors.TEXT,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  description: {
    color: colors.TEXT,
    alignSelf: 'flex-start',
    paddingTop: 10,
  },
});

export default ComicsView;
