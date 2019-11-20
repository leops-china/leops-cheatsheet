# docker-compose

Docker-Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。

- [官方文档](https://docs.docker.com/compose/compose-file/)
- [示例](https://github.com/lework/Docker-compose-file)

## 示例

```yaml
version: '3.7'
services:
  redis:
    image: redis:alpine
    ports:
      - '6379'
    networks:
      - frontend

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - '5000:80'
    networks:
      - frontend
    depends_on:
      - redis
  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - '5001:80'
    networks:
      - backend
    depends_on:
      - db

  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - '8080:8080'
    stop_grace_period: 1m30s
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'

networks:
  frontend:
  backend:

volumes:
  db-data:
```

## 配置文件

默认的配置文件路径`./docker-compose.yml`, 使用`yaml`模板语法编写, 文件后缀使用`.yml`或`.yaml`都可以。

> 排除了 `swarm` 的配置

## build

> 构建镜像的配置选项

```
version: "3.7"
services:
  webapp:
    build: ./dir

version: "3.7"
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
```

参数

- `context`   可以是 Dockerfile 的文件路径，也可以是到链接到 git 仓库的 url, 当提供的值是相对路径时，它被解析为相对于撰写文件的路径。 
  
  ```yaml
  build:
  context: ./dir
  ```
- `dockerfile`  指定 dockerfile 文件来构建，必须指定构建路径 
  
  ```yaml
  build:
    context: .
    dockerfile: Dockerfile-alternate
  ```
- `args`  添加构建参数，这些参数是仅在构建过程中可访问的环境变量,它和Dockerfile中ARG效果类似 

  ```yaml
  build:
    context: .
    args:
      buildno: 1
      gitcommithash: cdc3b19

  build:
    context: .
    args:
      - buildno=1
      - gitcommithash=cdc3b19
  ```

- `cache_from`   缓存解析镜像列表 
  
  ```yaml
  build:
    context: .
    cache_from:
      - alpine:latest
      - corp/web_app:3.14
  ```
- `LABELS`  使用 Docker标签 将元数据添加到生成的镜像中 

  ```yaml
  build:
    context: .
    labels:
      com.example.description: "Accounting webapp"
      com.example.department: "Finance"
      com.example.label-with-empty-value: ""

  build:
    context: .
    labels:
      - "com.example.description=Accounting webapp"
      - "com.example.department=Finance"
      - "com.example.label-with-empty-value"
  ```

- `SHM_SIZE`  设置容器 /dev/shm 分区的大小，值为表示字节的整数值或表示字符的字符串 

  ```yaml
  build:
    context: .
    shm_size: '2gb'

  build:
    context: .
    shm_size: 10000000
  ```

- `TARGET`  根据对应的 Dockerfile 构建指定 Stage 

  ```yaml
  build:
    context: .
    target: prod
  ```

## cap_add, cap_drop

 添加或删除容器功能 

```yaml
cap_add:
  - ALL

cap_drop:
  - NET_ADMIN
  - SYS_ADMIN
```

## cgroup_parent

 为容器指定可选的父cgroup 

```yaml
cgroup_parent: m-executor-abcd
```

### command

 覆盖容器启动后默认执行的命令 

```yaml
command: bundle exec thin -p 3000
```

### container_name

 为自定义的容器指定一个名称，而不是使用默认的名称 

```yaml
container_name: my-web-container
```

## credential_spec

> **Note**: This option was added in v3.3. Using group Managed Service Account (gMSA) configurations with compose files is supported in Compose version 3.8.

Configure the credential spec for managed service account. This option is only used for services using Windows containers. The `credential_spec` must be in the format `file://` or `registry://`.

When using `file:`, the referenced file must be present in the `CredentialSpecs` subdirectory in the Docker data directory, which defaults to `C:\ProgramData\Docker\` on Windows. The following example loads the credential spec from a file named `C:\ProgramData\Docker\CredentialSpecs\my-credential-spec.json`:

```yaml
credential_spec:
  file: my-credential-spec.json
```

When using `registry:`, the credential spec is read from the Windows registry on the daemon’s host. A registry value with the given name must be located in:

```
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Virtualization\Containers\CredentialSpecs
```

The following example load the credential spec from a value named `my-credential-spec` in the registry:

```yaml
credential_spec:
  registry: my-credential-spec
```

## depends_on

服务之间的启动依赖关系，在依赖项启动后才能启动本容器

```yaml
version: '3.7'
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
```

## devices

 设置映射列表，与 Docker 客户端的 –device 参数类似 

```yaml
devices:
  - '/dev/ttyUSB0:/dev/ttyUSB0'
```

## dns

 自定义 DNS 服务器，与 –dns 具有一样的用途，可以是单个值或列表 

```yaml
dns: 8.8.8.8
dns:
  - 8.8.8.8
  - 9.9.9.9
```

## dns_search

 自定义 DNS 搜索域，可以是单个值或列表 

```yaml
dns_search: example.com
dns_search:
  - dc1.example.com
  - dc2.example.com
```

## entrypoint

定义接入点，覆盖 Dockerfile 中的定义 

```yaml
entrypoint: /code/entrypoint.sh

# 列表形式
entrypoint:
    - php
    - -d
    - zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so
    - -d
    - memory_limit=-1
    - vendor/bin/phpunit
```

## env_file

从文件中添加环境变量。可以是单个值或是列表,如果已经用 docker-compose -f FILE 指定了 Compose 文件，那么 env_file 路径值为相对于该文件所在的目录, 但 environment 环境中的设置的变量会会覆盖这些值，无论这些值未定义还是为 None. 

```yaml
env_file: .env
env_file:
  - ./common.env
  - ./apps/web.env
  - /opt/secrets.env
```

Compose expects each line in an env file to be in `VAR=VAL` format. Lines beginning with `#` are treated as comments and are ignored. Blank lines are also ignored.

```yaml
# Set Rails/Rack environment
RACK_ENV=development
```

## environment

 添加环境变量，可以使用数组或字典。与上面的 env_file 选项完全不同，反而和 arg 有几分类似，这个标签的作用是设置镜像变量，它可以保存变量到镜像里面，也就是说启动的容器也会包含这些变量设置，这是与 arg 最大的不同。
一般 arg 标签的变量仅用在构建过程中。而 environment 和 Dockerfile 中的 ENV 指令一样会把变量一直保存在镜像、容器中，类似 docker run -e 的效果. 

```yaml
environment:
  RACK_ENV: development
  SHOW: 'true'
  SESSION_SECRET:
environment:
  - RACK_ENV=development
  - SHOW=true
  - SESSION_SECRET
```

## expose

暴露端口，但不映射到宿主机，只被连接的服务访问。这个标签与 Dockerfile 中的 EXPOSE 指令一样，用于指定暴露的端口，但是只是作为一种参考，实际上 docker-compose.yml 的端口映射还得 ports 这样的标签.

```
expose:
 - "3000"
 - "8000"
```

## external_links

 链接到 docker-compose.yml 外部的容器，甚至 并非 Compose 项目文件管理的容器。参数格式跟 links 类似. 

```yaml
external_links:
  - redis_1
  - project_db_1:mysql
  - project_db_1:postgresql
```

## extra_hosts

 添加主机名的标签，就是往 /etc/hosts 文件中添加一些记录，与 Docker 客户端 中的 –add-host 类似： 

```
extra_hosts:
 - "somehost:162.242.195.82"
 - "otherhost:50.31.209.229"
```

## healthcheck

用于检查测试服务使用的容器是否正常. 

```
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
  start_period: 40s
```
禁用镜像的所有检查项目
```yaml
healthcheck:
  disable: true
```

## image

 指定image的ID，这个image ID可以是本地也可以是远程的，如果本地不存在，compose会尝试pull下来。 

```yaml
image: redis
image: ubuntu:14.04
image: tutum/influxdb
image: example-registry.com:4000/postgresql
image: a4bc65fd
```

## init

 在容器内运行init，转发信号并重新获得进程。将此选项设置为true可为服务启用此功能。 

```
version: "3.7"
services:
  web:
    image: alpine:latest
    init: true
```

## isolation

Specify a container’s isolation technology. On Linux, the only supported value is `default`. On Windows, acceptable values are `default`, `process` and `hyperv`. Refer to the [Docker Engine docs](https://docs.docker.com/engine/reference/commandline/run/#specify-isolation-technology-for-container---isolation) for details.

## labels

 使用 Docker 标签将元数据添加到容器，可以使用数组或字典。与 Dockerfile 中的 LABELS 类似： 

```
labels:
  com.example.description: "Accounting webapp"
  com.example.department: "Finance"
  com.example.label-with-empty-value: ""
labels:
  - "com.example.description=Accounting webapp"
  - "com.example.department=Finance"
  - "com.example.label-with-empty-value"
```

## links

> **Warning**: 是旧功能了，随时会被删除,请使用 network 网络

 链接到其它服务的中的容器，可以指定服务名称也可以指定链接别名（SERVICE：ALIAS)，与 Docker 客户端的 –link 有一样效果，会连接到其它服务中的容器. 

```
web:
  links:
   - db
   - db:database
   - redis
```

## logging

 配置日志服务 

```yaml
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"

# 配置项
driver: "json-file"
options:
  max-size: "200k"
  max-file: "10"

driver: "syslog"
driver: "none"
```

## network_mode

 可以指定使用服务或者容器的网络模式，用法类似于 Docke 客户端的 –network 选项 

```yaml
network_mode: "bridge"
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "container:[container name/id]"
```

## networks

 加入指定网络 

```
services:
  some-service:
    networks:
     - some-network
     - other-network
```

### ALIASES

 同一网络上的其他容器可以使用服务器名称或别名来连接到其他服务的容器 

```yaml
services:
  some-service:
    networks:
      some-network:
        aliases:
          - alias1
          - alias3
      other-network:
        aliases:
          - alias2
```

 下面实例中，提供 web 、worker以及db 服务，伴随着两个网络 new 和 legacy 。相同的服务可以在不同的网络有不同的别名: 

```yaml
version: '3.7'

services:
  web:
    image: 'nginx:alpine'
    networks:
      - new

  worker:
    image: 'my-worker-image:latest'
    networks:
      - legacy

  db:
    image: mysql
    networks:
      new:
        aliases:
          - database
      legacy:
        aliases:
          - mysql

networks:
  new:
  legacy:
```

### IPV4_ADDRESS, IPV6_ADDRESS

 为服务的容器指定一个静态 IP 地址 

```yaml
version: '3.7'

services:
  app:
    image: nginx:alpine
    networks:
      app_net:
        ipv4_address: 172.16.238.10
        ipv6_address: 2001:3984:3989::10

networks:
  app_net:
    ipam:
      driver: default
      config:
        - subnet: '172.16.238.0/24'
        - subnet: '2001:3984:3989::/64'
```

## pid

 将 PID 模式设置为主机 PID 模式，可以打开容器与主机操作系统之间的共享 PID 地址空间。使用此标志启动的容器可以访问和操作宿主机的其他容器，反之亦然。 

```yaml
pid: 'host'
```

## ports

 映射容器端口到本地主机 

### SHORT 语法



```yaml
# SHORT 语法 
# 可以使用 HOST:CONTAINER 的方式指定端口，也可以指定容器端口（选择临时主机端口），宿主机会随机映射端口。 
ports:
  - '3000'
  - '3000-3005'
  - '8000:8000'
  - '9090-9091:8080-8081'
  - '49100:22'
  - '127.0.0.1:8001:8001'
  - '127.0.0.1:5000-5010:5000-5010'
  - '6060:6060/udp'

# LONG 语法
ports:
  - target: 80      # 容器内的端口
    published: 8080 # 公开的端口
    protocol: tcp   # 端口协议（tcp 或 udp）
    mode: host      # 映射模式, 通过 host 用在每个节点还是哪个发布的主机端口或使用 ingress 用于集群模式端口进行平衡负载
```

## restart

`no` is the default restart policy, and it does not restart a container under any circumstance. When `always` is specified, the container always restarts. The `on-failure` policy restarts a container if the exit code indicates an on-failure error.

```yaml
restart: "no"
restart: always
restart: on-failure
restart: unless-stopped
```

> **Note**: This option is ignored when [deploying a stack in swarm mode](https://docs.docker.com/engine/reference/commandline/stack_deploy/) with a (version 3) Compose file. Use [restart_policy](https://docs.docker.com/compose/compose-file/#restart_policy) instead.

## security_opt

Override the default labeling scheme for each container.

```yaml
security_opt:
  - label:user:USER
  - label:role:ROLE
```

> **Note**: This option is ignored when [deploying a stack in swarm mode](https://docs.docker.com/engine/reference/commandline/stack_deploy/) with a (version 3) Compose file.

## stop_grace_period

Specify how long to wait when attempting to stop a container if it doesn’t handle SIGTERM (or whatever stop signal has been specified with [`stop_signal`](https://docs.docker.com/compose/compose-file/#stopsignal)), before sending SIGKILL. Specified as a [duration](https://docs.docker.com/compose/compose-file/#specifying-durations).

```yaml
stop_grace_period: 1s
stop_grace_period: 1m30s
```

By default, `stop` waits 10 seconds for the container to exit before sending SIGKILL.

## stop_signal

Sets an alternative signal to stop the container. By default `stop` uses SIGTERM. Setting an alternative signal using `stop_signal` causes `stop` to send that signal instead.

```yaml
stop_signal: SIGUSR1
```

## sysctls

Kernel parameters to set in the container. You can use either an array or a dictionary.

```yaml
sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0
sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
```

You can only use sysctls that are namespaced in the kernel. Docker does not support changing sysctls inside a container that also modify the host system. For an overview of supported sysctls, refer to [configure namespaced kernel parameters (sysctls) at runtime](https://docs.docker.com/engine/reference/commandline/run/#configure-namespaced-kernel-parameters-sysctls-at-runtime).

> This option requires Docker Engine 19.03 or up when [deploying a stack in swarm mode](https://docs.docker.com/engine/reference/commandline/stack_deploy/) with a (version 3) Compose file.

## tmpfs

> [Version 2 file format](https://docs.docker.com/compose/compose-file/compose-versioning/#version-2) and up.

Mount a temporary file system inside the container. Can be a single value or a list.

```yaml
tmpfs: /run
tmpfs:
  - /run
  - /tmp
```

> **Note**: This option is ignored when [deploying a stack in swarm mode](https://docs.docker.com/engine/reference/commandline/stack_deploy/) with a (version 3-3.5) Compose file.

> [Version 3.6 file format](https://docs.docker.com/compose/compose-file/compose-versioning/#version-3) and up.

Mount a temporary file system inside the container. Size parameter specifies the size of the tmpfs mount in bytes. Unlimited by default.

```yaml
 - type: tmpfs
     target: /app
     tmpfs:
       size: 1000
```

## ulimits

Override the default ulimits for a container. You can either specify a single limit as an integer or soft/hard limits as a mapping.

```yaml
ulimits:
  nproc: 65535
  nofile:
    soft: 20000
    hard: 40000
```

## userns_mode

```yaml
userns_mode: 'host'
```

Disables the user namespace for this service, if Docker daemon is configured with user namespaces. See [dockerd](https://docs.docker.com/engine/reference/commandline/dockerd/#disable-user-namespace-for-a-container) for more information.

> **Note**: This option is ignored when [deploying a stack in swarm mode](https://docs.docker.com/engine/reference/commandline/stack_deploy/) with a (version 3) Compose file.

## volumes

 挂载一个目录或者一个已存在的数据卷容器，可以直接使用 `HOST:CONTAINER` 这样的格式，或者使用 `HOST:CONTAINER:ro` 这样的格式，后者对于容器来说，数据卷是只读的，这样可以有效保护宿主机的文件系统。 

```yaml
version: '3.7'
services:
  web:
    image: nginx:alpine
    volumes:
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: ./static
        target: /opt/app/static

  db:
    image: postgres:latest
    volumes:
      - '/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock'
      - 'dbdata:/var/lib/postgresql/data'

volumes:
  mydata:
  dbdata:
```

### SHORT 语法

 可以选择在主机（HOST:CONTAINER）或访问模式（HOST:CONTAINER:ro）上指定路径。可以在主机上挂载相对路径，该路径相对于正在使用的 Compose 配置文件的目录进行扩展。相对路径应始终以 . 或 .. 开头 

```yaml
volumes:
  # Just specify a path and let the Engine create a volume
  - /var/lib/mysql

  # Specify an absolute path mapping
  - /opt/data:/var/lib/mysql

  # Path on the host, relative to the Compose file
  - ./cache:/tmp/cache

  # User-relative path
  - ~/configs:/etc/configs/:ro

  # Named volume
  - datavolume:/var/lib/mysql
```

### LONG 语法

The long form syntax allows the configuration of additional fields that can’t be expressed in the short form.

- `type`：安装类型，可以为 volume、bind 或 tmpfs
- `source`：安装源，主机上用于绑定安装的路径或定义在顶级 volumes密钥中卷的名称 ,不适用于 tmpfs 类型安装。
- `target`：卷安装在容器中的路径
- `read_only`：标志将卷设置为只读
- `bind`：配置额外的绑定选项
- `propagation`：用于绑定的传播模式
- `volume`：配置额外的音量选项
- `nocopy`：创建卷时禁止从容器复制数据的标志
- `tmpfs`：配置额外的 tmpfs 选项

```yaml
version: '3.7'
services:
  web:
    image: nginx:alpine
    ports:
      - '80:80'
    volumes:
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: ./static
        target: /opt/app/static

networks:
  webnet:

volumes:
  mydata:
```



## 其他

```yaml
user: postgresql              # 指定运行用户
working_dir: /code            # 工作目录

domainname: foo.com            # 搜索域
hostname: foo                  # 主机名称
ipc: host                      # IPC模式
mac_address: 02:42:ac:11:65:43 # mac地址

privileged: true               # 赋予此容器扩展的特权   

read_only: true                # 将容器的根文件系统挂载为只读
shm_size: 64M                  # 设置 /dev/shm 的大小
stdin_open: true
tty: true                      # 分配伪TTY
```
