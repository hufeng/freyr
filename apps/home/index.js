/**
 * home
 */
var React = require('react-native');

var {
  View,
  Text,
  TabBarIOS,
  StyleSheet
} = React;

var GoodsList = require('../goods/list');


var Home = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'goods'
    }
  },

  render() {
    return (
      <TabBarIOS
        tintColor='#507297'
        barTintColor='#fff'
      >
        {/*商品*/}
        <TabBarIOS.Item
          title='商品'
          selected={this.state.selectedTab === 'goods'}
          onPress={this._handlePress.bind(this, 'goods')}
        >
          <GoodsList/>
        </TabBarIOS.Item>

        {/*调价记录*/}
        <TabBarIOS.Item
          title='调价记录'
          selected={this.state.selectedTab === 'history'}
          onPress={this._handlePress.bind(this, 'history')}
        >
        <Text>history</Text>
        </TabBarIOS.Item>

        {/*订单*/}
        <TabBarIOS.Item
          title='订单'
          selected={this.state.selectedTab === 'order'}
          onPress={this._handlePress.bind(this, 'order')}
        >
        <Text>order</Text>
        </TabBarIOS.Item>

        {/*设置*/}
        <TabBarIOS.Item
          title='设置'
          selected={this.state.selectedTab === 'setting'}
          onPress={this._handlePress.bind(this, 'setting')}
        >
        <Text>setting</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

  _handlePress(tab) {
    this.setState({
      selectedTab: tab
    })
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = Home;
