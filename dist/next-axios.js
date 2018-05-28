(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var axios = global.axios || require('axios');

  //just require it:
  require('next-param');

  var NxAxios = nx.declare('nx.Axios', {
    methods: {
      axios:axios,
      init: function () {
        this.setDefaults();
        this.setHeaders();
        this.setRequestInterceptor();
        this.setResponseInterceptor();
      },
      setDefaults: function (inOptions) {
        //baseUrl/timeout
        var options = inOptions || {
            baseURL: './',
            timeout: 30000
          };
        nx.mix(axios.defaults, options);
      },
      setHeaders: function (inOptions) {
        var options = inOptions || {};
        var defaults = { 'Content-Type': this.contentType() };
        nx.mix(axios.defaults.headers, inOptions, {
          common: nx.mix(defaults, options.common),
          get: nx.mix(defaults, options.get),
          post: nx.mix(defaults, options.post),
          put: nx.mix(defaults, options.put),
          delete: nx.mix(defaults, options.delete),
          patch: nx.mix(defaults, options.patch),
        });
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
      transformParam: function(inData){
        return inData;
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
      all: function(inOptions){
        return axios.all(inOptions);
      },
      request: function (inOptions) {
        return axios.request(inOptions);
      },
      get: function (inName, inData, inConfig) {
        return axios.get(inName, {
          params: inData
        }, inConfig);
      },
      delete: function (inName, inData, inConfig) {
        return axios.delete(inName, this.transformParam(inData), inConfig);
      },
      head: function (inName, inData, inConfig) {
        return axios.head(inName, this.transformParam(inData), inConfig);
      },
      post: function (inName, inData, inConfig) {
        return axios.post(inName, this.transformParam(inData), inConfig);
      },
      put: function (inName, inData, inConfig) {
        return axios.put(inName, this.transformParam(inData), inConfig);
      },
      patch: function (inName, inData, inConfig) {
        return axios.patch(inName, this.transformParam(inData), inConfig);
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAxios;
  }

}());
