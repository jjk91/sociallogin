import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import TopBarUi from './TopBar.presenter';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const TopBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    },
  });
  console.log(errors);

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setLoggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
      Alert.alert('로그인되었습니다.');
    } catch (error) {
      console.log(error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onGoogleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
      setUserInfo([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1045703302374-7ig3u1hllj2dfci9f5klpj88mil0qtps.apps.googleusercontent.com',
      offlineAccess: true,
    });
    // const subscriber = auth().onAuthStateChanged();
  }, []);
  return (
    <TopBarUi
      control={control}
      userInfo={userInfo}
      loggedIn={loggedIn}
      handleSubmit={handleSubmit}
      onGoogleLogin={onGoogleLogin}
      onGoogleLogout={onGoogleLogout}
    />
  );
};
export default TopBar;
// function alert(arg: string) {
//   throw new Error('Function not implemented.');
// }
