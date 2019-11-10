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
