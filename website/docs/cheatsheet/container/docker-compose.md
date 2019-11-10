# docker-compose-Cheat Sheet

## 命令

```bash
docker-compose ps
docker-compose start
docker-compose stop
docker-compose pause
docker-compose unpause
docker-compose up
docker-compose down
```



## file

```bash
# docker-compose.yml
version: '3'

services:
  web:
    build: .
    # build from Dockerfile
    context: ./Path
    dockerfile: Dockerfile
    ports:
     - "5000:5000"
    volumes:
     - .:/code
  redis:
    image: redis
```

