# next-axios
> Axios common features based on next toolkit.

## install
```bash
npm install -S @feizheng/next-axios
```

## apis
| api | params | description   |
|-----|--------|---------------|
| get | -      | desc balabala |

## usage
```js
import NxAxios from '@feizheng/next-axios';

// code goes here:
```

## react-native: info.plist
```xml
<!-- Networking config -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>localhost</key>
        <dict>
            <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

## resources:
- https://github.com/mzabriskie/axios
- http://codeheaven.io/how-to-use-axios-as-your-http-client/
- https://github.com/kriskowal/q
- https://github.com/ohhoney1/notes/issues/3
- https://medium.com/@selvaganesh93/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7

## todos:
- [ ] next-axios transformParam: when get/post/ and different API name
- [ ] transformParam: remove nx.param default
- [ ] response/request Class for input/output data wrapper.
- [ ] cacnel request

## fetch cancel/abort
<img width="500" src="http://ww1.sinaimg.cn/large/006tNc79ly1g59wi17khgj312w0sygp9.jpg" />

