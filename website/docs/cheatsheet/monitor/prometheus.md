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

##  PromQL 

>   PromQL (Prometheus Query Language) 是 Prometheus 自己开发的数据查询 DSL 语言 

### 数据类型

- 即时向量-一组时间序列，每个时间序列包含一个样本，所有样本共享相同的时间戳

- 范围向量-一组时间序列，其中包含每个时间序列随时间变化的一系列数据点

- 标量-一个简单的数字浮点值

- String-一个简单的字符串值； 目前未使用

#### 常量

字符串常量

```
"this is a string"
'these are unescaped: \n \\ \t'
`these are not unescaped: \n ' " \t`
```

浮点数常量

```
2.43
-2.43
```

#### 时间序列选择器

**即时向量选择器**

显示匹配http_requests_total度量名称的所有时间序列

```
http_requests_total
```

使用`{}` 来设置过滤项

```
http_requests_total{job="prometheus",group="canary"}
```

**范围向量选择器**

在向量选择器后添加以`[]`包裹的时间描述作为查询范围

```
http_requests_total{job="prometheus"}[5m]
```

- `s` - 秒
- `m` - 分
- `h` - 小时
- `d` - 天
- `w` - 周
- `y` - 年

**偏移量**

在向量选择器后添加以`offset`开头的时间描述作为偏移范围

```
http_requests_total offset 5m   # 向前偏移5分钟
sum(http_requests_total{method="GET"} offset 5m)
rate(http_requests_total[5m] offset 1w)
```



### 运算符

#### 基本操作符

算术运算符

- `+` (加)
- `-` (减)
- `*` (乘)
- `/` (除)
- `%` (取余)
- `^` (取幂)

比较运算符

- `==` (等于)
- `!=` (不等于)
- `>` (大于)
- `<` (小于)
- `>=` (大于等于)
- `<=` (小于等于)

逻辑运算符

- `and` (与)
- `or` (或)
- `unless` (非)

#### 向量匹配

```
# 忽略code标签
method_code:http_errors:rate5m{code="500"} / ignoring(code) method:http_requests:rate5m

# 多个匹配
method_code:http_errors:rate5m / ignoring(code) group_left method:http_requests:rate5m

```



####  聚合操作符 

- `sum` (求和)

  ```
  sum(http_requests_total)
  
  # without是排除
  sum without (instance) (http_requests_total)
  
  # by 是包含
  sum by (application, group) (http_requests_total)
  ```

- `min` (最小值)

- `max` (最大值)

- `avg` (平均值)

- `stddev` (计算维度上的总体标准差)

- `stdvar` ( 计算维度上的总体标准方差 )

- `count` (计算向量中元素的数量)

- `count_values` (计算具有相同value的元素数)

  ```
  count_values("version", build_version)
  ```

- `bottomk` (k个元素的最小值)

- `topk` (样本值最大k个元素)

  ```
  topk(5, http_requests_total)
  ```

- `quantile` (计算尺寸上的φ分位数（0≤φ≤1）)

#### 运算优先级

1. `^`
2. `*`, `/`, `%`
3. `+`, `-`
4. `==`, `!=`, `<=`, `<`, `>=`, `>`
5. `and`, `unless`
6. `or`

从高到低



### 函数

- abs()

  返回所有样本值的绝对值

  ```
  abs(v instant-vector)
  ```

- absent()

  如果传递给它的向量具有任何元素，则返回一个空向量；如果传递给它的向量没有元素，则返回值为1的1元素向量。

  ```
  absent(v instant-vector)
  ```

- absent_over_time()

  如果传递给它的范围向量有任何元素，则返回一个空向量;如果传递给它的范围向量没有元素，则返回一个值为1的元素向量。

  ```
  absent_over_time(v range-vector)
  ```

- ceil()

   将v中所有元素的样本值四舍五入到最接近的整数。 

  ```
  ceil(v instant-vector)
  ```

- changes()

   返回其值在提供的时间范围内变化的次数，作为即时向量。 

  ```
  changes(v range-vector)
  ```

- clamp_max()

- clamp_min()

- day_of_month()

   返回UTC中给定时间的每个月的日期。返回的值从1到31。

   ```
   day_of_month(v=vector(time()) instant-vector)
   ```

- day_of_week()

    返回UTC中每个给定时间的星期几。返回的值从0到6，其中0表示Sunday等。 

   ```
   day_of_week(v=vector(time()) instant-vector)
   ```

- days_in_month()

   返回UTC中给定时间的每个月的天数。返回的值从28到31。

   ```
   days_in_month(v=vector(time()) instant-vector)
   ```

- delta()

    计算范围向量v中每个时间序列元素的第一个和最后一个值之间的差值

   ```
   delta(v range-vector)
   
   delta(cpu_temp_celsius{host="zeus"}[2h])
   ```

- deriv()

    计算范围向量v中时间序列的每秒导数

   ```
   deriv(v range-vector)
   ```

- exp()

   计算v中所有元素的指数函数 

  ```
  exp(v instant-vector)
  ```
  特殊数据
  
  - `Exp(+Inf) = +Inf`
  - `Exp(NaN) = NaN`

- floor()

   将v中所有元素的样本值四舍五入为最接近的整数。 

  ```
  floor(v instant-vector)
  ```

- histogram_quantile()

  统计Histogram指标的分位数

  ```
  histogram_quantile(φ float, b instant-vector)
  
  histogram_quantile(0.5, http_request_duration_seconds_bucket)
  ```

- holt_winters()

- hour()

   返回UTC中给定时间的每个小时。返回的值从0到23。

   ```
   hour(v=vector(time()) instant-vector)
   ```

- idelta()

    计算范围向量v中最后两个样本的差值， 

   ```
   idelta(v range-vector)
   ```

- increase()

  计算Counter指标增长率

  ```
  increase(v range-vector)
  
  主机节点最近两分钟内的平均CPU使用率
  increase(node_cpu[2m]) / 120
  ```

- irate()

   计算范围向量中时间序列每秒的即时增长率 

  ```
  irate(v range-vector)
  
  irate(node_cpu[2m])
  ```

- label_join()

- label_replace()

  动态标签替换

  ```
  label_replace(v instant-vector, dst_label string, replacement string, src_label string, regex string)
  
  label_replace(up{job="api-server",service="a:c"}, "foo", "$1", "service", "(.*):.*")
  ```

- ln()

- log2()

- log10()

- minute()

   返回UTC中给定时间的每一小时的分钟数。返回的值从0到59。

   ```
   minute(v=vector(time()) instant-vector)
   ```

- month()

   返回UTC中给定时间的每个月份。返回的值从1到12，其中1表示一月等等。

   ```
   minute(v=vector(time()) instant-vector)
   ```

- predict_linear()

  预测Gauge指标变化趋势

  ```
  predict_linear(v range-vector, t scalar)
  
  预测主机可用磁盘空间的是否在4个小时候被占满
  predict_linear(node_filesystem_free{job="node"}[2h], 4 * 3600) < 0
  ```

- rate()

   计算范围向量中时间序列的每秒平均增长率 

  ```
  rate(v range-vector)
  
  rate(http_requests_total{job="api-server"}[5m])
  ```

- resets()

- round()

- scalar()

- sort()

    升序排序 

   ```
   sort(v instant-vector)
   ```

- sort_desc()

    降序排列 

   ```
   sort_desc(v instant-vector)
   ```

- sqrt()

    计算v中所有元素的平方根 

   ```
   sqrt(v instant-vector)
   ```

- time()

   返回自1970年1月1日起的秒数。

   ```
   time()
   ```

- timestamp()

   返回时间戳

   ```
   timestamp(v instant-vector)
   ```

- vector()

- year()

   返回UTC中给定时间的每个年份。

   ```
   year(v=vector(time()) instant-vector)
   ```

- <aggregation>_over_time()

   - `avg_over_time(range-vector)`: 指定区间内所有点的平均值。
   - `min_over_time(range-vector)`: 指定区间内所有点的最小值。
   - `max_over_time(range-vector)`: 指定区间内所有点的最大值。
   - `sum_over_time(range-vector)`: 指定区间内所有点的和。
   - `count_over_time(range-vector)`: 指定区间内所有点的计数。
   - `quantile_over_time(scalar, range-vector)`:  指定区间内值的时间间隔。 
   - `stddev_over_time(range-vector)`:  指定区间内值的总体标准差。 
   - `stdvar_over_time(range-vector)`: 指定区间内值的总体标准方差。

## 示例

```
# http请求速率
sum(rate(http_requests_total[5m]

# 按状态码划分的HTTP请求速率
sum by(status_code) (rate(http_requests_total[5m]

# http错误率百分比
rate(http_requests_total{status_code=~"5.*"}[5m]) / rate(http_requests_total[5m])

# cpu使用率
100 * (1 - avg by(instance)(irate(node_cpu{mode='idle'}[5m])

# 内存使用
node_memory_Active / on (instance) node_memory_MemTo

# 磁盘空间
node_filesystem_avail{fstype!~"tmpfs|fuse.lxcfs|squashfs"} / node_filesystem_size{fstype!~"tmpfs|fuse.lxcfs|s
```