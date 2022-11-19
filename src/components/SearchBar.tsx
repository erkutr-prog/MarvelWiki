import { View, Text, Dimensions, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'; 
import { AppDispatch } from '../screens/store';
import { setCharacterSearchText, searchCharacters } from '../features/CharacterSlice';
import { setComicsSearchText, searchComics } from '../features/ComicsSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../assets/colors';

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
      <View style={styles.container}>
        <View style={styles.searchIcon}>
            <Icon name='search-outline' size={30}/>
        </View>
        <TextInput onChangeText={(text: string) => setSearchText(text)} value={searchText} style={styles.searchInput} placeholder={'Search'}/>
        <TouchableOpacity style={ [styles.clearIcon, { display: searchText !== '' ? 'flex' : 'none' }]} onPress={() => clearText()}>
            <Icon name='close-outline' size={30} />
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40, 
        width: Dimensions.get('screen').width - 10, 
        borderWidth: 3, 
        borderColor: colors.DENEME_BG, 
        borderRadius: 10, 
        flexDirection: 'row', 
        alignSelf: 'center'
    },
    searchIcon: {
        marginRight: 'auto', 
        backgroundColor: '#ffff', 
        borderRadius: 10
    },
    searchInput: {
        flex: 1, 
        zIndex: 1,
        backgroundColor: '#ffff', 
        borderRadius: 10, 
        padding: 5
    },
    clearIcon: {
        marginRight: 'auto', 
        alignSelf: 'center', 
        backgroundColor: '#ffff', 
        borderRadius: 10
    }
})

export default SearchBar