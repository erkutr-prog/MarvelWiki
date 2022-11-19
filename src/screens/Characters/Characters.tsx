import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {
  fetchCharacters,
  fetchMoreCharacters,
  increaseCharactersLimit,
} from '../../features/CharacterSlice';
import CharacterView from '../../components/CharacterView';
import {ICharacters} from '../../models/Characters';
import CharacterSearch from '../../components/SearchBar';

type Props = {};

const Characters: NavigationFunctionComponent<Props> = ({componentId}) => {
  const screenState = useSelector((state: RootState) => state.characterSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [loadingMore, setLoadingMore] = useState(false);

  //Block List Screen event listener
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'Marvel Characters',
        },
      },
    });
    dispatch(fetchCharacters());
  }, []);

  const Item = ({data}: {data: ICharacters}) => (
    <CharacterView componentId={componentId} characterData={data} />
  );

  const getFooterSpinner = () => {
    return (
      <>
        {loadingMore ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size={'small'} style={{alignSelf: 'center'}} />
          </View>
        ) : null}
      </>
    );
  };

  const LoadMore = async () => {
    setLoadingMore(true);
    await dispatch(increaseCharactersLimit());
    await dispatch(fetchMoreCharacters({limit: screenState.limit}));
    setLoadingMore(false);
  };

  return (
    <View style={{flex: 1}}>
      {screenState.loading && !screenState.error ? (
        <ActivityIndicator
          size={'small'}
          style={{alignSelf: 'center', flex: 1}}
        />
      ) : (
        <>
          <CharacterSearch listType="character" />
          <FlatList
            data={
              screenState.searchText !== ''
                ? screenState.searchedCharacters
                : screenState.characters
            }
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            numColumns={2}
            renderItem={({item}) => <Item data={item} />}
            keyExtractor={(item: ICharacters) => item.id.toString()}
            onEndReached={() => {
              !loadingMore ? LoadMore() : null;
            }}
            onEndReachedThreshold={0.4}
            ListFooterComponent={getFooterSpinner}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    width: Dimensions.get('screen').width - 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Characters;
