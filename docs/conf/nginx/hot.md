## php 程序配置

```
server {
	listen 80;
	listen [::]:80;

	server_name example.com;
	set $base /var/www/example.com;
	root $base/public;

	# logging
	access_log /var/log/nginx/example.com.access.log;

	# index.php
	index index.php;

	# index.php fallback
	location / {
		try_files $uri $uri/ /index.php?$query_string;
	}

	# handle .php
	location ~ \.php$ {
		# 404
    try_files $fastcgi_script_name =404;

    # default fastcgi_params
    include fastcgi_params;

    # fastcgi settings
    fastcgi_pass			unix:/var/run/php/php7.2-fpm.sock;
    fastcgi_index			index.php;
    fastcgi_buffers			8 16k;
    fastcgi_buffer_size		32k;

    # fastcgi params
    fastcgi_param DOCUMENT_ROOT		$realpath_root;
    fastcgi_param SCRIPT_FILENAME	$realpath_root$fastcgi_script_name;
    fastcgi_param PHP_ADMIN_VALUE	"open_basedir=$base/:/usr/lib/php/:/tmp/";
	}
}
```

## django 配置

```
server {
	listen 80;
	listen [::]:80;

	server_name example.com;
	set $base /var/www/example.com;

	# logging
	access_log /var/log/nginx/example.com.access.log;

	# Python
	location / {
		# default uwsgi_params
    include uwsgi_params;

    # uwsgi settings
    uwsgi_pass						        unix:/tmp/uwsgi.sock;
    uwsgi_param Host				      $host;
    uwsgi_param X-Real-IP			    $remote_addr;
    uwsgi_param X-Forwarded-For		$proxy_add_x_forwarded_for;
    uwsgi_param X-Forwarded-Proto	$http_x_forwarded_proto;
	}

	# Django media
	location /media/ {
		alias $base/media/;
	}

	# Django static
	location /static/ {
		alias $base/static/;
	}

}

```

## Angular/Vue/React 项目

```
server {
	listen 80;
	listen [::]:80;

	server_name example.com;
	root /var/www/example.com/public;

	# index.html fallback
	location / {
		try_files $uri $uri/ /index.html;
	}
}
```

## https 配置

```
server {
	listen 443 ssl http2;
	listen [::]:443 ssl http2;

	server_name example.com;
	root /var/www/example.com/public;

	# SSL
	ssl_session_timeout 1d;
	ssl_session_cache shared:SSL:10m;
	ssl_session_tickets off;

	# Diffie-Hellman parameter for DHE ciphersuites
	ssl_dhparam /etc/nginx/dhparam.pem;

	# Mozilla Intermediate configuration
	ssl_protocols TLSv1.2 TLSv1.3;
	ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

	# SSL Certificate
	ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
	ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

	# logging
	access_log /var/log/nginx/example.com.access.log;

	# index.html fallback
	location / {
		try_files $uri $uri/ /index.html;
	}
}

# 子域名跳转
server {
	listen 443 ssl http2;
	listen [::]:443 ssl http2;

	server_name *.example.com;

	# SSL
	ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
	ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

	return 301 https://example.com$request_uri;
}

# HTTP 跳转
server {
	listen 80;
	listen [::]:80;

	server_name .example.com;

	location / {
		return 301 https://example.com$request_uri;
	}
}

```

## 负载均衡

```
upstream backend {
  server 10.10.12.45:80 weight=1 max_fails=3 fail_timeout=3;
  server 10.10.12.46:80 weight=1 max_fails=3 fail_timeout=3;
}


server {
	listen 80;
	listen [::]:80;

	server_name example.com;

	# reverse proxy
	location / {
		proxy_pass http://backend;

		proxy_http_version	1.1;
    proxy_set_header Host				        $host;
    proxy_set_header X-Real-IP			    $remote_addr;
    proxy_set_header X-Forwarded-For	  $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto	$scheme;
    proxy_set_header X-Forwarded-Host	  $host;
    proxy_set_header X-Forwarded-Port	  $server_port;
	}

}


```

## 反向代理 WebSocket

```
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
	listen 80;
	listen [::]:80;

	server_name example.com;

	# reverse proxy
	location / {
		proxy_pass http://127.0.0.1:3000;

		proxy_http_version	1.1;
    proxy_cache_bypass	$http_upgrade;

    proxy_set_header Upgrade			      $http_upgrade;
    proxy_set_header Connection 	      $connection_upgrade;
    proxy_set_header Host				        $host;
    proxy_set_header X-Real-IP			    $remote_addr;
    proxy_set_header X-Forwarded-For	  $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto	$scheme;
    proxy_set_header X-Forwarded-Host	  $host;
    proxy_set_header X-Forwarded-Port	  $server_port;
	}

}

```

## 正向代理

```
server {
    resolver 8.8.8.8;
    resolver_timeout 5s;

    listen 0.0.0.0:8080;

    access_log  /home/reistlin/logs/proxy.access.log;
    error_log   /home/reistlin/logs/proxy.error.log;

    location / {
        proxy_pass $scheme://$host$request_uri;
        proxy_set_header Host $http_host;

        proxy_buffers 256 4k;
        proxy_max_temp_file_size 0;

        proxy_connect_timeout 30;

        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 301 1h;
        proxy_cache_valid any 1m;
    }
}

```

## 静态文件

```
# favicon.ico
location = /favicon.ico {
	log_not_found off;
	access_log off;
}

# robots.txt
location = /robots.txt {
	log_not_found off;
	access_log off;
}

# assets, media
location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
	expires 7d;
	access_log off;
}

# svg, fonts
location ~* \.(?:svgz?|ttf|ttc|otf|eot|woff2?)$ {
	add_header Access-Control-Allow-Origin "*";
	expires 7d;
	access_log off;
}
```