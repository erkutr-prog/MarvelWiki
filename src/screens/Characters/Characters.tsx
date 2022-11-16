import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchCharacters } from '../../features/CharacterSlice'
import CharacterView from '../../components/CharacterView'
import { ICharacters } from '../../models/Characters'

type Props = {}



const Characters: NavigationFunctionComponent<Props> = ({componentId}) => {
  const screenState = useSelector((state: RootState) => state.characterSlice);
  const dispatch = useDispatch<AppDispatch>()

  //Block List Screen event listener
  useEffect(() => {
    const listener = {
      componentDidAppear: () => {
        dispatch(fetchCharacters({limit: 5, offset: 0}))
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


  const Item = ({data}: {data: ICharacters}) => (
    <CharacterView componentId={componentId} characterData={data}/>
  );
    

  return (
    <View style={{flex: 1}}>
      {
        screenState.loading && !screenState.error
        ?
        <ActivityIndicator size={'small'}/>
        :
        <FlatList 
          data={screenState.characters}
          numColumns={2}
          renderItem={({item}) => <Item data={item} />}
          keyExtractor={(item: ICharacters) => item.id.toString()}
        />
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