(function() {
  var global = global || window || self || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var axios = global.axios || require('axios');
  var ERROR_MSG = '[nx.Axios]: Please implment the method!';
  var contentType = nx.contentType || require('next-content-type');
  var nxStubSingleton = nx.stubSingleton || require('next-stub-singleton');

  var NxAxios = nx.declare('nx.Axios', {
    methods: {
      axios: axios,
      init: function() {
        this.setDefaults();
        this.setRequestInterceptor();
        this.setResponseInterceptor();
      },
      setDefaults: function(inOptions) {
        var headers = this.headers();
        var options = inOptions || {
          baseURL: './',
          timeout: 30000,
          headers: {
            common: headers,
            get: headers,
            post: headers,
            delete: headers,
            put: headers,
            patch: headers,
            head: headers
          }
        };
        nx.mix(axios.defaults, options);
      },
      setRequestInterceptor: function() {},
      setResponseInterceptor: function() {
        var self = this;
        axios.interceptors.response.use(
          function(response) {
            return self.success(response);
          },
          function(error) {
            self.error(error);
            nx.error(error);
          }
        );
      },
      headers: function() {
        return {
          'Content-Type': contentType('json')
        };
      },
      success: function(inResponse) {
        return this.toData(inResponse);
      },
      error: function(inError) {
        console.log(ERROR_MSG, inError);
      },
      toData: function(inResponse) {
        return inResponse;
      },
      isSuccess: function(inResponse) {
        return !inResponse.errorCode;
      },
      request: function(inOptions) {
        return axios.request(inOptions);
      },
      'get,delete,head,post,put,patch': function(inMethod) {
        return function(inName, inData, inConfig) {
          return axios[inMethod](inName, inData, inConfig);
        };
      }
    }
  });

  // singleton:
  nx.mix(NxAxios, nxStubSingleton());

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAxios;
  }
})();
