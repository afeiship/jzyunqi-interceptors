# next-axios
> Axios common features based on next toolkit.

## install
```bash
npm install -S afeiship/next-axios --registry=https://registry.npm.taobao.org
```

## apis
| api | params | description   |
|-----|--------|---------------|
| get | -      | desc balabala |

## usage
```js
import NxAxios from 'next-axios';

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
+ https://github.com/mzabriskie/axios
+ http://codeheaven.io/how-to-use-axios-as-your-http-client/
+ https://github.com/kriskowal/q
+ https://github.com/ohhoney1/notes/issues/3

## todos:
- [ ] next-axios transformParam: when get/post/ and different API name
- [ ] transformParam: remove nx.param default
- [ ] response/request Class for input/output data wrapper.
- [ ] cacnel request

