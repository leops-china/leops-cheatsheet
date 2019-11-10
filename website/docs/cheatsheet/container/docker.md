# Docker-Cheat Sheet

https://github.com/wsargent/docker-cheat-sheet/tree/master/zh-cn

## 编译镜像

```bash
docker build -t myapp:1.0 .

docker build -t htop - << EOF
FROM alpine
RUN apk --no-cache add htop
EOF
```

## 常用

```bash
# 查看容器 ip 和主机名
docker ps | awk '{print $1}' | xargs -I{} docker inspect -f '{{.NetworkSettings.IPAddress}} {{.Config.Hostname}}' {}

# 显示容器和 ip
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)

# 将容器的8000端口映射到Docker主机的8001端口
iptables -t nat -A  DOCKER -p tcp --dport 8001 -j DNAT --to-destination 172.17.0.19:8000
```

## 运行

```bash
docker run 启动镜像
​ -i：标准输入，交互
​ -t：分配一个终端
​ -d：在后台运行容器
​ --name：指定容器的名字
​ --rm：运行完毕即删除
​ -v：绑定挂载卷
  ​ -v /host/file:/container/file
  ​ -v /host/file:/container/file:ro
  ​ -v /data
  ​ -v vol:/data
​ -P：端口映射，端口随机产生
​ -p：端口映射，端口指定
​ --link：容器互联
​ --cidfile: 以将 containerID 输出到指定的文件中
​ --network: 连接 docker 网络
 --volumes-from 共享 voluems
```

## 删除

```bash
docker rmi IMAGE ID                 # 删除镜像文件
docker rmi -f IMAGE ID              # 强制删除镜像文件
docker rmi $(docker images -q)  # 删除所有镜像
docker rmi $(docker images -q -f dangling=true)  # 删除所有\'untagged/dangling\' ()状态的镜像
docker rmi $(docker images | grep "none" | awk '{print $3}')  # 直接删除带none的镜像

docker rm CONTAINER ID       # 删除容器
docker rm -f CONTAINER ID    # 强制删除容器
docker rm $(docker ps -a -q)  # 删除所有已经停止的容器

docker kill $(docker ps -q)   # 杀死所有running状态的容器

docker system prune  　 # 删除所有未使用数据
docker system prune --filter --until=240h  # 删除在过去240小时内未使用的数据
docker container prune   #　清除终止的容器
docker volume prune 　   #　删除未使用的volume
docker network prune     # 删除未使用的network
docker image prune       # 删除未使用的image

docker volume rm $(docker volume ls -qf dangling=true)　　# 删除未使用的volume
```

## docker hub

```bash
docker search              # 在hub中查找镜像
docker pull user/image     # 从hub中拉取image
docker push user/image     # 把进行推送到hub中
docker login               # 登录hub
docker logout              # 登出hub
```

## docker 命令

```
docker info 查看 docker 信息
docker version 查看 docker 版本信息
docker image 查看本地镜像
docker ps 查看当前运行的容器
docker stats #实时监控容器状态信息
docker inspect CONTAINER #查看容器详细信息
docker top CONTAINER #查看运行中容器进程运行状态
docker port CONTAINER #查看容器端口映射
docker logs CONTAINER #查看容器的日志信息
docker tag 860c279d2fec runoob/centos:dev 添加 tag
docker logs 容器内部的标准输出
docker system df 查看镜像所占用的空间
docker diff 查看容器修改了哪些文件
bash docker volume ls -qf dangling=true  列出 volumes
```

```
docker network create -d bridge my-net 新建网络
  -b BRIDGE 或 --bridge=BRIDGE 指定容器挂载的网桥
  --bip=CIDR 定制 docker0 的掩码
  -H SOCKET... 或 --host=SOCKET... Docker 服务端接收命令的通道
  --icc=true|false 是否支持容器之间进行通信
  --ip-forward=true|false 请看下文容器之间的通信
  --iptables=true|false 是否允许 Docker 添加 iptables 规则
  --mtu=BYTES 容器网络中的 MTU

```

## 进入容器：

```
docker exec -it centos /bin/bash
```

## 启动/停止容器：

```
docker start CONTAINER ID
docker stop CONTAINER ID
```

## 导出和导入容器

```
docker export 7691a814370e > ubuntu.tar
cat ubuntu.tar | docker import - test/ubuntu:v1.0
```

## Dockerfile

```bash
FROM             # 为其他指令设置基础镜像 (Base Image)。
MAINTAINER       # 为生成的镜像设置作者字段。
RUN              # 在当前镜像的基础上生成一个新层并执行命令。
CMD              # 设置容器默认执行命令。
EXPOSE           # 告知 Docker 容器在运行时所要监听的网络端口。注意：并没有实际上将端口设置为可访问。
ENV              # 设置环境变量。
ADD              # 将文件、目录或远程文件复制到容器中。缓存无效。请尽量用 COPY 代替 ADD。
COPY             # 将文件或文件夹复制到容器中。注意：将使用 ROOT 用户复制文件，故无论 USER / WORKDIR 指令如何配置，你都需要手动修改其所有者（chown），ADD 也是一样。
ENTRYPOINT       # 将容器设为可执行的。
VOLUME           # 在容器内部创建挂载点 (mount point) 指向外部挂载的卷标或其他容器。
USER             # 设置随后执行 RUN / CMD / ENTRYPOINT 命令的用户名。
WORKDIR          # 设置工作目录 (working directory)。
ARG              # 定义编译时 (build-time) 变量。
ONBUILD          # 添加触发指令，当该镜像被作为其他镜像的基础镜像时该指令会被触发。
STOPSIGNAL       # 设置停止容器时，向容器内发送的系统调用信号 (system call signal)。
LABEL            # 将键值对元数据 (key/value metadata) 应用到镜像、容器或是守护进程。
```
