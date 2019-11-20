# DockerFile

## 示例

**sshd**

```
FROM ubuntu:16.04

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:THEPASSWORDYOUCREATED' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

**多个镜像**

```
FROM ubuntu
RUN echo foo > bar

FROM ubuntu
RUN echo moo > oink
```

**多阶段构建**

```
FROM golang:1.7.3 AS builder
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html
COPY app.go    .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/github.com/alexellis/href-counter/app .
CMD ["./app"]
```

> 没有别名时，可以用索引代替, COPY --from=0

## 编译

```bash
docker build -t build_repo:first_image /tmp/docker_builder
```

## 指令介绍

- FROM

  指定所创建的镜像的基础镜像，如果本地不存在，则默认会去 Docker Hub 下载指定镜像。

  ```
  FROM <image> [AS <name>]
  FROM <image>[:<tag>] [AS <name>]
  FROM <image>[@<digest>] [AS <name>]

  FROM busybox

  # 可以引用ARG参数
  ARG  CODE_VERSION=latest
  FROM base:${CODE_VERSION}
  CMD  /code/run-app

  FROM extras:${CODE_VERSION}
  CMD  /code/run-extras
  ```

* MAINTAINER

  指定维护者信息，格式为 MAINTAINER。(已弃用，但仍兼容，使用 LABEL 代替)

  ```
  MAINTAINER <name>

  MAINTAINER lework <lework@test.com>
  ```

  该信息将会写入生成镜像的 Author 属性域中。可以通过 docker inspect image 名称查看。

* RUN

  运行指定命令，如果有多个命令关联，建议用&&符号连接。

  ```
  RUN <command>
  RUN ["executable","param1","param2"]

  RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
  RUN ["/bin/bash","-c","echo hello"]
  ```

  前者默认将在 shell 终端中运行命令，即`/bin/sh -c`；

  后者(列表形式)则使用 exec 执行，不会启动 shell 环境。

* CMD

  CMD 指令用来指定启动容器时默认执行的命令。

  ```
  CMD ["executable","param1","param2"] # 使用exec执行，是推荐使用的方式
  CMD ["param1","param2"] 提供给ENTRYPOINT的默认参数。
  CMD command param1 param2 # 在/bin/sh中执行，提供给需要交互的应用

  CMD echo "This is a test." | wc -
  CMD ["/usr/bin/wc","--help"]
  ```

  每个 Dockerfile 只能有一条 CMD 命令。如果指定了多条命令，只有最后一条会被执行。

* LABEL

  LABEL 指令用来生成用于生成镜像的元数据的标签信息。

  ```
  LABEL <key>=<value> <key>=<value> <key>=<value> ...

  LABEL version="1.0"

  LABEL multi.label1="value1" \
        multi.label2="value2" \
        other="value3"
  ```

* EXPOSE

  声明镜像内服务所监听的端口。

  ```
  EXPOSE <port> [<port>/<protocol>...]

  EXPOSE 22 80/tcp 443/tcp 3306
  ```

  注意：该命令只是起到声明的作用，并不会自动完成端口映射。在容器启动时需要使用-P(大写 P)，Docker 主机会自动分配一个宿主机未被使用的临时端口转发到指定的端口；使用-p(小写 p)，则可以具体指定哪个宿主机的本地端口映射过来。

* ENV

  指定环境变量，在镜像生成过程中会被后续 RUN 指令使用，使用该镜像启动的容器中也会存在。

  ```
  ENV <key> <value>
  ENV <key>=<value> ...

  ENV GOLANG_VERSION 1.6.3
  ENV GOLANG_DOWNLOAD_RUL https://golang.org/dl/go$GOLANG_VERSION.linux-amd64.tar.gzENV GOLANG_DOWNLOAD_SHA256 cdd5e08530c0579255d6153b08fdb3b8e47caabbe717bc7bcd7561275a87aeb

  RUN curl -fssL "$GOLANG_DOWNLOAD_RUL" -o golang.tar.gz && echo "$GOLANG_DOWNLOAD_SHA256 golang.tar.gz" | sha256sum -c - && tar -C /usr/local -xzf golang.tar.gz && rm golang.tar.gz

  ENV GOPATH $GOPATH/bin:/usr/local/go/bin:$PATH
  RUN mkdir -p "$GOPATH/bin" && chmod -R 777 "$GOPATH"
  ```

  指令指定的环境变量在运行时可以被覆盖掉，如`docker run --env = built_image`。

* ADD

  该指令将复制指定的`src`路径下的内容到容器中的`dest`路径下。

  ```
  ADD [--chown=<user>:<group>] <src>... <dest>
  ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]

  ADD test /absoluteDir/
  ADD test relativeDir/
  ADD hom* /mydir/
  ADD --chown=55:mygroup files* /somedir/
  ```

* COPY

  复制本地主机的`(为Dockerfile所在目录的一个相对路径、文件或目录)下的内容到镜像中的`下。目标路径不存在时，会自动创建。路径同样支持正则。当使用本地目录为源目录时，推荐使用 COPY。

  ```
  COPY [--chown=<user>:<group>] <src>... <dest>
  COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]

  COPY test /absoluteDir/
  COPY test relativeDir/
  COPY hom* /mydir/
  COPY --chown=55:mygroup files* /somedir/
  ```

- ENTRYPOINT

  指定镜像的默认入口命令，该入口命令会在启动容器时作为根命令执行，所有传入值作为该命令的参数（包括在 docker run 执行的命令都将成为参数）。支持两种格式：

  ```
  ENTRYPOINT ["executable","param1","param2"] # exec调用执行
  ENTRYPOINT command param1 param2  # shell中执行

  ENTRYPOINT ["top", "-b"]
  ENTRYPOINT exec top -b
  ```

  此时，CMD 指令指定值将作为 ENTRYPOINT 命令的参数。每个 Dockerfile 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个有效。在 docker run 时可以被–entrypoint 参数覆盖掉。

- VOLUME

  创建一个数据卷挂载点。可以从本地主机或者其他容器挂载数据卷，一般用来存放数据库和需要保存的数据等。

  ```
  VOLUME /data
  VOLUME ["/data"]
  ```

* USER

  指定运行容器时的用户名或 UID，后续的 RUN 等指令也会使用特定的用户身份。当服务不需要管理员权限时，可以通过该指令指定运行用户。

  ```
  USER <user>[:<group>]
  USER <UID>[:<GID>]
  ```

* WORKDIR

  为后续的 RUN、CMD 和 ENTRYPOINT 指令配置工作目录。可以使用多个 WORKDIR 指令，后续命令如果参数是相对的，则会基于之前命令指定的路径。例如：

  ```
  WORKDIR /path/to/workdir

  WORKDIR /a
  WORKDIR b
  WORKDIR c
  RUN pwd
  ```

  则最终路径为/a/b/c

* ARG

  指定一些镜像内使用的参数(例如版本号信息等)，这些参数在执行 docker build 命令时才以`--build-arg =`格式传入。可以用`docker build --build-arg=`来覆盖 Dockefile 指定的参数值。

  ```
  ARG <name>[=<default value>]

  ARG user1
  ARG buildno=1
  ```

- ONBUILD

  在配置当所创建的镜像作为其他镜像的基础镜像的时候，所执行创建操作指令。

  ```
  ONBUILD [INSTRUCTION]

  [...]
  ONBUILD ADD . /app/src
  ONBUILD RUN /usr/local/bin/python-build --dir /app/src
  [...]
  ```

如果基于 image-A 镜像创建新的镜像时，新的 Dockerfile 中使用 FROM image-A 指定基础镜像，会自动执行 ONBUILD 指令的内容，等价于创建新的镜像时在后面添加了两条指令：

```
FROM image-A
# Automatically run the following

ONBUILD ADD . /app/src
ONBUILD RUN /usr/local/bin/python-build --dir /app/src
```

使用 ONBUILD 指令的镜像，推荐在标签中注明，例如：ruby:1.9-onbuild。 ONBUILD 指令在基础镜像中不会执行。

- STOPSIGNAL

指定所创建镜像启动的容器接收退出的信号值。例如：

```
STOPSIGNAL singnal
```

- HEALTHCHECK

配置所启动容器如何进行健康检查(如何判断是否健康)，自 Docker 1.12 开始支持。格式有两种：

```
HEALTHCHECK [OPTIONS] CMD command # 根据所执行命令返回值是否为 0 判断 
HEALTHCHECK NONE 　　　　　　　　　　# 禁止基础镜像中的健康检查
```

[OPTION]支持：

1. --inerval=DURATION (默认：30s)：多久检查一次；
2. --timeout=DURATION (默认：30s)：每次检查等待结果的超时时间；
3. --retries=N 　　 (默认：3)：如果失败了，重试几次才最终确定失败。
4. --start-period=DURATION （默认：0s）启动的容器提供了初始化的时间段，在此时间段内如果检查失败， 则不会记录失败次数。

例如：

```
HEALTHCHECK --interval=1m --timeout=3s CMD curl -f http://localhost/ || exit 1
```

- SHELL

SHELL 指令允许覆盖用于命令 SHELL 形式的默认 SHELL。

```

SHELL ["executable", "parameters"]

```

Linux 上的默认 shell 是`["bin/sh","-c"]`,Windows 上是[“cmd”, “/S”, “/C”]。SHELL 指令必须以 JSON 格式写入 Dockerfile

> 注意：对于 Windows 系统，建议在 Dockerfile 开头添加# escape=`来指定转移信息。例如：

```

\# escape=`

FROM microsoft/nanoserver
SHELL ["powershell","-command"]
RUN New-Item -ItemType Directory C:\Example
ADD Execute-MyCmdlet.ps1 c:\example\
 RUN c:\example\Execute-MyCmdlet -sample 'hello world'

```



## 其他使用

#### 使用 .dockerignore文件

dockerignore文件可以想github的.gitingore文件一样，可以通过 .dockeringore文件(每一行添加一条匹配模式)来让Docker忽略匹配模式路径下的目录和文件。例如：

```
# comment
*/tmp**
/*/tmp*
tmp?
~*
```