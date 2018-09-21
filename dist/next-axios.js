(function () {

  var global = global || window || self || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var axios = global.axios || require('axios');
  var DEFAULT_CONTENT_TYPE = 'application/json;charset=utf-8';
  var ERROR_MSG = '[nx.Axios]: Please implment the method!';

  var NxAxios = nx.declare('nx.Axios', {
    statics: {
      instance: null,
      getInstance: function () {
        if (!this.instance) {
          this.instance = new this();
        }
        return this.instance;
      }
    },
    methods: {
      axios: axios,
      init: function () {
        this.setDefaults();
        this.setRequestInterceptor();
        this.setResponseInterceptor();
      },
      setDefaults: function (inOptions) {
        var headers = { 'Content-Type': this.contentType() };
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
            head: headers,
          }
        };
        nx.mix(axios.defaults, options);
      },
      setRequestInterceptor: function () {
      },
      setResponseInterceptor: function () {
        var self = this;
        axios.interceptors.response.use(function (response) {
          return self.success(response);
        }, function (error) {
          self.error(error);
          nx.error(error);
        });
      },
      contentType: function () {
        return DEFAULT_CONTENT_TYPE;
      },
      success: function (inResponse) {
        return this.toData(inResponse);
      },
      error: function (inError) {
        console.log(ERROR_MSG, inError);
      },
      toData: function (inResponse) {
        return inResponse;
      },
      isSuccess: function (inResponse) {
        return !inResponse.errorCode;
      },
      request: function (inOptions) {
        return axios.request(inOptions);
      },
      'get,delete,head,post,put,patch': function (inMethod) {
        return function (inName, inData, inConfig) {
          return axios[inMethod](inName, inData, inConfig);
        };
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAxios;
  }

}());
