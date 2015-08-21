var React = require('react-native');
var api = require('./webapi');

var {
  View,
  Text,
  Image,
  PixelRatio,
  ActivityIndicatorIOS,
  ListView,
  StyleSheet
} = React;


var GoodsList = React.createClass({
  getInitialState() {
    this._page = 1;
    this._ds = [];

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    return {
      count: 0,
      isLast: false,
      isLoad: false,
      isRefresh: false,
      dataSource: ds.cloneWithRows([])
    }
  },

  componentDidMount() {
    this.setState({
      isLoad: false
    });

    api
      .fetchGoodsList(this._page)
      .done((res) => {
        console.log(res);
        this._ds = res.results;

        this.setState({
          count: res.count,
          isLoad: true,
          dataSource: this.state.dataSource.cloneWithRows(res.results)
        })
      });
  },

  render() {
    if (!this.state.isLoad) {
      return (
        <View style={styles.loading}>
          <ActivityIndicatorIOS
            color='lightblue'
            size='large'
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>商品总数：{this.state.count}</Text>
        </View>
        {this._renderRefresh()}
        <ListView
          ref='listView'
          initialListSize={10}
          onEndReached={this._onPage}
          onEndReachedThreshold={100}
          onScroll={this._handleScroll}
          style={styles.container}
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
        <View style={{height: 0.5, backgroundColor: '#dcdee1'}}/>
      </View>
    );
  },

  _renderFooter() {
    if (!this.state.isLast) {
      return (
        <View style={[styles.row, {
            alignItems: 'center',
            justifyContent: 'center'
        }]} key={'footer'}>
          <ActivityIndicatorIOS/>
          <Text>正在努力加载</Text>
        </View>
      );
    }

    return null;
 },

 _renderRefresh() {
   if (this.state.isRefresh) {
     return (
       <View style={{height:30,flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
         <ActivityIndicatorIOS
           color='lightgreen'
           size='small'
         />
         <Text style={{color: 'lightgrey'}}>正在拼命加载...</Text>
       </View>
     );
   }

   return null;
 },

  _handleScroll(e) {
    var yOffset = e.nativeEvent.contentOffset.y;
    var isNeedRefresh = this.props.isNeedRefresh;

    console.log(yOffset);

    if (!isNeedRefresh &&  yOffset < -60) {
      this.setState({
        isRefresh: true
      });
      this.refs.listView._sentEndForContentHeight = 0;
      this._page = 1;

      api
        .fetchGoodsList(this._page)
        .done((res) => {
          console.log(res);
          this._ds = res.results;

          this.setState({
            isRefresh: false,
            count: res.count,
            isLoad: true,
            dataSource: this.state.dataSource.cloneWithRows(res.results)
          })
        });
    }
  },

  _onPage() {
    api
      .fetchGoodsList(++this._page)
      .done((res) => {
        //最后一页
        if (res.results.length === 0) {
          --this._page;
        }

        this.setState({
          count: res.count,
          isLoad: true,
          isLast: res.results.length == 0,
          dataSource: this.state.dataSource.cloneWithRows(this._ds.concat(res.results))
        })
      })
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'lightgreen'
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  wrapper: {
    flex:1,
    justifyContent: 'center'
  },
  name: {
    fontSize: 14,
    lineHeight: 18,
    color: '#344251'
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 20,
    color: '#ff8a00'
  },
});


module.exports = GoodsList;
