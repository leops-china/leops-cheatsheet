# bash - Cheat Sheet

- [Bash Hackers Wiki](https://wiki.bash-hackers.org/start)

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
readonly variable         # 只读变量
local variable            # 定义内部变量
varname="value"             # 定义变量
varname='value'             # 定义变量
echo $varname             # 输出变量内容
export VARNAME=value      # 定义环境变量
var=                      # 空参数
unset var                 # 取消变量

# 内置变量
$0  # 脚本名称
$n  # 传给脚本/函数的第n个参数
$$  # 脚本的PID
$!  # 上一个被执行的命令的PID(后台运行的进程)
$?  # 上一个命令的退出状态(管道命令使用${PIPESTATUS})
$#  # 传递给脚本/函数的参数个数
$@  # 传递给脚本/函数的所有参数(识别每个参数)
$*  # 传递给脚本/函数的所有参数(把所有参数当成一个字符串)


declare -a                # 将变量作为数组处理
declare -f                # 仅使用函数名
declare -F                # 显示没有定义的函数名
declare -i                # 将变量作为整数处理
declare -r                # 使变量成为只读
declare -x                # 标记通过环境导出的变量

$(command)                # 命令替换：运行命令并返回标准输出

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

for v in ${arr_number[@]}; do  #数组遍历
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
第三种：`expr`
第四中：let


((i=$j+$k))     等价于   i=`expr $j + $k`
((i=$j-$k))     等价于   i=`expr $j -$k`
((i=$j*$k))     等价于   i=`expr $j \*$k`
((i=$j/$k))     等价于   i=`expr $j /$k`

# 浮点数运算
echo "5.01-4*2.0"|bc

awk 'BEGIN{print 7.01*5-4.01 }'

printf %.10f\\n "$((10**9 * 20/7))e-9"

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

## 流程控制

```bash
statement1 && statement2  # and 运算符
statement1 || statement2  # or 运算符

[ exp1 -a exp2 ]         # 在测试表达式中的and运算符
[ exp1 -o exp2 ]         # 在测试表达式中的or运算符

! expr                   # 取反

# 字符串条件
str1 == str2               # str1 等于 str2
str1 != str2               # str1 不等于 str2
str1 < str2                # str1小于str2（按字母顺序）
str1 > str2                # str1大于str2（按字母顺序）
str1 =~ str2               # str2正则匹配str1
-n str1                    # str1不为null（长度大于0）
-z str1                    # str1为null（长度为0）

# 文件条件
-a file                   # file存在，则为true
-d file                   # file存在并且是目录，则为true
-e file                   # file存在，则为true
-f file                   # file存在并且是常规文件（不是目录或其他特殊类型的文件），则为true
-r file                   # file具有read权限，则为true
-s file                   # file存在且不为空，则为true
-w file                   # file具有write权限，则为true
-x file                   # file具有执行权限，如果是目录，则具有目录搜索权限，则为true
-N file                   # file自上次读取后被修改
-O file                   # file所属用户是当前登录的用户
-G file                   # file的组ID与当前用户的（或当前用户的一个，如果当前用户在多个组中）匹配
file1 -nt file2           # file1比file2新
file1 -ot file2           # file1比file2旧
file1 -ef file2           # file1相等file2

# 数字

-lt                       # 小于
-le                       # 小于或等于
-eq                       # 等于
-ge                       # 大于或等于
-gt                       # 大于
-ne                       # 不等于
(( 1 < 2 ))               # 数值对比

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


#　if 判断
if condition;
then
  statements
[elif condition;
  then statements...]
[else
  statements]
fi

```

## 循环

```bash
continue      # 跳出本次循环
break         # 跳出循环

# for循环
for x in {1..10}
do
  statements
done

for i in {5..50..5}; do
    echo "Welcome $i"
done

for name [in list];
do
  statements that can use $name
done

for ((i = 0 ; i < 100 ; i++)); do
  echo $i
done

# case
case expression in
  pattern1 )
    statements ;;
  pattern2 )
    statements ;;
esac

# select
select name [in list];
do
  statements that can use $name
done

# while
while condition; do
  statements
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

if [[ "$1" == '--' ]]; then shift; fi

# until
until condition; do
  statements
done
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
  echo "$*"                # 函数所有参数
  echo "$@"                # 函数所有参数
  echo "$1"                # 函数第一个参数
  echo "$2"                # 函数第二个参数
  echo "$N"                # 函数第N个参数
  return 1                 # 返回
}

unset -f functname         # 删除定义的函数
declare -f                 # 显示所有定义的函数
```

#　选项

```bash
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

信号

```bash
 kill -l
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
