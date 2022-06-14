# 我的博客后台API接口文档

## 1. API 接口说明

- 接口地址：`http://localhost:3000/api/`
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 token 认证
- 需要授权的 API，必须在请求头中使用 `authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- DELETE（DELETE）：从服务器删除资源。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 1.2 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |
|          |                       |                                                     |

## 2. 登录

### 2.1 登录验证接口

- 请求路径：`login`

- 请求方法：`post`

- 请求类型：`json`

  ```json
  {
    "user":{
      "email": "1340482172@qq.com",
      "password": "123456"
    }
  }
  ```

- 请求参数

  | 参数名   | 参数说明 | 备注     |
  | -------- | -------- | -------- |
  | email    | 用户名   | 不能为空 |
  | password | 密码     | 不能为空 |

- 响应参数

  | 参数名   | 参数说明 | 备注            |
  | -------- | -------- | --------------- |
  | _id      | 用户id   |                 |
  | username | 用户名   |                 |
  | email    | 邮箱     |                 |
  | bio      | 用户介绍 |                 |
  | image    | 用户头像 |                 |
  | token    | 令牌     | 基于 jwt 的令牌 |

- 响应数据

  ```
  {
      "_id": "627cce6103e61ca92297285f",
      "username": "lxj",
      "email": "1340482172@qq.com",
      "bio": "哈哈哈",
      "image": "",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjdjY2U2MTAzZTYxY2E5MjI5NzI4NWYiLCJpYXQiOjE2NTUyMDM2NzksImV4cCI6MTY1NTIwNzI3OX0.PnyukQfzUrY0MRmzjNx9gbHtCuUgdJ0PL5ecO2gPJs0"
  }
  ```

### 2.2 注册接口

- 请求路径：`users`

- 请求方法：`post`

- 请求参数：

  | 参数名   | 参数说明 | 备注     |
  | -------- | -------- | -------- |
  | username | 用户名   | 不能为空 |
  | email    | 邮箱     | 不能为空 |
  | password | 密码     | 不能为空 |

- 请求格式：

  ```json
  {
      "user":{
          "username":"lxj",
          "email":"123@qq.com",
          "password":"123456"
      }
  }
  ```

- 响应参数：

  | 参数名   | 参数说明 | 备注 |
  | -------- | -------- | ---- |
  | username | 用户名   |      |
  | email    | 邮箱     |      |
  | bio      | 用户介绍 |      |

- 响应数据：

  ```json
  {
      "user": {
          "username": "tom",
          "email": "tom@qq.com",
          "bio": null,
          "image": null,
          "_id": "62a869402d6c691bedc6ab74",
          "createdAt": "2022-06-14T10:56:00.737Z",
          "updatedAt": "2022-06-14T10:56:00.737Z",
          "__v": 0
      }
  }
  ```

### 2.3 获取当前登录用户

- 请求路径：`user`

- 请求类型：`get`

- 请求头：`authorization`

- 响应数据：

  ```json
  {
      "user": {
          "_id": "627cce6103e61ca92297285f",
          "username": "lxj",
          "email": "1340482172@qq.com",
          "bio": "哈哈哈",
          "image": "",
          "createdAt": "2022-05-12T09:07:45.291Z",
          "updatedAt": "2022-05-12T09:07:45.292Z",
          "__v": 0
      }
  }
  ```

### 2.4 修改用户信息

- 请求路径：`user`

- 请求类型：`put`

- 请求头：`authorization`

- 请求参数格式

  ```json
  {
      "userInfo":{
          "username":"lxj",
          "bio":"我是一名前端程序员",
          "image":"",
          "email":"1340482172@qq.com"
      }
  }
  ```

- 响应数据

  ```json
  {
      "user": {
          "_id": "62a869402d6c691bedc6ab74",
          "username": "tom",
          "email": "tom@qq.com",
          "bio": "我是一名前端程序员",
          "image": null,
          "createdAt": "2022-06-14T10:56:00.737Z",
          "updatedAt": "2022-06-14T10:56:00.737Z",
          "__v": 0
      }
  }
  ```

## 3. 文章管理接口

### 3.1 获取文章列表

- 请求路径：`articles`

- 请求类型：`get`

- 请求头：`authorization`

- 请求参数（query）：

  | 参数名 | 参数说明                                 | 备注     |
  | ------ | ---------------------------------------- | -------- |
  | limit  | 响应多少条数据（一页显示多少条，默认20） | 可以为空 |
  | offset | 跳过多少条数据（默认0）                  | 可以为空 |
  | author | 用户名称，用户查询谁创建的文章           | 可以为空 |

- 响应参数：

  | 参数名         | 参数说明     | 备注 |
  | -------------- | ------------ | ---- |
  | _id            | 文章id       |      |
  | title          | 文章标题     |      |
  | description    | 文章摘要     |      |
  | body           | 文章内容     |      |
  | tagList        | 文章标签     |      |
  | favoritesCount | 文章点赞数   |      |
  | createdAt      | 创建文章时间 |      |
  | updatedAt      | 修改文章时间 |      |
  | comments       | 谁评论过文章 |      |
  | author         | 文章作者信息 |      |
  | articlesCount  | 所有文章总数 |      |

  

- 响应数据：

  ```json
  {
      "articles": [
          {
              "_id": "62a496ed26f258027fd5c7a6",
              "title": "乡村的声音",
              "description": "小时候",
              "body": "",
              "tagList": [
                  "乡村，农村"
              ],
              "favoritesCount": 1,
              "createdAt": "2022-06-11T13:21:49.458Z",
              "updatedAt": "2022-06-11T13:21:49.458Z",
              "comments": [
                  {
                      "body": "嘿哈",
                      "userInfo": [
                          "627cce6103e61ca92297285f",
                          "lxj",
                          ""
                      ],
                      "_id": "62a85ae62d6c691bedc6a931",
                      "createdAt": "2022-06-14T09:54:46.983Z",
                      "updatedAt": "2022-06-14T09:54:46.983Z"
                  }
              ],
              "author": {
                  "_id": "627cce6103e61ca92297285f",
                  "username": "lxj",
                  "image": ""
              },
              "__v": 1
          }
      ],
      "articlesCount": 7
  }
  ```

### 3.2 创建文章

- 请求路径：`article`

- 请求类型：`post`

- 请求头：`authorization`

- 请求体：

  ```json
  {
      "article": {
          "title": "js",
          "description": "闭包",
          "body": "JavaScript（简称'JS'） 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非浏览器环境中，JavaScript 基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式、声明式、函数式编程规范JavaScript在1995年由Netscape公司的Brendan Eich，在网景导航者浏览器上首次设计实现而成。因为Netscape与Sun合作，Netscape管理层希望它外观看起来像Java，因此取名为JavaScript。但实际上它的语法风格与Self及Scheme较为接近。JavaScript的标准是ECMAScript 。截至 2012 年，所有浏览器都完整的支持ECMAScript 5.1，旧版本的浏览器至少支持ECMAScript 3 标准。2015年6月17日，ECMA国际组织发布了ECMAScript的第六版，该版本正式名称为 ECMAScript 2015，但通常被称为ECMAScript 6 或者ES2015.",
          "tagList": [
              "js",
              "面向对象"
          ]
      }
  }
  ```

- 响应数据

  ```json
  {
      "article": {
          "title": "JavaScript",
          "description": "闭包",
          "body": "JavaScript（简称'JS'） 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非浏览器环境中，JavaScript 基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式、声明式、函数式编程规范JavaScript在1995年由Netscape公司的Brendan Eich，在网景导航者浏览器上首次设计实现而成。因为Netscape与Sun合作，Netscape管理层希望它外观看起来像Java，因此取名为JavaScript。但实际上它的语法风格与Self及Scheme较为接近。JavaScript的标准是ECMAScript 。截至 2012 年，所有浏览器都完整的支持ECMAScript 5.1，旧版本的浏览器至少支持ECMAScript 3 标准。2015年6月17日，ECMA国际组织发布了ECMAScript的第六版，该版本正式名称为 ECMAScript 2015，但通常被称为ECMAScript 6 或者ES2015.",
          "tagList": [
              "js",
              "html"
          ],
          "favoritesCount": 0,
          "_id": "62a86fa82d6c691bedc6ab84",
          "createdAt": "2022-06-14T11:23:20.936Z",
          "updatedAt": "2022-06-14T11:23:20.936Z",
          "comments": [],
          "author": {
              "_id": "62a869402d6c691bedc6ab74",
              "username": "tom",
              "bio": "我是一名前端程序员",
              "image": null
          },
          "__v": 0
      }
  }
  ```

- 



