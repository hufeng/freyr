var React = require('react-native');
var fetch = require('./fetch');

var {
  ActivityIndicatorIOS,
  LayoutAnimation,
  PixelRatio,
  StyleSheet,
  ListView,
  View,
  Text
} = React;

var PullRefreshListView = React.createClass({
  getDefaultProps() {
    return {
      url: ''
    }
  },


  getInitialState() {
    this._page = 1;
    this._cache = [];

    return {
      isLoad: false,
      isLoadTail: false,
      isRefresh: false,
      dataSource: new ListView.DataSource({
        rowHasChanged(r1, r2) {
          return r1 != r2;
        }
      })
    };
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

    fetch(this._getURL())
      .then((res) => {
        this._cache = res.results;
        this.setState({
          isLoad: true,
          isLoadTail: res.results.length == 0
        })
      })
  },


  render() {
    if (!this.state.isLoad) {
      return (
        <View style={styles.loading}>
          <ActivityIndicatorIOS
            size='small'
          />
          <Text>正在为您加载数据...</Text>
        </View>
      );
    }

    if (this.state.isLoadTail && this._cache.length == 0) {
      return (
        <View style={[styles.container, {
            justifyContent: 'center',
            alignItems: 'center'
        }]}>
          <Text style={styles.txt}>暂无数据</Text>
        </View>
      );
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {this._renderRefresh()}
        <ListView
          ref='listView'
          style={styles.list}
          initialListSize={20}
          onEndReachedThreshold={100}
          onScroll={this._handleScroll}
          onEndReached={this._handlePagination}
          dataSource={this.state.dataSource.cloneWithRows(this._cache)}
          renderRow={this.props.renderRow}
          renderFooter={this._renderFooter}
          showsVerticalScrollIndicator={true}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  },



  _renderRefresh() {
    if (this.state.isRefresh) {
      return (
        <View style={styles.refresh}>
          <ActivityIndicatorIOS
            size='small'
          />
        <Text style={styles.txt}>正在加载最新的数据...</Text>
        </View>
      );
    } else {
      return null;
    }
  },


  _renderFooter() {
    if (this.state.isLoadTail && this._cache.length == 0) {
      return null;
    }

    if (!this.state.isLoadTail) {
      return (
        <View style={styles.footer}>
          <ActivityIndicatorIOS
            size='small'
          />
          <Text style={styles.name}>正在加载更多的数据...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.footer}>
          <Text style={styles.txt}>已加载全部</Text>
        </View>
      );
    }
  },


  _getURL() {
    if (__DEV__) {
      console.log(`${this.props.url}?page=${this._page}`);
    }
    return `${this.props.url}?page=${this._page}`;
  },


  _handleScroll(e) {
    var offsetY = e.nativeEvent.contentOffset.y;

    if (!this.state.isRefresh &&  offsetY < -60) {
      this._page = 1;
      this.refs.listView.setNativeProps({
        contentSize: {height: 0}
      });
      this.setState({isRefresh: true});

      fetch(this._getURL())
        .done((res) => {
          this._cache = res.results;
          this.setState({
            isRefresh: false, //不刷新
            isLoad: true,     //成功load
            isLoadTail: res.results.length == 0
          })
        });
    }
  },


  _handlePagination() {
    this._page++;
    fetch(this._getURL())
      .done((res) => {
        this._cache = this._cache.concat(res.results);
        //最后一页
        if (res.results.length === 0) {
          this._page--;
        }
        this.setState({
          isRefresh: false,
          isLoad: true,
          isLoadTail: res.results.length == 0
        });
      });
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  refresh: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#dcdee1'
  },
  txt: {
    color: '#344251'
  }
});


module.exports = PullRefreshListView;
