import suffixArrayRequest from '../src/interceptors/request/suffix-array';
import suffixArrayResponse from '../src/interceptors/response/suffix-array';

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
});
