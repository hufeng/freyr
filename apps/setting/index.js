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
  getInitialState() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    return {
      dataSource: ds.cloneWithRows(['设置1', '设置2', '设置3', '设置4', '设置5'])
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  },

  _renderRow(row, _, index) {
    console.log(index);
    return (
      <View key={index} style={styles.row}>
        {index == 0 ?
          <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#dcdee1'}}/> : null}
        <View style={{padding: 10}}>
          <Text style={styles.text}>{row}</Text>
        </View>
        <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#dcdee1'}}/>
      </View>
    );
  },

  _renderFooter() {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={this._handleLogout}
      >
        <Text style={styles.logout}>退出登录</Text>
      </TouchableOpacity>
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
    paddingTop: 64,
  },
  list: {
    flex:1,
    marginTop: 100
  },
  row: {
    justifyContent: 'center',
  },
  text: {
    color: '#344251',
    fontSize: 14,
    fontWeight: 'bold'
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
