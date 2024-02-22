import React, {useEffect} from 'react';
import {SafeAreaView } from 'react-native';
import { Navigation } from './src/navigation';

const App = () => {

  useEffect(()=>{

  },[]);

  return (
    <SafeAreaView style={{flex:1}}>
      <Navigation/>
    </SafeAreaView>
  )
}

export default App;