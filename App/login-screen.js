
import React, { Component } from 'react'

import { Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput
} from 'react-native'
import { NavigationActions } from 'react-navigation'
// import LoginButton from './components/login-button'
import Header from './components/header'
import store from './redux-store'
import TextField from './components/text-field'


const sylogPic = require('./media/Icon-App-83.5x83.5.png')

const instructions = Platform.select({
    
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})


export default class LoginScreen extends Component {
  constructor(props, context){
    super(props, context)
    this.state = store.getState()
    store.subscribe(() => { this.setState(store.getState()) })
  }

   goBack = () => {
    console.log('Go Back was pressed!')
    this.props.navigation.dispatch(NavigationActions.back())
   }

   onChangeText = (text) => {
     store.dispatch({
       type: 'LOGIN_EMAIL',
       text
     })
   }

  render () {
    return (
      <View style={styles.container}>
        <Header buttonName='Cancel' onPress={this.goBack}/>
        <Image style={styles.headerPicture} source={sylogPic} />
        <View> style={styles.textFieldContainer}
          <Text style={styles.welcome}>
            Var god och logga in.
          </Text>
          <TextField label='Enter work-email'onChangeText={this.onChangeText} value={this.state.loginEmail.value} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: '#C21807',
    alignItems: 'center',
    width: '100%'
  },
  headerPicture: {
    height: 100,
    width: 100
  },
  textFieldContainer: {
    flex: 1
  }

})
