import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import RootNavigation from './src/Navigation/RootNavigation';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {store, rehydrateStore} from './src/app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={rehydrateStore}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};
export default App;

AppRegistry.registerComponent(appName, () => App);
