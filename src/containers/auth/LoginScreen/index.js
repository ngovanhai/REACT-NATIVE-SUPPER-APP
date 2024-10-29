import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, StatusBar, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import ScaledImage from 'mainam-react-native-scaleimage'
import { IMG } from '@images';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
const DEVICE_WIDTH = Dimensions.get("window").width;
const MyScaleImage = Animatable.createAnimatableComponent(ScaledImage);


const LoginScreen = (props) => {
  const [state, _setState] = useState({
    token: ''
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { auth: { onLogin } } = useDispatch();

  const onLoginPress = () => {
    onLogin(state.email, state.password, state.token);
  }


  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"} />
      <ScaledImage source={IMG.BgHeader} width={DEVICE_WIDTH} style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <ScaledImage source={IMG.BgFooter} width={DEVICE_WIDTH} style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />

      <SafeAreaView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          behavior="padding" style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', width: DEVICE_WIDTH }}>
            <MyScaleImage
              animation="zoomIn"
              delay={500}
              duration={1000}
              source={(
                IMG.IviLogo
              )}
              width={150}
              style={{ marginBottom: 20 }}
            />
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                autoCapitalize='none'
                placeholder="Email..."
                placeholderTextColor="#FFF"
                onChangeText={text => setState({ email: text })} />
            </View>
            <View style={styles.inputView} >
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#FFF"
                onChangeText={text => setState({ password: text })} />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={onLoginPress}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});

export default LoginScreen;