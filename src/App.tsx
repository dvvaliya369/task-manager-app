import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { Asset } from 'expo-asset';
import { AuthContextProvider } from './Context/AuthContext';
import { Navigation } from './navigation';
import { Assets as NavigationAssets } from '@react-navigation/elements';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <AuthContextProvider>
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          'taskmanager://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
    </AuthContextProvider>
  );
}
