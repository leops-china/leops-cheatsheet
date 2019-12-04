# json

JSON 是一种由道格拉斯·克罗克福特构想和设计、轻量级的数据交换语言，该语言以易于让人阅读的文字为基础，用来传输由属性值或者序列性的值组成的数据对象。尽管 JSON 是 JavaScript 的一个子集，但 JSON 是独立于语言的文本格式，并且采用了类似于 C 语言家族的一些习惯。

- [官网](https://www.json.org/json-en.html)

## json 例子

```json
{
  "int": 1,
  "list": [
    { "first": "Anna", "last:": "Smith", "loc": 1 },
    { "first": "John", "last:": "Doe", "loc": 1 },
    { "first": "Sandra", "last:": "Jones", "loc": 2 }
  ],
  "dict": { "city": "New York", "type": "HQ", "key": 1 }
}
```

## 数据类型

### 数字

```json
{
  "int": 1,
  "float": 123.456
}
```

### 字符串

```json
{
  "empty_string": "",
  "string": "123.456"
}
```

### 布尔值

```json
{
  "bool_true": true,
  "bool_false": false
}
```

### null 值

```json
{
  "null": null
}
```

### 数组

```json
{
  "empty_array": [],
  "array": [1, 2, 3, "1", {}]
}
```

### 对象

```json
{
  "empty_object": {},
  "object": { "­key­1": "value", "­key­2": "value", "key3": 1, "key4": [] }
}
```

### undefined

`undefined` 是没有赋值的变量

## 转义

使用 `\` 转义字符

```json
{
  "double quotes": "\"",
  "backslash": "\\",
  "slash": "/",
  "backspace": "\b",
  "formfeed": "\f",
  "newlinw": "\n",
  "carriage return": "\r",
  "horizontal tab": "\t",
  "hexade­cimal": "\uXXXX"
}
```
