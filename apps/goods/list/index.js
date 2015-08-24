/**
 * 商品列表
 */
var React = require('react-native');
var {PullRefreshListView} = require('ikit');


var {
  View,
  Text,
  Image,
  PixelRatio,
  StyleSheet
} = React;


var GoodsList = React.createClass({
  render() {
    return (
      <PullRefreshListView
        style={styles.container}
        url='http://frey.sj001.com/supproducts/'
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow(row, _, index) {
    return (
      <View key={index}>
        <View style={styles.row}>
          <Image
            style={{height: 80, width: 80}}
            source={{uri: row['pic_url']}}
          />
        <View style={styles.wrapper}>
            <Text style={styles.name}>{row['wuzhen_product_name']}</Text>
            <Text style={styles.price}>{'￥' + (row['sale_price'] || 0).toFixed(2)}</Text>
          </View>
        </View>
        <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#dcdee1'}}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
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


module.exports = GoodsList;
