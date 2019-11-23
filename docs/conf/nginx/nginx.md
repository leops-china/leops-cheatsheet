# Nginx


## 配置文件

> nginx 版本: 1.17.5

```
user  www-data;

error_log  /var/log/nginx/error.log;
pid        /var/run/nginx.pid;

worker_processes  auto;
worker_rlimit_nofile 65535;

events {
  use epoll;
  worker_connections  on;
  multi_accept 65535;
}

http {
  charset         utf-8;
  sendfile        on;
  tcp_nopush      on;
  tcp_nodelay     on;
  log_not_found   off;

  # MIME
  include       mime.types;
  default_type  application/octet-stream;

  # logging
  log_format  main  '{"@timestamp": "$time_iso8601", '
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

  log_format  main-json escape=json '{"@timestamp": "$time_iso8601", '
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
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log warn;

  # buffer
  server_names_hash_bucket_size 64;
  large_client_header_buffers 4 16k;
  types_hash_max_size 2048;
  client_header_buffer_size 4k;
  client_body_buffer_size 128k;
  client_max_body_size 100m;
  client_header_timeout 2m;
  client_body_timeout 2m;
  send_timeout 2m;

  open_file_cache max=65535 inactive=60s;
  open_file_cache_valid 80s;

  # keepalive
  keepalive_timeout  65;
  keepalive_requests 100;

  # gzip
  gzip on;
  gzip_vary on;
  gzip_min_length  1100;
  gzip_comp_level 6;
  gzip_buffers     16 8k;
  #gzip_http_version 1.0;
  gzip_types text/plain text/css image/jpeg image/gif image/png text/javascript application/json application/javascript application/x-javascript application/xml;

  # proxy
  proxy_buffers 4 128k;
  proxy_buffer_size 128k;
  proxy_busy_buffers_size 128k;
  proxy_temp_file_write_size 128k;
  proxy_max_temp_file_size 256m;
  proxy_send_timeout 120;
  proxy_read_timeout 120;
  proxy_connect_timeout 120;
  #proxy_next_upstream error timeout invalid_header http_500 http_503 http_404;

  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header Connection "";

  # server
  server_tokens off;
  more_clear_headers 'Server';
  proxy_hide_header X-Application-Context;
  underscores_in_headers on;

  # dns
  resolver 114.114.114 valid=60s;
  resolver_timeout 2s;

  # load configs
  include /etc/nginx/conf.d/*.conf;
}
```

## 内置变量

```
$args                    #请求中的参数值
$query_string            #同 $args
$arg_NAME                #GET请求中NAME的值
$is_args                 #如果请求中有参数，值为"?"，否则为空字符串
$uri                     #请求中的当前URI(不带请求参数，参数位于$args)，可以不同于浏览器传递的$request_uri的值，它可以通过内部重定向，或者使用index指令进行修改，$uri不包含主机名，如"/foo/bar.html"。
$document_uri            #同 $uri
$document_root           #当前请求的文档根目录或别名
$host                    #优先级：HTTP请求行的主机名>"HOST"请求头字段>符合请求的服务器名
$hostname                #主机名
$https                   #如果开启了SSL安全模式，值为"on"，否则为空字符串。
$binary_remote_addr      #客户端地址的二进制形式，固定长度为4个字节
$body_bytes_sent         #传输给客户端的字节数，响应头不计算在内；这个变量和Apache的mod_log_config模块中的"%B"参数保持兼容
$bytes_sent              #传输给客户端的字节数
$connection              #TCP连接的序列号
$connection_requests     #TCP连接当前的请求数量
$content_length          #"Content-Length" 请求头字段
$content_type            #"Content-Type" 请求头字段
$cookie_name             #cookie名称
$limit_rate              #用于设置响应的速度限制
$msec                    #当前的Unix时间戳
$nginx_version           #nginx版本
$pid                     #工作进程的PID
$pipe                    #如果请求来自管道通信，值为"p"，否则为"."
$proxy_protocol_addr     #获取代理访问服务器的客户端地址，如果是直接访问，该值为空字符串
$realpath_root           #当前请求的文档根目录或别名的真实路径，会将所有符号连接转换为真实路径
$remote_addr             #客户端地址
$remote_port             #客户端端口
$remote_user             #用于HTTP基础认证服务的用户名
$request                 #代表客户端的请求地址
$request_body            #客户端的请求主体：此变量可在location中使用，将请求主体通过proxy_pass，fastcgi_pass，uwsgi_pass和scgi_pass传递给下一级的代理服务器
$request_body_file       #将客户端请求主体保存在临时文件中。文件处理结束后，此文件需删除。如果需要之一开启此功能，需要设置client_body_in_file_only。如果将次文件传递给后端的代理服务器，需要禁用request body，即设置proxy_pass_request_body off，fastcgi_pass_request_body off，uwsgi_pass_request_body off，or scgi_pass_request_body off
$request_completion      #如果请求成功，值为"OK"，如果请求未完成或者请求不是一个范围请求的最后一部分，则为空
$request_filename        #当前连接请求的文件路径，由root或alias指令与URI请求生成
$request_length          #请求的长度 (包括请求的地址，http请求头和请求主体)
$request_method          #HTTP请求方法，通常为"GET"或"POST"
$request_time            #处理客户端请求使用的时间; 从读取客户端的第一个字节开始计时
$request_uri             #这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI，不包含主机名，例如："/cnphp/test.php?arg=freemouse"
$scheme                  #请求使用的Web协议，"http" 或 "https"
$server_addr             #服务器端地址，需要注意的是：为了避免访问linux系统内核，应将ip地址提前设置在配置文件中
$server_name             #服务器名
$server_port             #服务器端口
$server_protocol         #服务器的HTTP版本，通常为 "HTTP/1.0" 或 "HTTP/1.1"
$status                  #HTTP响应代码
$time_iso8601            #服务器时间的ISO 8610格式
$time_local              #服务器时间（LOG Format 格式）
$cookie_NAME             #客户端请求Header头中的cookie变量，前缀"$cookie_"加上cookie名称的变量，该变量的值即为cookie名称的值
$http_NAME               #匹配任意请求头字段；变量名中的后半部分NAME可以替换成任意请求头字段，如在配置文件中需要获取http请求头："Accept-Language"，$http_accept_language即可
$http_cookie
$http_post
$http_referer			#url跳转来源 （https://www.baidu.com/）
$http_user_agent		#用户终端浏览器等信息 （"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; GTB7.0; .NET4.0C;）
$http_x_forwarded_for	#获取到最原始用户IP，或者代理IP地址。
$sent_http_NAME			#可以设置任意http响应头字段；变量名中的后半部分NAME可以替换成任意响应头字段，如需要设置响应头Content-length，$sent_http_content_length即可
$upstream_response_time	#请求过程中，upstream响应时间（0.002）
$upstream_addr			#后台upstream的地址，即真正提供服务的主机地址 （10.10.10.100:80）
$upstream_status		#upstream状态 （200）
$sent_http_cache_control
$sent_http_connection
$sent_http_content_type
$sent_http_keep_alive
$sent_http_last_modified
$sent_http_location
$sent_http_transfer_encoding
```
