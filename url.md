
# 后端接口需求文档 v1.0

## 认证相关接口

### 1. 用户注册
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request**:
```json
{
  "username": "string (3-20字符)",
  "password": "string (至少6位)",
  "email": "string (合法邮箱格式)"
}
```

- **Response** (成功):

```
{
  "code": 201,
  "data": {
    "userId": "string",
    "createdAt": "ISO8601时间戳"
  }
}
```

### 2. 用户登录

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request**:

```
{
  "username": "string",
  "password": "string"
}
```

- **Response** (成功):

```
{
  "code": 200,
  "data": {
    "token": "JWT认证令牌",
    "expiresIn": 3600 // 秒
  }
}
```

------

## 文档管理接口

### 3. 创建文档（仅管理员）

- **URL**: `/api/docs`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Request**:

```
{
  "title": "string (必填)",
  "content": "string (Markdown格式)",
  "isPublic": "boolean (默认false)"
}
```

- **Response** (成功):

```
{
  "code": 201,
  "data": {
    "docId": "string",
    "createdAt": "ISO8601时间戳",
    "ownerId": "用户ID"
  }
}
```

### 4. 获取文档列表

- **URL**: `/api/docs?page=1&limit=10&sort=-createdAt`

- **Method**: `GET`

- **Headers**: `Authorization: Bearer <token>`

- 

  Query Params

  :

  - `page`: 页码 (默认1)
  - `limit`: 每页数量 (默认10)
  - `sort`: 排序 (-createdAt 倒序)

- **Response**:

```
{
  "code": 200,
  "data": {
    "docs": [
      {
        "id": "string",
        "title": "string",
        "preview": "前100字符",
        "updatedAt": "ISO8601时间戳"
      }
    ],
    "totalCount": 100
  }
}
```

### 5. 获取文档详情

- **URL**: `/api/docs/:docId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (成功):

```
{
  "code": 200,
  "data": {
    "id": "string",
    "title": "string",
    "content": "完整Markdown内容",
    "isPublic": "boolean",
    "createdAt": "ISO8601时间戳",
    "lastEditor": "最后修改者ID"
  }
}
```

### 6. 更新文档（仅管理员）

- **URL**: `/api/docs/:docId`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Request**:

```
{
  "title": "string",
  "content": "string",
  "isPublic": "boolean"
}
```

- **Response** (成功):

```
{
  "code": 200,
  "data": {
    "updatedAt": "新时间戳",
    "version": "文档版本号"
  }
}
```

### 7. 删除文档（仅管理员）

- **URL**: `/api/docs/:docId`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (成功):

```
{
  "code": 204,
  "message": "Document deleted"
}
```

------

## 用户管理接口

### 8. 获取当前用户信息

- **URL**: `/api/users/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:

```
{
  "code": 200,
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string",
    "createdAt": "ISO8601时间戳",
    "docCount": 42 // 文档数量
  }
}
```

### 9. 文档搜索 (可选高级功能)

- **URL**: `/api/docs/search?q=keyword&field=title`

- **Method**: `GET`

- 

  Query Params

  :

  - `q`: 搜索关键词
  - `field`: 搜索字段 (title/content/all)

- **Response**:

```
{
  "code": 200,
  "data": [
    {
      "id": "string",
      "title": "带高亮的标题",
      "snippet": "内容摘要..."
    }
  ]
}
```

------

## 错误处理规范

所有错误返回格式：

```
{
  "code": "错误状态码",
  "error": "ERROR_TYPE",
  "message": "人类可读的错误描述"
}
```

常见错误状态：

- `401 UNAUTHORIZED` - 未授权
- `403 FORBIDDEN` - 无操作权限
- `404 NOT_FOUND` - 资源不存在
- `422 VALIDATION_ERROR` - 参数校验失败
- `500 INTERNAL_SERVER_ERROR` - 服务器内部错误

------

## 安全要求

1. 所有敏感请求使用HTTPS
2. 密码存储使用bcrypt加密
3. JWT令牌有效期≤2小时
4. 关键操作（如删除）需要二次验证
5. 接口频率限制：登录接口≤5次/分钟

## 版本管理

- API版本通过URL前缀标识：`/api/v1/...`
- 重大变更需升级版本号

## 扩展建议

1. 添加文档版本历史功能
2. 实现文档协作编辑（使用WebSocket）
3. 增加第三方登录（Google/Github）
4. 支持文件附件上传