import React, { Component, useState } from 'react';
import { SafeAreaView, StatusBar, Dimensions, StyleSheet, View, Platform } from 'react-native';
const DEVICE_WIDTH = Dimensions.get("window").width;
import { connect } from 'react-redux';
import ScaledImage from 'mainam-react-native-scaleimage';
import { Card } from '@components';
import NavigationService from '@navigators/NavigationService';
import { IMG } from '@images';
import MainHeader from './MainHeader';

export default function ActivityPanel({ title, hideActionbar = false, ...props }) {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const backPress = () => {
    NavigationService.pop();
  }

  const getContents = (hideStatusBar) => {
    let content = <View
      iosBarStyle={'light-content'}
      {...props}
      containerStyle={[styles.container, props.containerStyle]}
      style={{ backgroundColor: 'transparent', height: '100%' }}
    >
      {!hideActionbar &&
        <MainHeader title={title}></MainHeader>
      }
      {
        props.transparent ?
          props.useCard ?
            <View style={[{ flex: 1, paddingHorizontal: 10, zIndex: -1 }, props.containerStyle]}>
              <Card style={[{ flex: 1, paddingBottom: 0, marginBottom: -10, borderRadius: 10, paddingLeft: 0, paddingRight: 0, paddingTop: 0, backgroundColor: '#FFFFFF60' }, props.cardStyle]}>
                {props.children}
              </Card>
            </View>
            :
            props.children
          :
          <View style={[{ flex: 1 }, props.containerStyle]}>
            {
              props.useCard ?
                <Card style={[{ flex: 1, paddingBottom: 0, marginBottom: -10, borderRadius: 10 }, props.cardStyle]}>
                  {props.children}
                </Card>
                :
                props.children

            }
          </View>
      }
    </View>
    if (!hideStatusBar) {
      return (<SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' && (!props.hideStatusBar || props.hideStatusBar === undefined) ? StatusBar.currentHeight : 0 }}
        forceInset={Platform.OS === 'android' && { vertical: 'never' }}
        emulateUnlessSupported={false}
      >
        {content}
      </SafeAreaView>
      )
    } else {
      return content
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0FC' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"} />
      <View style={{ height: 1, position: 'relative', flex: 1, backgroundColor: '#000000' }}>
        {
          (props.showBackgroundHeader || props.showBackgroundHeader === undefined) ?
            props.backgroundHeader ?
              <ScaledImage source={props.backgroundHeader} width={DEVICE_WIDTH} style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
              :
              <ScaledImage source={IMG.BgHeader} width={DEVICE_WIDTH} style={{ position: "absolute", top: 0, left: 0, right: 0, backgroundColor: '#000000' }} />
            :
            null
        }
        {props.showBackground === false ?
          null :
          <ScaledImage
            source={IMG.BgFooter}
            width={DEVICE_WIDTH}
            style={styles.imageBackground} />
        }
        {getContents(props.hideStatusBar)}
      </View>
    </View >

  )
}

const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    bottom: 0,
  },
  container: {
    backgroundColor: "#f7f9fb"
  },
  containerLoading: {
    position: "absolute",
    backgroundColor: "#bfeaff94",
    flex: 1,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: "center"
  },
  actionbarStyle: {
    backgroundColor: '#27c8ad',
    borderBottomWidth: 0
  },
  titleStyle: {
    color: '#FFF',
    marginLeft: 10
  }
});