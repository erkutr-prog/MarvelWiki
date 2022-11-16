import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'

import store from '../store'
import {Provider as ReduxProvider} from 'react-redux'
import Characters from './Characters'

type Props = {}


const CharacterWrapper: NavigationFunctionComponent<Props> = ({componentId}) => {
  return (
    <ReduxProvider store={store}>
        <Characters componentId={componentId}/>
    </ReduxProvider>
  )
}

export default CharacterWrapper