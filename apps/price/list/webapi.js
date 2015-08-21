var {fetch} = require('ikit');

/**
 * 获取调价数据
 */
exports.fetchGoodsList = (page) => {
  return fetch(`http://frey.sj001.com/changenotifys/?page=${page}`);
};
