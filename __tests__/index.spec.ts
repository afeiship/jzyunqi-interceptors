import suffixArrayRequest from '../src/interceptors/request/suffix-array';
import suffixArrayResponse from '../src/interceptors/response/suffix-array';
import removeSpecialRequest from '../src/interceptors/request/remove-special';
import weiboNormalizeResponse from '../src/interceptors/response/weibo-normalize';

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
        0: '12313',
        key1: 'value1',
        __key1__: 'special value',
        key2: 'value2',
        __key2__: 'another special value',
      },
    };

    const res = removeSpecialRequest(mockResponse);
    expect(res.data).toEqual({
      0: '12313',
      key1: 'value1',
      key2: 'value2',
    });
  });

  test('weibo normalize response interceptor', () => {
    const mockResponse = {
      data: `    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript">document.domain="sina.com.cn";</script>
{"code":"A00006","data":{"count":1,"data":"eyJ1aWQiOjM2NjE4MzI4MDMsImFwcCI6Im1pbmlibG9nIiwiY291bnQiOjEsInRpbWUiOjE2Nzg4MDY2MjQuODgsInBpY3MiOnsicGljXzEiOnsid2lkdGgiOjE1MDQsInNpemUiOjE2MTY0NSwicmV0IjoxLCJoZWlnaHQiOjQwMCwibmFtZSI6InBpY18xIiwicGlkIjoiZGE0MzIyNjNneTFoYnpzamIxcnVnajIxNXMwYjR0Y3QifX19","pics":{"pic_1":{"width":1504,"size":161645,"ret":1,"height":400,"name":"pic_1","pid":"da432263gy1hbzsjb1rugj215s0b4tct"}}}}`,
    };

    const res = weiboNormalizeResponse(mockResponse);
    expect(res.data).toEqual({
      code: 'A00006',
      format: 'jpg',
      width: 1504,
      size: 161645,
      ret: 1,
      height: 400,
      name: 'pic_1',
      pid: 'da432263gy1hbzsjb1rugj215s0b4tct',
    });
  });
});
