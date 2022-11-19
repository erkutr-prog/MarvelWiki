import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchComics, fetchMoreComics, increaseComicsLimit } from '../../features/ComicsSlice'
import ComicsView from '../../components/ComicsView'
import { IComics } from '../../models/Comics'
import CharacterSearch from '../../components/SearchBar'

type Props = {}

const Comics: NavigationFunctionComponent<Props> = ({componentId}) => {
  const screenState = useSelector((state: RootState) => state.comicsSlice);
  const dispatch = useDispatch<AppDispatch>()
  const [loadingMore, setLoadingMore] = useState(false);

  //Comics List Screen event listener
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'Marvel Comics'
        }
      }
    })
    dispatch(fetchComics())
  }, []);


  const Item = ({data}: {data: IComics}) => (
    <ComicsView componentId={componentId} comicsData={data}/>
  );

  const LoadMore = async() => {
    setLoadingMore(true)
    await dispatch(increaseComicsLimit());
    await dispatch(fetchMoreComics({limit: screenState.limit}));
    setLoadingMore(false)
  }

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

  return (
    <View style={{flex: 1}}>
      {
        screenState.loading && !screenState.error
        ?
        <ActivityIndicator size={'small'} style={{flex: 1, alignSelf: 'center'}}/>
        :
        <>
        <CharacterSearch listType='comics'/>
        <FlatList
          data={screenState.searchText !== '' ? screenState.searchedComics : screenState.comics}
          contentContainerStyle={{
            paddingBottom: 50
          }}
          renderItem={({item}) => <Item data={item}/>}
          keyExtractor={(item: IComics) => item.id.toString()}
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

export default Comics