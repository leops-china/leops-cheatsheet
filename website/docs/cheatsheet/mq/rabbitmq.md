# rabbitmq

RabbitMQ 是实现了高级消息队列协议的开源消息代理软件。RabbitMQ 服务器是用 Erlang 语言编写的，而聚类和故障转移是构建在开放电信平台框架上的。所有主要的编程语言均有与代理接口通讯的客户端库。

- [官网](https://www.rabbitmq.com/)
- [官方文档](https://www.rabbitmq.com/documentation.html)
- [Github](https://github.com/rabbitmq/rabbitmq-server)

## 安装

centos 7

```bash
yum -y install socat
wget https://github.com/rabbitmq/erlang-rpm/releases/download/v22.1.8/erlang-22.1.8-1.el7.x86_64.rpm
rpm -i erlang-22.1.8-1.el7.x86_64.rpm
wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-3.8.2-1.el7.noarch.rpm
rpm -i rabbitmq-server-3.8.2-1.el7.noarch.rpm
systemctl enable --now rabbitmq-server

```

debian 9

```bash
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
dpkg -i erlang-solutions_1.0_all.deb
apt-get update
apt-get install erlang

apt-get -y install socat logrotate init-system-helpers adduser
wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server_3.8.2-1_all.deb

dpkg -i rabbitmq-server_3.8.2-1_all.deb
```

docker

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.8.2-management
```

**命令补齐**

```bash
rabbitmqadmin --bash-completion > /etc/bash_completion.d/rabbitmqadmin
```

## 端口

| 端口        | 用途                  |
| ----------- | --------------------- |
| 4369        | Erlang peer discovery |
| 5672, 5671  | AMQP Clients          |
| 25672       | Erlang distribution   |
| 35672-35682 | CLI-Tools             |
| 15672       | WebUI                 |
| 61613,61614 | STOMP                 |
| 1883, 8883  | MQTT                  |
| 15674       | WebSTOMP              |
| 15675       | WebMQTT               |
| 15692       | prometheus metrics    |

## 常用命令

```bash
## 添加用户并授权
rabbitmqctl add_user admin admin
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin '.*' '.*' '.*'
rabbitmqctl list_users

# 启用插件
rabbitmq-plugins enable rabbitmq_top
rabbitmq-plugins list

# Vhosts
rabbitmqctl add_vhost [vhost_name]
rabbitmqctl delete_vhost [vhost_name]
rabbitmqctl list_vhost [vhost_name]

# 列出 Exchanges
rabbitmqctl list_exchanges -p /test

# 列出 Bindings
rabbitmqctl list_bindings -p /test

# 列出consumers
rabbitmqctl list_consumers

# 状态
rabbitmqctl status
rabbitmqctl cluster_status

# 报告
rabbitmqctl report

# 创建 Queue 
rabbitmqadmin declare queue --vhost=/ name=ha1.queue durable=true
rabbitmqctl list_queues -p /

# 创建 exchange
rabbitmqadmin declare exchange --vhost=/ name=ha1.exchange type=direct durable=true
rabbitmqctl list_exchanges -p /

# 将exchange 与queue绑定
rabbitmqadmin declare binding --vhost=/ source=ha1.exchange destination=h1.queue routing_key=h1.queue
rabbitmqctl list_bindings -p /

# 使用队列发送消息
rabbitmqadmin publish routing_key=ha1.queue payload="just for queue"

# 使用路由发送消息
rabbitmqadmin publish exchange=ha1.exchange routing_key="ha1.queue" payload="hello, world"
rabbitmqadmin get queue="ha1.queue"

# 消费消息
rabbitmqadmin get queue=ha1.queue ackmode=ack_requeue_false

# 同步队列
rabbitmqctl sync_queue name
rabbitmqctl cancel_sync_queue name

# 清空队列
rabbitmqadmin purge queue name=h1.queue

# Dead Letter Queues
rabbitmqctl set_policy -p /test  DLX ".*" '{"dead-letter-exchange":"dlx"}' --apply-to queues
rabbitmqctl set_policy -p /test  DLX ".*" '{"dead-letter-routing-key":"mail.send.k"}' --apply-to queues

## ttl
rabbitmqctl set_policy TTL ".*" '{"message-ttl":86400000}' --apply-to queues
rabbitmqctl set_policy ttl-24h ".*" '{"message-ttl":86400000}' --apply-to queues  --priority 100
rabbitmqctl list_policies


# 连接其他主机
rabbitmqadmin -H myserver -u simon -p simon list vhosts

# Server
service rabbitmq-server start
service rabbitmq-server stop
service rabbitmq-server restart
service rabbitmq-server status

rabbitmqctl start_app
rabbitmqctl stop_app
rabbitmqctl stop [pidfile]
rabbitmqctl shutdown

# eval
rabbitmqctl eval 'application:set_env(rabbit, reverse_dns_lookups, true).'

# 修改内存限制
rabbitmqctl set_vm_memory_high_watermark 0.6


# 设置集群节点类型
rabbitmqctl stop_app
rabbitmqctl change_cluster_node_type dist
rabbitmqctl change_cluster_node_type ram
rabbitmqctl start_app
```

## 插件列表

| Plugin name                       | Description                                                                                                                                                                                                                                                                                                            |
| :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rabbitmq_amqp1_0                  | AMQP 1.0 protocol support. This plugin is several years old and is moderately mature. It may have certain limitations with its current architecture but most major AMQP 1.0 features should be in place.[README for this plugin](https://github.com/rabbitmq/rabbitmq-amqp1.0/blob/v3.7.x/README.md)                   |
| rabbitmq_auth_backend_ldap        | Authentication and authorisation plugin using an external LDAP server.[Documentation for the LDAP plugin](https://www.rabbitmq.com/ldap.html)                                                                                                                                                                          |
| rabbitmq_auth_backend_http        | Authentication and authorisation plugin that uses an external HTTP API.[README for this plugin](https://github.com/rabbitmq/rabbitmq-auth-backend-http/blob/v3.7.x/README.md)                                                                                                                                          |
| rabbitmq_auth_mechanism_ssl       | Authentication mechanism plugin using SASL EXTERNAL to authenticate using TLS (x509) client certificates.[README for this plugin](https://github.com/rabbitmq/rabbitmq-auth-mechanism-ssl/blob/v3.7.x/README.md)                                                                                                       |
| rabbitmq_consistent_hash_exchange | Consistent hashing exchange.[README for this plugin](https://github.com/rabbitmq/rabbitmq-consistent-hash-exchange/blob/v3.7.x/README.md)                                                                                                                                                                              |
| rabbitmq_federation               | Scalable messaging across WANs and administrative domains.[Documentation for the federation plugin](https://www.rabbitmq.com/federation.html)                                                                                                                                                                          |
| rabbitmq_federation_management    | Shows federation status in the management API and UI. Only of use when using rabbitmq_federation in conjunction with rabbitmq_management. In a heterogenous cluster this should be installed on the same nodes as rabbitmq_management.                                                                                 |
| rabbitmq_management               | A management / monitoring API over HTTP, along with a browser-based UI.[Documentation for the management plugin](https://www.rabbitmq.com/management.html)                                                                                                                                                             |
| rabbitmq_management_agent         | When installing the management plugin on _some_ of the nodes in a cluster, rabbitmq_management_agent must be enabled on all on _all_ cluster nodes nodes, otherwise stats for some nodes will not be collected.                                                                                                        |
| rabbitmq_mqtt                     | MQTT 3.1.1 support.[Documentation for the MQTT plugin](https://www.rabbitmq.com/mqtt.html)                                                                                                                                                                                                                             |
| rabbitmq_shovel                   | A plug-in for RabbitMQ that shovels messages from a queue on one broker to an exchange on another broker.[Documentation for the Shovel plugin](https://www.rabbitmq.com/shovel.html)                                                                                                                                   |
| rabbitmq_shovel_management        | Shows [Shovel](https://www.rabbitmq.com/shovel.html) status in the management API and UI. Only of use when using rabbitmq_shovel in conjunction with rabbitmq_management. In a heterogenous cluster this should be installed on the same nodes as [RabbitMQ management plugin](https://www.rabbitmq.com/plugins.html). |
| rabbitmq_stomp                    | Provides [STOMP protocol](http://stomp.github.io/stomp-specification-1.2.html) support in RabbitMQ.[Documentation for the STOMP plugin](https://www.rabbitmq.com/stomp.html)                                                                                                                                           |
| rabbitmq_tracing                  | Adds message tracing to the management plugin. Logs messages from the [firehose](https://www.rabbitmq.com/firehose.html) in a couple of formats.                                                                                                                                                                       |
| rabbitmq_trust_store              | Provides a client x509 certificate trust store.[README for this plugin](https://github.com/rabbitmq/rabbitmq-trust-store/blob/v3.7.x/README.md)                                                                                                                                                                        |
| rabbitmq_web_stomp                | STOMP-over-WebSockets: a bridge exposing rabbitmq_stomp to web browsers using WebSockets.[Documentation for the web-stomp plugin](https://www.rabbitmq.com/web-stomp.html)                                                                                                                                             |
| rabbitmq_web_mqtt                 | MQTT-over-WebSockets: a bridge exposing [rabbitmq_mqtt](https://www.rabbitmq.com/mqtt.html) to Web browsers using WebSockets.[Documentation for the web-mqtt plugin](https://www.rabbitmq.com/web-mqtt.html)                                                                                                           |
| rabbitmq_web_stomp_examples       | Adds some basic examples to rabbitmq_web_stomp: a simple "echo" service and a basic canvas-based collaboration tool.[README for this plugin](https://github.com/rabbitmq/rabbitmq-web-stomp-examples/blob/v3.7.x/README.md)                                                                                            |
| rabbitmq_web_mqtt_examples        | Adds some basic examples to rabbitmq_web_mqtt: a simple "echo" service and a basic canvas-based collaboration tool.[README for this plugin](https://github.com/rabbitmq/rabbitmq-web-mqtt-examples/blob/v3.7.x/README.md)                                                                                              |
