/**
 * 调价列表
 */
var React = require('react-native');
var api = require('./webapi');
var {time} = require('ikit');


var {
  View,
  Text,
  Image,
  PixelRatio,
  LayoutAnimation,
  ActivityIndicatorIOS,
  ListView,
  StyleSheet
} = React;


var NotifyList = React.createClass({
  getInitialState() {
    //当前页
    this._page = 1;
    //缓存数据源
    this._ds = [];

    //ListView数据源
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    return {
      //count: 0,
      //是不是已经到最后一页
      isLast: false,
      //数据是不是加载成功
      isLoad: false,
      //是不是需要刷新
      isRefresh: false,
      // 上次刷新时间
      lastRefreshTime: '',
      //数据源
      dataSource: ds.cloneWithRows([])
    }
  },


  componentWillMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  },


  componentDidUpdate(){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  },


  componentDidMount() {
    this.setState({
      isLoad: false
    });

    api
      .fetchGoodsList(this._page)
      .done((res) => {
        this._ds = res.results;
        this.setState({
          count: res.count,
          isLoad: true,
          lastRefreshTime: time(new Date()),
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
        {/*暂时不现实商品总数
        <View style={styles.header}>
          <Text style={styles.headerTxt}>商品总数：{this.state.count}</Text>
        </View>
        */}
        {this._renderRefresh()}
        <ListView
          ref='listView'
          initialListSize={10}
          onEndReached={this._onPage}
          onEndReachedThreshold={100}
          onScroll={this._handleScroll}
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
            <Text style={styles.price}>{'新￥' + row['new_price']}</Text>
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
    } else {
      return (
        <View style={[styles.row, {
            alignItems: 'center',
            justifyContent: 'center'
        }]} key={'footer'}>
          <Text>已经到最后 :)</Text>
        </View>
      );
    }
 },

 _renderRefresh() {
   if (this.state.isRefresh) {
     //上次更新时间
     var lastTime = this.state.lastRefreshTime;

     return (
       <View style={styles.refresh}>
         <ActivityIndicatorIOS
           color='lightgreen'
           size='small'
         />
        <View>
         <Text style={{color: 'gray'}}>正在拼命加载...</Text>
         <Text style={{color: 'grey', fontSize: 12, marginTop: 5}}>{lastTime ? '上次时间：' + lastTime : ''}</Text>
        </View>
       </View>
     );
   }

   return null;
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
 },


 /**
  * 处理滚动，主要为了到顶的时候重新刷新listView
  */
  _handleScroll(e) {
    var isNeedRefresh = this.props.isNeedRefresh;
    var yOffset = e.nativeEvent.contentOffset.y;

    if (!isNeedRefresh &&  yOffset < -60) {
      this._page = 1;
      this.refs.listView._sentEndForContentHeight = 0;

      this.setState({isRefresh: true});

      api
        .fetchGoodsList(this._page)
        .done((res) => {
          this._ds = res.results;

          this.setState({
            isRefresh: false, //不刷新
            //count: res.count,
            isLoad: true,     //成功load
            lastRefreshTime: time(new Date()),
            dataSource: this.state.dataSource.cloneWithRows(res.results)
          })
        });
    }
  },


  /**
   * 分页
   */
  _onPage() {
    api
      .fetchGoodsList(++this._page)
      .done((res) => {
        //最后一页
        if (res.results.length === 0) {
          --this._page;
        }

        this.setState({
          //count: res.count,
          isLoad: true,
          lastRefreshTime: time(new Date()),
          isLast: res.results.length == 0,
          dataSource: this.state.dataSource.cloneWithRows(this._ds.concat(res.results))
        })
      })
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
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
  refresh: {
    height:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FFFFCC'
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 10
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
