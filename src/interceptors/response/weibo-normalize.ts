import nx from '@jswork/next';
import weibo2res from '@jswork/weibo2res';
import '@jswork/next-deep-each';

export default function weiboNormalize(options: any): any {
  // options.data
  const target = options.data;
  if (typeof target === 'string' && target.includes('sina.com.cn')) {
    options.data = weibo2res(target);
  }
  return options;
}
