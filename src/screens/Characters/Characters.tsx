import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchCharacters, fetchMoreCharacters, increaseCharactersLimit } from '../../features/CharacterSlice'
import CharacterView from '../../components/CharacterView'
import { ICharacters } from '../../models/Characters'
import CharacterSearch from '../../components/SearchBar'

type Props = {}


const Characters: NavigationFunctionComponent<Props> = ({componentId}) => {
  const screenState = useSelector((state: RootState) => state.characterSlice);
  const dispatch = useDispatch<AppDispatch>()
  const [loadingMore, setLoadingMore] = useState(false);
  

  //Block List Screen event listener
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'Marvel Characters'
        }
      }
    })
    dispatch(fetchCharacters())
  }, []);

  const Item = ({data}: {data: ICharacters}) => (
    <CharacterView componentId={componentId} characterData={data}/>
  );

  const getFooterSpinner = () => {
    return (
      <>
        {
          loadingMore
          ?
          <View style={{width: Dimensions.get('screen').width - 10, justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <ActivityIndicator size={'small'} style={{alignSelf: 'center'}}/>
          </View>
          :
          null
        }
      </>
    )
  }

  const LoadMore = async() => {
    setLoadingMore(true)
    await dispatch(increaseCharactersLimit());
    await dispatch(fetchMoreCharacters({limit: screenState.limit}));
    setLoadingMore(false)
  }

  return (
    <View style={{flex: 1}}>
      {
        screenState.loading && !screenState.error
        ?
        <ActivityIndicator size={'small'} style={{alignSelf: 'center', flex: 1}}/>
        :
        <>
        <CharacterSearch listType='character'/>
        <FlatList 
          data={screenState.searchText !== '' ? screenState.searchedCharacters : screenState.characters}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          numColumns={2}
          renderItem={({item}) => <Item data={item} />}
          keyExtractor={(item: ICharacters) => item.id.toString()}
          onEndReached={() => {
            !loadingMore ? LoadMore() : null
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={getFooterSpinner}
        />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textName: {
    fontSize: 20,
    marginLeft: 10,
    //color: colors.TEXT_DARK,
  },
  textNumber: {
    color: 'white',
    marginRight: 'auto',
    alignSelf: 'center',
  },
})

export default Characters