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
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        constraints: [node.role == manager]

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - '5000:80'
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure

  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - '5001:80'
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints: [node.role == manager]

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - '8080:8080'
    stop_grace_period: 1m30s
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    deploy:
      placement:
        constraints: [node.role == manager]

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

- `context`
  ```yaml
  build:
  context: ./dir
  ```
- `dockerfile`
  ```yaml
  build:
    context: .
    dockerfile: Dockerfile-alternate
  ```
- `args`

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

- `cache_from`
  ```yaml
  build:
    context: .
    cache_from:
      - alpine:latest
      - corp/web_app:3.14
  ```
- `LABELS`

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

- `SHM_SIZE`

  ```yaml
  build:
    context: .
    shm_size: '2gb'

  build:
    context: .
    shm_size: 10000000
  ```

- `TARGET`

  ```yaml
  build:
    context: .
    target: prod
  ```

## cap_add, cap_drop

```yaml
cap_add:
  - ALL

cap_drop:
  - NET_ADMIN
  - SYS_ADMIN
```

## cgroup_parent

```yaml
cgroup_parent: m-executor-abcd
```

### command

覆盖镜像的 command.

```yaml
command: bundle exec thin -p 3000
```

### container_name

自定义容器名称

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

Express dependency between services, Service dependencies cause the following behaviors:

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

List of device mappings. Uses the same format as the --device docker client create option.

```yaml
devices:
  - '/dev/ttyUSB0:/dev/ttyUSB0'
```

## dns

Custom DNS servers. Can be a single value or a list.

```yaml
dns: 8.8.8.8
dns:
  - 8.8.8.8
  - 9.9.9.9
```

## dns_search

Custom DNS search domains. Can be a single value or a list.

```yaml
dns_search: example.com
dns_search:
  - dc1.example.com
  - dc2.example.com
```

## entrypoint

Override the default entrypoint.

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

Add environment variables from a file. Can be a single value or a list.

If you have specified a Compose file with `docker-compose -f FILE`, paths in `env_file` are relative to the directory that file is in.

Environment variables declared in the [environment](https://docs.docker.com/compose/compose-file/#environment) section _override_ these values – this holds true even if those values are empty or undefined.

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

Add environment variables. You can use either an array or a dictionary. Any boolean values; true, false, yes no, need to be enclosed in quotes to ensure they are not converted to True or False by the YML parser.

Environment variables with only a key are resolved to their values on the machine Compose is running on, which can be helpful for secret or host-specific values.

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

Expose ports without publishing them to the host machine - they’ll only be accessible to linked services. Only the internal port can be specified.

```
expose:
 - "3000"
 - "8000"
```

## external_links

Link to containers started outside this `docker-compose.yml` or even outside of Compose, especially for containers that provide shared or common services. `external_links` follow semantics similar to the legacy option `links` when specifying both the container name and the link alias (`CONTAINER:ALIAS`).

```yaml
external_links:
  - redis_1
  - project_db_1:mysql
  - project_db_1:postgresql
```

## extra_hosts

Add hostname mappings. Use the same values as the docker client `--add-host` parameter.

```
extra_hosts:
 - "somehost:162.242.195.82"
 - "otherhost:50.31.209.229"
```

An entry with the ip address and hostname is created in `/etc/hosts` inside containers for this service, e.g:

```none
162.242.195.82  somehost
50.31.209.229   otherhost
```

## healthcheck

> [Version 2.1 file format](https://docs.docker.com/compose/compose-file/compose-versioning/#version-21) and up.

Configure a check that’s run to determine whether or not containers for this service are “healthy”. See the docs for the [HEALTHCHECK Dockerfile instruction](https://docs.docker.com/engine/reference/builder/#healthcheck) for details on how healthchecks work.

```
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

```yaml
healthcheck:
  disable: true
```

## image

Specify the image to start the container from. Can either be a repository/tag or a partial image ID.

```yaml
image: redis
image: ubuntu:14.04
image: tutum/influxdb
image: example-registry.com:4000/postgresql
image: a4bc65fd
```

## init

> [Added in version 3.7 file format](https://docs.docker.com/compose/compose-file/compose-versioning/#version-37).

Run an init inside the container that forwards signals and reaps processes. Set this option to `true` to enable this feature for the service.

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

Add metadata to containers using [Docker labels](https://docs.docker.com/engine/userguide/labels-custom-metadata/). You can use either an array or a dictionary.

It’s recommended that you use reverse-DNS notation to prevent your labels from conflicting with those used by other software.

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

Link to containers in another service. Either specify both the service name and a link alias (`SERVICE:ALIAS`), or just the service name.

```
web:
  links:
   - db
   - db:database
   - redis
```

## logging

Logging configuration for the service.

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

Network mode. Use the same values as the docker client `--network` parameter, plus the special form `service:[service name]`.

```yaml
network_mode: "bridge"
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "container:[container name/id]"
```

## networks

Networks to join, referencing entries under the

```
services:
  some-service:
    networks:
     - some-network
     - other-network
```

### ALIASES

Aliases (alternative hostnames) for this service on the network. Other containers on the same network can use either the service name or this alias to connect to one of the service’s containers.

Since `aliases` is network-scoped, the same service can have different aliases on different networks.

> **Note**: A network-wide alias can be shared by multiple containers, and even by multiple services. If it is, then exactly which container the name resolves to is not guaranteed.

The general format is shown here.

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

In the example below, three services are provided (`web`, `worker`, and `db`), along with two networks (`new` and `legacy`). The `db` service is reachable at the hostname `db` or `database` on the `new` network, and at `db` or `mysql` on the `legacy` network.

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

Specify a static IP address for containers for this service when joining the network.

The corresponding network configuration in the [top-level networks section](https://docs.docker.com/compose/compose-file/#network-configuration-reference) must have an `ipam` block with subnet configurations covering each static address.

> If IPv6 addressing is desired, the [`enable_ipv6`](https://docs.docker.com/compose/compose-file/compose-file-v2/##enable_ipv6) option must be set, and you must use a [version 2.x Compose file](https://docs.docker.com/compose/compose-file/compose-file-v2/#ipv4_address-ipv6_address). _IPv6 options do not currently work in swarm mode_.

An example:

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

```yaml
pid: 'host'
```

Sets the PID mode to the host PID mode. This turns on sharing between container and the host operating system the PID address space. Containers launched with this flag can access and manipulate other containers in the bare-metal machine’s namespace and vice versa.

## ports

Expose ports.

> **Note**: Port mapping is incompatible with `network_mode: host`

### SHORT SYNTAX

Either specify both ports (`HOST:CONTAINER`), or just the container port (an ephemeral host port is chosen).

> **Note**: When mapping ports in the `HOST:CONTAINER` format, you may experience erroneous results when using a container port lower than 60, because YAML parses numbers in the format `xx:yy` as a base-60 value. For this reason, we recommend always explicitly specifying your port mappings as strings.

```yaml
ports:
  - '3000'
  - '3000-3005'
  - '8000:8000'
  - '9090-9091:8080-8081'
  - '49100:22'
  - '127.0.0.1:8001:8001'
  - '127.0.0.1:5000-5010:5000-5010'
  - '6060:6060/udp'
```

### LONG SYNTAX

The long form syntax allows the configuration of additional fields that can’t be expressed in the short form.

- `target`: the port inside the container
- `published`: the publicly exposed port
- `protocol`: the port protocol (`tcp` or `udp`)
- `mode`: `host` for publishing a host port on each node, or `ingress` for a swarm mode port to be load balanced.

```yaml
ports:
  - target: 80
    published: 8080
    protocol: tcp
    mode: host
```

> **Note**: The long syntax is new in v3.2

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

Mount host paths or named volumes, specified as sub-options to a service.

You can mount a host path as part of a definition for a single service, and there is no need to define it in the top level `volumes` key.

But, if you want to reuse a volume across multiple services, then define a named volume in the [top-level `volumes` key](https://docs.docker.com/compose/compose-file/#volume-configuration-reference). Use named volumes with [services, swarms, and stack files](https://docs.docker.com/compose/compose-file/#volumes-for-services-swarms-and-stack-files).

> **Note**: The top-level [volumes](https://docs.docker.com/compose/compose-file/#volume-configuration-reference) key defines a named volume and references it from each service’s `volumes` list. This replaces `volumes_from` in earlier versions of the Compose file format. See [Use volumes](https://docs.docker.com/engine/admin/volumes/volumes/) and [Volume Plugins](https://docs.docker.com/engine/extend/plugins_volume/) for general information on volumes.

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

> **Note**: See [Use volumes](https://docs.docker.com/engine/admin/volumes/volumes/) and [Volume Plugins](https://docs.docker.com/engine/extend/plugins_volume/) for general information on volumes.

### SHORT SYNTAX

Optionally specify a path on the host machine (`HOST:CONTAINER`), or an access mode (`HOST:CONTAINER:ro`).

You can mount a relative path on the host, that expands relative to the directory of the Compose configuration file being used. Relative paths should always begin with `.` or `..`.

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

### LONG SYNTAX

The long form syntax allows the configuration of additional fields that can’t be expressed in the short form.

- `type`: the mount type `volume`, `bind`, `tmpfs` or `npipe`

- `source`: the source of the mount, a path on the host for a bind mount, or the name of a volume defined in the [top-level `volumes` key](https://docs.docker.com/compose/compose-file/#volume-configuration-reference). Not applicable for a tmpfs mount.

- `target`: the path in the container where the volume is mounted

- `read_only`: flag to set the volume as read-only

- ```
  bind
  ```

  : configure additional bind options

  - `propagation`: the propagation mode used for the bind

- ```
  volume
  ```

  : configure additional volume options

  - `nocopy`: flag to disable copying of data from a container when a volume is created

- ```
  tmpfs
  ```

  : configure additional tmpfs options

  - `size`: the size for the tmpfs mount in bytes

- `consistency`: the consistency requirements of the mount, one of `consistent` (host and container have identical view), `cached` (read cache, host view is authoritative) or `delegated` (read-write cache, container’s view is authoritative)

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

> **Note**: The long syntax is new in v3.2

### VOLUMES FOR SERVICES, SWARMS, AND STACK FILES

When working with services, swarms, and `docker-stack.yml` files, keep in mind that the tasks (containers) backing a service can be deployed on any node in a swarm, and this may be a different node each time the service is updated.

In the absence of having named volumes with specified sources, Docker creates an anonymous volume for each task backing a service. Anonymous volumes do not persist after the associated containers are removed.

If you want your data to persist, use a named volume and a volume driver that is multi-host aware, so that the data is accessible from any node. Or, set constraints on the service so that its tasks are deployed on a node that has the volume present.

As an example, the `docker-stack.yml` file for the [votingapp sample in Docker Labs](https://github.com/docker/labs/blob/master/beginner/chapters/votingapp.md) defines a service called `db` that runs a `postgres` database. It is configured as a named volume to persist the data on the swarm, _and_ is constrained to run only on `manager` nodes. Here is the relevant snip-it from that file:

```yaml
version: '3.7'
services:
  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        constraints: [node.role == manager]
```

### CACHING OPTIONS FOR VOLUME MOUNTS (DOCKER DESKTOP FOR MAC)

On Docker 17.04 CE Edge and up, including 17.06 CE Edge and Stable, you can configure container-and-host consistency requirements for bind-mounted directories in Compose files to allow for better performance on read/write of volume mounts. These options address issues specific to `osxfs` file sharing, and therefore are only applicable on Docker Desktop for Mac.

The flags are:

- `consistent`: Full consistency. The container runtime and the host maintain an identical view of the mount at all times. This is the default.
- `cached`: The host’s view of the mount is authoritative. There may be delays before updates made on the host are visible within a container.
- `delegated`: The container runtime’s view of the mount is authoritative. There may be delays before updates made in a container are visible on the host.

Here is an example of configuring a volume as `cached`:

```yaml
version: '3.7'
services:
  php:
    image: php:7.1-fpm
    ports:
      - '9000'
    volumes:
      - .:/var/www/project:cached
```

Full detail on these flags, the problems they solve, and their `docker run` counterparts is in the Docker Desktop for Mac topic [Performance tuning for volume mounts (shared filesystems)](https://docs.docker.com/docker-for-mac/osxfs-caching/).

## 其他

Each of these is a single value, analogous to its [docker run](https://docs.docker.com/engine/reference/run/) counterpart. Note that `mac_address` is a legacy option.

```yaml
user: postgresql
working_dir: /code

domainname: foo.com
hostname: foo
ipc: host
mac_address: 02:42:ac:11:65:43

privileged: true

read_only: true
shm_size: 64M
stdin_open: true
tty: true
```
