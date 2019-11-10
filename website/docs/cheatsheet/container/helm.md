## 安装

```bash
wget https://get.helm.sh/helm-v2.14.3-linux-amd64.tar.gz
tar zxf helm-v2.14.3-linux-amd64.tar.gz
mv linux-amd64/helm  /usr/local/sbin/
chmod +x /usr/local/sbin/helm

helm init --skip-refresh --tiller-image registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.3

helm init --client-only
helm init --upgrade --service-account tiller
helm init --upgrade  #　更新
helm version　# 查看版本

source <(helm completion bash)  # 自动补齐
```

## RBAC

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
EOF
```

## 仓库

```bash
helm repo list
helm repo update
helm repo add stable http://mirror.azure.cn/kubernetes/charts/

helm search
helm search mysql
```

```bash
helm ls                           #　查看安装的chat
helm ls --deleted
helm ls --all

helm inspect values stable/mysql  # 查看chat的参数

helm install --name foo stable/mysql
helm install --name path/to/foo
helm install --name foo bar-1.2.3.tgz
helm install --name foo https://example.com/charts/bar-1.2.3.tgz

helm install --name foo --values config.yaml --timeout 300 --wait stable/mysql  #　指定配置文件

helm status foo
helm delete --purge foo

helm get values foo
helm get manifest full-coral

helm upgrade --values config.yaml foo stable/mysql
helm history foo
helm rollback foo 1


helm create foo

helm lint foo
helm package foo
helm dependency update  # 更新依赖到本地charts目录中

```

## 目录结构

```bash
wordpress/
  Chart.yaml          # Chart本身的版本和配置信息
  LICENSE             # 许可
  README.md           # OPTIONAL: A human-readable README file
  requirements.yaml   # OPTIONAL: A YAML file listing dependencies for the chart
  values.yaml         # chart的默认配置参数
  charts/             # 依赖的chart
  templates/          # 配置模板目录, 将values.yaml中的值填充到模板，并生成k8s的manifest
  templates/NOTES.txt # OPTIONAL: 简短的使用说明
```

```bash
# Chart.yaml
apiVersion: The chart API version, always "v1" (required)
name: The name of the chart (required)
version: A SemVer 2 version (required)
kubeVersion: A SemVer range of compatible Kubernetes versions (optional)
description: A single-sentence description of this project (optional)
keywords:
  - A list of keywords about this project (optional)
home: The URL of this project's home page (optional)
sources:
  - A list of URLs to source code for this project (optional)
maintainers: # (optional)
  - name: The maintainer's name (required for each maintainer)
    email: The maintainer's email (optional for each maintainer)
    url: A URL for the maintainer (optional for each maintainer)
engine: gotpl # The name of the template engine (optional, defaults to gotpl)
icon: A URL to an SVG or PNG image to be used as an icon (optional).
appVersion: The version of the app that this contains (optional). This needn't be SemVer.
deprecated: Whether this chart is deprecated (optional, boolean)
tillerVersion: The version of Tiller that this chart requires. This should be expressed as a SemVer range: ">2.0.0" (optional)
```

## 模板语言

```

{{quote .Values.favorite.drink}}  函数
{{.Values.favorite.drink | quote}}  管道
{{.Values.favorite.drink | default "tea" | quote}}


{{if PIPELINE}}
  # Do something
{{else if OTHER PIPELINE}}
  # Do something else
{{else}}
  # Default case
{{end}}

删除左边的空格
  {{- if eq .Values.favorite.drink "coffee"}}
  mug: true
  {{- end}}

-}} 意味着应该删除右空格。注意！换行符也是空格！

控制变量范围，改变.范围来指向.Values.favorites
{{- with .Values.favorite}}
  drink: {{.drink | default "tea" | quote}}
  food: {{.food | upper | quote}}
{{- end}}

循环
{{- range .Values.pizzaToppings}}
    - {{. | title | quote}}
{{- end}}

```
