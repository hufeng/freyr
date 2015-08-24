/**
 * 订单列表
 */
var React = require('react-native');
var {PullRefreshListView} = require('ikit');
var ListRow = require('./components/list-row');

var {
  View,
  Text,
  Image,
  StyleSheet
} = React;


var OrderList = React.createClass({

  render() {
    return (
      <PullRefreshListView
        style={styles.container}
        url='http://frey.sj001.com/trades/'
        renderRow={this._renderRow}
      />
    );
  },


  _renderRow(row, _, index) {
    return (
      <ListRow data={row} key={index}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  list: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex:1,
  },
  name: {
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 18,
    color: '#344251'
  },
  price: {
    textAlign: 'left',
    marginTop: 10,
    fontSize: 18,
    lineHeight: 20,
    color: '#ff8a00'
  },
});


module.exports = OrderList;
