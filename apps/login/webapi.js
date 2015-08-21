/**
 * login api
 */
exports.login = (username, password) => {
  return new Promise((resolve, reject) => {
    var request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    };

    if (__DEV__) {
      console.log('登录：http://frey.sj001.com/api-auth/login/', request);
    }

    fetch('http://frey.sj001.com/api-token-auth/', request)
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((err) => reject(err))
      .done();
  });
};
