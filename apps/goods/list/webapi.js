var {fetch} = require('ikit');
console.log(fetch);

/**
 * 获取数据
 */
exports.fetchGoodsList = (page) => {
  return fetch(`http://frey.sj001.com/supproducts/?page=${page}`);
};
