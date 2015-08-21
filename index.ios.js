/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./apps/login');
var Home = require('./apps/home');
var {msg} = require('ikit');

var self = this;

var {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  ActivityIndicatorIOS,
  Text,
  View,
} = React;



var freyr = React.createClass({
  getInitialState() {
    return {
      isLogin: false,
      isLoad: false
    }
  },

  componentDidMount() {
    AsyncStorage.getItem('freyr_token', (err, token) => {
      if (err || !token) {
        if (__DEV__) {
          console.log(err);
        }

        this.setState({
          isLoad: true,
          isLogin: false
        });
      } else if (token) {
        self.token = token;

        this.setState({
          isLoad: true,
          isLogin: true
        });
      }
    });

    //token失效
    console.log('token-----');
    msg.on('tokenInvalid', this._handleTokenInvalid);
  },


  componentWillUnmount() {
    msg.removeListener('tokenInvalid', this._handleTokenInvalid);
  },


  render() {
    //loading
    if (!this.state.isLoad) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            color='lightblue'
            size='large'
          />
        </View>
      );
    }

    //login
    if (!this.state.isLogin) {
      return (
        <Login onLoginSuccess={() => {
          if (__DEV__) {
            console.log('login success...');
          }
          this.setState({
            isLoad: true,
            isLogin: true
          })
        }}/>
      );
    }

    //home
    return <Home/>
  },


  _handleTokenInvalid() {
    if (__DEV__) {
      console.log('handle--tokenInvalid');
    }

    this.setState({
      isLogin: false,
      isLoad: true
    });
  }
});


var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


AppRegistry.registerComponent('freyr', () => freyr);
