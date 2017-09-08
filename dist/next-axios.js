(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var axios = global.axios || require('axios');
  var Q = global.Q || require('q');
  var _ = require('next-param');

  var Axios = nx.declare('nx.Axios', {
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
        nx.mix(axios.defaults.headers, inOptions, {
          common: nx.mix({
            'Content-Type': this.contentType()
          }, options.common)
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
        return nx.param(inData);
      },
      contentType: function(){
        return 'application/x-www-form-urlencoded';
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
      post: function (inName, inData) {
        return axios.post(inName, this.transformParam(inData));
      },
      get: function (inName, inData) {
        return axios.get(inName, {
          params: inData
        });
      },
      delete: function (inName, inData) {
        return axios.delete(inName, this.transformParam(inData));
      },
      put: function (inName, inData) {
        return axios.put(inName, this.transformParam(inData));
      },
      patch: function (inName, inData) {
        return axios.patch(inName, this.transformParam(inData));
      },
      head: function (inName, inData) {
        return axios.head(inName, this.transformParam(inData));
      },
      options: function (inName, inData) {
        return axios.options(inName, this.transformParam(inData));
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Axios;
  }

}());
