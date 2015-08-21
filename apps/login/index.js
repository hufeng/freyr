var React = require('react-native');
var api = require('./webapi');
var self = this;

var {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  PixelRatio,
  AlertIOS,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight
} = React;

//just do nothing
var noop = () => {};


var Login = React.createClass({
  getDefaultProps() {
    return {
      onLoginSuccess: noop
    }
  },

  getInitialState() {
    return {
      username: '',
      password: ''
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{uri: 'http://cdn.duitang.com/uploads/item/201405/09/20140509235120_BfPLX.png'}}
        />
        <TextInput
          placeholder='用户名'
          style={styles.input}
          value={this.state.username}
          onChangeText={(txt) => this.setState({username: txt})}
        />
        <TextInput
          password={true}
          placeholder='密 码'
          style={styles.input}
          value={this.state.password}
          onChangeText={(txt) => this.setState({password: txt})}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={this._handleLogin}>
          <Text style={styles.btnText}>登 录</Text>
        </TouchableOpacity>
      </View>
    );
  },


  _handleLogin() {
    var username = this.state.username;
    var password = this.state.password;

    if (!username) {
      AlertIOS.alert('', '请填写用户名')
      return;
    }

    if (!password) {
      AlertIOS.alert('', '请填写密码');
      return;
    }

    api
      .login(username, password)
      .then(success, error);


    //登录成功
    var onLoginSuccess = this.props.onLoginSuccess;

    function success(res) {
      console.log('token:', res.token);
      self.token = res.token;
      AsyncStorage
        .setItem('freyr_token', res.token || '', (err) => {
          if (err) {
            AlertIOS.alert('', '内部错误，请重试');
            return;
          }
          onLoginSuccess();
        });
    }

    //登录失败
    function error(err) {
      if (__DEV__) {
        console.log(err);
      }
      AlertIOS.alert('', '用户名或者密码错误');
    }
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'lightblue',
    borderRadius: 3,
    padding: 10
  },
  btn: {
    height: 40,
    marginTop: 10,
    backgroundColor: '#43c6a6',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 3,
    borderColor: 'green'
  },
  btnText: {
    color: '#FFF',
    fontSize: 20
  },
  img: {
    height: 110,
    width: 60,
    borderRadius: 30,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'lightblue'
  }
});


module.exports = Login;
