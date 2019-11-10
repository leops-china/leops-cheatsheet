# jinja2

## 基本

- 数学运算 +, -, \*, /, \*\*, //, %等数学运算符都支持.
- 逻辑运算 and, or, not 也同样支持
- in 判断元素是否在集合中
- | 管道操作符, 默认使用 Apply 调用一个方法
- ~ 字符串连接
- () 调用可调用对象
- . 和 [ ]获取属性
- 三元操作: value1 if expression else value2 支持



## 内建 filter: 

> 对于内建 filter 的别名, 可以在 jinja2 的 filters.py 文件中查找

- abs(number) 返回一个值的绝对值
- batch(value, lincount, fill_with = None): 接 受的 value 是一个序列对象, linecount 表明个数, 最后生成一个列表, 列表个数为 linecount, 如果提供的 value 长度小于 linecount, 不足的使用 fill_with 填充
- capitalize(string): 接受一个字符串, 将其转换为首字母大写, 其他字母小写的形式返回
- center(value, width = 80): 接受一个字符串, 将其至于 80 的长度中居中, 不足的字符使用空格填充
- default(value, default_value = u””, boolean = False): 返回 value 指定的变量的值, 如果 value 是 Undefined 那么返回 default_value 指定的值, boolean 意义未知
- dictsort(value, case_sensitive = False, by = 'key'): value 为要遍历的字典, case_sensitive 指示是否立即加载, 设置为 False 表示延时加载, by 表示以什么排序, 可以通过设置 by = 'value'来以值排序.
- escape(string): 返回一个转码的安全 HTML
- filesizeformat(value): 接受一个数值, 返回人易读的文件大小表示.
- first(sequence): 返回序列的第一个元素
- float(value, default = 0.0): 将接受到的 value 转换成 float 类型, 如果转换失败返回指定的 default 值
- forceescape(value): 强制进行 HTML 转码, 也就是说不检查要转码的字符串是否是标记为安全的,这样可能会发生二次转码
- format(value, \*attribute): 类似于字符串格式化'%d %s'这样的功能 value 是格式定义, attribute 不定参数接受占位符代表的值.
- groupby(value, attribute): 按照指定的共有属性将集合进行分组, 返回元组组成的列表, 元组中第一个元素是用来分组的属性的值, 第二个元素是分组得到的所有原集合元素的列表.
- indent(string, width = 4, indentfirst = False): 将接受到的 string, 每行缩进 width 指定的字符数, indentfirst 用来指定首行是否缩进.
- int(value, default = 0): 将接受到的 value 转换成 int 型, 如果转换失败, 返回 default 指定的值
- join(value, d = u””): 接受一个序列类型的对象, 向序列中进行插空 d 指定的字符串返回一个字符串
- last(seq): 返回指定序列的最后一个元素
- length(obj): 返回序列或者字典的项数
- list(value): 将接受到的 value 转换成一个 list
- lower(string): 将接受到的字符串转换成小写形式.
- pprint(value, verbose = False): 漂亮的打印一个变量的值, 多用于调试, verbose 表示是否显示冗长的信息
- random(seq): 接受一个序列对象, 随机返回其中的一个元素
- replace(string, old, new, count = None): 接受一个字符串, 将其中的 old 表示的子串替换成 new 指定的子串, 从左到右替换 count 次, 如果 count 不指定, 则替换一次
- reverse(value): 接受一个可迭代对象, 返回逆序的迭代器
- round(value, precision = 0, method = 'common'): 舍 去运算, 接受一个值, precision 表示精度(小数点后保留几位), method 可以取值 common | ceil | floor, 分别 表示四舍五入 | 进位 | 舍去
- safe(value): 标记传入的 value 值是安全的, 使用 escape 转码时不会发生二次转码
- slice(value, slices, fill_width = None): 切片, 接受一个可迭代对象, 返回 slices 指定的前 n 个元素, 不足 n 个使用 fill_width 指定的对象进行填充
- sort(value, reverse = False): 接受一个序列对象, 进行排序, reverse 指定是否逆序
- string(obj): 接受一个对象, 转换成一个 string 字符串
- striptags(values): 接受一个字符串, 剥离 SGML/XML 标签, 并且将多个空白字符转换成单空格
- sum(sequence, start = 0): 接受一个序列对象, 返回序列对象的元素和 start 的总和, 如果指定的序列对象是空的, 就返回 start 指定的值
- title(string): 将接受到的字符串转换成标题模式, 即每个单词的首字母大写
- trim(value): 去掉字符串开始和末尾多余的空白字符
- truncate(string, length = 255, killwords = False, end = “…”): 切 断接受到的字符串, 截取前 length 个字符, 如果字符串比 length 长, 切断后追加 end 指定的字符串, 如果 killwords = True 可以返回, 如果 killwords = False 不会有任何输出, 不明白.
- upper(string) 把接受到的字符串转成大写
- urlize(value, trim_url_limit = None, nofollow = False): 接 受一个 url, 转换成一个<a>标签表示的 link, 这个 link 的 href 为传入的 url, innerText 是 url 截取前 trim_url_limit 个字符, nofollow 设置为 true 时, 会为这个 link 加入一个属性 rel='nofollow'
- wordcount(string): 计算 string 中的单词数
- wordwrap(string, width = 79, break_long_words = True): 返 回经过包装的 width 指定宽度的字符, 也就是说每读取 width 个字符就会换行. , break_long_words 表明在获取到 width 个字 符之后, 如果一个单词还没有结束, 是否截断单词, False 将不会截断
- xmlattr(d, autospace = True): 通过接受一个字典, 创建一个 SGML/XML 属性列表

## 内建测试

- callable(object): 测试一个对象是否是可调用对象
- defined(value): 测试传入的对象是否已经定义了
- divisibleby(value, num)测试传入的数值是否可以被 num 整除
- escaped(value): 检查传入的对象是否被转码了
- even(value): 如果传入的对象是 even 的返回 True, 不懂 even 是什么样的对象
- iterable(value): 检查对象是否是可迭代的
- lower(value): 检查传入的字符串是否都是小写
- none(value): 检查对象是否是空对象 None
- number(value): 检查对象是否是一个数字
- odd(value): 检查传入的数字是否是奇数
- sameas(value, other): 检查传入的对象和 other 指定的对象是否在内存中的同一块地址(同一个对象)
- sequence(value): 检查对象是否是序列, 序列同样是可迭代对象
- string(value): 检查对象是否是 string
- undefined(value): 检查一个对象是否未定义
- upper(value): 检查一个字符串是否全部大写

## 全局函数:

range([start, ]stop[, step]):

```
{% for i in range(10) %}
{{ i }}
{% endfor %}
```

lipsum(n = 5, html = True, min = 20, max = 100): 不知道用途

dict(\*\*items) 根据传入的关键字参数构造一个字典对象.

for

循环打印一个序列，例如：

```
{% for user in users %}
<li>{{ user.username|e }}</li>
{% endfor %}
</ul>
```
在循环内部，你可以访问一些特殊的变量

Variable Description
- loop.index 当 前迭代的索引，从 1 开始算
- loop.index0 当前迭代的索引，从 0 开始算
- loop.revindex 相 对于序列末尾的索引，从 1 开始算
- loop.revindex0 相对于序列末尾的索引，从 0 开始算
- loop.first 相 当于 loop.index == 1.
- loop.last 相当于 loop.index == len(seq) - 1
- loop.length 序列的长度.
- loop.cycle 是 一个帮助性质的函数，可以接受两个字符串参数，如果当前循环索引是偶数，则显示第一个字符串，是奇数则显示第二个字符串。它常被在表格中用来用不同的背景 色区分相邻的行。
- 设置变量值 {% set variable_name = value %}

## 宏

```
{% macro last_tweets(count=20) %}
<div class=twitter>
{% for tweet in models.twitter.get_last_tweets(count) %}
<p><a href="{{ tweet.url|e }}">{{ tweet.username|e }}</a>:
{{ tweet.parsed_text }}
{% endfor %}
</div>
{% endmacro %}
```