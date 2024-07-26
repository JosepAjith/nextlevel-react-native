import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useCallback } from 'react';

const useBackHandler = (onBackPress: () => boolean) => {
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        backHandler.remove();
      };
    }, [onBackPress])
  );
};

export default useBackHandler;