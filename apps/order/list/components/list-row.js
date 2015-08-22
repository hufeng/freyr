/**
 * 订单项
 */
var React = require('react-native');
var {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  PixelRatio,
  StyleSheet
} = React;



var OrderRow = React.createClass({
  getDefaultProps() {
    return {
      data: {}
    }
  },


  getInitialState() {
    return {
      tid: ''
    }
  },


  componentWillMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  },


  componentDidUpdate(){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  },


  render() {
    var d = this.props.data;

    return (
      <TouchableOpacity style={styles.container} onPress={this._handlePress.bind(this, d.tid)}>
        <View style={{padding: 10, justifyContent: 'center'}}>
          <Text style={{fontSize: 16, color: '#344251'}}>{'订单号：' + d['tid'] }</Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.label}>应付金额：</Text>
                <Text style={styles.price}>{'￥'+d['payment']}</Text>
              </View>
              <View>
                  <Text style={styles.label}>{d['pay_status_display']}</Text>
              </View>
            </View>
            <View style={{marginLeft: 50}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.label}>订单总额：</Text>
                <Text style={styles.price}>{d['total_fee']}</Text>
              </View>
              <Text style={styles.label}>{d['complete_status_display']}</Text>
            </View>
          </View>
        </View>
        <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#dcdee1'}}/>
        {this._renderList(d)}
      </TouchableOpacity>
    );
  },

  _renderList(data) {
    if (data.tid === this.state.tid) {
      return (
        <View>
          {data.orders.map((v, k) => {
            return (
              <View key={k} style={{flexDirection: 'row', padding: 10}}>
                <Text style={styles.label}>{v.title}</Text>
                <Text style={styles.price}>{'￥' + v.unit_cost}</Text>
                <Text style={{color: 'lightgreen'}}>{'x' + v.num}</Text>
              </View>
            );
          })}
          <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#dcdee1'}}/>
        </View>
      );
    }

    return null;
  },


  _handlePress(tid) {
    this.setState({
      tid: tid === this.state.tid ? '' : tid
    })
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    color: '#CCCCCC'
  },
  price: {
    color: '#ff8a00'
  },
});


module.exports = OrderRow;
