// response
import suffixArrayInterceptorResponse from './interceptors/response/suffix-array';
import weiboNormalizeInterceptorResponse from './interceptors/response/weibo-normalize';

// request
import suffixArrayInterceptorRequest from './interceptors/request/suffix-array';
import removeSpecialInterceptorRequest from './interceptors/request/remove-special';

const JzyunqiInterceptors = [
  { type: 'response', fn: suffixArrayInterceptorResponse },
  { type: 'response', fn: weiboNormalizeInterceptorResponse },
  { type: 'request', fn: suffixArrayInterceptorRequest },
  { type: 'request', fn: removeSpecialInterceptorRequest },
];

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JzyunqiInterceptors;
}

export default JzyunqiInterceptors;
