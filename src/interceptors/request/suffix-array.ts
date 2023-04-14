/**
 * 处理场景如下：
 * 1. 请求中存在 Array 结尾的字段
 * 2. 请求中存在 IdArray 结尾的字段
 *
 * 1. 检测逻辑为
 * 1.1 字段 key 以 Array 结尾
 * 1.2 字段 value 为数组，且为简单类型
 *
 * 处理逻辑为
 * 1. 字段 key 不变
 * 2. 字段 value: join(',')
 *
 * 2. 检测逻辑为
 * 2.1 字段 key 以 IdArray 结尾
 * 2.2 字段 value 为数组，且为简单类型
 *
 * 处理逻辑为
 * 1. 字段 key 不变
 * 2. 字段 value: join(',')
 */

export default function suffixArrayInterceptor(inData: any): any {
  const { when, data } = inData;
  if (typeof when !== 'function') return console.warn('when must be a function'), inData;
  if (when(inData)) {
    nx.deepEach(data, (key, value, target) => {
      if (key.endsWith('Array')) {
        target[key] = value.join(',');
      }
    });
  }
  return inData;
}
