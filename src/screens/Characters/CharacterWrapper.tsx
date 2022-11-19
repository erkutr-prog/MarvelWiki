import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';

import Characters from './Characters';

type Props = {};

const CharacterWrapper: NavigationFunctionComponent<Props> = ({
  componentId,
}) => {
  return <Characters componentId={componentId} />;
};

export default CharacterWrapper;
