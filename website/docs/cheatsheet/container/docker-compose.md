# docker-compose

Docker-Compose项目是Docker官方的开源项目，负责实现对Docker容器集群的快速编排。

- [官方文档](https://docs.docker.com/compose/)

## 安装

```bash
curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
curl -L https://raw.githubusercontent.com/docker/compose/1.24.1/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 命令

```bash
docker-compose up         # 启动yml定义的所有服务
docker-compose up -d      # 以后台的形式启动服务
docker-compose down       # #停止并移除yaml中的所有服务
docker-compose ps         # 查看已经启动的服务状态
docker-compose bundle     # #从Compose文件生成分布式应用程序包（DAB）
docker-compose config     # #验证并查看Compose文件
docker-compose events     # 展示项目中每个容器的容器事件
docker-compose logs       # 查看服务的输出
docker-compose port       # 打印绑定的公共端口。
docker-compose pull       # 拉取服务镜像
docker-compose push       # push 服务镜像
docker-compose version    # 查看版本
docker-compose build      # 构建或重新构建服务。
docker-compose start      # 启动一个已经存在的服务容器。
docker-compose stop       # 停止一个已经运行的容器，但不删除它。
docker-compose pause      # 暂停服务
docker-compose unpause    # 恢复处于暂停状态状态中的服务
docker-compose exec       # 在服务中运行命令
docker-compose help       # 获取帮助
docker-compose kill       # 通过发送 SIGKILL 信号来停止指定服务的容器
docker-compose restart    # 重启yml中定义的所有服务
docker-compose rm         # 删除停止的服务容器。
docker-compose top        # 显示正在运行的进程
docker-compose run        # 在一个服务上执行一个命令。
docker-compose scale      # 设置同一个服务运行的容器个数。
docker-compose scale web=2 worker=3
```

## file

```yaml
# docker-compose.yml
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
