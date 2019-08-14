# cancelable

```js
$api.login({ username: "fei", password: "123123" },{
  resource: this._res
}).then(res => {
  nx.$memory = {
    login: res.data
  };
});

this._res.destroy();
```
