# jinja2

Jinja2 是一个 Python 的功能齐全的模板引擎。它有完整的 unicode 支持，一个可选 的集成沙箱执行环境，被广泛使用，以 BSD 许可证授权。



- [官方](https://palletsprojects.com/p/jinja/)
- [官方文档](https://jinja.palletsprojects.com/)
- [github](https://github.com/pallets/jinja)
- [中文文档](http://docs.jinkan.org/docs/jinja2/)

##  安装

```bash
easy_install Jinja2
# or
pip install Jinja2
# or
yum -y install python-jinja2
```



## 简单使用

```python
from jinja2 import Template

template = Template('Hello {{ name }}!')
template.render(name='John Doe')
# 'Hello John Doe!'

# 使用文件
import os
from jinja2 import FileSystemLoader, Environment
current_path = os.path.dirname(os.path.abspath(__file__))
template_path = os.path.join(current_path, 'templates')
template_file = 'report.html'

TemplateLoader = FileSystemLoader(searchpath=template_path)
TemplateEnv = Environment(loader=TemplateLoader)
template = TemplateEnv.get_template(template_file)
html = template.render(data=check_result)
```



## 模板语法

模板仅仅是文本文件。它可以生成任何基于文本的格式（HTML、XML、CSV、LaTex 等等）。 它并没有特定的扩展名， .html 或 .xml 都是可以的。



## 表达式

**字面量**

- 'Hello World' / "Hello World" : 双引号或单引号中间的一切都是字符串。
- 42 :  整数。
- 42.23 : 有小数点，就是浮点数。
- ['list', 'of', 'objects']： 一对中括号括起来的东西是一个列表。
- (‘tuple’, ‘of’, ‘values’)： 元组， 不能被修改
- {‘dict’: ‘of’, ‘key’: ‘and’, ‘value’: ‘pairs’} :  字典，键必须是唯一的。
- true / false ： 布尔值

**算术**

- `+` 把两个对象加到一起。通常对象是素质，但是如果两者是字符串或列表，你可以用这 种方式来衔接它们。无论如何这不是首选的连接字符串的方式！连接字符串见 `~` 运算符。 `{{ 1 + 1 }}` 等于 `2` 。
- `-`  用第一个数减去第二个数。 `{{ 3 - 2 }}` 等于 `1` 。

- `/` 对两个数做除法。返回值会是一个浮点数。 `{{ 1 / 2 }}` 等于 `{{ 0.5 }}` 。

- `// `对两个数做除法，返回整数商。 `{{ 20 // 7 }}` 等于 `2` 。

- `% `计算整数除法的余数。 `{{ 11 % 7 }}` 等于 `4` 。
- `* `用右边的数乘左边的操作数。 `{{ 2 * 2 }}` 会返回 `4` 。也可以用于重 复一个字符串多次。 `{{ ‘=’ * 80 }}` 会打印 80 个等号的横条。
- `** `取左操作数的右操作数次幂。 `{{ 2**3 }}` 会返回 `8` 。

**比较**

- `==` 比较两个对象是否相等。
- `!=` 比较两个对象是否不等。

- `>` 如果左边大于右边，返回 true 。
- `>=` 如果左边大于等于右边，返回 true 。

- `<` 如果左边小于右边，返回 true 。
- `<=` 如果左边小于等于右边，返回 true 。

**逻辑**

对于 if 语句，在 for 过滤或 if 表达式中，它可以用于联合多个表达式:

- `and` 如果左操作数和右操作数同为真，返回 true 。
- `or` 如果左操作数和右操作数有一个为真，返回 true 。
- `not` 对一个表达式取反（见下）。
- `(expr)` 表达式组。

提示

`is` 和 `in` 运算符同样支持使用中缀记法: `foo is not bar` 和 `foo not in bar` 而不是 `not foois bar` 和 `not foo in bar` 。所有的 其它表达式需要前缀记法 `not (foo and bar)` 。

**其它运算符**

下面的运算符非常有用，但不适用于其它的两个分类:

- `in` 运行序列/映射包含检查。如果左操作数包含于右操作数，返回 true 。比如 `{{ 1 in[1,2,3] }}` 会返回 true 。
- `is` 运行一个 [*测试*](#测试) 。
- `|` 应用一个 [*过滤器*](#过滤器) 。

- `~` 把所有的操作数转换为字符串，并且连接它们。 `{{ "Hello " ~ name ~ "!" }}` 会返回（假设 name 值为 `''John'` ） `Hello John!` 。
- `()` 调用一个可调用量:`{{ post.render() }}` 。在圆括号中，你可以像在 python 中一样使用位置参数和关键字参数: `{{ post.render(user, full=true) }}` 。
- `.` / `[]` 获取一个对象的属性。



### 变量

```jinja2
{{ foo }}
{{ foo.bar }}
{{ foo['bar'] }}
```



### 过滤器

过滤器与变量用管道符号（ | ）分割

```jinja2
 {{ name | striptags | title }} 
```

**内置过滤器 ** 

> 对于内建 filter 的别名, 可以在 jinja2 的 filters.py 文件中查找

- abs(number):  返回一个值的绝对值

- attr(obj, name):  获取对象的属性

- batch(value, lincount, fill_with = None): 接 受的 value 是一个序列对象, linecount 表明个数, 最后生成一个列表, 列表个数为 linecount, 如果提供的 value 长度小于 linecount, 不足的使用 fill_with 填充

   ```jinja2
   <table>
   {%- for row in items|batch(3, '&nbsp;') %}
     <tr>
     {%- for column in row %}
       <td>{{ column }}</td>
     {%- endfor %}
     </tr>
   {%- endfor %}
   </table>
   ```

- capitalize(string): 接受一个字符串, 将其转换为首字母大写, 其他字母小写的形式返回

- center(value, width = 80): 接受一个字符串, 将其至于 80 的长度中居中, 不足的字符使用空格填充

- default(value, default_value ='', boolean = False): 返回 value 指定的变量的值, 如果 value 是 Undefined 那么返回 default_value 指定的值, boolean 意义未知

   ```jinja2
   {{ my_variable|default('my_variable is not defined') }}
   {{ ''|default('the string was empty', true) }}
   ```

-  dictsort(*value*, *case_sensitive=False*, *by='key'*, *reverse=False*) : value 为要遍历的字典, case_sensitive 指示是否立即加载, 设置为 False 表示延时加载, by 表示以什么排序, 可以通过设置 by = 'value'来以值排序.

   ```jinja2
   {% for item in mydict|dictsort %}
       sort the dict by key, case insensitive
   
   {% for item in mydict|dictsort(reverse=true) %}
       sort the dict by key, case insensitive, reverse order
   
   {% for item in mydict|dictsort(true) %}
       sort the dict by key, case sensitive
   
   {% for item in mydict|dictsort(false, 'value') %}
       sort the dict by value, case insensitive
   ```

- escape(string): 返回一个转码的安全 HTML

- filesizeformat (*value*, *binary=False*): 接受一个数值, 返回人易读的文件大小表示.

- first(sequence): 返回序列的第一个元素

- float(value, default = 0.0): 将接受到的 value 转换成 float 类型, 如果转换失败返回指定的 default 值

- forceescape(value): 强制进行 HTML 转码, 也就是说不检查要转码的字符串是否是标记为安全的,这样可能会发生二次转码

- format (*value*, \*args, \*\**kwargs*) : 类似于字符串格式化'%d %s'这样的功能 value 是格式定义

   ```jinja2
   {{ "%s - %s"|format("Hello?", "Foo!") }}
       -> Hello? - Foo!
   ```

- groupby(value, attribute): 按照指定的共有属性将集合进行分组, 返回元组组成的列表, 元组中第一个元素是用来分组的属性的值, 第二个元素是分组得到的所有原集合元素的列表.

   ```jinja2
   <ul>
   {% for group in persons|groupby('gender') %}
       <li>{{ group.grouper }}<ul>
       {% for person in group.list %}
           <li>{{ person.first_name }} {{ person.last_name }}</li>
       {% endfor %}</ul></li>
   {% endfor %}
   </ul>
   ```

- indent (*s*, *width=4*, *first=False*, *blank=False*, *indentfirst=None*) : 将接受到的 string, 每行缩进 width 指定的字符数, indentfirst 用来指定首行是否缩进.

- int (*value*, *default=0*, *base=10*) : 将接受到的 value 转换成 int 型, 如果转换失败, 返回 default 指定的值

- join (*value*, *d=''*, *attribute=None*) : 接受一个序列类型的对象, 向序列中进行插空 d 指定的字符串返回一个字符串

   ```jinja2
   {{ [1, 2, 3]|join('|') }}
       -> 1|2|3
   
   {{ [1, 2, 3]|join }}
       -> 123
       
   {{ users|join(', ', attribute='username') }}
   ```

- last(seq): 返回指定序列的最后一个元素

- length(obj, /): 返回序列或者字典的项数

- list(value): 将接受到的 value 转换成一个 list

- lower(string): 将接受到的字符串转换成小写形式.

- map(\*args, \*\*kwargs):  对对象序列应用筛选器或查找属性。

   ```jinja2
   {{ users|map(attribute='username')|join(', ') }}
   
   {{ titles|map('lower')|join(', ') }}
   ```

- max(value, case_sensitive=False, attribute=None): 从序列中返回最大的项。

   ```jinja2
   {{ [1, 2, 3]|max }}
       -> 3
   ```

- min(value, case_sensitive=False, attribute=None): 从序列中返回最小的项。

   ```jinja2
   {{ [1, 2, 3]|min }}
       -> 1
   ```

- pprint(value, verbose = False): 漂亮的打印一个变量的值, 多用于调试, verbose 表示是否显示冗长的信息

- random(seq): 接受一个序列对象, 随机返回其中的一个元素

- replace(string, old, new, count = None): 接受一个字符串, 将其中的 old 表示的子串替换成 new 指定的子串, 从左到右替换 count 次, 如果 count 不指定, 则替换一次

- reject(\*args, \*\*kwargs): 通过对每个对象应用一个测试来过滤对象序列，并在测试成功时拒绝对象。 

   ```jinja2
   {{ numbers|reject("odd") }}
   {{ list | reject("equalto", []) }}
   ```

- rejectattr(\*args, \*\*kwargs): 通过对每个对象的指定属性应用测试，并在测试成功后拒绝对象，筛选对象序列。

   ```jinja2
   {{ users|rejectattr("is_active") }}
   {{ users|rejectattr("email", "none") }}
   ```

- replace(s, old, new, count=None): 返回该值的副本，将所有出现的子字符串替换为新字符串。第一个参数是应该替换的子字符串，第二个参数是替换字符串。如果提供了可选的第三个参数count，则只替换第一个出现的count 

   ```jinja2
    {{ "Hello World"|replace("Hello", "Goodbye") }}
   ```

- reverse(value): 接受一个可迭代对象, 返回逆序的迭代器

- round(value, precision = 0, method = 'common'): 舍 去运算, 接受一个值, precision 表示精度(小数点后保留几位), method 可以取值 common | ceil | floor, 分别 表示四舍五入 | 进位 | 舍去 

  ```jinja2
  {{ 42.55|round }}
  ```

- safe(value): 标记传入的 value 值是安全的, 使用 escape 转码时不会发生二次转码

- select(\*args, \*\*kwargs):  通过对每个对象应用测试来过滤对象序列，并且只选择测试成功的对象。
   ```jinja2
    {{ numbers|select("odd") }}
    {{ numbers|select("odd") }}
    {{ numbers|select("divisibleby", 3) }}
    {{ numbers|select("lessthan", 42) }}
    {{ strings|select("equalto", "mystring") }}
   ```
   
- selectattr(\*args, \*\*kwargs): 通过对每个对象的指定属性应用测试来过滤对象序列，并且只选择测试成功的对象。

   ```jinja2
   {{ users|selectattr("is_active") }}
   {{ users|selectattr("email", "none") }}
   ```

- slice(value, slices, fill_width = None): 切片, 接受一个可迭代对象, 返回 slices 指定的前 n 个元素, 不足 n 个使用 fill_width 指定的对象进行填充

   ```jinja2
   <div class="columwrapper">
     {%- for column in items|slice(3) %}
       <ul class="column-{{ loop.index }}">
       {%- for item in column %}
         <li>{{ item }}</li>
       {%- endfor %}
       </ul>
     {%- endfor %}
   </div>
   ```

- sort (*value*, *reverse=False*, *case_sensitive=False*, *attribute=None*) : 接受一个序列对象, 进行排序, reverse 指定是否逆序

   ```jinja2
   {% for item in iterable|sort %}
       ...
   {% endfor %}
   
   {% for item in iterable|sort(attribute='date') %}
       ...
   {% endfor %}
   ```

- string(obj): 接受一个对象, 转换成一个 string 字符串

- striptags(values): 接受一个字符串, 剥离 SGML/XML 标签, 并且将多个空白字符转换成单空格

- sum (*iterable*, *attribute=None*, *start=0*) : 接受一个序列对象, 返回序列对象的元素和 start 的总和, 如果指定的序列对象是空的, 就返回 start 指定的值

   ```jinja2
   {{ items|sum(attribute='price') }}
   ```

- title(string): 将接受到的字符串转换成标题模式, 即每个单词的首字母大写

- tojson(*value*, *indent=None*):  将结构转储为JSON.

- trim(value): 去掉字符串开始和末尾多余的空白字符

- truncate (*s*, *length=255*, *killwords=False*, *end='...'*, *leeway=None*): 切 断接受到的字符串, 截取前 length 个字符, 如果字符串比 length 长, 切断后追加 end 指定的字符串, 如果 killwords = True 可以返回, 如果 killwords = False 不会有任何输出, 不明白.

   ```jinja2
   {{ "foo bar baz qux"|truncate(9) }}
       -> "foo..."
   {{ "foo bar baz qux"|truncate(9, True) }}
       -> "foo ba..."
   {{ "foo bar baz qux"|truncate(11) }}
       -> "foo bar baz qux"
   {{ "foo bar baz qux"|truncate(11, False, '...', 0) }}
       -> "foo bar..."
   ```

- unique(*value*, *case_sensitive=False*, *attribute=None*):  返回给定迭代表中唯一项的列表。也就是去重。

   ```jinja2
   {{ ['foo', 'bar', 'foobar', 'FooBar']|unique }}
       -> ['foo', 'bar', 'foobar']
   ```

- upper(string): 把接收到的字符串转成大写

- urlencode(*value*):  用于url中的转义字符串(使用UTF-8编码)。 

- urlize (*value*, *trim_url_limit=None*, *nofollow=False*, *target=None*, *rel=None*) : 接 受一个 url, 转换成一个<a>标签表示的 link, 这个 link 的 href 为传入的 url, innerText 是 url 截取前 trim_url_limit 个字符, nofollow 设置为 true 时, 会为这个 link 加入一个属性 rel='nofollow'

   ```jinja2
   {{ mytext|urlize(40, true) }}
       links are shortened to 40 chars and defined with rel="nofollow"
   {{ mytext|urlize(40, target='_blank') }}
   ```

- wordcount(string): 计算 string 中的单词数

- wordwrap (*s*, *width=79*, *break_long_words=True*, *wrapstring=None*) : 返回经过包装的 width 指定宽度的字符, 也就是说每读取 width 个字符就会换行., break_long_words 表明在获取到 width 个字 符之后, 如果一个单词还没有结束, 是否截断单词, False 将不会截断

- xmlattr(d, autospace = True): 通过接受一个字典, 创建一个 SGML/XML 属性列表

   ```jinja2
   <ul{{ {'class': 'my_list', 'missing': none,
           'id': 'list-%d'|format(variable)}|xmlattr }}>
   ...
   </ul>
   ```

   

## 测试

```jinja2
{% if loop.index is divisibleby 3 %}
{% if loop.index is divisibleby(3) %}

{% if variable is defined %}
    value of variable: {{ variable }}
{% else %}
    variable is not defined
{% endif %}
```

**内建测试**

- callable(object , */* ): 测试一个对象是否是可调用对象

- defined(value): 测试传入的对象是否已经定义了

  ```jinja2
  {% if variable is defined %}
      value of variable: {{ variable }}
  {% else %}
      variable is not defined
  {% endif %}
  ```

- divisibleby(value, num)测试传入的数值是否可以被 num 整除

- eq(a, b, /) 等同于 a == b

- escaped(value): 检查传入的对象是否被转码了

- even(value): 如果传入的对象是 even 的返回 True, 不懂 even 是什么样的对象

- ge(a, b, /) 等同于 a >= b

- gt(a, b, /) 等同于 a > b

- in(value, seq) 检查值是否在seq中

- iterable(value): 检查对象是否是可迭代的

- le(a, b, /) 等同于 a <= b

- lower(value): 检查传入的字符串是否都是小写

- lt(a, b, /) 等同于 a < b

- mapping(*value*)  如果对象是映射(dict等)，则返回true。

- ne(a, b, /) 等同于 a != b

- none(value): 检查对象是否是空对象 None

- number(value): 检查对象是否是一个数字

- odd(value): 检查传入的数字是否是奇数

- sameas(value, other): 检查传入的对象和 other 指定的对象是否在内存中的同一块地址(同一个对象)

  ```jinja2
  {% if foo.attribute is sameas false %}
      the foo attribute really is the `False` singleton
  {% endif %}
  ```

- sequence(value): 检查对象是否是序列, 序列同样是可迭代对象

- string(value): 检查对象是否是 string

- undefined(value): 检查一个对象是否未定义

- upper(value): 检查一个字符串是否全部大写



## 注释

```jinja2
## 注释

{# note: disabled template because we no longer use this
    {% for user in users %}
        ...
    {% endfor %}
#}
```



## 空白控制

```jinja2
## 开始或结束放置一个减号（ - ），可以移除块前或块后的空白
{% for item in seq -%}
    {{ item }}
{%- endfor %}

{%- if foo -%}...{% endif %}
```



## 转义

```jinja2
## 使用变量表达式
{{ '{{' }}


## 使用raw
{% raw %}
    <ul>
    {% for item in seq %}
        <li>{{ item }}</li>
    {% endfor %}
    </ul>
{% endraw %}

## html 转义
{{ user.username | e }}

# autoescape
{% autoescape true %}
    Autoescaping is active within this block
{% endautoescape %}

{% autoescape false %}
    Autoescaping is inactive within this block
{% endautoescape %}

```



## 行语句

```jinja2
## 行语句前缀配置为 #
# for item in seq
    <li>{{ item }}</li>
# endfor

# for href, caption in [('index.html', 'Index'),
                        ('about.html', 'About')]:
    <li><a href="{{ href }}">{{ caption }}</a></li>
# endfor
```



## 模板继承

```jinja2
## base.html
{% block head %}
    <link rel="stylesheet" href="style.css" />
    <title>{% block title %}{% endblock %} - My Webpage</title>
{% endblock %}


## child.html
{% extends "base.html" %}
{% block title %}Index{% endblock %}
{% block head %}
    {{ super() }}
    <style type="text/css">
        .important { color: #336699; }
    </style>
{% endblock %}


## 调用 super 来渲染父级块的内容。这会返回父级块的结果
{% block sidebar %}
    <h3>Table Of Contents</h3>
    ...
    {{ super() }}
{% endblock %}

## 命名块结束标签
{% block sidebar %}
    {% block inner_sidebar %}
        ...
    {% endblock inner_sidebar %}
{% endblock sidebar %}

## 显式地指定在块中可用的变量
{% for item in seq %}
    <li>{% block loop_item scoped %}{{ item }}{% endblock %}</li>
{% endfor %}
```



## 控制结构

**For**

```jinja2
## list
<ul>
{% for user in users %}
  <li>{{ user.username|e }}</li>
{% endfor %}
</ul>

## dict
<dl>
{% for key, value in my_dict.iteritems() %}
    <dt>{{ key|e }}</dt>
    <dd>{{ value|e }}</dd>
{% endfor %}
</dl>

## continue
{% for user in users %}
    {%- if loop.index is even %}{% continue %}{% endif %}
    ...
{% endfor %}

## break
{% for user in users %}
    {%- if loop.index >= 10 %}{% break %}{% endif %}
{%- endfor %}

## else
<ul>
{% for user in users %}
    <li>{{ user.username|e }}</li>
{% else %}
    <li><em>no users found</em></li>
{% endfor %}
</ul>

## 递归
<ul class="sitemap">
{%- for item in sitemap recursive %}
    <li><a href="{{ item.href|e }}">{{ item.title }}</a>
    {%- if item.children -%}
        <ul class="submenu">{{ loop(item.children) }}</ul>
    {%- endif %}</li>
{%- endfor %}
</ul>

## 辅助函数
{% for row in rows %}
    <li class="{{ loop.cycle('odd', 'even') }}">{{ row }}</li>
{% endfor %}
```

for循环的特殊变量

| 变量               | 描述                                               |
| :----------------- | :------------------------------------------------- |
| loop.index         | 当前循环迭代的次数（从 1 开始）                    |
| loop.index0        | 当前循环迭代的次数（从 0 开始）                    |
| loop.revindex      | 到循环结束需要迭代的次数（从 1 开始）              |
| loop.revindex0     | 到循环结束需要迭代的次数（从 0 开始）              |
| loop.first         | 如果是第一次迭代，为 True 。                       |
| loop.last          | 如果是最后一次迭代，为 True 。                     |
| loop.length        | 序列中的项目数。                                   |
| loop.cycle         | 在一串序列间期取值的辅助函数                       |
| loop.depth         | 指示当前渲染在递归循环中的深度。 从1开始           |
| loop.depth0        | 指示当前渲染在递归循环中的深度。 从0开始           |
| loop.previtem      | 循环的上一个迭代中的项目。 在第一次迭代中未定义。  |
| loop.nextitem      | 循环的以下迭代中的项目。 在上一次迭代期间未定义。  |
| loop.changed(*val) | 如果以前使用其他值调用（或根本未调用），则为true。 |

**IF**

```jinja2
{% if users %}
<ul>
{% for user in users %}
    <li>{{ user.username|e }}</li>
{% endfor %}
</ul>
{% endif %}


{% if kenny.sick %}
    Kenny is sick.
{% elif kenny.dead %}
    You killed Kenny!  You bastard!!!
{% else %}
    Kenny looks okay --- so far
{% endif %}

## 表达式
{{ '[%s]' % page.title if page.title }}
```

## 宏

```jinja2
## 定义宏
{% macro input(name, value='', type='text', size=20) -%}
    <input type="{{ type }}" name="{{ name }}" value="{{
        value|e }}" size="{{ size }}">
{%- endmacro %}

## 使用
<p>{{ input('username') }}</p>
<p>{{ input('password', type='password') }}</p>

## call
{% macro render_dialog(title, class='dialog') -%}
    <div class="{{ class }}">
        <h2>{{ title }}</h2>
        <div class="contents">
            {{ caller() }}
        </div>
    </div>
{%- endmacro %}

{% call render_dialog('Hello World') %}
    This is a simple dialog rendered by using a macro and
    a call block.
{% endcall %}

## 导入
{% import 'forms.html' as forms %}
<dl>
    <dt>Username</dt>
    <dd>{{ forms.input('username') }}</dd>
    <dt>Password</dt>
    <dd>{{ forms.input('password', type='password') }}</dd>
</dl>

# 导入并设置别名
{% from 'forms.html' import input as input_field, textarea %}
<dl>
    <dt>Username</dt>
    <dd>{{ input_field('username') }}</dd>
    <dt>Password</dt>
    <dd>{{ input_field('password', type='password') }}</dd>
</dl>
<p>{{ textarea('comment') }}</p>

# 导入时包含上下文
{% from 'forms.html' import input with context %}
```

## 赋值

```jinja2
{% set navigation = [('index.html', 'Index'), ('about.html', 'About')] %}
{% set key, value = call_something() %}

{% set navigation %}
    <li><a href="/">Index</a>
    <li><a href="/downloads">Downloads</a>
{% endset %}
```



## python 方法

可以使用一些python方法，例如下面的title是字符串

```jinja2
{{ page.title.capitalize() }}
```

## 全局函数

- `range([*start*], *stop*[, *step*])` 返回一个包含整等差级数的列表。

  ```jinja2
  <ul>
  {% for user in users %}
      <li>{{ user.username }}</li>
  {% endfor %}
  {% for number in range(10 - users|count) %}
      <li class="empty"><span>...</span></li>
  {% endfor %}
  </ul>
  ```

- `lipsum(*n=5*, *html=True*, *min=20*, *max=100*)` 在模板中生成 lorem ipsum 乱数假文

- `dict(***items*)` 方便的字典字面量替代品。 {'foo' : 'bar'} 与 dict(foo=bar) 等价。

- `*class* cycler(**items*)`  周期计允许你在若干个值中循环，类似 loop.cycle 的工作方式。

  ```jinja2
  {% set row_class = cycler('odd', 'even') %}
  <ul class="browser">
  {% for folder in folders %}
    <li class="folder {{ row_class.next() }}">{{ folder|e }}</li>
  {% endfor %}
  {% for filename in files %}
    <li class="file {{ row_class.next() }}">{{ filename|e }}</li>
  {% endfor %}
  </ul>
  ```

  - `reset()` 重置周期计到第一个项。

  - `next()` 返回当前项并跳转到下一个。

  - `current` 返回当前项。

- *class* `joiner`(*sep='*, *'*)  一个小巧的辅助函数用于“连接”多个节。

  ```jinja2
  {% set pipe = joiner("|") %}
  {% if categories %} {{ pipe() }}
      Categories: {{ categories|join(", ") }}
  {% endif %}
  {% if author %} {{ pipe() }}
      Author: {{ author() }}
  {% endif %}
  {% if can_edit %} {{ pipe() }}
      <a href="?action=edit">Edit</a>
  {% endif %}
  ```

- `*class* `namespace`(*...*)` 创建一个新的容器

  ```jinja2
  {% set ns = namespace(found=false) %}
  {% for item in items %}
      {% if item.check_something() %}
          {% set ns.found = true %}
      {% endif %}
      * {{ item.title }}
  {% endfor %}
  Found item having something: {{ ns.found }}
  ```

  

## with 语句

```jinja2
## 创建一个新的内作用域。这个作用域中的变量在外部是不可见的。
{% with %}
    {% set foo = 42 %}
    {{ foo }}           foo is 42 here
{% endwith %}
foo is not visible here any longer

{% with a={} %}
    {% set b = a.attribute %}
{% endwith %}
```
