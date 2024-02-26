import React, {useEffect} from 'react';
import {SafeAreaView } from 'react-native';
import { Navigation } from './src/navigation';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {

  useEffect(()=>{

  },[]);

  return (
    <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
      <Navigation/>
      </Provider>
    </SafeAreaView>
  )
}

export default App;