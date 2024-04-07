---
title: class-schedule
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.22"

---

# class-schedule

Base URLs:

# Authentication

# Default

## GET Courses

GET /courses

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|auth-token|header|string| no |none|

> Response Examples

> 200 Response

```json
[
  {
    "_id": "string",
    "name": "string",
    "instructor": {
      "_id": "string",
      "name": "string",
      "__v": 0
    },
    "department": {
      "_id": "string",
      "name": "string",
      "__v": 0
    },
    "__v": 0,
    "batch": {
      "_id": "string",
      "name": "string",
      "__v": 0
    }
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|true|none||none|
|» name|string|true|none||none|
|» instructor|object|true|none||none|
|»» _id|string|true|none||none|
|»» name|string|true|none||none|
|»» __v|integer|true|none||none|
|» department|object|true|none||none|
|»» _id|string|true|none||none|
|»» name|string|true|none||none|
|»» __v|integer|true|none||none|
|» __v|integer|true|none||none|
|» batch|object|false|none||none|
|»» _id|string|true|none||none|
|»» name|string|true|none||none|
|»» __v|integer|true|none||none|

## GET Department

GET /departments

> Response Examples

> 200 Response

```json
[
  {
    "_id": "string",
    "name": "string",
    "__v": 0
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|false|none||none|
|» name|string|false|none||none|
|» __v|integer|false|none||none|

## GET Batch

GET /batches

> Response Examples

> 200 Response

```json
[
  {
    "_id": "string",
    "name": "string",
    "__v": 0
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|false|none||none|
|» name|string|false|none||none|
|» __v|integer|false|none||none|

## GET instructor

GET /instructors

> Response Examples

> 200 Response

```json
[
  {
    "_id": "string",
    "name": "string",
    "__v": 0
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|false|none||none|
|» name|string|false|none||none|
|» __v|integer|false|none||none|

## POST Create Department

POST /departments/

> Body Parameters

```json
{
  "name": "CSE"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Content-Type|header|string| yes |none|
|body|body|object| no |none|
|» name|body|string| yes |none|

> Response Examples

> Success

```json
{
  "name": "Department Name",
  "_id": "66126118cf673624e2232a53",
  "__v": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Success|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» name|string|true|none||none|
|» _id|string|true|none||none|
|» __v|integer|true|none||none|

## PUT Update Department

PUT /departments/{departmenId}

> Body Parameters

```json
{
  "name": "WRE"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|departmenId|path|string| yes |none|
|Content-Type|header|string| yes |none|
|body|body|object| no |none|
|» name|body|string| yes |none|

> Response Examples

> Success

```json
{
  "_id": "66124a8c0102e745a98fc811",
  "name": "WRE",
  "__v": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|true|none||none|
|» name|string|true|none||none|
|» __v|integer|true|none||none|

# Data Schema

