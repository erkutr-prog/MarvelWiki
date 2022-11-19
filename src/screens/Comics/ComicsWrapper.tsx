import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import store from '../store';
import Comics from './Comics';
import {NavigationFunctionComponent} from 'react-native-navigation';

type Props = {};

const ComicsWrapper: NavigationFunctionComponent<Props> = ({componentId}) => {
  return (
    <ReduxProvider store={store}>
      <Comics componentId={componentId} />
    </ReduxProvider>
  );
};

export default ComicsWrapper;
