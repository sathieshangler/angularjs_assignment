mainApp.service('httpService', function ($http) {
  return {
    post: post,
    get: get
  };
  function post(url, model, token) {
    var headers = '';
    var response = $http.post(url, model, {
      headers: headers
    });
    return response;
  }
  function get(url, token) {
    var headers = '';
    var response = $http.get(url, {
      headers: headers
    });
    return response;
  }
});