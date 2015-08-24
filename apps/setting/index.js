/**
 * 设置
 */
var React = require('react-native');
var {msg} = require('ikit');

var {
  View,
  Text,
  PixelRatio,
  ListView,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet
} = React;

var Setting = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={this._handleLogout}>
          <Text style={styles.logout}>退出登录</Text>
        </TouchableOpacity>
      </View>
    );
  },

  _handleLogout() {
    AsyncStorage.removeItem('freyr_token', (err) => {
      if (__DEV__) {
        console.log(err);
      }
      msg.emit('logout');
    })
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    height: 40,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FF0066',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    borderColor: '#FF0099',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  logout:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  }
});


module.exports = Setting;
