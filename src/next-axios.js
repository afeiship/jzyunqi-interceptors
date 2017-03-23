(function (global) {

  var nx = global.nx || require('next-js-core2');
  var axios = global.axios || require('axios');
  var Q = global.Q || require('q');


  var Axios = nx.declare('nx.Axios', {
    methods: {
      init: function () {
        this.setDefaults();
        this.setHeaders();
        this.setResponseInterceptor();
      },
      setDefaults: function (inOptions) {
        //baseUrl/timeout
        var options = inOptions || {
            baseUrl: './',
            timeout: 30000
          };
        nx.mix(axios.defaults, options);
      },
      setHeaders: function (inOptions) {
        var options = inOptions || {};
        nx.mix(axios.defaults.headers, inOptions, {
          common: nx.mix({
            'Power-By': 'afeiship/next-afeiship',
            'Content-Type': 'application/x-www-form-urlencoded'
          }, options.common)
        });
      },
      setRequestInterceptor: function () {
      },
      setResponseInterceptor: function () {
        var self = this;
        axios.interceptors.response.use(function (response) {
          return self.success(response);
        }, function (response) {
          var defer = Q.defer();
          self.error(response);
          return defer.promise;
        });
      },
      success: function (inResponse) {
        return this.toData(inResponse);
      },
      error: function (inError) {
        console.log('[nx.Axios]: Please implment the method!', inError);
      },
      toData: function (inResponse) {
        return inResponse;
      },
      isSuccess: function (inResponse) {
        return !inResponse.errorCode;
      },
      post: function (inName, inData) {
        return axios.post(inName, nx.param(inData));
      },
      get: function (inName, inData) {
        return axios.get(inName, {
          params: inData
        });
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Axios;
  }

}(this));
