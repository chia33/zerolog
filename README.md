ZeroLog
===================================

把console.log输出到页面上，方便移动设备调试

### 怎么使用？

在head中引入Zerolog.js即可。

### 怎么指定log容器?

在body中加入
```
    <div id="Zerolog"></div>
```
或者手动指定容器id
```
    <div id="customeId"></div>
    <script>
        Zerolog.init("customeId");
    </script>
```