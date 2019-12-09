# ini

INI( initialization ) 文件格式是一些计算平台或软件配置文件的非正式标准。INI 文件是简单的文本文件，其基本结构由节、属性和值组成

## 示例

file: `test.ini`

```ini
; comments
[section1]
Param1 = value1
Param2= value2
[section2]
Param3= value3
Param4= "value4"
[database]
server=192.168.0.1
port=3306
file="db.config"
novalue=
```

## 扩展名

- `.ini`
- `.cfg`
- `.conf`
- `.txt`

## 文件格式

### keys

每个键都有一个名称和一个值，用等号 `=` 分隔。

```ini
name=value
```

### Sections

section 名单独出现在一行上，在方括号 `[` 和 `]` 中。节声明之后的所有键都与该节相关联。

```ini
[section]
a=a
b=b
```

### 注释

行首的分号 `;` 表示一个注释。注释行被忽略。

```ini
; comment text
```

> 在有些软件中，可以使用 `#` 来表示注释

### 转义

使用反斜杠 `\` 来转义特殊字符

|   转义   |              描述               |
| :------: | :-----------------------------: |
|   `\\`   |           转义反斜杠            |
|   `\'`   |             单引号              |
|   `\"`   |             双引号              |
|   `\0`   |             空字符              |
|   `\a`   |            报警符号             |
|   `\b`   |              退格               |
|   `\t`   |             制表符              |
|   `\r`   |             回车符              |
|   `\n`   |             换行符              |
|   `\;`   |              分号               |
|   `\#`   |            数字符号             |
|   `\=`   |              等号               |
|   `\:`   |              冒号               |
| `\x????` | 对应十六进制码点的 Unicode 字符 |
