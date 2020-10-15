# bash - Cheat Sheet

- [Bash Hackers Wiki](https://wiki.bash-hackers.org/start)
- [Advanced Bash-Scripting Guide](http://www.tldp.org/LDP/abs/html/index.html)
- [Linux Shell Scripting Tutorial - A Beginner's handbook](http://www.freeos.com/guides/lsst/index.html)
- [Bash 新手指南](http://www.yeolar.com/media/doc/bgb-cn/html/index.html)
- [Shell 脚本编程 30 分钟入门](https://github.com/qinjx/30min_guides/blob/master/shell.md)
- [命令行的艺术](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
- [alrra/dotfiles](https://github.com/alrra/dotfiles)  这个 repo 的 shell 写的很棒
- [GNU Bash Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)
- [Bash 脚本教程](https://wangdoc.com/bash/index.html)

## 常用命令

```bash
# 查看进程子进程数：
find /proc/*/task -maxdepth 0 -type d |while read dir; do count=$(ls "$dir" | wc -l); echo "$dir : $count"; done
#　查看进程打开文件句柄数
find /proc/*/fd -maxdepth 1 -type d | while read dir; do count=$(find "$dir" | wc -l); echo "$dir : $count"; done
#　tcp 连接统计
ss -ant | awk 'NR>1 {++s[$1]} END {for(k in s) print k,s[k]}'
netstat -n |awk '/^tcp/{++S[$NF]}END{for(m in S) print m,S[m]}'
```

## 变量

```bash
varname="value"           # 定义变量
varname='value'           # 定义变量
var=                      # 空参数
readonly variable         # 只读变量
let foo=1+2               # 声明变量时，可以直接执行算术表达式。
local variable            # 定义内部变量
unset var                 # 取消变量
echo $varname             # 输出变量内容
export VARNAME=value      # 定义环境变量


# 内置变量
$0  # 脚本名称
$n  # 传给脚本/函数的第n个参数
$$  # 脚本的PID
$#  # 传递给脚本/函数的参数个数
$@  # 传递给脚本/函数的所有参数(识别每个参数)
$*  # 传递给脚本/函数的所有参数(把所有参数当成一个字符串)

$!  # 上一个被执行的命令的PID(后台运行的进程)
$?  # 上一个命令的退出状态(管道命令使用${PIPESTATUS})

$-  # 为当前 Shell 的启动参数。
$_  # 为上一个命令的最后一个参数。


declare -a                # 将变量作为数组处理
declare -f                # 仅使用函数名
declare -F                # 显示没有定义的函数名
declare -i                # 将变量作为整数处理
declare -l                # 声明变量为小写字母。
declare -p                # 查看变量信息。
declare -r                # 使变量成为只读
declare -u                # 声明变量为大写字母。
declare -x                # 标记通过环境导出的变量

$(command)                # 命令替换：运行命令并返回标准输出

IFS=":" read user pw uid gid name home shell <<< "$file_info"
```

## 参数扩展

```bash
echo {A,B}.js	    # A.js B.js
echo {1..5}         # 1 2 3 4 5

# 默认值
${parameter:-word}  # 如果parameter为null或者未设置，整个参数替换表达式值为word
${parameter:=word}　 # 如果parameter为null或者未设置，整个参数替换表达式值为word，并且parameter参数值设置为word
${parameter:?word} # 如果parameter为null或者未设置，则打印出错误信息。否则，整个参数替换表达式值为$parameter
${parameter:+word} # 如果parameter不为null或者未设置，则整个参数替换表达式值为word

# 长度
${#parameter}       # 获得字符串的长度。

# 替换
${parameter%word}   # 从尾开始扫描word，将匹配word正则表达式的字符过滤掉,%为最短匹配
${parameter%?}      # 去除最后一个字符
${parameter%\%}     # 去除最右边的%, 使用\z转义
${parameter%%word}   # 从尾开始扫描word，将匹配word正则表达式的字符过滤掉,%%为最长匹配
${parameter#word}    # 从头开始扫描word，将匹配word正则表达的字符过滤掉,#为最短匹配
${parameter##word}   # 从头开始扫描word，将匹配word正则表达的字符过滤掉,##为最长匹配
${parameter/pattern/string}   # 将parameter对应值的pattern字符串替换成为string字符串，/表示只替换一次
${parameter//pattern/string}  # 将parameter对应值的pattern字符串替换成为string字符串，//表示全部替换
${var#*/}                     # 表示从左边开始删除第一个 / 号及左边的所有字符
${var##*/}                    # 表示从左边开始删除最后（最右边）一个 / 号及左边的所有字符
${var%/*}                     # 表示从右边开始，删除第一个 / 号及右边的字符
${var%%/*}                    # 表示从右边开始，删除最后（最左边）一个 / 号及右边的字符

# 子字符串
${parameter:offset}         # 截取parameter的值的子字符串, 从offset到结束
${parameter:offset:length}  # 截取parameter的值的子字符串, 从offset开始截取n个
# bash 4.2之后才支持负数索引${a::-1},${a:0:-1}, 应该写成${a:0:$(( ${#a} -1))}

${!prefix*}   # 将带有前缀为prefix的参数名打印出来
${!prefix@}   # 将带有前缀为prefix的参数名打印出来

${!name[@]}   # 打印出来name数组有哪些下标
${!name[*]}   # 打印出来name数组有哪些下标

# 操作
STR="HELLO WORLD!"
echo ${STR,}   #=> "hELLO WORLD!" (小写第一个字母)
echo ${STR,,}  #=> "hello world!" (全部小写)

STR="hello world!"
echo ${STR^}   #=> "Hello world!" (大写第一个字母)
echo ${STR^^}  #=> "HELLO WORLD!" (全部大写)


# 注释
# Single line comment     # 单行注释
: '                       # 多行注释
This is a
multi line
comment
'
```

### ~扩展

```bash
##### 大括号扩展
# 序列表达式采取 {x..y[..incr]} 的形式，其中x和y是整数或单个的字符，incr是可选的增量，是一个整数。
echo a{d,c,b}e
mkdir /usr/local/src/bash/{old,new,dist,bugs}
chown root /usr/{ucb/{ex,edit},lib/{ex?.?*,how_ex}}



# ---- ~扩展
~  # $HOME的值
~/foo # $HOME/foo
~fred/foo # 用户fred的主目录的foo子目录
~+/foo  # $PWD/foo
~-/foo # ${OLDPWD-'~-'}/foo
~N # 将显示一个'dirs +N'命令的结果字符串
~+N # 将显示一个'dirs +N'命令的结果字符串
~-N # 将显示一个'dirs -N'命令的结果字符串
```

## 数组

```bash
arr_number=(1 2 3 4 5)         #数值类型的数组
arr_string=("abc" "edf" "sss") #字符串类型数组

${#arr_number[*]}   #获取数组长度
${#arr_number[@]}   #获取数组长度
${arr_number[2]}    #读取某个下标的值
arr_number[2]=100   #对某个下标赋值,如果指定的下标已经超过当前数组的大小,新赋的值被追加到数组的尾部

${arr_number[@]:1:4}  #分片访问
${arr_number[@]/2/98}　#模式替换

arr_numbe=(${arr_number[@]} 6)  # 追加
arr_numbe+=(6)                  # 追加
unset arr_number[1]             # 删除某个元素
arr_string=(${arr_string[@]/a*/})  #　删除正则表达式匹配到的元素
lines=(`cat "logfile"`)　　　　　　　# 从文件中读取
arr_number=("${arr_number[@]}" "${arr_number2[@]}") # 拼接

for v in ${arr_number[@]}; do  # 数组遍历
  echo $v;
done

let i=0
let j=${#arr_number[@]}-1
for (( i=0;i<j;i++,j-- ))
  do
    echo ${arr[i]}
done
```

##　字典

```bash
declare -A sounds  # 定义字典
array=([2]=valC [0]=valA [1]=valB)  # 定义字典

sounds[dog]="bark"    # 赋值
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"

echo ${sounds[dog]} # 输出key的value
echo ${sounds[@]}   # 输出所有value
echo ${!sounds[@]}  # 输出所有key
echo ${#sounds[@]}  # 输出多少元素
unset sounds[dog]   # 删除key元素


# 输出字典中的val
for val in "${sounds[@]}"; do
  echo $val
done

# 输出字典中的key
for key in "${!sounds[@]}"; do
  echo $key
done
```

## 算术运算

```bash
第一种：$[]
第二种：$(())
第三种`:  expr`
第四中：let


((i=$j+$k))     等价于   i=`expr $j + $k`
((i=$j-$k))     等价于   i=`expr $j -$k`
((i=$j*$k))     等价于   i=`expr $j \*$k`
((i=$j/$k))     等价于   i=`expr $j /$k`

+：加法
-：减法
*：乘法
/：除法（整除）
%：余数
**：指数
++：自增运算（前缀或后缀）
--：自减运算（前缀或后缀）

# 浮点数运算
echo "5.01-4*2.0"|bc

awk 'BEGIN{print 7.01*5-4.01 }'

printf %.10f\\n "$((10**9 * 20/7))e-9"

# 进制
echo $((10))          # 10进制
echo $((012))         # 8进制
echo $((0xff))        # 16进制
echo $((2#11111111))  # 2进制

## 位运算
echo $((16>>2))  # 位右移运算，把一个数字的所有位向右移动指定的位。 
echo $((16<<2))  # 位左移运算，把一个数字的所有位向左移动指定的位。
echo $((17&3))   # 位的“与”运算，对两个数字的所有位执行一个AND操作。
echo $((17|3))   # 位的“或”运算，对两个数字的所有位执行一个OR操作。
echo $((17~3))   # 位的“否”运算，对一个数字的所有位取反。
echo $((17!3))   # 逻辑“否”运算
echo $((17^3))   # 位的异或运算（exclusive or），对两个数字的所有位执行一个异或操作。

## 逻辑运算
echo $((3 > 2))
echo $(( (3 > 2) || (4 <= 1) ))
echo $((a<1 ? 1 : 0))

<：小于
>：大于
<=：小于或相等
>=：大于或相等
==：相等
!=：不相等
&&：逻辑与
||：逻辑或
expr1?expr2:expr3：三元条件运算符。若表达式expr1的计算结果为非零值（算术真），则执行表达式expr2，否则执行表达式expr3。


## 赋值运算
echo $((a=1))
echo $((foo*=2))

parameter = value：简单赋值。
parameter += value：等价于parameter = parameter + value。
parameter -= value：等价于parameter = parameter – value。
parameter *= value：等价于parameter = parameter * value。
parameter /= value：等价于parameter = parameter / value。
parameter %= value：等价于parameter = parameter % value。
parameter <<= value：等价于parameter = parameter << value。
parameter >>= value：等价于parameter = parameter >> value。
parameter &= value：等价于parameter = parameter & value。
parameter |= value：等价于parameter = parameter | value。
parameter ^= value：等价于parameter = parameter ^ value。

## 求值运算
echo $((foo = 1 + 2, 3 * 4))

```

## 输入输出重定向

```bash
cmd1|cmd2   # pipe;将cmd1的标准输出作为cmd2的标准输入
<file       # 从文件中获取标准输入
>file       # 将标准输出定向到文件
>>file      # 将标准输出定向到文件;如果文件已经存在，则附加到文件
>|file      # 强制标准输出到文件，即使设置了noclobber也是如此
n>|file     # 强制从文件描述符n输出到文件，即使设置了noclobber也是如此
<>file      # 使用file作为标准输入和标准输出
n<>file     # 使用file作为文件描述符n的输入和输出
n>file      # 将文件描述符n指向文件
n<file      # 从文件中获取文件描述符n
n>>file     # 将文件描述n指向文件;如果文件已经存在,则附加到文件
n>&         # 将标准输出复制到文件描述符n
n<&         # 复制文件描述符n的标准输入
n>&m        # 文件描述符n是输出文件描述符的副本
n<&m        # 文件描述符n是输入文件描述符的副本
&>file      # 将标准输出和标准错误指向文件
<&-         # 关闭标准输入
>&-         # 关闭标准输出
n>&-        # 关闭文件描述符n的输出
n<&-        # 关闭文件描述符n的输入

#　追加内容到文件
cat >> a.log <<EOF
123
EOF
```

> https://catonmat.net/bash-one-liners-explained-part-three

## 流程控制

```bash

# if
if condition;
then
  statements
[elif condition;
  then statements...]
[else
  statements]
fi

if test $USER = "foo"; then
  echo "Hello foo."
else
  echo "You are not foo."
fi

if true
then
  echo 'hello world'
fi

if true; then echo 'hello world'; fi

# test
# 写法一
test expression

# 写法二
[ expression ]

# 写法三
[[ expression ]]

# 逻辑运算
exp1 -a exp2              # 在测试表达式中的and运算符
exp1 -o exp2              # 在测试表达式中的or运算符
! expr                    # 取反

# [ ] 单双括号
　# - [ ] 两个符号左右都要有空格分隔
　# - 内部操作符与操作变量之间要有空格：如  [  ]
　# - 字符串比较中，> < 需要写成\> \< 进行转义
　# - [ ] 中字符串或者${}变量尽量使用"" 双引号扩住，避免值未定义引用而出错的好办法
　# - [ ] 中可以使用 –a –o 进行逻辑运算

# [[ ]] 双方括号
　# [[ ]] 两个符号左右都要有空格分隔
　# 内部操作符与操作变量之间要有空格：如  [[ "a" = "b" ]]
　# 字符串比较中，可以直接使用 > < 无需转义
　# [[ ]] 中字符串或者${}变量尽量如未使用"" 双引号扩住的话，会进行模式和元字符匹配
　  # [[ "ab"=a* ]] && echo "ok"
　  # ok
　# [[] ] 内部可以使用 &&  || 进行逻辑运算
　
[  exp1  -a exp2  ] = [[  exp1 && exp2 ]] = [  exp1  ] && [  exp2  ] = [[ exp1  ]] && [[  exp2 ]]

[  exp1  -o exp2  ] = [[  exp1 || exp2 ]] = [  exp1  ] || [  exp2  ] = [[ exp1  ]] || [[  exp2 ]]

[ -f /opt/file ] && echo 'file' || echo 'not file'     # 判断
[ -f /opt/file ] && (echo 'file'; echo 'shell') || echo 'not file'     # 子shell



# 字符串判断
string                     # 如果string不为空（长度大于0），则判断为真。
string1 = string2          # 如果string1和string2相同，则判断为真。
str1 == str2               # str1 等于 str2
str1 != str2               # str1 不等于 str2
str1 < str2                # str1小于str2（按字母顺序）
str1 > str2                # str1大于str2（按字母顺序）
-n str1                    # str1不为null（长度大于0）
-z str1                    # str1为null（长度为0）

# 文件判断
-a file                   # file存在，则为true
-b file                   # 如果 file 存在并且是一个块（设备）文件，则为true
-c file                   # 如果 file 存在并且是一个字符（设备）文件，则为true。
-d file                   # file存在并且是目录，则为true
-e file                   # file存在，则为true
-f file                   # file存在并且是常规文件（不是目录或其他特殊类型的文件），则为true
-g file                   # 如果 file 存在并且设置了组 ID，则为true。
-G file                   # 如果 file 存在并且属于有效的组 ID，则为true。
-h file                   # 如果 file 存在并且是符号链接，则为true。
-k file                   # 如果 file 存在并且设置了它的“sticky bit”，则为true。
-L file                   # 如果 file 存在并且是一个符号链接，则为true。
-N file                   # 如果 file 存在并且自上次读取后已被修改，则为true。
-O file                   # 如果 file 存在并且属于有效的用户 ID，则为true。
-p file                   # 如果 file 存在并且是一个命名管道，则为true。
-r file                   # file具有read权限，则为true
-s file                   # file存在且不为空，则为true
-S file                   # 如果 file 存在且是一个网络 socket，则为true。
-t fd                     # 如果 fd 是一个文件描述符，并且重定向到终端，则为true。 这可以用来判断是否重定向了标准输入／输出错误。
-u file                   # 如果 file 存在并且设置了 setuid 位，则为true。
-w file                   # file具有write权限，则为true
-x file                   # file具有执行权限，如果是目录，则具有目录搜索权限，则为true
file1 -nt file2           # file1比file2新
file1 -ot file2           # file1比file2旧
file1 -ef file2           # file1相等file2

# 整数判断

-eq                       # 等于
-ne                       # 不等于
-lt                       # 小于
-le                       # 小于或等于
-ge                       # 大于或等于
-gt                       # 大于

# 算术判断
(( 1 < 2 ))               # 数值对比

# 正则判断
str1 =~ str2               # str2正则匹配str1

# 普通命令的逻辑运算
statement1 && statement2  # and 运算符
statement1 || statement2  # or 运算符


# case

case expression in
  pattern )
    commands ;;
  pattern )
    commands ;;
  ...
esac

OS=$(uname -s)

case "$OS" in
  FreeBSD) echo "This is FreeBSD" ;;
  Darwin) echo "This is Mac OSX" ;;
  AIX) echo "This is AIX" ;;
  Minix) echo "This is Minix" ;;
  Linux) echo "This is Linux" ;;
  *) echo "Failed to identify this OS" ;;
esac
```



## 循环

```bash
continue      # 跳出本次循环
break         # 跳出循环

# for in循环
for variable in list
do
  commands
done


for x in {1..10}
do
  statements
done

for i in {5..50..5}; do
    echo "Welcome $i"
done

for ((i = 0 ; i < 100 ; i++)); do
  echo $i
done

for i in *.png; do
  ls -l $i
done

# for
for (( expression1; expression2; expression3 )); do
  commands
done

for (( i=0; i<5; i=i+1 )); do
  echo $i
done


# select
select name [in list];
do
  statements that can use $name
done

select brand in Samsung Sony iphone symphony Walton
do
  echo "You have chosen $brand"
done


# while
while condition; do
  statements
done

number=0
while [ "$number" -lt 10 ]; do
  echo "Number = $number"
  number=$((number + 1))
done

while true
do
  echo 'Hi, while looping ...';
done

< file.txt | while read line; do
  echo $line
done

while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do
case $1 in
  -V | --version )
    echo $version
    exit
    ;;
  -s | --string )
    shift; string=$1
    ;;
  -f | --flag )
    flag=1
    ;;
esac;
shift;
done

# shift n 表示把第n+1个参数移到第1个参数, 即命令结束后$1的值等于$n+1的值
if [[ "$1" == '--' ]]; then shift; fi

# until
until condition; do
  statements
done

until false; do echo 'Hi, until looping ...'; done
```

## 函数

```bash
myfunc() {                # 定义函数
    echo "hello $1"
}

myfunc "John"              # 执行函数

function functname() {     # 定义函数
  shell commands
  echo "$#"                # 函数参数数量
  echo "$*"                # 函数所有参数, 字符串返回。
  echo "$@"                # 函数所有参数
  echo "$1"                # 函数第一个参数
  echo "$2"                # 函数第二个参数
  echo "$N"                # 函数第N个参数
  return 1                 # 返回
}

unset -f functname         # 删除定义的函数
declare -f                 # 显示所有定义的函数
```

## 选项

```bash

- 表示打开， + 表示关闭

set -u: 如果遇到不存在的变量，Bash 默认忽略它
set -x: 用来在运行结果之前，先输出执行的那一行命令。
set -e: 只要发生错误，就终止执行。
set -n：等同于set -o noexec，不运行命令，只检查语法是否正确。
set -f：等同于set -o noglob，表示不对通配符进行文件名扩展。
set -v：等同于set -o verbose，表示打印 Shell 接收到的每一行输入。

set -o noclobber  # 避免叠加文件 (echo "hi" > foo)
set -o errexit    # 用于在出错时退出，避免级联错误
set -o pipefail   # 用于在出错时退出，避免管道之间的连续错误
set -o nounset    # 暴露未设置的变量


# 全局选项
set -o nullglob    # Non-matching globs are removed  ('*.foo' => '')
set -o failglob    # Non-matching globs throw errors
set -o nocaseglob  # Case insensitive globs
set -o globdots    # Wildcards match dotfiles ("*.sh" => ".foo.sh")
set -o globstar    # Allow ** for recursive matches ('lib/**/*.rb' => 'lib/a/b/c.rb')

# 写法一
set -euxo pipefail

# 写法二
set -eux
set -o pipefail

shopt             # 查看所有参数
shopt globstar    # 查看globstar参数
shopt -s execfail # 打开参数
shopt -u execfail # 关闭参数
shopt -q execfail # 查询参数是否打开，返回0表示打开
```

## 其他

```bash
(cd somedir; echo "I'm now in $PWD")   # 子shell

# 读取输入
echo -n "Proceed? [y/n]: "
read ans
echo $ans

read -n 1 ans        # 只读取一个字符
printf "Hello %s, I'm %s" Sven Olga  # 格式化输出

# 打破长语句, 使用两个空格缩进
activate some_very_long_option \
  some_other_option

mktmp # 创建临时目录
```

## color

```bash
NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHTGRAY='\033[0;37m'
DARKGRAY='\033[1;30m'
LIGHTRED='\033[1;31m'
LIGHTGREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHTBLUE='\033[1;34m'
LIGHTPURPLE='\033[1;35m'
LIGHTCYAN='\033[1;36m'
WHITE='\033[1;37m'

echo -e "The first five colors of the rainbow are ${RED}red ${ORANGE}orange ${YELLOW}yellow ${GREEN}green ${NOCOLOR}and ${BLUE}blue${NOCOLOR}"

#　tput color
export TERM=xterm
#　tput Color Capabilities:
tput setab [1-7] – Set a background color using ANSI escape
tput setb [1-7] – Set a background color
tput setaf [1-7] – Set a foreground color using ANSI escape
tput setf [1-7] – Set a foreground color

#　tput Text Mode Capabilities:
tput bold – Set bold mode
tput dim – turn on half-bright mode
tput smul – begin underline mode
tput rmul – exit underline mode
tput rev – Turn on reverse mode
tput smso – Enter standout mode (bold on rxvt)
tput rmso – Exit standout mode
tput sgr0 – Turn off all attributes

#　Color Code for tput:
0 – Black
1 – Red
2 – Green
3 – Yellow
4 – Blue
5 – Magenta
6 – Cyan
7 – White

```

## 信号

```bash
trap -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL
 5) SIGTRAP      6) SIGABRT      7) SIGBUS       8) SIGFPE
 9) SIGKILL     10) SIGUSR1     11) SIGSEGV     12) SIGUSR2
13) SIGPIPE     14) SIGALRM     15) SIGTERM     17) SIGCHLD
18) SIGCONT     19) SIGSTOP     20) SIGTSTP     21) SIGTTIN
22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO
30) SIGPWR      31) SIGSYS      35) SIGRTMIN    36) SIGRTMIN+1
37) SIGRTMIN+2  38) SIGRTMIN+3  39) SIGRTMIN+4  40) SIGRTMIN+5
41) SIGRTMIN+6  42) SIGRTMIN+7  43) SIGRTMIN+8  44) SIGRTMIN+9
45) SIGRTMIN+10 46) SIGRTMIN+11 47) SIGRTMIN+12 48) SIGRTMIN+13
49) SIGRTMIN+14 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8
57) SIGRTMAX-7  58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4
61) SIGRTMAX-3  62) SIGRTMAX-2  63) SIGRTMAX-1  64) SIGRTMAX


trap 'command' 1 2 3 15
trap 'command' EXIT

trap 'echo "trapped."; exit 1' 1 2 3 15
trap '' 1 2 3 15   # 忽略信号处理

function egress {
  command1
  command2
  command3
}

trap egress EXIT   # 使用函数
```

常用信号

| 信号编号 | 信号名称 | 通知内容                         |
| :------- | :------- | :------------------------------- |
| 1        | HUP      | 通知**重启**过程。               |
| 2        | INT      | 通知**中断**过程。（Ctrl + c）   |
| 3        | QUIT     | 通知**终止**过程。（创建核心）   |
| 9        | KILL     | 通知**强制终止**的过程。         |
| 15       | TERM     | 通知**终止**过程。（默认）       |
| 18       | CONT     | 通知流程**恢复**。               |
| 19       | STOP     | 通知**中断**过程。               |
| 20       | TSTP     | 通知**暂停**的过程。（Ctrl + Z） |


## 快捷键

- `Ctrl + L`:  清除屏幕并将当前行移到页面顶部。
- `Ctrl + C`:  中止当前正在执行的命令。
- `Shift + PageUp`:  向上滚动。
- `Shift + PageDown`:  向下滚动。
- `Ctrl + D`:  关闭 Shell 会话。
- `↑,↓`：浏览已执行命令的历史记录。

移动光标

-`Ctrl + a`:  移到行首。
-`Ctrl + b`:  向行首移动一个字符，与左箭头作用相同。
-`Ctrl + e`:  移到行尾。
-`Ctrl + f`:  向行尾移动一个字符，与右箭头作用相同。
-`Alt + f`:  移动到当前单词的词尾。
-`Alt + b`:  移动到当前单词的词首。

剪切和粘贴

- `Ctrl + k`:  剪切光标位置到行尾的文本。
- `Ctrl + u`:  剪切光标位置到行首的文本。
- `Alt + d`:  剪切光标位置到词尾的文本。
- `Alt + Backspace`:  剪切光标位置到词首的文本。
- `Ctrl + y`:  在光标位置粘贴文本。

自动补全

- `Tab`：完成自动补全。
- `Alt + ?`:  列出可能的补全，与连按两次 Tab 键作用相同。
- `Alt + /`:  尝试文件路径补全。
- `Ctrl + x /`:  先按Ctrl + x，再按/，等同于Alt + ?，列出可能的文件路径补全。
- `Alt + !`:  命令补全。
- `Ctrl + x !`:  先按Ctrl + x，再按!，等同于Alt + !，命令补全。
- `Alt + ~`:  用户名补全。
- `Ctrl + x ~`:  先按Ctrl + x，再按~，等同于Alt + ~，用户名补全。
- `Alt + $`:  变量名补全。
- `Ctrl + x $`:  先按Ctrl + x，再按$，等同于Alt + $，变量名补全。
- `Alt + @`:  主机名补全。
- `Ctrl + x @`:  先按Ctrl + x，再按@，等同于Alt + @，主机名补全。
- `Alt + *`:  在命令行一次性插入所有可能的补全。
- `Alt + Tab`:  尝试用.bash_history里面以前执行命令，进行补全。

操作历史相关

- `Ctrl + p`:  显示上一个命令，与向上箭头效果相同（previous）。
- `Ctrl + n`:  显示下一个命令，与向下箭头效果相同（next）。
- `Alt + <`:  显示第一个命令。
- `Alt + >`:  显示最后一个命令，即当前的命令。
- `Ctrl + o`:  执行历史文件里面的当前条目，并自动显示下一条命令。这对重复执行某个序列的命令很有帮助。

感叹号!的快捷键如下。

- `!!`：执行上一个命令。
- `!n`：执行历史文件里面行号为n的命令。
- `!-n`：执行当前命令之前n条的命令。
- `!string`：执行最近一个以指定字符串string开头的命令。
- `!?string`：执行最近一条包含字符串string的命令。
- `^string1^string2`：执行最近一条包含string1的命令，将其替换成string2。

其他快捷键
- `Ctrl + j`:  等同于回车键（LINEFEED）。
- `Ctrl + m`:  等同于回车键（CARRIAGE RETURN）。
- `Ctrl + o`:  等同于回车键，并展示操作历史的下一个命令。
- `Ctrl + v`:  将下一个输入的特殊字符变成字面量，比如回车变成^M。
- `Ctrl + [`:  等同于 ESC。
- `Alt + .`:  插入上一个命令的最后一个词。
- `Alt + _`:  等同于Alt + .。

