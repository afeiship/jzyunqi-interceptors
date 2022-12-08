(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = {};
  var NxAbstractRequest = nx.AbstractRequest || require('@jswork/next-abstract-request');
  var axios = require('axios');

  var NxAxios = nx.declare('nx.NextAxios', {
    extends: NxAbstractRequest,
    methods: {
      request: function (inMethod, inUrl, inData, inOptions) {
        var options = nx.mix(null, defaults, inOptions);
        var instance = axios.create(options);
        return instance[inMethod](inUrl, inData);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAxios;
  }
})();
