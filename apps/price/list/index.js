/**
 * 调价列表
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


var NotifyList = React.createClass({
  render() {
    return (
      <PullRefreshListView
        style={styles.container}
        url='http://frey.sj001.com/changenotifys/'
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow(row, _, index) {
    return (
      <View key={index}>
        <View style={styles.row}>
          <View style={{flexDirection: 'row'}}>
            {this._renderArrow(row['type'])}
            {this._renderSync(row['is_sync'])}
            <Text style={styles.name}>{row['gonghuo_product_name']}</Text>
          </View>
          <Text style={{color: '#CCCCCC'}}>{row['supplier']}</Text>
          <View style={{flexDirection: 'row', marginTop: 5,  height: 30}}>
            <Text style={styles.price}>{'现价￥' + row['new_price']}</Text>
            <Text style={styles.oldPrice}>
              {'原￥' + row['old_price'].toFixed(2)}
            </Text>
            <Text style={styles.draftPrice}>{'拟订价 ￥' + row['draft_price']}</Text>
          </View>
        </View>
        <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#dcdee1'}}/>
      </View>
    );
  },


 _renderArrow(type) {
   if (type === 1) {
     return <Image source={require('image!up')} style={{width: 30, height: 20}}/>
   } else {
     return <Image source={require('image!down')} style={{width: 20, height: 20}}/>
   }
 },


 _renderSync(sync) {
   if (sync) {
     return (
      <Image source={require('image!sync')} style={{width: 20, height:20}}/>
     );
   }
   return null;
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
    padding: 10,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  wrapper: {
    flex:1,
  },
  name: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
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
  oldPrice: {
    textAlign: 'left',
    textDecorationLine:'line-through',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#CCCCCC'
  },
  draftPrice: {
    textAlign: 'left',
    marginTop: 10,
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
    color: '#FFCC33'
  },
});


module.exports = NotifyList;
