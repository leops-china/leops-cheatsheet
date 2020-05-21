# Firewalld

firewalld是一个用于Linux操作系统的防火墙管理工具。它通过nftables用户空间实用程序充当Linux内核netfilter框架的前端，作为nft命令行程序的替代，从而提供防火墙特性。



- http://fedoraproject.org/wiki/FirewallD



##  防火墙区域的默认配置 

| 区域名称         | 默认配置                                                     |
| ---------------- | ------------------------------------------------------------ |
| trusted（信任）  | 允许所有传入流量。                                           |
| home（家庭）     | 拒绝传入流量，除非与传出流量相关或与ssh、mdns、ipp-client、samba-client或dhcpv6-client预定义的服务匹配。 |
| internal（内部） | 拒绝传入流量，除非与传出的流量相关，或者与ssh、mdns、ipp-client、samba-client或dhcpv6-client预定义的服务(与开始时的主区域相同)匹配。 |
| work（工作）     | 拒绝传入流量，除非与传出流量相关或与ssh、ipp客户端或dhcpv6客户端预定义服务匹配。 |
| public（公共）   | 拒绝传入流量，除非与传出流量相关或与ssh或dhcpv6客户端预定义服务匹配。新添加的网络接口的默认区域 |
| external（外部） | 拒绝传入流量，除非与传出流量相关或与ssh预定义服务匹配。通过此区域转发的传出1Pv4流量被伪装成来自传出网络接口的1Pv4地址。 |
| dmz（非军事区）  | 拒绝传入流量，除非与传出流量相关或与ssh预定义服务匹配。      |
| block（限制）    | 拒绝所有传入流量，除非与传出流量相关。                       |
| drop（丢弃）     | 删除所有传入流量，除非与传出流量相关(甚至不响应ICMP错误)。   |

>  FirewallD的默认区域是public 



### 防火墙管理

 重新加载防火墙配置

```bash
firewall-cmd --reload  # 重新加载防火墙，并不中断用户连接

firewall-cmd --complete-reload # 重新加载防火墙并中断用户连接
```

查看firewalld的运行状态

```bash
firewall-cmd --state
```

将当前防火墙的规则永久保存

```bash
firewall-cmd --runtime-to-permanent
```

开启日志记录

```bash
firewall-cmd --set-log-denied=<value> # 设置记录被拒绝的日志，只能为 'all','unicast','broadcast','multicast','off' 其中的一个；
firewall-cmd --get-log-denied         # 获取记录被拒绝的日志；
```



systemctl 管理

```bash
# 开启开机自启动
systemctl enable firewalld

# 启动服务
systemctl start firewalld

# 关闭服务
systemctl stop firewalld

# 重启服务
systemctl restart firewalld

# 查看状态
systemctl status firewalld
```

### 区域管理

显示支持的区域列表

```bash
# firewall-cmd --get-zones 
block drop work internal external home dmz public trusted
```

设置为家庭区域

```bash
# firewall-cmd --set-default-zone=home
```

查看当前的区域

```bash
# firewall-cmd --get-active-zones
```

设置当前的区域的接口

```bash
# firewall-cmd --get-zone-of-interface=ens33
```

显示所有公共区域（public）

```bash
# firewall-cmd --zone=public --list-all
```

临时修改网络接口 ens33 为  内部区域（internal）

```bash
# firewall-cmd --zone=internal --change-interface=ens33
```

永久修改网络接口 ens33 为  内部区域（internal）

```bash
# firewall-cmd --permanent --zone=internal --change-interface=ens33
```

查看区域设置

```bash
firewall-cmd --info-zone=public   # 查看区域信息
firewall-cmd --zone=internal --list-all   # 查看指定区域设置
firewall-cmd --list-all   # 查看默认区域设置
```

- Target：目标
- icmp-block-inversion：ICMP协议类型黑白名单开关（yes/no）
- Interfaces：关联的网卡接口
- sources：来源，可以是IP地址，也可以是mac地址
- services：允许的服务
- ports：允许的目标端口，即本地开放的端口
- protocols：允许通过的协议
- masquerade：是否允许伪装（yes/no），可改写来源IP地址及mac地址
- forward-ports：允许转发的端口
- source-ports：允许的来源端口
- icmp-blocks：可添加ICMP类型，当icmp-block-inversion为no时，这些ICMP类型被拒绝；当icmp-block-inversion为yes时，这些ICMP类型被允许。
- rich rules：富规则，即更细致、更详细的防火墙规则策略，它的优先级在所有的防火墙策略中也是最高的。 



### 服务管理

显示服务列表

```bash
# firewall-cmd --get-services
```

允许 ssh 服务通过

```bash
firewall-cmd --enable service=ssh

# 也可以添加多个
firewall-cmd --add-service={ssh,https}
```

禁止 ssh 服务通过

```bash
# firewall-cmd --disable service=ssh
```

临时允许 samba 服务通过 600 秒

```bash
# firewall-cmd --enable service=samba --timeout=600
```

显示服务

```bash
# 显示当前服务
firewall-cmd --list-services

# 显示public区域的服务
firewall-cmd --zone=public --list-services
```

添加 http 服务到内部区域（internal）

```bash
# firewall-cmd --permanent --zone=internal --add-service=http 
```

将一个服务加入到分区

```bash
# firewall-cmd --zone=work --add-service=smtp
```

从一个分区移除服务要从分区移除服务
```bash
# firewall-cmd --zone=work --remove-service=smtp
```

清除所有服务规则

```bash
for i in $(firewall-cmd --zone=public --list-services);do firewall-cmd --remove-service=$i; done
```



### 端口管理

添加端口

```bash
# 添加tcp端口
firewall-cmd --permanent --add-port=22/TCP

# 添加udp端口
firewall-cmd --permanent --add-port=53/UDP

# 指定区域
firewall-cmd --zone=public --permanent --add-port=22/tcp

# 指定端口范围
firewall-cmd --zone=public --permanent --add-port=1234-5678/tcp
```

> **–permanent**  持久化标志，重启服务规则还在

删除端口

```bash
firewall-cmd --permanent --remove-port=444/tcp
```

查看允许的端口

```bash
firewall-cmd --list-all

firewall-cmd --zone=public --list-all
```

清除所有端口规则

```bash
for i in $(firewall-cmd --zone=public --list-ports);do firewall-cmd --remove-port=$i; done
```

转发端口

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward

# 开启伪装
firewall-cmd --zone=external --add-masquerade

# 查询伪装
firewall-cmd --zone=external --query-masquerade

# 修改区域端口
firewall-cmd --zone=external --change-interface=ens33

# 转发本地端口
firewall-cmd –zone=external --permanent –add-forward-port=port=22:proto=tcp:toport=3753

# 转发主机
firewall-cmd –zone=external--permanent –add-forward-port=port=22:proto=tcp:toaddr=192.168.77.128

# 转发主机端口
firewall-cmd --zone=external --permanent --add-forward-port=port=50001:proto=tcp:toport=50001:toaddr=192.168.77.128

# 获取区域转发信息
firewall-cmd --zone=external --list-all
firewall-cmd --zone=external --list-forward-ports
firewall-cmd --zone=external --runtime-to-permanent
```



### 富规则

允许来自主机 192.168.0.14 的所有 IPv4 流量。

```bash
firewall-cmd --zone=public --add-rich-rule 'rule family="ipv4" source address=192.168.0.14 accept'
```

drop禁止特定ip连接`ssh/22`服务

```bash
firewall-cmd --permanent --zone=public --add-rich-rule="rule family=ipv4 source address='x.x.x.x/24' service name='ssh' drop"

#重新加载防火墙配置
firewall-cmd --reload
```

reject禁止特定ip连接`ssh/22`服务

```bash
firewall-cmd --permanent --zone=public --add-rich-rule="rule family='ipv4' source address='x.x.x.x/24' service name='ssh' reject"

firewall-cmd --permanent --zone=public --add-rich-rule="rule family='ipv4' source address='x.x.x.x/24' port port=22 protocol=tcp reject"

firewall-cmd --reload
```

拒绝所有来自2001:db8::/64子网的主机访问dns服务,并且每小时只审核记录1次日志。 

```bash
firewall-cmd --add-rich-rule='rule family=ipv6 source address="2001:db8::/64" service name="dns" audit limit value="1/h" reject' --timeout=300
```



accept运行特定ip连接`ssh/22`服务

```bash
firewall-cmd --permanent --zone=public --add-rich-rule="rule family=ipv4 source address='x.x.x.x/24' port port=22 procotol=tcp accept"

firewall-cmd --reload
```

允许来自主机 10.1.0.3 到 80 端口的 IPv4 的 TCP 流量，并将流量转发到 6532 端口上。 

```bash
firewall-cmd --zone=public --add-rich-rule 'rule family=ipv4 source address=10.1.0.3 forward-port port=80 protocol=tcp to-port=6532'
```

将主机 172.31.4.2 上 80 端口的 IPv4 流量转发到 8080 端口（需要在区域上激活 masquerade）。

```bash
firewall-cmd --zone=public --add-rich-rule 'rule family=ipv4 forward-port port=80 protocol=tcp to-port=8080 to-addr=172.31.4.2'
```

  丢弃所有icmp包 

```bash
firewall-cmd --permanent --add-rich-rule='rule protocol value=icmp drop'
```

 每分钟允许2个新连接访问ftp服务 

```bash
firewall-cmd --add-rich-rule='rule service name=ftp limit value=2/m accept'

firewall-cmd --add-rich-rule='rule service name=ftp limit value=2/m audit accept'
```

>  audit   可以审核记录日志



列出富规则

```bash
firewall-cmd --list-rich-rules
```



### 直接模式

可以传递原始 iptables 命令 

```bash
# 打开TCP协议的9999端口
firewall-cmd --direct -add-rule ipv4 filter INPUT 0 -p tcp --dport 9000 -j ACCEPT

# 允许icmp
firewall-cmd --permanent --direct --add-rule ipv4 filter OUTPUT 0 -p icmp -s 0.0.0.0/0 -d 0.0.0.0/0 -j ACCEPT

firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p icmp -s 0.0.0.0/0 -d 0.0.0.0/0 -j ACCEPT

# 重载配置
firewall-cmd --reload
# 列出规则
firewall-cmd --direct --get-chains ipv4 filter


```

###  应急状况模式 

```bash
firewall-cmd --panic-on  # 拒绝所有流量，远程连接会立即断开，只有本地能登陆
firewall-cmd --panic-off  # 取消应急模式，但需要重启firewalld后才可以远程ssh
firewall-cmd --query-panic  # 查看是否为应急模式
```



