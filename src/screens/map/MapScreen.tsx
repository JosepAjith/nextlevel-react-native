import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  ActivityIndicator,
  Animated,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/RoutesParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import AppFonts from '../../constants/AppFonts';
import Geocoder from 'react-native-geocoding';
import AppColors from '../../constants/AppColors';
import ButtonView from '../../components/ButtonView';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {showToast} from '../../constants/commonUtils';
import AppImages from '../../constants/AppImages';

Geocoder.init('AIzaSyACWPy4KNDqex0QYmX-HkF7St0TXA6ARPI', {language: 'en'});

export type MapScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MapScreen'
>;

export type MapScreenRouteProps = RouteProp<RootStackParams, 'MapScreen'>;

interface Props {}

const MapScreen: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation();
  const type = route.params.type;
  const lat = route.params.lat;
  const long = route.params.long;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [isDone, setDone] = useState(false);
  const [address, setAddress] = useState('');
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const {tripDetails} = useSelector((state: RootState) => state.TripDetails);

  useEffect(() => {
    if (type == 'add') {
      fetchLocation();
    } else if (type == 'edit') {
      setLocation({
        latitude: Number(lat),
        longitude: Number(long),
      });
    } else {
      setLocation({
        latitude: Number(tripDetails?.data.latitude),
        longitude: Number(tripDetails?.data.longitude),
      });
    }
    return () => {};
  }, [type]);

  const fetchLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          showToast('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        if (permissionStatus === 'granted') {
          getCurrentLocation();
        } else {
          showToast('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude: latitude, longitude: longitude});
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleMapPress = (event: any) => {
    setDone(true);
    const coordinate = event.nativeEvent.coordinate;
    setLocation(coordinate);
    Geocoder.from(
      event.nativeEvent.coordinate.latitude,
      event.nativeEvent.coordinate.longitude,
    )
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  return (
    <View flex>
      <MapView
        style={{flex: 1}}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsUserLocation={true}
        followsUserLocation={true}
        mapType={mapType}
        region={{
          latitude: location?.latitude || 0, // Default latitude (or any value)
          longitude: location?.longitude || 0, // Default longitude (or any value)
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0061,
        }}
        onPress={
          type === 'add' || type === 'edit' ? handleMapPress : undefined
        }>
        {location && <Marker coordinate={location} anchor={{x: 0.5, y: 0.5}} />}
      </MapView>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        <Button
          backgroundColor={AppColors.Black}
          label={mapType === 'standard' ? 'Satellite' : 'Default'}
          onPress={() =>
            setMapType(mapType === 'standard' ? 'satellite' : 'standard')
          }
        />
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        width: '10%',
        backgroundColor:'white',
        padding:10,
        alignItems:'center'
      }}>
          <Image source={AppImages.BACK} tintColor="black" />
      </TouchableOpacity>

      {isDone && (
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
          }}>
          <View centerV row backgroundColor={'white'} padding-10>
            {/* <Image source={locationIcon} height={20} width={20} /> */}
            <Text
              style={{
                fontSize: 14,
                fontFamily: AppFonts.INTER_MEDIUM,
                color: AppColors.Black,
              }}>
              {address}
            </Text>
          </View>
          <ButtonView
            title="Done"
            onPress={() => {
              route.params.setPlaceLocation({
                latitude: location?.latitude,
                longitude: location?.longitude,
                address: address,
              });
              navigation.goBack();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MapScreen;
