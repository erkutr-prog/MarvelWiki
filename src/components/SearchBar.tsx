import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'; 
import { AppDispatch } from '../screens/store';
import { setCharacterSearchText, searchCharacters } from '../features/CharacterSlice';
import { setComicsSearchText, searchComics } from '../features/ComicsSlice';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    listType: 'character' | 'comics'
}

const SearchBar = (props: Props) => {
    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>()
  
    useEffect(() => {
      search();
    }, [searchText])

    const searchForCharacters = () => {
        dispatch(setCharacterSearchText(searchText))
        if (searchText.trim()) {
          dispatch(searchCharacters({text: searchText}))
        }
    }

    const searchForComics = () => {
        dispatch(setComicsSearchText(searchText))
        if (searchText.trim()) {
          dispatch(searchComics({text: searchText}))
        }
    }
  
    const search = async() => {
        switch (props.listType){
            case 'character':
                await searchForCharacters();
                break;
            case 'comics':
                await searchForComics();
                break;
            default:
                break;
        }
    }

    const clearText = () => {
        if (props.listType == 'character') {
            dispatch(setCharacterSearchText(''));
            setSearchText('');
        } else if (props.listType == 'comics') {
            dispatch(setComicsSearchText(''));
            setSearchText('');
        }
        
    }

    return (
      <View style={{height: 40, width: Dimensions.get('screen').width - 10, borderWidth: 3, borderColor: 'gray', borderRadius: 10, flexDirection: 'row', alignSelf: 'center'}}>
        <View style={{marginRight: 'auto', backgroundColor: 'beige', borderRadius: 10}}>
            <Icon name='search-outline' size={30}/>
        </View>
        <TextInput onChangeText={(text: string) => setSearchText(text)} value={searchText} style={{ flex: 1, zIndex: 1,backgroundColor: 'beige', borderRadius: 10, padding: 5}} placeholder={'Search'}/>
        <TouchableOpacity style={{ display: searchText !== '' ? 'flex' : 'none',marginRight: 'auto', alignSelf: 'center', backgroundColor: 'beige', borderRadius: 10 }} onPress={() => clearText()}>
            <Icon name='close-outline' size={30} />
        </TouchableOpacity>
      </View>
    )
}

export default SearchBar