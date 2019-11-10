> 提示：本文档以`python2.7`版本为例

## 内建函数 (在\_\_buildin\_\_模块)

- float(object): 转换为浮点数
- int(object,base=10): 转换为整数，带小数时向下取整运算. 字符串时指定 base 可指定传入字符的进制,默认 10.
- long(object): 转换为长整形数
- str(object): 转换为字符串(1000L->1000)
- repr(object): 返回值为适合机读的字符串形式(1000L->1000L)
- ord(‘char’): 将某单字符转成字母顺序值（单字符包括\n 等）
- chr(num): 将字母顺序值转为某单字符（0~255）
- unichr(num): 将字母顺序值转为某 unicode 单字符（0~65535）
- bin(num): 将整数转为'0b1011'形式 2 进制字符串
- unicode(var,codec): 将变量按 codec 转为 unicode 型(前面加了个 u)=str.decode(codec)
- abs(number): 返回绝对值
- cmath.sqrt(number): 可带虚数均方根
- math.ceil(number): 返回数的上入整数，返回值为浮点数
- math.floor(number): 返回数的下舍整数，返回值为浮点数
- math.sqrt(number): 计算平方根，需为实数，返回浮点数
- pow(x, y[, z]): 返回 x 的 y 次幂，（所得结果对 z 取模），类型数相关
- round(number[, ndigits]): 根据给定精度进行四舍五入,返回 float
- complex(real, img): 创建出复数，返回复数。
- input(prompt): 获取用户输入，须合法的 python 表达式：”字符”
- raw_input(prompt): 获取用户输入，返回字符串
- help([object]): 交互式帮助
- id(obj): 返回对象的 id
- cmp(x, y): 比较 xy 的值大小，相同 0 前大 1 后大-1。
- len(seq): 返回序列的长度（元素个数）,或者字典的项数 int。
- list(seq): 序列（字符串）转换为列表。
- tuple(seq): 把序列转为元组（包括列表、元组、字符串均可）
- bool(‘any’): 将任意转成布尔型，除了 False 的特殊值，其余均真。一般不需显式说明
- max(args): 返回序列或参数集合中最大值,多于一个序列时，比较第一个，迭代。
- min(args): 返回序列或参数集合中最小值,多于一个序列时，比较第一个，迭代。
- sum(sqe[,start]): 求序列之和。start 参数为起始值，用于复合使用。
- reversed(seq): 序列反向迭代
- sorted(seq): 返回 A 已排序的列表，不改变 A 的顺序。
- string.Template(’a’): 模板字符串，结合\$x 和 A.substitute(x=’a’)使用
- string.capwords(‘str’): 词首字母大写，较好，返回字符串
- string.maketrans(‘ab’,’cd’): 将 256 位字符表中 a 和 b 相应换成 c 和 d，返回字符串.用于 translate 方法。
- range([x,]y[,z]): 产生整形列表,x 起 y 终 z 步长,默认 x=0,z=1.常用在 for 语句中.切记 y 终点在列表外
- xrange([x,]y[,z]): 类似于 range 但是更简洁,用于迭代用
- zip(seqA,SeqB….): 多个序列(包括元组字符串)的项组成一个元组并返回列表,最短序列决定列表长(舍去).
- filter(func,list): 对 list 元素都执行 func,如返回 True 则保留,否则被过滤掉.
- map(func,list): 对 list 元素都执行 func,并返回对应的 list
- reduce(func,seq[,init]): init 默认第一项,把该项和后一项传递给 func,返回的结果再和下一项扔给 func,直到结束
- enumerate(iter): 对可迭代对象所有项迭代索引,项目对。如用于编号迭代。返回迭代对象
- eval(exp[,global[,local]]): 会计算表达式 exp 的值,并返回结果.eval(raw_input(…))等于 input(..).可用两个命名空间。
- set(seq): 返回([...])的集合,无重复元素的.seq 可为字符串,元组,列表.
- type(var): 返回变量类型,type('a')==str 返回 True
- vars(): 返回当前局部变量
- locals() 它返回的字典对所有局部变量的名称与值进行映射
- callable(obj): 检查对象是否可调用,可调用返回 True
- help(module[.func]): 查看模组帮助,
- lambda x: 含 x 表达: 就是对 x 进行表达式中的运作,返回函数对象 lambda.用法 a=lambda x:x\*2+3 执行 a(5).
- dir([obj]): 列出 obj 的所含标识符(函数,类,变量,模块),不加参数针对当前模块
- isinstance(var, type): 可以比较两个参数项类型是否相同.如 isinstance("abcd",str).type 部分还可以用元组的形式指定多种类型.isinstance 和 type 比较差异参看[ref](http://segmentfault.com/q/1010000000127305),主要是 isinstance 可以对继承的类也进行相等判断,type 不行.

## 复数方法

- C.real: 实数部分
- C.imag: 虚数部分

## 列表方法

- A.append（对象）: 列表末追加新对象（一次一个，对象可为列表）
- A.count(obj): 统计列表某元素出现次数
- A.extend(B): 在列表 A 后追加另一序列 B 的值,B 可以是任意 iterable 对象
- A.index(obj[,start,stop]): 索引,返回第一个匹配 obj 的元素在列表中索引号 n（第 n+1 个）.start 和 stop 可以限制搜索区间.找不到会报 ValueError.
- A.insert(index,obj): 插入，在索引号处插入对象。
- A.pop(index): 移除索引号的元素,返回该元素的值。()时移除最后一个,出栈.唯一修改列表还能返回值。
- A.sort(): 排序，默认按升序。可添加参数 cmp、key、reverse。cmp 可以自定义的函数,返回负数时, 按此时顺序排序，详见脚本例子
- A.remove(obj): 移除列表内某个指定元素，不返回任何值。找不到会报 ValueError.
- A.reverse(): 反向列表 A，不返回值。

## 元组方法

- T.count(obj): 统计元组某元素出现次数
- T.index(obj[,start,stop]): 索引,返回第一个匹配 obj 的元素在元组中索引号 n（第 n+1 个）.start 和 stop 可以限制搜索区间.找不到会报 ValueError.

## 字典方法

- dict.clear(): 清空字典所有的项，无返回值 None。
- dict.copy(): 浅复制副本，用于赋值,深复制用 copy.deepcopy
- dict.fromkeys(seq[,val]): 从 seq 内读入键，建立并返回一个新的字典，值通为 val 或者 None（默认）
- dict.get(key[,noneval]): 读取并返回字典某 key 的值,若不存在该键返回 None 或指定值,好处在于不存在不报错。
- dict.setdefault(key[,val]): 和 get 类似，读取并返回键值。差别在于，若不存在，则新建该键及键值。
- dict.update(dictB): 用 dictB 的项更新 dict，相当于复制。若有相同键则覆盖。
- dict.has_key('key'): 检查是否字典中含有该键值，和 in 用法一样，返回真假。
- dict.items(): 将字典所有项以列表方式返回,每个项以元组方式,但返回时没有特殊顺序
- dict.iteritems(): 和 items 功能一样，但是返回迭代器对象,可用 list()将函数读出
- dict.keys(): 返回字典中的键的列表
- dict.iterkeys(): 返回字典中的键的列表的迭代器对象
- dict.values(): 返回字典中值的列表
- dict.itervalues(): 返回字典中值的列表的迭代器对象
- dict.pop(key): 读出某键的值,并从字典中删除该项，栈操作。
- dict.popitem(): 随机读出字典中一个项以元组返回,并从字典中删除。

## 集合方法

- s.update(t) 用 t 中的元素修改 s,s 现在包含 s 或 t 的成员 `s |= t`
- s.intersection_update(t) s 中的成员是共用属于 s 和 t 的元素 `s &= t`
- s.difference_update(t) s 中的成员是属于 s 但不包含在 t 中的元素 `s -= t`
- s.symmetric_difference_update(t) s 中的成员更新为那些包含在 s 或 t 中,但不是 s 和 t 共有的元素 `s ^= t`
- s.add(obj) 在集合 s 中添加对象 obj
- s.remove(obj) 从集合 s 中删除对象 obj;如果 obj 不是集合 s 中的元素(obj not in s),将引发 KeyError 错误
- s.discard(obj) 如果 obj 是集合 s 中的元素,从集合 s 中删除对象 obj
- s.pop() 删除集合 s 中的任意一个对象,并返回它
- s.clear() 删除集合 s 中的所有元素
- s.issubset(t) 如果 s 是 t 的子集,则返回 True `s <= t`
- s.issuperset(t) 如果 t 是 s 的超集,则返回 True `s >= t`
- s.union(t) 合并操作;返回一个新集合,该集合是 s 和 t 的并集 `s | t`
- s.intersection(t) 交集操作;返回一个新集合,该集合是 s 和 t 的交集 `s & t`
- s.difference(t) 返回一个新集合,改集合是 s 的成员,但不是 t 的成员 `s - t`
- s.symmetric_difference(t) 返回一个新集合,该集合是 s 或 t 的成员,但不是 s 和 t 共有的成员 `s ^ t`
- s.copy() 返回一个新集合,它是集合 s 的浅复制
- obj in s 成员测试;obj 是 s 中的元素 返回 True
- obj not in s 非成员测试:obj 不是 s 中元素 返回 True
- s == t 等价测试 是否具有相同元素
- s != t 不等价测试
- s < t 子集测试;s!=t 且 s 中所有元素都是 t 的成员
- s > t 超集测试;s!=t 且 t 中所有元素都是 s 的成员

## 字符串方法

因为字符串是不可序列, 所以大部分方法并不能改变字符串的值，而只起到返回作用.

- str.decode(codec): 根据 codec 将字符串解码成 unicode,等于 unicode 函数
- str.encode(codec): 根据 codec 将 unicode 字符串编码为 codec 的内容
- str.find(a,x,y): str 中查找字符串 a,xy 为查找始末(不含 y)不输入 xy 默认头到尾.返回索引号,没有返回-1
- str.rfind(a,x,y): str 中查找最后一个字符串 a,xy 为始末,返回最后一个的索引号，没有返回-1
- str.index(a,x,y): 和 find 功能基本一致，区别在查找不到返回错误
- str.rindex(a,x,y): 和 rfind 功能基本一致，区别在查找不到返回错误
- str.count(a,x,y): str 中查找 a,xy 始末,返回 a 出现次数
- str.startwith(a,x,y): str 中检查 xy 范围内是否以字符串 a 起始，返回 TrueFalse
- str.endwith(a,x,y): str 中检查 xy 范围内是否以字符串 a 终结，返回 TrueFalse
- str.join(Seq): 序列 Seq 各字符元素用 str 连接起来.要在始末加连接符要加空元素’’.返回连接的字符串
- str.lower(): str 小写化，返回小写字符串
- str.islower(): 检查 str 是否小写，返回真假
- str.capitalize(): str 句首首字母大写，返回字符串
- str.swapcase(): str 字母交换大小写，返回字符串
- str.title(): str 词首大写，包括's，the 等。返回字符串
- str.istitle(): 检查 str 是否词首大写，返回真假
- str.upper(): str 大写化，返回大写字符串
- str.isupper(): 检查 str 是否大写，返回真假
- str.replace(a,b,[x]): 替换,将 a 变成 b。x 为参数限定最大替换数，不输为全替换。返回字符
- str.expandtabs([x]): 将 Tab 产生的长度替换为 x 个空格，不指明 x 为默认 tab 长度。返回字符串
- str.split([spe[,x]]): 将分隔符 spe(不输入默认空格换行制表符等)从字符串中去除,x 为最大去除数。返回列表
- str.splitlines([keepends]): 将多行分裂开成列表，可选保留换行符不。
- str.strip('a'): 将 str 两端的符合条件'a'的都删除,返回字符串.不输默认空格 tab 换行,或者某些单字符
- str.lstrip('a'): 同 strip，不过只删左边 end 部分
- str.rstrip('a'): 同 strip，不过只删右边开头部分
- str.translate(table[,'char']): 按字母表（用 maketrans 函数产生）单字符地替换 str，删掉'char'，返回字符串
- str.zfill(x): 填充字符串使其变成长度 x 的字符串，不足从左填入 0
- str.center(x[,'a']): 变成长度 x 字符串,str 归中处理(若基数右侧多 1).指明 a 的话即用 a 填充,否则空格
- str.ljust(x[,'a']): 变成长度 x 字符串,str 左对齐处理.指明 a 的话即用 a 填充,否则空格
- str.rjust(x[,'a']): 变成长度 x 字符串,str 右对齐处理.指明 a 的话即用 a 填充,否则空格
- str.isalnum(): 检查 str 是否数字或字母，返回是否。
- str.isalpha(): 检查 str 是否字母，返回是否。
- str.isdigit(): 检查 str 是否数字，返回是否。
- str.isspace(): 检查 str 是否空格，返回是否。
- str.partition('sep'): 从左搜索 str 的分隔符 sep，并返回(head,sep,tail)即分隔开后的元组
- str.rpartition('sep'): 从右搜索 str 的分隔符 sep，并返回(head,sep,tail)即分隔开后的元组

## 文件方法和属性 help(file)

- open('filepath','mode'[,bufsize]) 同 file,但可以打开文件对象。'r''w''a''b''+'分别为读,写,追加,二进制方法,和读/写,后两种可以和前面合用。
- file('filepath','mode'[,bufsize]) 建立文件对象,bufsize 为缓存区大小,一般不设.mode 默认'r'读。'U'模式支持各种换行符.
- f.read([size]) 读取文件,记得有定位的,读完就改变定位.size 指明为读取字节数,不指明全部读取.返回字符串
- f.readline([size]) 读取一行,读完改变定位,size 指明为读取字节数(非行数),不指名读取一行(常用)。返回字符串.读行是从当前位至\n 为止。
- f.readlines([size]) 不设置 size 读取所有行,以每行为序列的一个元素返回全文的序列。
- f.write(str) 把字符串(必须是字符串)写入到文件中.注意,和定位符有关.不会帮你换行,手动加入制表符.若对已存在文件操作则覆盖
- f.writelines(seq) 把序列的各个 str 串连起来全部写入到文件中。
- f.close() 关闭文件，否则驻留内存。常用 try..finally 的后者来保证关闭。
- \#readfile('filepath') 读取文件内容并返回内容，参数为路径。
- \#addfile('filepath','str') 追加 str 到 p 文件的末尾，返回 None。
- f.name 返回 file 的 filepath+name
- f.closed 返回 file 是否关闭真假
- f.mode 返回 file 读取模式
- f.encoding 文件所使用的编码
- f.newlines 未读取到行分隔符时为 None,只有一种行分隔符时为一个字符串,当文件有多种类型的行结束符时,则为一个包含所有当前所遇到的行结束符的列表
- f.softspace 为 0 表示在输出一数据后,要加上一个空格符,1 表示不加
- f.tell() 返回文件操作标记符所在处，换行符\n 占两位其余一位，从 0 开始。但\n 用 read 来读代表 1byte。
- f.next() 和 readline()类似，从当前处读到行末并返回，跳至下一行开头。注意，实际文件操作符其实已到文件末,tell()显示文件末尾,没法用 read()类再读取。
- f.seek(offset[,whence]) 文件操作符移动到 offset 步数的位置,正值正移负值负移,移动的起点 whence 为 0 时为文件头 1 为当前操作符位置 2 为文件末。不输入默认为从文件头开始。注意 a 模式下每次都会自动返回到文件末。
- f.truncate([size]) 裁剪，不可用于只读。输入大小，就是文件保留的大小。不标大小表示裁到文件操作符，若大于文件大小则补空格(win)
- f.isatty() 返回文件是否是一个终端设备文件（unix）
- f.fileno() 返回长整形的‘文件标签’
- f.flush() 把缓冲区内容写入硬盘
- for line in file1： 用迭代器逐行读取，注意此时不能再用 readline()之类读取，不怎么占内存的方式
