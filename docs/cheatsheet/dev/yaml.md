# yaml

- [官网](https://yaml.org/spec/1.2/spec.html)
- [PyYAML](https://pyyaml.org/)


## 语法规则

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
- `#`表示注释，从这个字符一直到行尾，都会被解析器忽略。

## 数据结构

- 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
- 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
- 纯量（scalars）：单个的、不可再分的值


## 对象
```yaml
# 对象的一组键值对，使用冒号结构表示。
key1: val1

joe:
  key1: val1
  key2: val2
  key3: val3


Yaml 也允许另一种写法，将所有键值对写成一个行内对象。
joe: {key1: val1, key2: val2, key3: val3}
```

## 纯量

```
# 布尔类型 Y, true, Yes, ON 
Boolean_type_1: yes

# 布尔类型 n, FALSE, No, off
Boolean_type_2: n

# null值
null_type_2: null
null_type_3: ~

# int类型
number_type_1: 123

# float类型
number_type_2: 1.23

# 字符串
string_type_2: 'hello'
string_type_3: "hello"

# 日期类型
date: 2020-02-28

#ISO8601格式的时间.
iso8601: 2001-12-14t21:59:43.10-05:00  

# 强制类型转换
date_as_string: !str 2020-02-28   # 日期类型
```

## 数组

```yaml
# 一组连词线开头的行，构成一个数组。
- 1
- 2
- 'a string'

bar:
  - 1
  - 2
  - 'a string'

# 行内表示法
bar: [1, 2, 'a string']
```
## 复合结构

```yaml
# 对象和数组可以结合使用，形成复合结构。

children:
  - name: Jimmy Smith
    age: 15
  - name: Jenny Smith
    age: 12
```


## 多行字符串

```yaml
# 没有换行符
content:
  hello
  world

# 有换行符
Multiline: |
  hello
  world

# 以换行符分隔，字符串结尾会有2个换行符
plain: |+
 This unquoted scalar
 spans many lines.

# 以换行符分隔，字符串结尾没有换行符
plain: |-
 This unquoted scalar
 spans many lines.

# 以空格分隔，字符串结尾有一个换行符
folded_newlines: >
 this is really a
 single line of text
 despite appearances
```


## 复杂映射

```yaml
? - Detroit Tigers
  - Chicago cubs
:
  - 2001-07-23

? [ New York Yankees,
    Atlanta Braves ]
: [ 2001-07-02, 2001-08-12,
    2001-08-14 ]

```
结果
```json
{
"[\"Detroit Tigers\", \"Chicago cubs\"]": ["2001-07-23"],
"[\"New York Yankees\", \"Atlanta Braves\"]": [
   "2001-07-02",
   "2001-08-12",
   "2001-08-14"
 ]
}
```

## 多个文档

```yaml
# YAML
---
document: this is doc 1
---
document: this is doc 2
...
```


## 引用

```yaml
# 锚点&和别名*，可以用来引用。<<表示合并到当前数据,下面的key会覆盖引用的key。

defaults: &defaults
  adapter:  postgres
  host:     localhost
  database: db
development:
  <<: *defaults
  database: myapp_development
test:
  <<: *defaults
  database: myapp_test
```

## 指示符

### Collection 

- `?` Key indicator
- `:` Value indicator
- `-` Nested series entry indicator
- `,` Separate in-line branch entries
- `[]` Surround in-line series branch
- `{}` Surround in-line keyed branch


### Scalar
- `''` Surround in-line unescaped scalar ('' escaped ')
- `"` Surround in-line escaped scalar (see escape codes below)
- `|` Block scalar indicator
- `>` Folded scalar indicator
- `-` Strip chomp modifier (|- or >-)
- `+` Keep chomp modifier (|+ or >+)
- `1-9` Explicit indentation modifier (|1 or >2)  Modifiers can be combined (|2-, >+1)

### 别名 

- `&` 锚属性
- `*` 别名

### Tag

- `none` Unspecified tag (automatically resolved by application)
- `!` Non-specific tag (by default, !!map/!!seq/!!str)
- `!foo` Primary (by convention, means a local !foo tag)
- `!!foo` Secondary (by convention, means tag:yaml.org,2002:foo)
- `!h!foo` Requires %TAG !h! <prefix> (and then means <prefix>foo)
- `!<foo>`  Verbatim tag (always means foo)

### 文档 

- `%` Directive indicator
- `---` 文档头部
- `...` 文档结尾

### Misc Indicators

- `#` Throwaway comment indicator

- ``@` Both reserved for future use

### Special Keys

- `=` Default "value" mapping key

- `<<` 合并另一个映射中的keys


### Core Types (default automatic tags)
- `!!map` { Hash table, dictionary, mapping }
- `!!seq` { List, array, tuple, vector, sequence }
- `!!str` Unicode string

###  More Types

- `!!set` { cherries, plums, apples }
- `!!omap` [ one: 1, two: 2 ]

###  Language Independent Scalar Types

- `{ ~, null }`  Null (no value)
- `[ 1234, 0x4D2, 02333 ]` [ Decimal int, Hexadecimal int, Octal int ]
- `[ 1_230.15, 12.3015e+02 ]` [ Fixed float, Exponential float ]
- `[ .inf, -.Inf, .NAN ]` [ Infinity (float), Negative, Not a number ]
- `{ Y, true, Yes, ON }` Boolean true
- `{ n, FALSE, No, off }` Boolean false
- `? !!binary >`  R0lG...BADS=
- `>-` Base 64 binary value

###  Escape Codes

Numeric

- `"\x12"`       : 8-bit
- `"\u1234"`     : 16-bit
- `"\U00102030"` : 32-bit

Protective

- `"\\"`     : '\'
- `"\""`     : '"'
- `"\ "`     : ' '
- `"\<TAB>"` : TAB

C

- `"\0"`: NUL
- `"\a"`: BEL
- `"\b"`: BS
- `"\f"`: FF
- `"\n"`: LF
- `"\r"`: CR
- `"\t"`: TAB
- `"\v"`: VTAB

Additional

"\e": ESC
"\_": NBSP
"\N": NEL
"\L": LS
"\P": PS

