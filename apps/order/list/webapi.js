var {fetch} = require('ikit');

/**
 * 获取订单数据
 */
exports.fetchGoodsList = (page) => {
  return fetch(`http://frey.sj001.com/trades/?page=${page}`);
};
