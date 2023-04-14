/**
 * 请求中有 when 函数，当 when 函数返回 true 时，才会执行后续的拦截器
 *
 * A: 处理字段中出现 xxArray 的字段
 * 检测逻辑为：
 * 1. 字段key: 以 Array 结尾
 * 2. 字段value: string
 * 处理逻辑为:
 * 1. 字段 key 不变
 * 2. 字段 value: split(',')
 *
 * B: 处理字段中出现 xxIdArray 的字段
 * 检测逻辑为：
 * 1. 字段key: 以 IdArray 结尾
 * 2. 字段value: string
 * 处理逻辑为:
 * 1. 字段 key: 字段 key 不变
 * 2. 字段 value: split(',').map(Number)
 */
import nx from '@jswork/next';
import '@jswork/next-deep-each';

export default function suffixArrayInterceptor(data: any): any {
  const { config, ...response } = data;
  const { when } = config;
  if (typeof when !== 'function') return console.warn('when must be a function'), data;
  if (when(data)) {
    nx.deepEach(response, (key, value, target) => {
      if (typeof value === 'string') {
        if (key.endsWith('Array')) {
          target[key] = value.split(',');
        } else if (key.endsWith('IdArray')) {
          target[key] = value.split(',').map((item) => Number(item));
        }
      }
    });
  }
  return data;
}
