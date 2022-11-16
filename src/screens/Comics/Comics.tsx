import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchComics } from '../../features/ComicsSlice'
import ComicsView from '../../components/ComicsView'
import { IComics } from '../../models/Comics'

type Props = {}

const Comics: NavigationFunctionComponent<Props> = ({componentId}) => {
  const screenState = useSelector((state: RootState) => state.comicsSlice);
  const dispatch = useDispatch<AppDispatch>()

  //Comics List Screen event listener
  useEffect(() => {
    const listener = {
      componentDidAppear: () => {
        dispatch(fetchComics({limit: 100, offset: 0}))
      },
    };
    const unsubscribe = Navigation.events().registerComponentListener(
      listener,
      componentId,
    );
    return () => {
      unsubscribe.remove();
    };
  }, []);


  const Item = ({data}: {data: IComics}) => (
    <ComicsView componentId={componentId} comicsData={data}/>
  );


  return (
    <View style={{flex: 1}}>
      {
        screenState.loading && !screenState.error
        ?
        <ActivityIndicator size={'small'}/>
        :
        <FlatList
          data={screenState.comics}
          renderItem={({item}) => <Item data={item}/>}
          keyExtractor={(item: IComics) => item.id.toString()}/>
      }
    </View>
  )
}

export default Comics