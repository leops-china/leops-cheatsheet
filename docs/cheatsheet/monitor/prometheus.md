## 常用统计

```
1.计算 webapp2 的平均内存使用情况
avg(container_memory_usage_bytes{container_name=“webapp2”})

2.计算运行 mycom/webapp:1.3 镜像的所有容器内存使用总量:
sum(container_memory_usage_bytes{image=“mycom/webapp:1.3”})

3.统计不同运行环境中 webapp 容器内存使用总量:
sum(container_memory_usage_bytes{container_name=~“webapp”}) by (env)

```

## 数据模型

```
# Type
<metric name>{<label name>=<label value>, ...}
# Example
api_http_requests_total{method="POST", handler="/messages"}

```

## PromQL

```bash
http_requests_total   # 返回所有条目
http_requests_total{job="prometheus", code="200"} # 按标签过滤
http_requests_total{status_code=~"2.*"}   # 正则匹配label
http_requests_total[5m]        # 返回时间内的数据，还可以用s，m，h，d，w，y

rate(http_requests_total[5m])  #　返回过去5m内的平均值
irate(http_requests_total[5m]) #　返回过去5m内的2个样本数据

increase(http_requests_total[1h])  # 返回过去1h的http请求


sum(rate(http_requests_total[5m]))  #　求和
sum by (status_code) (rate(http_requests_total[5m]))　#　按状态码求和
sum(rate(http_requests_total[5m] offset 5m))　　# 偏移
#　min，max，avg，count
　
# +， - ，*，/，%，^  算术运算符
# ==，!=，>，<，> =，<=  比较运算符
# and, or, unless 逻辑运算符


rate(http_requests_total{status_code=~"5.*"}[5m]) > .1 * rate(http_requests_total[5m])　# API 5xx是HTTP请求的10%

100 * (1 - avg by(instance)(irate(node_cpu{mode='idle'}[5m]))) # 按实例划分的CPU使用率
node_memory_Active / on (instance) node_memory_MemTotal   # 内存使用百分比

rate(http_requests_total{status_code=~"5.*"}[5m]) / rate(http_requests_total[5m]) # HTTP错误率占流量的百分比



sum (calculate sum over dimensions)
min (select minimum over dimensions)
max (select maximum over dimensions)
avg (calculate the average over dimensions)
stddev (calculate population standard deviation over dimensions)
stdvar (calculate population standard variance over dimensions)
count (count number of elements in the vector)
count_values (count number of elements with the same value)
bottomk (smallest k elements by sample value)
topk (largest k elements by sample value)
quantile (calculate φ-quantile (0 ≤ φ ≤ 1) over dimensions)
```

## PromQL 内置函数

```bash
abs()
absent()
ceil()
changes()
clamp_max()
clamp_min()
day_of_month()
day_of_week()
days_in_month()
delta()
deriv()
exp()
floor()
histogram_quantile()
holt_winters()
hour()
idelta()
increase()
irate()
label_join()
label_replace()
ln()
log2()
log10()
minute()
month()
predict_linear()
rate()
resets()
round()
scalar()
sort()
sort_desc()
sqrt()
time()
timestamp()
vector()
year()
<aggregation>_over_time()
```
