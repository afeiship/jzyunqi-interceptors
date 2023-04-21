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

export default function suffixArray(options: any): any {
  nx.deepEach(options.data, (key, value, target) => {
    if (typeof value === 'string') {
      if (key.endsWith('Array')) {
        const aryValue = value.split(',');
        target[key] = aryValue;

        if (key.endsWith('IdArray')) {
          target[key] = aryValue.map((item) => {
            const num = Number(item);
            return isNaN(num) ? item : num;
          });
        }
      }
    }
  });
  return options;
}
