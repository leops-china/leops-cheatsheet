> 提示：本文档以`python2.7`版本为例

## 正则表达式基础

### 简单介绍

正则表达式并不是 Python 的一部分。正则表达式是用于处理字符串的强大工具，拥有自己独特的语法以及一个独立的处理引擎，效率上可能不如 str 自带的方法，但功能十分强大。得益于这一点，在提供了正则表达式的语言里，正则表达式的语法都是一样的，区别只在于不同的编程语言实现支持的语法数量不同；但不用担心，不被支持的语法通常是不常用的部分。如果已经在其他语言里使用过正则表达式，只需要简单看一看就可以上手了。

下图展示了使用正则表达式进行匹配的流程：

![reg](/assets/images/python/reg.png)

正则表达式的大致匹配过程是：依次拿出表达式和文本中的字符比较，如果每一个字符都能匹配，则匹配成功；一旦有匹配不成功的字符则匹配失败。如果表达式中有量词或边界，这个过程会稍微有一些不同，但也是很好理解的，看下图中的示例以及自己多使用几次就能明白。

下图列出了 Python 支持的正则表达式元字符和语法：

![reg](/assets/images/python/reg02.png)

### 数量词的贪婪模式与非贪婪模式

正则表达式通常用于在文本中查找匹配的字符串。Python 里数量词默认是贪婪的（在少数语言里也可能是默认非贪婪），总是尝试匹配尽可能多的字符；非贪婪的则相反，总是尝试匹配尽可能少的字符。例如：正则表达式"`ab*`",如果用于查找"abbbc"，将找到"abbb"。而如果使用非贪婪的数量词"`ab*?`"，将找到"a"。

### 反斜杠的困扰

与大多数编程语言相同，正则表达式里使用"`\`"作为转义字符，这就可能造成反斜杠困扰。假如你需要匹配文本中的字符"\"，那么使用编程语言表示的正则表达式里将需要 4 个反斜杠"`\\\\`"：前两个和后两个分别用于在编程语言里转义成反斜杠，转换成两个反斜杠后再在正则表达式里转义成一个反斜杠。Python 里的原生字符串很好地解决了这个问题，这个例子中的正则表达式可以使用`r"\\"`表示。同样，匹配一个数字的"\\d"可以写成 r"\d"。有了原生字符串，你再也不用担心是不是漏写了反斜杠，写出来的表达式也更直观。

### 匹配模式

正则表达式提供了一些可用的匹配模式，比如忽略大小写、多行匹配等，这部分内容将在`Pattern`类的工厂方法`re.compile(pattern[, flags])`中一起介绍。

## re 模块

Python 通过 re 模块提供对正则表达式的支持。使用 re 的一般步骤是先将正则表达式的字符串形式编译为 Pattern 实例，然后使用 Pattern 实例处理文本并获得匹配结果（一个 Match 实例），最后使用 Match 实例获得信息，进行其他的操作。

```python
# encoding: UTF-8
import re

# 将正则表达式编译成Pattern对象
pattern = re.compile(r'hello')

# 使用Pattern匹配文本，获得匹配结果，无法匹配时将返回None
match = pattern.match('hello world!')

if match:
	# 使用Match获得分组信息
	print match.group()

## 输出 ##
# hello
```

`re.compile(strPattern[, flag]):`

这个方法是 Pattern 类的工厂方法，用于将字符串形式的正则表达式编译为 Pattern 对象。 第二个参数 flag 是匹配模式，取值可以使用按位或运算符'|'表示同时生效，比如 re.I | re.M。另外，你也可以在 regex 字符串中指定模式，比如 re.compile('pattern', re.I | re.M)与 re.compile('(?im)pattern')是等价的。
可选值有：

- re.I(re.IGNORECASE): 忽略大小写（括号内是完整写法，下同）
- re.M(MULTILINE): 多行模式，改变'^'和'\$'的行为（参见上图）
- re.S(DOTALL): 点任意匹配模式，改变'.'的行为
- re.L(LOCALE): 使预定字符类 \w \W \b \B \s \S 取决于当前区域设定
- re.U(UNICODE): 使预定字符类 \w \W \b \B \s \S \d \D 取决于 unicode 定义的字符属性
- re.X(VERBOSE): 详细模式。这个模式下正则表达式可以是多行，忽略空白字符，并可以加入注释。以下两个正则表达式是等价的：

```python
a = re.compile(r"""\d +  # the integral part
                   \.    # the decimal point
                   \d *  # some fractional digits""", re.X)
b = re.compile(r"\d+\.\d*")
```

re 提供了众多模块方法用于完成正则表达式的功能。这些方法可以使用 Pattern 实例的相应方法替代，唯一的好处是少写一行 re.compile()代码，但同时也无法复用编译后的 Pattern 对象。这些方法将在 Pattern 类的实例方法部分一起介绍。如上面这个例子可以简写为：

```python
m = re.match(r'hello', 'hello world!')
print m.group()
```

re 模块还提供了一个方法 escape(string)，用于将 string 中的正则表达式元字符如\*/+/?等之前加上转义符再返回，在需要大量匹配元字符时有那么一点用。

## Match

Match 对象是一次匹配的结果，包含了很多关于此次匹配的信息，可以使用 Match 提供的可读属性或方法来获取这些信息。

属性：

1. string: 匹配时使用的文本。
1. re: 匹配时使用的 Pattern 对象。
1. pos: 文本中正则表达式开始搜索的索引。值与 Pattern.match()和 Pattern.seach()方法的同名参数相同。
1. endpos: 文本中正则表达式结束搜索的索引。值与 Pattern.match()和 Pattern.seach()方法的同名参数相同。
1. lastindex: 最后一个被捕获的分组在文本中的索引。如果没有被捕获的分组，将为 None。
1. lastgroup: 最后一个被捕获的分组的别名。如果这个分组没有别名或者没有被捕获的分组，将为 None。

方法：

1. group([group1, …]): 获得一个或多个分组截获的字符串；指定多个参数时将以元组形式返回。group1 可以使用编号也可以使用别名；编号 0 代表整个匹配的子串；不填写参数时，返回 group(0)；没有截获字符串的组返回 None；截获了多次的组返回最后一次截获的子串。
1. groups([default]): 以元组形式返回全部分组截获的字符串。相当于调用 group(1,2,…last)。default 表示没有截获字符串的组以这个值替代，默认为 None。
1. groupdict([default]): 返回以有别名的组的别名为键、以该组截获的子串为值的字典，没有别名的组不包含在内。default 含义同上。
1. start([group]): 返回指定的组截获的子串在 string 中的起始索引（子串第一个字符的索引）。group 默认值为 0。
1. end([group]): 返回指定的组截获的子串在 string 中的结束索引（子串最后一个字符的索引+1）。group 默认值为 0。
1. span([group]): 返回(start(group), end(group))。
1. expand(template): 将匹配到的分组代入 template 中然后返回。template 中可以使用\id 或\g<id>、\g<name>引用分组，但不能使用编号 0。\id 与\g<id>是等价的；但\10 将被认为是第 10 个分组，如果你想表达\1 之后是字符'0'，只能使用\g<1>0。

```python
>>> import re
>>> m = re.match(r'(\w+) (\w+)(?P<sign>.*)', 'hello world!')
>>> print "m.string:", m.string
m.string: hello world!
>>> print "m.re:", m.re
m.re: <_sre.SRE_Pattern object at 0x13ea420>
>>> print "m.pos:", m.pos
m.pos: 0
>>> print "m.endpos:", m.endpos
m.endpos: 12
>>> print "m.lastindex:", m.lastindex
m.lastindex: 3
>>> print "m.lastgroup:", m.lastgroup
m.lastgroup: sign


>>> print "m.group(1,2):", m.group(1, 2)
m.group(1,2): ('hello', 'world')
>>> print "m.groups():", m.groups()
m.groups(): ('hello', 'world', '!')
>>> print "m.groupdict():", m.groupdict()
m.groupdict(): {'sign': '!'}
>>> print "m.start(2):", m.start(2)
m.start(2): 6
>>> print "m.end(2):", m.end(2)
m.end(2): 11
>>> print "m.span(2):", m.span(2)
m.span(2): (6, 11)
>>> print r"m.expand(r'\2 \1\3'):", m.expand(r'\2 \1\3')
m.expand(r'\2 \1\3'): world hello!

```

## Pattern

Pattern 对象是一个编译好的正则表达式，通过 Pattern 提供的一系列方法可以对文本进行匹配查找。

Pattern 不能直接实例化，必须使用 re.compile()进行构造。

Pattern 提供了几个可读属性用于获取表达式的相关信息：

1. pattern: 编译时用的表达式字符串。
1. flags: 编译时用的匹配模式。数字形式。
1. groups: 表达式中分组的数量。
1. groupindex: 以表达式中有别名的组的别名为键、以该组对应的编号为值的字典，没有别名的组不包含在内。

```python
>>> import re
>>> p = re.compile(r'(\w+) (\w+)(?P<sign>.*)', re.DOTALL)

>>> print "p.pattern:", p.pattern
p.pattern: (\w+) (\w+)(?P<sign>.*)
>>> print "p.flags:", p.flags
p.flags: 16
>>> print "p.groups:", p.groups
p.groups: 3
>>> print "p.groupindex:", p.groupindex
p.groupindex: {'sign': 3}
```

实例方法`[ | re模块方法]`：

1.  `match(string[, pos[, endpos]])` \| `re.match(pattern, string[, flags])`:

    这个方法将从 string 的 pos 下标处起尝试匹配 pattern；如果 pattern 结束时仍可匹配，则返回一个 Match 对象；如果匹配过程中 pattern 无法匹配，或者匹配未结束就已到达 endpos，则返回 None。

    pos 和 endpos 的默认值分别为 0 和 len(string)；re.match()无法指定这两个参数，参数 flags 用于编译 pattern 时指定匹配模式。

    注意：这个方法并不是完全匹配。当 pattern 结束时若 string 还有剩余字符，仍然视为成功。想要完全匹配，可以在表达式末尾加上边界匹配符'\$'。

1.  `search(string[, pos[, endpos]])` \| `re.search(pattern, string[, flags])`:

    这个方法用于查找字符串中可以匹配成功的子串。从 string 的 pos 下标处起尝试匹配 pattern，如果 pattern 结束时仍可匹配，则返回一个 Match 对象；若无法匹配，则将 pos 加 1 后重新尝试匹配；直到 pos=endpos 时仍无法匹配则返回 None。

    pos 和 endpos 的默认值分别为 0 和 len(string))；re.search()无法指定这两个参数，参数 flags 用于编译 pattern 时指定匹配模式。

        # encoding: UTF-8
        import re

        # 将正则表达式编译成Pattern对象
        pattern = re.compile(r'world')

        # 使用search()查找匹配的子串，不存在能匹配的子串时将返回None
        # 这个例子中使用match()无法成功匹配
        match = pattern.search('hello world!')

        if match:
        	# 使用Match获得分组信息
        	print match.group()

        ## 输出 ##
        # world

1.  `split(string[, maxsplit])` \| `re.split(pattern, string[, maxsplit])`:

    按照能够匹配的子串将 string 分割后返回列表。maxsplit 用于指定最大分割次数，不指定将全部分割。

        import re

        p = re.compile(r'\d+')
        print p.split('one1two2three3four4')

        ## output ##
        # ['one', 'two', 'three', 'four', '']

1) `findall(string[, pos[, endpos]])` \| `re.findall(pattern, string[, flags])`:

   搜索 string，以列表形式返回全部能匹配的子串。


    	import re

    	p = re.compile(r'\d+')
    	print p.findall('one1two2three3four4')

    	## output ##
    	# ['1', '2', '3', '4']

1. `finditer(string[, pos[, endpos]])` \| `re.finditer(pattern, string[, flags])`:

   搜索 string，返回一个顺序访问每一个匹配结果（Match 对象）的迭代器。


    	import re

    	p = re.compile(r'\d+')
    	for m in p.finditer('one1two2three3four4'):
    		print m.group(),

    	## output ##
    	# 1 2 3 4

1. `sub(repl, string[, count])` \| `re.sub(pattern, repl, string[, count])`:

   使用 repl 替换 string 中每一个匹配的子串后返回替换后的字符串。

   当 repl 是一个字符串时，可以使用\id 或\g<id>、\g<name>引用分组，但不能使用编号 0。

   当 repl 是一个方法时，这个方法应当只接受一个参数（Match 对象），并返回一个字符串用于替换（返回的字符串中不能再引用分组）。

   count 用于指定最多替换次数，不指定时全部替换。


    	import re

    	p = re.compile(r'(\w+) (\w+)')
    	s = 'i say, hello world!'

    	print p.sub(r'\2 \1', s)

    	def func(m):
    		return m.group(1).title() + ' ' + m.group(2).title()

    	print p.sub(func, s)

    	## output ##
    	# say i, world hello!
    	# I Say, Hello World!

7. `subn(repl, string[, count])` \| `re.sub(pattern, repl, string[, count])`:

   返回 (sub(repl, string[, count]), 替换次数)。


    	import re

    	p = re.compile(r'(\w+) (\w+)')
    	s = 'i say, hello world!'

    	print p.subn(r'\2 \1', s)

    	def func(m):
    		return m.group(1).title() + ' ' + m.group(2).title()
    	 
    	print p.subn(func, s)

    	## output ##
    	# ('say i, world hello!', 2)
    	# ('I Say, Hello World!', 2)
