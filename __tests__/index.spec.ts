import suffixArrayRequest from '../src/interceptors/request/suffix-array';
import suffixArrayResponse from '../src/interceptors/response/suffix-array';
import removeSpecialRequest from '../src/interceptors/request/remove-special';

describe('api.basic', () => {
  test('test suffix-array resposne interceptor', () => {
    const mockResponse = {
      data: {
        imgArray: 'a.jpg,3.png,4.gif',
        itemIdArray: '1,2,3',
      },
    };

    const res = suffixArrayResponse(mockResponse);
    expect(res.data).toEqual({
      imgArray: ['a.jpg', '3.png', '4.gif'],
      itemIdArray: [1, 2, 3],
    });
  });

  test('test suffix-array request interceptor', () => {
    const mockRequest = {
      otherProps: null,
      data: {
        imgArray: ['a.jpg', '3.png', '4.gif'],
        itemIdArray: [1, 2, 3],
      },
    };

    const res = suffixArrayRequest(mockRequest);
    expect(res.data).toEqual({
      imgArray: 'a.jpg,3.png,4.gif',
      itemIdArray: '1,2,3',
    });
  });

  test('test suffix-array response with empty should be []', () => {
    const mockResponse = {
      data: {
        imgArray: '',
        itemIdArray: '',
      },
    };

    const res = suffixArrayResponse(mockResponse);
    expect(res.data).toEqual({
      imgArray: [],
      itemIdArray: [],
    });
  });

  test('remove special request interceptor', () => {
    const mockResponse = {
      data: {
        key1: 'value1',
        __key1__: 'special value',
        key2: 'value2',
        __key2__: 'another special value',
      },
    };

    const res = removeSpecialRequest(mockResponse);
    expect(res.data).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });
});
