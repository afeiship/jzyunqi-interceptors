import nx from '@jswork/next';
import '@jswork/next-deep-each';

export default function removeSpecial(options: any): any {
  const { data } = options;
  if (!data || typeof data !== 'object') return options;

  nx.deepEach(data, (key, value, target) => {
    if (typeof key === 'string' && key.startsWith('__') && key.endsWith('__')) {
      delete target[key];
    }
  });

  return options;
}
