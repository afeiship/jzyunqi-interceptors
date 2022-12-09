(function () {
  const NxAxios = require('../src');

  describe('NxAxios.methods', function () {
    test('test basic api exist', function () {
      const methods = [
        'getInstance',
        'get',
        'post',
        'put',
        'patch',
        'delete',
        'head',
        'options',
        'request'
      ];

      methods.forEach((method) => {
        expect(NxAxios[method]).toBeInstanceOf(Function);
      });
    });
  });
})();
