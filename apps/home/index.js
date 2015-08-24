/**
 * home
 */
var React = require('react-native');

var {
  View,
  Text,
  NavigatorIOS,
  TabBarIOS,
  StyleSheet
} = React;

var GoodsList = require('../goods/list');
var NotifyList = require('../price/list');
var Setting = require('../setting');
var OrderList = require('../order/list');


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
        titleTextColor='#FFF'
        barTintColor='#fff'
      >
        {/*商品*/}
        <TabBarIOS.Item
          title='商品'
          icon={require('image!home-grey')}
          selectedIcon={require('image!home-blue')}
          selected={this.state.selectedTab === 'goods'}
          onPress={this._handlePress.bind(this, 'goods')}
        >
          {this._renderContent({
            title: '商品',
            component: GoodsList
          })}
        </TabBarIOS.Item>

        {/*调价记录*/}
        <TabBarIOS.Item
          title='调价记录'
          icon={require('image!order-grey')}
          selectedIcon={require('image!order-blue')}
          selected={this.state.selectedTab === 'history'}
          onPress={this._handlePress.bind(this, 'history')}
        >
        {this._renderContent({
          title: '调价记录',
          component: NotifyList
        })}
        </TabBarIOS.Item>

        {/*订单*/}
        <TabBarIOS.Item
          title='订单'
          icon={require('image!cart-grey')}
          selectedIcon={require('image!cart-blue')}
          selected={this.state.selectedTab === 'order'}
          onPress={this._handlePress.bind(this, 'order')}
        >
        {this._renderContent({
          title: '订单',
          component: OrderList
        })}
        </TabBarIOS.Item>

        {/*设置*/}
        <TabBarIOS.Item
          title='设置'
          icon={require('image!user-grey')}
          selectedIcon={require('image!user-blue')}
          selected={this.state.selectedTab === 'setting'}
          onPress={this._handlePress.bind(this, 'setting')}
        >
        {this._renderContent({
          title: '个人设置',
          component: Setting
        })}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },


  _renderContent(initialRoute) {
    return (
      <NavigatorIOS
        barTintColor='#43c6a6'
        titleTextColor='#FFF'
        style={{flex: 1}}
        initialRoute={
          initialRoute
        }
      />
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
