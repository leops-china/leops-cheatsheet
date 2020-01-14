## 变量

```
$args 此变量与请求行中的参数相等
$content_length 等于请求行的“Content_Length”的值。
$content_type 等同与请求头部的”Content_Type”的值
$document_root 等同于当前请求的root指令指定的值
$document_uri与$uri一样
$host 与请求头部中“Host”行指定的值或是request到达的server的名字（没有Host行）一样
$limit_rate 允许限制的连接速率
$request_method 等同于request的method，通常是“GET”或“POST”
$remote_addr 客户端ip
$remote_port 客户端port
$remote_user 等同于用户名，由ngx_http_auth_basic_module认证
$request_filename 当前请求的文件的路径名，由root或alias和URI request组合而成
$request_body_file
$request_uri 含有参数的完整的初始URI
$query_string与$args一样
$shecme http模式（http,https）尽在要求是评估例如
Rewrite ^(.+)$ $sheme://example.com$; Redirect;
$server_protocol 等同于request的协议，使用“HTTP/或“HTTP/
$server_addr request到达的server的ip，一般获得此变量的值的目的是进行系统调用。为了避免系统调用，有必要在listen指令中指明ip，并使用bind参数。
$server_name 请求到达的服务器名
$server_port 请求到达的服务器的端口号
$uri 等同于当前request中的URI，可不同于初始值，例如内部重定向时或使用index
```

## Html 文件

```
server {
  listen 80 default_server;
  server_name www.example.com;

  location / {
    root /usr/share/nginx/html;
    # alias /usr/share/nginx/html;
    index index.html index.htm;
  }
}
```

## Http 负载均衡

```
upstream backend {
  server 10.10.12.45:80 weight=1;
  server app.example.com:80 weight=2;
}

server {
  location / {
    proxy_pass http://backend;
  }
}
```

## Tcp 负载均衡

```
stream {
    # 全局配置
    preread_timeout 120s;
    proxy_connect_timeout 120s;
    proxy_protocol_timeout 120s;
    resolver_timeout 120s;
    proxy_timeout 120s;
    tcp_nodelay on;

    # 设置日志格式
    log_format proxy '$remote_addr [$time_local] '
                 '$protocol $status $bytes_sent $bytes_received '
                 '$session_time "$upstream_addr" '
                 '"$upstream_bytes_sent" "$upstream_bytes_received" "$upstream_connect_time"';

    access_log /var/log/nginx/stream.access.log proxy;
    error_log /var/log/nginx/stream.error.log error;

    upstream app_pg {
        hash $remote_addr consistent;
        server 192.168.100.60:5432;
    }

    server {
        # 不指定协议默认是TCP协议
        listen 127.0.0.1:5432 so_keepalive=on;
        proxy_pass app_pg;
    }

    server{
        # keepalive的可配置参数差不多有以下几个：keepidle，keepintvl，keepcnt
        # keepidle为连接保持时间；keepintvl为连接的间隔时间；keepcnt是连接的个数
              # 表示将idle超时设置为30分钟，将探测间隔保留为系统默认值，并将探测计数设置为10个探测器
        # 实际配置的格式为：so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]
        listen *:3306 so_keepalive=30m::10;
        proxy_connect_timeout 10s;
        proxy_timeout 20s;
        proxy_buffer_size 512k;
        proxy_pass 192.168.100.60:8000;
    }
}
```

```
stream {
  upstream mysql_read {
    server read1.example.com:3306 weight=5;
    server read2.example.com:3306;
    server 10.10.12.34:3306 backup;
  }

  server {
    listen 3306;
    proxy_pass mysql_read;
  }


  upstream ssh {
    hash $remote_addr consistent;
    server 192.168.1.42:22 weight=5;
  }

  server {
    listen 2222;
    proxy_pass ssh;
  }
}
```

## Udp 负载均衡

```
stream {
    # 全局配置
    proxy_timeout 120s;
    tcp_nodelay on;

    # 设置日志格式
    log_format proxy '$remote_addr [$time_local] '
                 '$protocol $status $bytes_sent $bytes_received '
                 '$session_time "$upstream_addr" '
                 '"$upstream_bytes_sent" "$upstream_bytes_received" "$upstream_connect_time"';

    access_log /var/log/nginx/stream.access.log proxy;
    error_log /var/log/nginx/stream.error.log error;

    # 配置dns负载均衡
    upstream dns_upstreams {
        server 1.1.1.1:53 weight=1;
        server 1.0.0.1:53 weight=1;        # weight负载均衡权重
        server 8.8.8.8:53 weight=1 backup; # backup标记为备用服务器
    }

    server{
        listen 53 udp;
        proxy_responses 1; # UDP协议专用；期望后端返回给客户端数据包的数量
        proxy_timeout 20s; # 超时时间
        proxy_pass dns_upstreams;
    }
}
```

```
stream {
  upstream ntp {
    server ntp1.example.com:123 weight=2;
    server ntp2.example.com:123;
  }

  server {
    listen 123 udp;
    proxy_pass ntp;
  }
}

# 也可以直接代理到后端
stream {
  server {
    listen 1195 udp reuseport;
    proxy_pass 127.0.0.1:1194;
  }
}
```

## 负载均衡方法

```
upstream backend {
  least_conn;
  server backend.example.com;
  server backend1.example.com;
}

# 默认使用Round robin轮询方式，同时考虑服务器的权重。 每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。
# least_conn 将请求传递到活动连接数最少的服务器。
# hash 根据key的hash结果来分配请求。
# random 将请求传递到随机选择的服务器，同时考虑服务器的权重。
# ip_hash 每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。
# least_time 以最小的平均响应时间和最少的活动连接数将请求传递给服务器。在nginx-plus中使用。
```

## 会话一致性

```
# 在backend第一次response之后，会在其头部添加一个session cookie，即由负载均衡器向客户端植入 cookie，之后客户端接下来的请求都会带有这个cookie值，Nginx可以根据这个cookie判断需要转发给哪个backend了。
upstream backend {
  server backend1.example.com;
  server backend2.example.com;
  sticky cookie
         affinity
         expires=1h
         domain=.example.com
         httponly
         secure
         path=/;
}

# 为的复杂也较为的智能，Nginx会自动监测request和response中的session信息，而且通常需要会话一致性的请求、应答中都会带有session信息，这和第一种方式相比是不用增加cookie，而是动态学习已有的session。
upstream backend {
  server backend1.example.com:8080;
  server backend2.example.com:8081;
  sticky learn
         create=$upstream_cookie_cookiename
         lookup=$cookie_cookiename
         zone=client_sessions:2m;
}

# 也是在backend第一次response之后，会产生一个route信息，route信息通常会从cookie/URI信息中提取。 如果是jsessionid cookie使用时，请求将路由到backend1; 如果URI参数是使用时，请求将路由到backend2。
map $cookie_jsessionid $route_cookie {
  ~.+\.(?P<route>\w+)$ $route;
}
map $request_uri $route_uri {
  ~jsessionid=.+\.(?P<route>\w+)$ $route;
}
upstream backend {
  server backend1.example.com route=a;
  server backend2.example.com route=b;
  sticky route $route_cookie $route_uri;
}
```

## 健康检查

```
# 被动健康检查
upstream backend {
  server backend1.example.com:1234 max_fails=3 fail_timeout=3s;
  server backend2.example.com:1234 max_fails=3 fail_timeout=3s;
}

# 主动健康检查
http {
  server {
    ...
    location / {
      proxy_pass http://backend;
      health_check interval=2s
                   fails=2
                   passes=5
                   uri=/
                   match=welcome;
    }
  }
  # status is 200, content type is "text/html",
  # and body contains "Welcome to nginx!"
  match welcome {
    status 200;
    header Content-Type = text/html;
    body ~ "Welcome to nginx!";
  }
}

# Tcp/Udp 健康检查
stream {
  ...
  server {
    listen 1234;
    proxy_pass stream_backend;
    health_check interval=10s
                 passes=2
                 fails=3;
                 health_check_timeout 5s;
  }
  ...
}
```

## 慢启动

```
# 后端服务器将在一定时间内缓慢增加连接数
upstream {
  zone backend 64k;
  server server1.example.com slow_start=20s;
  server server2.example.com slow_start=15s;
}
```

## A/B Testing

```
# 使用split_clients 可以对客户端流量进行切割

split_clients "${remote_addr}AAA" $variant {
  20.0% "backendv2";
  * "backendv1";
}

upstream backendv1 {
  server backend1.example.com:1234;
  server backend2.example.com:1234;
}

upstream backendv2 {
  server backend3.example.com:1234;
  server backend4.example.com:1234;
}


location / {
  proxy_pass http://$variant
}
```

## 拒绝国外 IP 请求

```
# 使用ngx_http_geoip2_module模块

load_module modules/ngx_http_geoip2_module.so;

http {
  geoip2 GeoLite2-Country.mmdb {
    $geoip2_data_country_name country iso_code;
  }

  server {
    ...
    location / {
      if ($geoip2_data_country_name != CN ) {
        return 403;
      }
    }
  }
}
```

## 限制连接

```
# 限制连接数,同一ip同一时间限制40连接
http {
  limit_conn_zone $binary_remote_addr zone=limitbyaddr:10m;
  limit_conn_status 429;
  ...
  server {
    ...
    limit_conn limitbyaddr 40;
    ...
  }
}

# 限制连接速度,同一ip没秒钟限制访问一次
http {
  limit_req_zone $binary_remote_addr zone=limitbyaddr:10m rate=1r/s;
  limit_req_status 429;
  ...
  server {
    ...
    limit_req zone=limitbyaddr burst=10 nodelay;
    ...
  }
}

# 限制带宽,客户端将在 10 MB 后限制为 1 MB 每秒
location /download/ {
  limit_rate_after 10m;
  limit_rate 1m;
}
```

## 内容缓存

```
# 定义缓存区域, proxy_cache定义在代理区域中使用缓存
proxy_cache_path /var/nginx/cache
keys_zone=CACHE:60m
          levels=1:2
          inactive=3h
          max_size=20g;

proxy_cache CACHE;


# 根据url来缓存内容
proxy_cache_key "$host$request_uri $cookie_user";

# 该配置告诉NGINX如果是HTTP则绕过缓存
proxy_cache_bypass $http_cache_bypass;

# 设置客户端缓存
location ~* \.(css|js)$ {
  expires 1y;
  add_header Cache-Control "public";
}

# 清除缓存
map $request_method $purge_method {
  PURGE 1;
  default 0;
}
server {
  ...
  location / {
    ...
    proxy_cache_purge $purge_method;
  }
}
# curl -XPURGE localhost/main.js

# 缓存切片， 对大文件进行切片存储响应
proxy_cache_path /tmp/mycache keys_zone=mycache:10m;
server {
  ...
  proxy_cache mycache;
  slice 1m;
  proxy_cache_key $host$uri$is_args$args$slice_range;
  proxy_set_header Range $slice_range;
  proxy_http_version 1.1;
  proxy_cache_valid 200 206 1h;
  location / {
    proxy_pass http://origin:80;
  }
}
```

## 认证

```
# basic 认证
# conf.d/passwd
name1:password1
name2:password2:comment
name3:password3

# encrypted password
openssl passwd MyPassword1234

location / {
  auth_basic "Private site";
  auth_basic_user_file conf.d/passwd;
}

# 子请求认证
location /private/ {
  auth_request /auth;
  auth_request_set $auth_status $upstream_status;
}
location = /auth {
  internal;
  proxy_pass http://auth-server;
  proxy_pass_request_body off;
  proxy_set_header Content-Length "";
  proxy_set_header X-Original-URI $request_uri;
}
```

## 安全控制

```
# 基于IP地址的访问控制
location /admin/ {
  deny 10.0.0.1;
  allow 10.0.0.0/20;
  allow 2001:0db8::/32;
  deny all;
}

# 基于请求方法的控制
map $request_method $cors_method {
  OPTIONS 11;
  GET 1;
  POST 1;
  default 0;
}

server {
  ...
  location / {
    if ($cors_method ~ '1') {
      add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS';
      add_header 'Access-Control-Allow-Origin' '*.example.com';
      add_header 'Access-Control-Allow-Headers'
                 'DNT,
                  Keep-Alive,
                  User-Agent,
                  X-Requested-With,
                  If-Modified-Since,
                  Cache-Control,
                  Content-Type';
    }
    if ($cors_method = '11') {
      add_header 'Access-Control-Max-Age' 1728000;
      add_header 'Content-Type' 'text/plain; charset=UTF-8';
      add_header 'Content-Length' 0;
      return 204;
    }
  }
}

# 客户端加密
http { # All directives used below are also valid in stream
  server {
    listen 8433 ssl;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_certificate /etc/nginx/ssl/example.pem;
    ssl_certificate_key /etc/nginx/ssl/example.key;
    ssl_certificate /etc/nginx/ssl/example.ecdsa.crt;
    ssl_certificate_key /etc/nginx/ssl/example.ecdsa.key;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
  }
}

# 代理后端加密
location / {
  proxy_pass https://upstream.example.com;
  proxy_ssl_verify on;
  proxy_ssl_verify_depth 2;
  proxy_ssl_protocols TLSv1.2;
}

# 保护url，除非请求URI包含以下内容的md5哈希字符串，否则禁止使用
location /resources {
  secure_link_secret mySecret;
  if ($secure_link = "") { return 403; }
  rewrite ^ /secured/$secure_link;
}
location /secured/ {
  internal;
  root /var/www;
}
# 使用
echo -n 'index.htmlmySecret' | openssl md5 -hex
curl www.example.com/resources/a53bee08a4bf0bbea978ddf736363a12/index.html


# 带有过期时间的保护url，除非请求URI包含以下内容的md5哈希字符串并且在时间范围内，否则禁止使用
location /resources {
  root /var/www;
  secure_link $arg_md5,$arg_expires;
  secure_link_md5 "$secure_link_expires$uri$remote_addr
  mySecret";
  if ($secure_link = "") { return 403; }
  if ($secure_link = "0") { return 410; }
}

# 使用
expires=$(date -d "2020-12-31 00:00" +%s --utc)
remote_addr=127.0.0.1
md5_str=$(echo -n "${expires}/resources/index.html${remote_addr} mySecret" \
| openssl md5 -binary \
| openssl base64 \
| tr +/ -_ \
| tr -d =)
curl "www.example.com/resources/index.html?md5=${md5_str}&expires=${expires}"

# http请求跳转https
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  return 301 https://$host$request_uri;
}

# 使用X-Forwarded-Proto头部跳转https
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  if ($http_x_forwarded_proto = 'http') {
    return 301 https://$host$request_uri;
  }
}

# HTTP严格安全传输, 这样所有请求都将通过HTTPS发出。
add_header Strict-Transport-Security max-age=31536000;

#　满足任何安全性设置
location / {
  satisfy any;
  allow 192.168.1.0/24;
  deny all;

  auth_basic "closed site";
  auth_basic_user_file conf/htpasswd;
}

```

## http2 配置

```
# 开启http2
server {
  listen 443 ssl http2 default_server;
  ssl_certificate server.crt;
  ssl_certificate_key server.key;
  ...
}

# 代理grpc后端
server {
  listen 80 http2;
  location / {
    grpc_pass grpc://backend.local:50051;
  }
}

# 以负载方式代理grpc后端，并开启ssl
upstream grpcservers {
  server backend1.local:50051;
  server backend2.local:50051;
}
server {
  listen 443 ssl http2 default_server;
  ssl_certificate server.crt;
  ssl_certificate_key server.key;
  location / {
    grpc_pass grpc://grpcservers;
  }
}

# http2 push
server {
  listen 443 ssl http2 default_server;
  ssl_certificate server.crt;
  ssl_certificate_key server.key;
  root /usr/share/nginx/html;
  location = /demo.html {
    http2_push /style.css;
    http2_push /image1.jpg;
  }
}

```

## 流媒体

```
# 开启mp4和flv流媒体
http {
  server {
    ...
    location /videos/ {
      mp4;
    }
    location ~ \.flv$ {
      flv;
    }
  }
}

```

## DNS 查询

```
http {
  resolver 10.0.0.2;
    upstream backend {
      zone backends 64k;
      server api.example.internal service=http resolve;
    }
  }
```

## 设置环境变量

```
# 使用 ngx_http_perl_module 模块设置变量
daemon off;
env APP_DNS;

include /usr/share/nginx/modules/*.conf;
...
http {
  perl_set $upstream_app 'sub { return $ENV{"APP_DNS"}; }';
  server {
    ...
    location / {
      proxy_pass https://$upstream_app;
    }
  }
}
```

## 开启 Stub Status

```
location /stub_status {
  stub_status;
  allow 127.0.0.1;
  deny all;
}
```

## 日志

```
# 请求日志格式
log_format geoproxy '[$time_local] $remote_addr '
                    '$realip_remote_addr $remote_user '
                    '$request_method $server_protocol '
                    '$scheme $server_name $uri $status '
                    '$request_time $body_bytes_sent '
                    '$geoip_city_country_code3 $geoip_region '
                    '"$geoip_city" $http_x_forwarded_for '
                    '$upstream_status $upstream_response_time '
                    '"$http_referer" "$http_user_agent"';
# Json类型的请求日志格式
log_format  json  '{"@timestamp": "$time_iso8601", '
                  '"clientRealIp": "$remote_addr", '
                  '"scheme": "$scheme", '
                  '"method": "$request_method", '
                  '"host": "$host", '
                  '"url": "$request_uri", '
                  '"size": $body_bytes_sent, '
                  '"referrer": "$http_referer", '
                  '"agent": "$http_user_agent", '
                  '"upstream_addr": "$upstream_addr", '
                  '"request_time": $request_time, '
                  '"request_length": $request_length, '
                  '"upstream_connect_time": "$upstream_connect_time", '
                  '"upstream_response_time": "$upstream_response_time", '
                  '"upstream_status": "$upstream_status", '
                  '"status": "$status"}';

# 使用json类型编码，可以转换非ascii码
log_format  escape-json escape=json '{"@timestamp": "$time_iso8601", '
                                    '"clientRealIp": "$remote_addr", '
                                    '"scheme": "$scheme", '
                                    '"method": "$request_method", '
                                    '"host": "$host", '
                                    '"url": "$request_uri", '
                                    '"size": $body_bytes_sent, '
                                    '"referrer": "$http_referer", '
                                    '"agent": "$http_user_agent", '
                                    '"request_body": "$request_body",'
                                    '"upstream_addr": "$upstream_addr", '
                                    '"request_time": $request_time, '
                                    '"request_length": $request_length, '
                                    '"upstream_connect_time": "$upstream_connect_time", '
                                    '"upstream_response_time": "$upstream_response_time", '
                                    '"upstream_status": "$upstream_status", '
                                    '"status": "$status"}';

# 请求日志
server {
  access_log /var/log/nginx/access.log geoproxy;
}

# 错误日志
error_log /var/log/nginx/error.log warn;

# 传送给syslog
error_log syslog:server=10.0.1.42 debug;
access_log syslog:server=10.0.1.42,tag=nginx,severity=info geoproxy;

# 使用request_id开启调用链
log_format trace '$remote_addr - $remote_user [$time_local] '
                 '"$request" $status $body_bytes_sent '
                 '"$http_referer" "$http_user_agent" '
                 '"$http_x_forwarded_for" $request_id';

upstream backend {
  server 10.0.0.42;
}
server {
  listen 80;
  add_header X-Request-ID $request_id; # Return to client

  location / {
    proxy_pass http://backend;
    proxy_set_header X-Request-ID $request_id; #Pass to app
    access_log /var/log/nginx/access_trace.log trace;
  }
}

# 设置日志的缓存buffer
access_log /var/log/nginx/access.log main buffer=32k flush=1m;
```

## 保持连接

```
# 与客户端保持连接
http {
  keepalive_requests 320;
  keepalive_timeout 300s;
  ...
}

# 与代理后端保持连接
proxy_http_version 1.1;
proxy_set_header Connection "";

upstream backend {
  server 10.0.0.42;
  server 10.0.2.56;
  keepalive 32;
}
```

## 缓冲响应

```
# 使用nginx内存缓冲
server {
  proxy_buffering on;
  proxy_buffer_size 8k;
  proxy_buffers 8 32k;
  proxy_busy_buffer_size 64k;
  ...
}
```

## 跨域请求

```
location /{
  add_header Access-Control-Allow-Origin *;
  add_header 'Access-Control-Allow-Credentials' 'true';
  add_header 'Access-Control-Allow-Headers' 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,X-Requested-With';
  add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS';
}
```

## proxypass

```
假设下面四种情况分别用 http://192.168.1.1/proxy/test.html 进行访问。

第一种：
location /proxy/ {
    proxy_pass http://127.0.0.1/;
}
代理到URL：http://127.0.0.1/test.html

第二种（相对于第一种，最后少一个 / ）
location /proxy/ {
    proxy_pass http://127.0.0.1;
}
代理到URL：http://127.0.0.1/proxy/test.html

第三种：
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa/;
}
代理到URL：http://127.0.0.1/aaa/test.html

第四种（相对于第三种，最后少一个 / ）
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa;
}
代理到URL：http://127.0.0.1/aaatest.html

```

## gzip 配置

```
  gzip on;
  gzip_vary on;
  gzip_min_length  1100;
  gzip_comp_level 6;
  gzip_buffers     16 8k;
  #gzip_http_version 1.0;
  gzip_types text/plain text/css image/jpeg image/gif image/png text/javascript application/json application/javascript application/x-javascript application/xml;
```

## 隐藏 nginx 信息

```
  server_tokens off;
  more_clear_headers 'Server';
  proxy_hide_header X-Application-Context;
  underscores_in_headers on;
```

## 安全 header

```
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

```

## 拦截 http 方法

```
if ($request_method = OPTIONS) {
  return 200;
}
```

## 开启断点续传

```
add_header Accept-Ranges bytes;
proxy_force_ranges on;
```

> 如果后端不支持断点续传时添加：proxy_force_ranges on;

example

```
# curl -i --range 0-100 http://test.com/file.mp3

HTTP/1.1 206 Partial Content
...
Accept-Ranges: bytes
Content-Range: bytes 0-100/104239
...
``


## 缓存 range

> 这个要求后端支持 range 请求

**缓存 range 请求的数据**

```

proxy_cache_key $host&uri&is_args&args$http_range;
proxy_set_header Range $http_range;
proxy_set_header If-Range $http_if_range;
proxy_cache_valid 200 206;

```

**不缓存 range 请求的数据**

只对 非 Range 的请求缓存，对 range 的下载请求不做缓存

```

proxy_cache_key $host&uri&is_args&args;  #key中不缓存range信息
proxy_set_header Range $http_range;
proxy_set_header If-Range $http_if_range;
proxy_no_cache $http_range \$http_if_range; #加了一个配置
proxy_cache_valid 200;

```

```
