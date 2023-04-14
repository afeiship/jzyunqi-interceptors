import suffixArrayInterceptorResponse from './interceptors/response/suffix-array';
import suffixArrayInterceptorRequest from './interceptors/request/suffix-array';

const JzyunqiInterceptors = [
  { type: 'response', fn: suffixArrayInterceptorResponse },
  { type: 'request', fn: suffixArrayInterceptorRequest },
];

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JzyunqiInterceptors;
}

export default JzyunqiInterceptors;
