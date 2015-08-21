var {fetch} = require('ikit');

/**
 * 获取数据
 */
exports.fetchGoodsList = (page) => {
  return fetch(`http://frey.sj001.com/supproducts/?page=${page}`);
};
