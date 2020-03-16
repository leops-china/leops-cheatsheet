# Jenkins

Jenkins是一个免费的开源自动化服务器。Jenkins通过持续集成和促进持续交付的技术方面，帮助自动化软件开发过程中的非人工部分。它是一个基于服务器的系统，运行在servlet容器(如Apache Tomcat)中。


## 资源

- 官网： https://jenkins.io/
- 插件： https://plugins.jenkins.io/
- 安装包： https://pkg.jenkins.io/
- 插件更新： https://updates.jenkins.io/
- 同步状态： http://mirrors.jenkins-ci.org/


## 安装

**debian/ubuntu**
```bash
# Step 1: Install Java
$ sudo apt update
$ sudo apt install openjdk-8-jdk

# Step 2: Add Jenkins Repository
$ wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add –

# Step 3: Add Jenkins repo to the system
$ sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'

# Step 4: Install Jenkins
$ sudo apt update
$ sudo apt install Jenkins

# Step 5: Verify installation
$ systemctl status Jenkins

# Step 6: Once Jenkins is up and running, access it from the link:
# http://localhost:8080
```

**centos**
```bash
# Step 1: Install Java
# yum install openjdk-8-jdk

# Step 2: Add Jenkins Repository
# rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key

# Step 3: Add Jenkins repo to the system
# wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo

# Step 4: Install Jenkins
# yum install Jenkins

# Step 5: Verify installation
# systemctl status Jenkins

# Step 6: Once Jenkins is up and running, access it from the link:
# http://localhost:8080
```

## 国内UpdateCenter

```bash
[ ! -d /var/lib/jenkins/update-center-rootCAs ] && mkdir /var/lib/jenkins/update-center-rootCAs
wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O /var/lib/jenkins/update-center-rootCAs/update-center.crt
chown jenkins.jenkins -R /var/lib/jenkins/update-center-rootCAs
sed -i 's#https://updates.jenkins.io/update-center.json#https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/updates/huawei/update-center.json#' /var/lib/jenkins/hudson.model.UpdateCenter.xml
``` 

## 相关文件

- `$jenkins_home/config.xml`:  jenkins配置文件
- `$jenkins_home/secrets/initialAdminPassword`:  初始化admin密码
- `$jenkins_home/hudson.model.UpdateCenter.xml`: 更新插件配置文件
- `$jenkins_home/update-center-rootCAs/`: 校验更新插件内容的CA目录
- `$jenkins_home/plugins/`: 插件目录
- `$jenkins_home/jobs/`: 任务目录
- `$jenkins_home/users/`: 用户目录
- `$jenkins_home/secrets/`: 凭证目录
- `$jenkins_home/logs/`: 日志目录


## JSON API

### 任务管理
```
# 打印所有的任务
GET /api/json?tree=jobs[name]&pretty=true

# 开启任务
POST /job/enable

# 构建任务
POST /<name>/build

# 带参数的构建任务
POST /<name>/buildWithParameters?<params>
```

### 应用管理

- http://localhost:8080/jenkins/exit − 关闭 Jenkins
- http://localhost:8080/jenkins/restart − 重启 Jenkins
- http://localhost:8080/jenkins/reload − 重载


## groovy

- https://github.com/dennyzhang/cheatsheet-jenkins-groovy-A4