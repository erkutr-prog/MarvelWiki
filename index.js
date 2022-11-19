import { Navigation } from "react-native-navigation";
import Comics from "./src/screens/Comics/Comics";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CharacterWrapper from "./src/screens/Characters/CharacterWrapper";
import ComicsWrapper from "./src/screens/Comics/ComicsWrapper";
import CharacterDetails from "./src/screens/CharacterDetails/CharacterDetails";
import ComicsDetails from "./src/screens/ComicsDetails/ComicsDetails";
import TopButton from "./src/components/TopButton";
import {Provider as ReduxProvider} from 'react-redux';
import Characters from "./src/screens/Characters/Characters";
import store from './src/screens/store';


Navigation.registerComponent('CHARACTERS', () => CharacterWrapper);
Navigation.registerComponent('COMICS', () => ComicsWrapper);
Navigation.registerComponent('CharacterDetails', () => CharacterDetails);
Navigation.registerComponent('ComicsDetails', () => ComicsDetails);
Navigation.registerComponent('TopButton', () => TopButton);

//const agentIcon = MaterialCommunityIcons.getImageSourceSync(
//    'account-box',
//    35,
//    'black',
//  );
//  const agentIconOutline = MaterialCommunityIcons.getImageSourceSync(
//    'account-box-outline',
//    35,
//    'black',
//  );
//  const mapIcon = Ionicons.getImageSourceSync('map', 35, 'black');
//  const mapIconOutline = Ionicons.getImageSourceSync('map-outline', 35, 'black');
//  
//  const weaponIcon = MaterialCommunityIcons.getImageSourceSync(
//    'shield-sword',
//    35,
//    'black',
//  );
//  const weaponIconOutline = MaterialCommunityIcons.getImageSourceSync(
//    'shield-sword-outline',
//    35,
//    'black',
//  );
  

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
    root: {
        stack: {
          children: [
            {
              component: {
                name: 'CHARACTERS',
              },
            },
          ],
        },
        bottomTabs: {
          id: 'BOTTOM_TABS_LAYOUT',
          options: {
            bottomTabs: {
              tabsAttachMode: 'onSwitchToTab',
            },
          },
          children: [
            {
              stack: {
                id: 'CHARACTERS_TAB',
                children: [
                  {
                    component: {
                      id: 'CHARACTERS_SCREEN',
                      name: 'CHARACTERS',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    //icon: agentIconOutline,
                    text: 'Characters',
                    //selectedIcon: agentIcon,
                  },
                },
              },
            },
            {
              stack: {
                id: 'COMICS_TAB',
                children: [
                  {
                    component: {
                      id: 'COMICS_SCREEN',
                      name: 'COMICS',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    //icon: weaponIconOutline,
                    text: 'Comics',
                    //selectedIcon: weaponIcon,
                  },
                },
              },
            },
          ],
        },
      },
  });
});

Navigation.registerComponent('CHARACTERS', () => (props) => (
  <ReduxProvider store={store}>
    <CharacterWrapper {...props}/>
  </ReduxProvider>
))