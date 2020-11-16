```bash


# 链接跟踪表
# -L 表示列表，-o 表示以扩展格式显示
$ conntrack -L -o extended | head
# 统计总的连接跟踪数
$ conntrack -L -o extended | wc -l
# 统计 TCP 协议各个状态的连接跟踪数
conntrack -L -o extended | awk '/^.*tcp.*$/ {sum[$6]++} END {for(i in sum) print i, sum[i]}'

# 统计各个源 IP 的连接跟踪数
conntrack -L -o extended | awk '{print $7}' | cut -d "=" -f 2 | sort | uniq -c | sort -n -r

# time_wait超时时间清理
sysctl net.netfilter.nf_conntrack_tcp_timeout_time_wait

traceroute --tcp -p 80 -n baidu.com # --tcp 表示使用 TCP 协议，-p 表示端口号，-n 表示不对结果中的 IP 地址执行反向域名解析
hping3 -c 3 -S -p 80 baidu.com # -c 表示发送 3 次请求，-S 表示设置 TCP SYN，-p 表示端口号为 80

# -c 表示并发请求数为 5000，-n 表示总的请求数为 10 万
# -r 表示套接字接收错误时仍然继续执行，-s 表示设置每个请求的超时时间为 2s
$ ab -c 5000 -n 100000 -r -s 2 http://192.168.0.30/

# 默认测试时间为 10s，请求超时 2s
$ wrk --latency -c 1000 http://192.168.0.30

# 查看tc规则
tc -s qdisc show dev eth0

# 删除tc规则
tc qdisc del dev eth0 root netem loss 30%

```

## systemd

```bash
# 查看系统信息
systemctl list-dependencies                         # 显示服务的依赖关系
systemctl list-dependencies --all nginx.service     # 显示nginx服务的依赖关系
systemctl list-sockets                              # 列出运行的套接字
systemctl list-sockets --all                        # 列出所有的套接字
systemctl list-jobs                                 # 列出活动的jobs
systemctl list-unit-files                           # 列出所有已安装服务

systemctl list-units                        # 列出运行的单元
systemctl list-units --all                  # 列出所有Unit，包括没有找到配置文件的或者启动失败的
systemctl list-units --all --state=inactive # 列出所有没有运行的 Unit
systemctl list-units --failed               # 列出所有加载失败的 Unit
systemctl list-units --type=service         # 列出所有正在运行的、类型为 service 的 Unit

systemctl get-default                       # 列出默认目标（如运行级别）

# 操作服务
systemctl stop service                        # 关闭运行的 service 服务
systemctl start service                       # 启动 service 服务
systemctl restart service                     # 重启运行的 service 服务
systemctl kill service                        # 杀死 service 服务的所有子进程
systemctl reload service                      # 重载 service 服务的配置文件
systemctl daemon-reload                       # 重新载入 systemd, 扫描新的或有变动的服务
systemctl status                              # 查看系统状态
systemctl status service                      # 查看 service 服务的运行状态
systemctl --failed                            # 显示运行失败的服务
systemctl reset-failed                        # 重置任何服务的故障状态
systemctl enable service                      # 开机自动启动服务
systemctl disable service                     # 取消开机自动启动服务
systemctl show service                        # 显示service（或其他服务）的属性
systemctl show -p CPUShares service           # 显示service 服务的指定属性的值
systemctl set-property service CPUShares=500  # 设置 service 服务的指定属性
systemctl edit service                        # 编辑service配置文件
systemctl edit --full service                 # 编辑service所有的配置文件
systemctl -H host status network              # 远程运行systemctl命令

systemctl is-active service              # 显示 service 服务是否正在运行
systemctl is-failed application.service  # 显示 service 服务 是否处于启动失败状态
systemctl is-enabled application.service # 显示 service 服务 服务是否建立了启动链接

# 查看日志
journalctl       # 查看所有日志（默认情况下 ，只保存本次启动的日志）
journalctl -k    # 查看内核日志（不显示应用日志）
journalctl -b    # 查看系统本次启动的日志
journalctl -b -1 # 查看上一次启动的日志（需更改设置）

## 查看指定时间的日志
journalctl --since="2012-10-30 18:17:16"
journalctl --since "20 min ago"
journalctl --since yesterday
journalctl --since "2015-01-10" --until "2015-01-11 03:00"
journalctl --since 09:00 --until "1 hour ago"

journalctl -n                       # 显示尾部的最新10行日志
journalctl -n 20                    # 显示尾部指定行数的日志
journalctl -f                       # 实时滚动显示最新日志
journalctl /usr/lib/systemd/systemd # 查看指定服务的日志
journalctl _PID=1                   # 查看指定进程的日志
journalctl /usr/bin/bash            # 查看某个路径的脚本的日志
journalctl _UID=33 --since today    # 查看指定用户的日志

journalctl -u service                                        # 查看 service 服务的日志
journalctl -u service --since today                          # 查看 service 服务的当天日志
journalctl -u service -f                                     # 实时滚动显示 service 服务的最新日志
journalctl -u nginx.service -u php-fpm.service --since today # 合并显示多个 Unit 的日志

# 查看指定优先级（及其以上级别）的日志，共有8级
# 0: emerg
# 1: alert
# 2: crit
# 3: err
# 4: warning
# 5: notice
# 6: info
# 7: debug
journalctl -p err -b
journalctl --no-pager # 日志默认分页输出，--no-pager 改为正常的标准输出
journalctl -b -u nginx.service -o json # 以 JSON 格式（单行）输出
journalctl -b -u nginx.service -o json-pretty # 以 JSON 格式（多行）输出，可读性更好
journalctl --disk-usage # 显示日志占据的硬盘空间
journalctl --vacuum-size=1G # 指定日志文件占据的最大空间
journalctl --vacuum-time=1years # 指定日志文件保存多久

# 系统操作
systemctl reboot       # 重启系统
systemctl poweroff     # 关闭系统
systemctl halt         # CPU停止工作
systemctl suspend      # 暂停系统
systemctl hibernate    # 让系统进入冬眠状态
systemctl hybrid-sleep # 让系统进入交互式休眠状态
systemctl rescue       # 启动进入救援状态（单用户状态）
systemctl emergency    # 进入紧急模式
systemctl default      # 返回默认目标(多用户)


# 启动耗时
systemd-analyze                            # 查看启动耗时                                                                                    
systemd-analyze blame                      # 查看每个服务的启动耗时
systemd-analyze critical-chain             # 显示瀑布状的启动过程流
systemd-analyze critical-chain atd.service # 显示指定服务的启动流

# 主机信息
hostnamectl                    # 显示当前主机的信息
hostnamectl set-hostname rhel7 # 设置主机名

# 本地化设置
localectl                            # 查看本地化设置
localectl set-locale LANG=en_GB.utf8 # 设置本地化参数
localectl set-keymap en_GB           # 设置本地化参数

# 时区设置
timedatectl                               # 查看当前时区设置
timedatectl list-timezones                # 显示所有可用的时区                                                                                  
timedatectl set-timezone America/New_York # 设置当前时区
timedatectl set-time YYYY-MM-DD           # 设置年月日
timedatectl set-time HH:MM:SS             # 设置时间


# 登录用户
loginctl list-sessions   # 列出当前session
loginctl list-users      # 列出当前登录用户
loginctl show-user user1 # 列出显示指定用户的信息
```



## Tcpdump

```bash

tcpdump -i ethO  # 指定网络接口，默认是0号接口eth0，any表示所有接口
tcpdump -nn  # 不解析IP地址和端口号的名称
tcpdump -c5 #  限制要抓取网络包的个数
tcpdump -A # 以ASCII格式显示网络包内容(不指定时只显示头部信息)
tcpdump -W fle.pcap # 保存到文件中，文件名通常以.pcap为后缀
tcpdump -e # 输出链路层的头部信息



tcpdump -nn host 35.1 90.27.188 # 主机过滤,host,src host,dst host
tcpdump -nn  192.1 68.0.0 # 网络过滤,net,src net,dst net
tcpdump -nn dst port 80 # 端口过滤,port,portrange, Src port,dst port
tcpdump -nn tcp # 协议过滤ip,ip6, arp, tcp,udp,icmp
tcpdump -nn icmp or udp # 逻辑表达式 and,or,not
tcpdump -nn "tcp[tcpflags] & tcp-syn != 0" # 特定状态的TCP包


# 输出格式
# 时间戳 协议 源地址. 源端口 > 目的地址. 目的端口 网络包详细信息

# 源地址是 10.5.2.3，目的端口是 3389 的数据包
tcpdump -nnvS src 10.5.2.3 and dst port 3389

#　从 192.168 网段到 10 或者 172.16 网段的数据包
tcpdump -nvX src net 192.168.0.0/16 and dat net 10.0.0.0/8 or 172.16.0.0/16

# 监听eth0网卡HTTP 80端口的request和response
tcpdump -i eth0 -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'


# 监听eth0网卡HTTP 80端口的request(不包括response)，指定来源域名"example.com"，也可以指定IP"192.168.1.107"
tcpdump -i eth0 -A -s 0 'src example.com and tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'


# 监听本机发送至本机的HTTP 80端口的request和response
tcpdump -i lo -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'


# 监听eth0网卡HTTP 80端口的request和response，结果另存为cap文件
tcpdump -i eth0 -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)' -w ./dump.cap
```

## ftrace

```bash
挂载
$ mount -t debugfs nodev /sys/kernel/debug

目录
/sys/kernel/debug/tracing
支持的跟踪器
/sys/kernel/debug/tracing/available_tracers
的函数和事件
/sys/kernel/debug/tracing/available_filter_functions /sys/kernel/debug/tracing/available_events

设置跟踪函数
echo do_sys_open > set_graph_function
开启函数调用跟踪，并跟踪调用进程
echo function_graph > current_trace
echo funcgraph-proc > trace_options
开启跟踪
echo 1 > tracing_on
关闭跟踪
echo 0 > tracing_on


trace-cmd record -p function_graph -g do_sys_open -O funcgraph-proc ls
trace-cmd report
```


## grep

```bash
grep -i -w vivek /etc/passwd   #搜索大小写任意的 vivek(即不区分大小写的搜索)
grep -E -i -w 'vivek|raj' /etc/passwd　#搜索大小写任意的 vivek 或 raj
```

```
[:alnum:] - 字母数字字符
[:alpha:] - 字母字符
[:blank:] - 空字符: 空格键符 和 制表符
[:digit:] - 数字: '0 1 2 3 4 5 6 7 8 9'
[:lower:] - 小写字母: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
[:space:] - 空格字符: 制表符、换行符、垂直制表符、换页符、回车符和空格键符
[:upper:] - 大写字母: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
```

## sed

```bash
sed '/location/,/}/s/\(.*\)/#&/' nginx.conf  # 注释nginx location 区域内容
sed '/Aprl/,+2s/\(.*\)/#&/' tt.txt           # 注释匹配行及下面2行
sed -n '{/access fail/{g;p}};h' access.log   # 打印匹配行的上一行
# sed 会逐行处理文件， 首先判断该行是否匹配（或包含）access fail关键字，
# 若没有匹配，仅执行h，即将该行以覆盖方式放到后台（一个缓冲区）；
# 若匹配上了，则执行后面的命令（{g;p}），g表示将后台内容挪到前台来（即将上一行覆盖当前行内容），p打印该行。

sed 's/^[ ^t]*//' file               # 删除每行开头的前导空格（空格/制表符）
sed 's/[ ^t]*$//' file               # 从每行末尾删除尾随空格（空格/制表符）
sed 's/^[ ^t]*//;s/[ ^]*$//' file    # 删除每行开头和结尾的空格

sed 's/foo/bar/' file        # 只替换一行中的1个实例
sed 's/foo/bar/4' file       # 只替换一行中的4个实例
sed 's/foo/bar/g' file       # 替换一行中的所有实例
sed '/baz/s/foo/bar/g' file  # 只将包含“baz”的行替换为“foo”和“bar”
sed '/baz/!s/foo/bar/g'      # 除包含“baz”的行外，用“bar”代替“foo”
sed 's/scarlet/red/g;s/ruby/red/g;s/puce/red/g'   # 多个替换
gsed 's/scarlet\|ruby\|puce/red/g'                # GNU sed only

sed -n '/regexp/{g;1!p;};h'  # 打印紧邻regexp前面的行，但不打印包含regexp的行
sed -n '/regexp/{n;p;}'      # 立即打印regexp之后的行，但不打印包含regexp的行

sed '/Iowa/,/Montana/d'  # 打印除了两个正则表达式之间的部分之外的所有文件

sed '/pattern/d' # 删除匹配模式的行

# 删除文件中除第一行之外的所有连续空行
sed '/./,/^$/!d' file       # 上面允许0个空格，EOF允许1个空格
sed '/^$/N;/\n$/D' file     # 这允许顶部有一个空格，EOF为0


sed '/./,$!d' file # 仅删除文件顶部所有前导空

sed -e :a -e '/^\n*$/{$d;N;};/\n$/ba' file # 仅删除文件末尾的所有尾随空白行

sed -e :a -e '/\\$/N; s/\\\n//; ta' file   # 如果一行以反斜杠结尾，则将其下一行加入


sed '1~3d' file      # 从第一行开始，每次删除3行，如删除1, 4, 7, 10, 13, 16, ...
sed '0~3d' file      # 删除 3, 6, 9, 12, 15, 18, ...

sed -n '2~5p' file   # 从第二行开始，每5行打印一次，如2, 7, 12, 17, 22, 27, ...


# 在匹配行之后插入
sed '/^anothervalue=.*/a after=me' test.txt

# 在匹配行之前插入
sed '/^anothervalue=.*/i before=me' test.txt

# 插入多行
sed '/^anothervalue=.*/i before=me\nbefore2=me2' test.txt

```

## sort

```bash
sort -te -k2,2n -k1,1n test.txt   # 排序浮点数
8.461754562e-07
8.959458896e-07
8.831553093e-06
8.387280091e-05
8.391373668e-05
8.547354437e-05
8.936111118e-05
# -te将你的数字分成两个字段,用e将尾数与指数分开. -k2,2表示首先按指数排序,然后-k1,1表示接下来用你的尾数排序.

```

## jq

> https://github.com/stedolan/jq/wiki/Cookbook

```bash
echo $json_data | jq -r '.status.phase'
echo $json_data | jq -r '.status.conditions[] | select(.status != "True") | "    type=\(.type), message=\(.message)"'
echo $json_data | jq -r '.spec.selector | to_entries | .[] | "\(.key)=\(.value),"'

jq -cn '[limit(5; range(2)|range(2))]'
printf '%s\n' '{"a":{"b":[{"c":0},{"d":1}]}}' | jq -c 'path(..)'

json='[{"genre":"deep house"}, {"genre": "progressive house"}, {"volume": "wubwubwub"}]'

echo "$json" | jq -c '.[] | select(.genre | . and contains("house"))?'
{"genre":"deep house"}
{"genre":"progressive house"}

cat file.json | jq '.[] | select(.age == 36)'
cat file.json | jq 'map({ _id, email })'
cat file.json | jq 'reduce .[] as $item (0; . + $item.age)'

```

## diff

```bash
diff -u old new | sed "s/^-/$(tput setaf 1)&/; s/^+/$(tput setaf 2)&/; s/^@/$(tput setaf 6)&/; s/$/$(tput sgr0)/"   # 颜色显示
```

## scp

```bash
# Usage
scp <options> source_path destination_path
# 常用选项
-r      # transfer directory 传输目录
-v      # see the transfer details 传输细节
-C      # copy files with compression 压缩传输
-l 800  # limit bandwith with 800   限制传输带宽
-p      # preserving the original attributes of the copied files 保持传输文件的属性
-q      # hidden the output 隐藏输出 比较少用
# 案例
scp file user@host:/path/to/file # 远程拷贝文件到host主机
scp -r /path/to/directory user@host:/path/to/directory # 远程拷贝目录到host主机
scp user@host:/path/to/file /local/path  # 拷贝远程文件到本地
scp -r user@host:/path/ /local/  # 拷贝远程目录到本地

```

## screen
screen 允许用户可以通过它同时连接多个本地或远程的命令行会话，并在其间自由切换。

```
screen -S session_name  创建新的 screen 会话
screen -ls 显示当前所有存在的 screen 会话
screen -r session_name 手动 attach 指定 screen 会话
screen -d session_name 手动 detach 指定 screen 会话
screen -L -S session_name  写入日志
快捷键：ctrl+a + d  detach 当前会话
快捷键：ctrl+a + k kill 当前会话
```



## date

```bash
echo $(date +%F --date="10  day ago")
# 2019-01-01

echo $(date +%Y%m%d --date="10  day ago")
# 20190101

echo $(date '+%F %H:%M:%S')
# 2019-01-01 00:00:00
```



## find

```bash
# find file sizes 
find / -type f -print0 | xargs -0 -I {} du -h "{}"

# find files not owned by root
find -L /bin \! -user root

# find files with permissions greater than 600
find -perm -600 ! -perm 600 -type f

# change /var/www/site permissions
find /var/www/site -type f -print0 | xargs -0 -I {} chmod 644 "{}"
find /var/www/site -type d -print0 | xargs -0 -I {} chmod 755 "{}"
find /var/www/site -nouser -print0 | xargs -0 -I {} chown root:apache "{}"

# only folder in current dir
find . -maxdepth 1 -type d -print0 | xargs -0 -I {} echo "{}"
# exclude hidden
find . -maxdepth 1 -not -path '*/\.*' -type d -print0 | xargs -0 -I {} echo "{}"

# find files older than # days
find */ -type f -mtime +7 -print0 | xargs -0 -I {} rm -rf "{}"

# find all except for var
find / -path /var -prune -o -iname '*word*' -print
find / -type d \( -path dir1 -o -path dir2 -o -path dir3 \) -prune -o -print

# find open files
lsof | grep "/me/open"

find /tmp -type d -name "tmp*"  ! -path /tmp/tmp.NUL0Qu7rSt -exec rm -rfv {} \;
```

## mount

```bash
# remount rw
mount -o remount, rw /tmp

# mount dvd
mount -t iso9660 /dev/cdrom /mnt/cdrom/

# mount iso
mount -t iso9660 -o loop name.iso /mnt/iso

# make iso
mkisofs -r -o name.iso -R -l -joliet-long -allow-lowercase /dir/*

# burn iso
dmesg | egrep -i --color 'cdrom|dvd|cd/rw|writer'
less /proc/sys/dev/cdrom/info
cdrecord -v -dev='/dev/sr0' name.iso

# eject iso
eject /dev/sr0
```

## yum

```bash
# yum download without install
yum install --downloadonly --downloaddir=/home/ packagename
yum reinstall --downloadonly --downloaddir=/home/ packagename
# yum download with deps
yum reinstall --downloadonly --downloaddir=/tmp $(repoquery --requires --recursive --resolve packagename)

# fix very broken yum download with everything
yum install \
  --installroot=</path/to/tmp_dir> \
  --downloadonly --downloaddir <rpm_dir> <package>
  
# remove apache
yum erase httpd httpd-tools apr apr-util
rpm -qa | grep httpd

# inspect dependencies 
rpm -qpR


# 查看历史
yum history list 

# 历史信息
yum history info httpd
yum history summary httpd
yum history info 8

yum history package-list httpd <package2..n>
yum history package-info httpd <package2..n>

# 撤销安装
yum history undo 8

# 重新安装
yum history redo 8

# 回滚
yum history rollback 2

# 列出repo
yum -v repolist
yum repolist enabled

# 检查更新
yum check-update
yum update grep.x86_64 sudo.x86_64

# 列出可用的软件包
yum --showduplicates list httpd
yum list installed "krb?-*"
yum list available gstreamer\*plugin\*
yum list abrt-addon\* abrt-plugin\*
```

## apache

```bash
# per day
awk '{print $4}' logfilename | cut -d: -f1 | uniq -c | grep "01/Apr/2019"

# per hour
grep "01/Apr" logfilename | cut -d[ -f2 | cut -d] -f1 | awk -F: '{print $2":00"}' | sort -n | uniq -c

# per minute
grep "01/Apr/2019:04" logfilename | cut -d[ -f2 | cut -d] -f1 | awk -F: '{print $2":"$3}' | sort -nk1 -nk2 | uniq -c | awk '{ if ($1 > 10) print $0}'

# top 10 IP hits
awk '{ print $1}' logfilename | sort | uniq -c | sort -nr | head -n 10
```

## reboot

```bash
# Reboot

echo 1 > /proc/sys/kernel/sysrq
echo b > /proc/sysrq-trigger

# Shutdown

echo 1 > /proc/sys/kernel/sysrq
echo o > /proc/sysrq-trigger
```


## curl

```bash
USER="PID1AV4"
PASS="JtyZDzs34TCqamAnTVAkiarEbt-3w6exhwmAaXuu"
AUTH=$(echo -n "${USER}:${PASS}" | base64)

curl -vvv https://api-certs.domain.tld/prod/api/customer \
--header "X-ApplicationName: My Application" \
-H 'Accept: application/json' -H "Authorization: Basic ${AUTH}" -H 'Content-Type: application/json' \
--cert /app/certs/api-gateway-prod.pem \
--key /app/certs/api-gateway-prod.key \
--key-type PEM

```


## sudoe

```bash
sudo sh -c 'command1 && command2'
sudo -- sh -c 'command1 && command2'
sudo -u userNameHere -- sh -c 'command1; command2'
sudo -- sh -c 'command1; command2'
sudo -- bash -c 'command1; command2'
sudo -i -- 'command1; command2; command3'
sudo -i -- sh -c 'command1 && command2 && command3'
sudo -S <<< "password" command
```

