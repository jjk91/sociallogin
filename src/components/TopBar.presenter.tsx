import * as React from 'react';
import {Controller} from 'react-hook-form';
import {
  Wrapper,
  LogoWrapper,
  LogoImg,
  UserInput,
  ButtonWrapper,
  LoginButton,
} from './TopBar.style';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {Button, View} from 'react-native';

const TopBarUi = (props: any) => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImg source={require('../imgs/logo.png')} />
      </LogoWrapper>
      <Controller
        control={props.control}
        name="Email"
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <UserInput
            onBlur={onBlur}
            onChangeText={(data: string) => onChange(data)}
            value={value}
            placeholder="이메일을 입력해주세요"
          />
        )}
      />
      <Controller
        control={props.control}
        name="Password"
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <UserInput
            onBlur={onBlur}
            onChangeText={(el: any) => onChange(el)}
            value={value}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true} // 비밀번호 입력
          />
        )}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ButtonWrapper onPress={props.handleSubmit(props.onSubmit)}>
          <LoginButton>{'로그인'}</LoginButton>
        </ButtonWrapper>
        <GoogleSigninButton
          style={{height: 45, backgroundColor: 'red', borderTopLeftRadius: 100}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={props.onGoogleLogin}
        />
        {props.loggedIn && (
          <Button
            onPress={props.onGoogleLogout}
            title="logout"
            color="#bdbdbd"
          />
        )}
      </View>
    </Wrapper>
  );
};
export default TopBarUi;
