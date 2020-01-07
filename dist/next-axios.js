/*!
 * name: @feizheng/next-axios
 * url: https://github.com/afeiship/next-axios
 * version: 2.0.3
 * date: 2020-01-07T06:48:18.220Z
 * license: MIT
 */

(function() {
  var global = global || window || self || Function('return this')();
  var axios = global.axios || require('axios');
  var nx = global.nx || require('@feizheng/next-js-core2');
  var contentType = nx.contentType || require('@feizheng/next-content-type');
  var nxStubSingleton = nx.stubSingleton || require('@feizheng/next-stub-singleton');
  var CancelToken = axios.CancelToken;
  var ERROR_MSG = '[nx.Axios]: Please implment the method!';

  var NxAxios = nx.declare('nx.Axios', {
    statics: nx.mix(null, nxStubSingleton()),
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
            if (self.isSuccess(response)) {
              return self.success(response);
            } else {
              self.error(response);
              return Promise.reject(response);
            }
          },
          function(error) {
            self.error(error);
            return Promise.reject(error);
          }
        );
      },
      headers: function() {
        return { 'Content-Type': contentType('json') };
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
        var resource = inOptions.resource;
        var source = CancelToken.source();
        var additional = resource ? { cancelToken: source.token } : null;
        var options = nx.mix(additional, inOptions);
        // resource:[ context, path ]
        resource && nx.set(resource[0], resource[1], { destroy: source.cancel });
        return axios.request(options);
      },
      'get,delete,head,post,put,patch': function(inMethod) {
        return function(inName, inData, inConfig) {
          const addtional = inMethod === 'get' ? { params: inData } : { data: inData };
          return this.request(
            nx.mix(
              {
                method: inMethod,
                url: inName
              },
              addtional,
              inConfig
            )
          );
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAxios;
  }
})();

//# sourceMappingURL=next-axios.js.map
