## Express学习

### 中间件

#### 应用级别中间件

不限制请求路径：

```js
// 所有的请求都会通过该中间件，前提是这个中间件要放到请求上放定义
app.use((req, res, next) => {
 console.log("time", Date.now())
 next()
})
```

限制请求路径：

```js
app.get("/", (req, res, next) => {
 console.log("request type:", req.method)
 next()
})
```

限定请求路径 + 请求方法：

```js
app.post("/text", (req, res, next) => {
 console.log("hello post")
 next()
})
/*
 还有一些常用的请求方法：
 app.get
 app.delete
 app.put
 app.patch
*/
```

多个函数的处理中间件：

```js
app.use(
 "/user/:id",
 (req, res, next) => {
  console.log("Request URL", req.originalUrl)
    // 这个next函数是在当前处理栈里面的。
    next()
 },
 (req, res, next) => {
  console.log("Request Type", req.method)
    // 这个next是跳出当前处理栈，执行下面的代码。
    next()
 }
)

```

为同一个函数添加多个中间件：

```js
app.use(
 "/user/:id",
 (req, res, next) => {
  console.log("Request URL", req.originalUrl)
  // 这个next函数是在当前处理栈里面的。
  next()
 },
 (req, res, next) => {
  console.log("Request Type", req.method)
  // 这个next是跳出当前处理栈，执行下面的代码。
  res.send("111")
  next()
 }
)
app.post("/user/:id", (req, res) => {
 console.log("hello post")
})
// 注意：如果之前的中间件已经发出响应了，之后的就不可以在发送响应了，因为发送过一次响应表明这个请求已经中断了，再次发送响应它会报错。
```

中间件也可以在数组中声明为可重用。此示例显示了一个带有中间件子堆栈的数组，该子堆栈处理对 `/user/:id` 路径的 ` GET ` 请求

```js
function logOriginalUrl(req, res, next) {
 console.log("Request URL :", req.originalUrl)
 next()
}

function logMethod(req, res, next) {
 console.log("Request Type :", req.method)
 next()
}

let logStuff = [logOriginalUrl, logMethod]
app.post("/user/:id", logStuff, (req, res, next) => {
 res.send("响应成功")
})
```

#### 路由级别中间件

路由级别中间件与应用程序级中间件的工作方式相同，只不过它绑定到的实例`express.Router()`。

```
const router = express.Router()
```

使用 `router.use()` 和 `router.METHOD()` 函数加载路由级中间件。

可以将路由单独创建一个文件来统一管理路由。这样便于代码的可维护性。

目录：`router.js`

```js
// 路由模块
const express = require('express')
// 1、创建路由实例对象
const router = express.Router()

// 2、配置路由
router.get('/', (req, res) => {
 res.send('hello get')
})

router.post('/text', (req, res) => {
 res.send('hello post')
})

// 导出模块
module.exports = router

```

在 `server.js`可以导入 `router`路由模块，通过`app.use()` 注册路由模块。

```js
// 导入路由模块
const router = require('./router')
// 注册路由模块
app.use(router)
/*
 还可以限定请求的路径：
 app.use('/api',router)
*/
```

#### 错误处理中间件

错误处理中间件与其他中间件函数不同的地方是使用了四个参数而不是三个参数(特别是使用签名(err,req,res,next))之外：

```js
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})
```

一般会在所有的中间件之后来挂载错误处理中间件。如果在路由配置当中有很多错误要处理的话,就可以统一交给错误处理中间件，使用 `next(err)` 这样他会将错误传递给错误处理中间件。

#### 内置中间件

Express具有一下内置中间件函数：

- **express.json()** 解析Content-Type为 `application/json` 格式的请求体
- **express.urlencoded()** 解析Content-Type为 `application/x-www-form-urlencoded` 格式的请求体
- **express.raw()** 解析Content-Type为 `application/octet-stream` 格式的请求体
- **express.static()** 托管静态资源文件
- **express.text()** 解析Content-Type为 `text/plain` 格式的请求体

#### 第三方中间件

官网推荐使用的中间件：

```
https://www.expressjs.com.cn/resources/middleware.html
```

## RESTful接口设计规范

### 协议

API与用户的通信协议，尽量使用HTTPS协议。

### 域名

应该尽量将API部署在专用域名之下。

```
https://api.example.com
```

如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。

```
https://example.org/api
```

### 版本

应该将API的版本号放入URL。

```
https://api.example.com/v1/
```

另一种做法是，将版本好放在HTTP头信息中，但不如放入URL方便和直观

`GitHub`采用这种做法。

### 路径

路径又称"终点"（endpoint），表示API的具体网址。

在RESTful架构中，每个网址代表与一中资源(resource),所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名相对应。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。

举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。

- <https://api.example.com/v1/zoos>
- <https://api.example.com/v1/animals>
- <https://api.example.com/v1/employees>

### HTTP动词

对于资源的具体操作类型，有HTTP动词表示。

常用的HTTP动词有下面五个（括号里是对应的SQL命令）

- GET（读取）：从服务器取出资源（一项或多项）。
- POST（创建）：在服务器新建一个资源。
- PUT（完整更新）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（部分更新）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（删除）：从服务器删除资源。

还有两个不常用的HTTP动词。

- HEAD: 获取资源的元数据。
- OPTIONS: 获取信息，关于资源的那些数据是客户端可以改变的。

下面是一些例子

- GET /zoos：列出所有动物园
- POST /zoos：新建一个动物园
- GET /zoos/ID：获取某个指定动物园的信息。
- PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
- PATCH /zoos/ID：更新某个动物园的信息（提供该动物园的部分信息）
- DELETE /zoos/ID：删除某个动物园
- GET /zoos/ID/animals：列出某个指定动物园的所有动物
- DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

### 过滤信息

如果记录数量很多，服务器不可能都将他们返回给用户。API应该提供参数，过滤返回结果。

下面是一些常见的参数

- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录开始的位置。
- ?page=2&per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照那个属性排序，以及排序顺序。
- ?animal_type_id：指定筛选条件

参数的设计允许存在冗余，及允许API路径和URRL参数偶尔有重复。比如，GET/zoo/ID/animals与GET/animals?zoo_id=ID的含义是相同的。

### 状态码

客户端的每一次请求，服务器都必须给出回应。回应包括HTTP状态码和数据两部分。

HTTP状态码就是一个三位数，分成五个类别。

- `1xx`：相关信息
- `2xx`：操作成功
- `3xx`：重定向
- `4xx`：客户端错误
- `5xx`：服务器错误

这五大类总共包含了**100多种**状态码，覆盖了绝大部分可能遇到的情况。每一种状态码都有标准的（或者约定的）解释，客户端只需查看状态码，就可以判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。

常见的状态码（方括号中式该状态码对应的HTTP动词）。

- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或数据的修改，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*]：表示用户得到授权（与401错误想对），但是访问时被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的时不存在的记录，服务器没有进行操作
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone - [GET]：用户请求的资源被永久删除，且不会在得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH]：当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

### 返回数据

API返回的数据格式，不应该是纯文本，而应该时一个JSON对象，因为这样才能返回标准的结构化数据。所以，服务器回应的HTTP头的`Content-Type`属性要设为`application/json`。

针对不同操作，服务器向用户返回的结果应该符合一下规范。

- GET /collection：返回资源对象的列表（数组）。
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档

### 错误处理

### 身份认证

基于`JWT`的结构权限认证：

- 字段名：`Authorization`
- 字段值：`Bearer token数据`

### 跨域处理

可以在服务端设置`CORS`允许客户端跨域资源请求。

## 创建项目

```
mkdir realworld-api-express

cd realworld-api-express

npm init -y

nom i express
```

app.js

```js
const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
 res.send('hello world')
})

app.listen(PORT, () => {
 console.log('服务器启动成功', `http://localhost:${PORT}`)
})

```

### 目录结构

```
|--- config # 配置文件
|  |--- confi
```
