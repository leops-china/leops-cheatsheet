## Elasticsearch 监控

### 监控API

| 指标描述           | 命令                                              |
| ------------------ | ------------------------------------------------- |
| 所有节点的状态信息 | `curl 'localhost:9200/_nodes/stats'`              |
| 指定节点的状态信息 | `curl 'localhost:9200/_nodes/ node1,node2/stats'` |
| 指定索引的状态信息 | `curl 'localhost:9200/<INDEX_NAME>/stats'`        |
| 集群状态信息       | `curl 'localhost:9200/_cluster/stats'`            |

### 集群健康信息

| 指标描述               | 命令                                  |
| ---------------------- | ------------------------------------- |
| 集群状态和未分配的分片 | `curl 'localhost:9200/_cat/health?v'` |

### 搜索性能

| 指标描述           | 命令                                                         |
| ------------------ | ------------------------------------------------------------ |
| 查询总数           | `curl 'localhost:9200/_cat/nodes?v&h=name,searchQueryTotal'` |
| 查询的总时间       | `curl 'localhost:9200/_cat/nodes?v&h=name,searchQueryTime'`  |
| 正在进行的查询数量 | `curl 'localhost:9200/_cat/nodes?v&h=name,searchQueryCurrent'` |
| 提取总数           | `curl 'localhost:9200/_cat/nodes?v&h=name,searchFetchTotal'` |
| 提取的总时间       | `curl 'localhost:9200/_cat/nodes?v&h=name,searchFetchTime'`  |
| 正在进行的提取数量 | `curl 'localhost:9200/_cat/nodes?v&h=name,searchFetchCurrent'` |

### 索引性能

| 指标描述                       | 命令                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| 索引的文档总数                 | `curl 'localhost:9200/_cat/nodes?v&h=name,indexingIndexTotal'` |
| 索引文档所花费的总时间         | `curl 'localhost:9200/_cat/nodes?v&h=name,indexingIndexTime'` |
| 当前被索引的文档数量           | `curl 'localhost:9200/_cat/nodes?v&h=name,indexingIndexCurrent'` |
| 刷新到磁盘的索引总数           | `curl 'localhost:9200/_cat/nodes?v&h=name,flushTotal'`       |
| 将索引刷新到磁盘所花费的总时间 | `curl 'localhost:9200/_cat/nodes?v&h=name,flushTotalTime'`   |

### JVM heap 使用

| 指标描述                    | 命令                                                         |
| --------------------------- | :----------------------------------------------------------- |
| 垃圾收集频率和持续时间      | `curl 'localhost:9200/_nodes/stats/jvm' | jq '.nodes[] |{node_name: .name, young_gc_count: .jvm.gc.collectors.young.collection_count, young_gc_time: .jvm.gc.collectors.young.collection_time_in_millis, old_gc_count: .jvm.gc.collectors.old.collection_count, old_gc_time: .jvm.gc.collectors.old.collection_time_in_millis}'` |
| 当前正在使用的JVM堆的百分比 | `curl 'localhost:9200/_cat/nodes?v&h=name,heapPercent'`      |

### 待处理的任务

| 指标描述     | 命令                                           |
| ------------ | ---------------------------------------------- |
| 待处理任务数 | `curl 'localhost:9200/_cluster/pending_tasks'` |

### 线程池队列

| 指标描述               | 命令 |
| ---------------------- | ---- |
| 线程池中排队的线程数   | `curl 'localhost:9200/_nodes/stats/thread_pool' | jq '.nodes[] | {node_name: .name, bulk_queue: .thread_pool.bulk.queue, search_queue: .thread_pool.search.queue, index_queue: .thread_pool.index.queue}'`   |
| 线程池中被拒绝的线程数 |   `curl 'localhost:9200/_nodes/stats/thread_pool' | jq '.nodes[] | {node_name: .name, bulk_rejected: .thread_pool.bulk.rejected, search_rejected: .thread_pool.search.rejected, index_rejected: .thread_pool.index.rejected}'`   |

### 字段缓存

| 指标描述                             | 命令                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| fielddata缓存的大小（字节）          | `curl 'localhost:9200/_cat/nodes?v&h=name,fielddataMemory'`  |
| 从fielddata缓存中驱逐的次数          | `curl 'localhost:9200/_cat/nodes?v&h=name,fielddataEvictions'` |
| fielddata断路器跳闸次数(ES版本>=1.3) | `curl 'localhost:9200/_nodes/stats/breaker' | jq '.nodes[] | {node_name: .name, fielddata: .breakers.fielddata}'` |

### 主机网络和系统指标

| 指标描述                      | 命令                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| 磁盘空间总数，空闲，可用      | `curl 'localhost:9200/_nodes/stats/fs' | jq '.nodes[] | {node_name: .name, disk_total_in_bytes: .fs.total.total_in_bytes, disk_free_in_bytes: .fs.total.free_in_bytes, disk_available_in_bytes: .fs.total.available_in_bytes}'` |
| 已使用磁盘的百分比            | `curl 'localhost:9200/_cat/allocation?v'`                    |
| 内存                          | `curl 'localhost:9200/_nodes/stats/os'`                      |
| CPU                           | `curl 'localhost:9200/_nodes/stats/os'`                      |
| I / O利用率                   | `iostat`                                                     |
| 使用文件描述符的百分比        | `curl 'localhost:9200/_cat/nodes?v&h=host,name, fileDescriptorPercent'` |
| 网络发送/接收的字节数         | `curl 'localhost:9200/_nodes/stats/transport' | jq '.nodes[] | {node_name: .name, network_bytes_sent: .transport.tx_size_in_bytes, network_bytes_received: .transport.rx_size_in_bytes}'` |
| 当前打开的HTTP连接&总打开时间 | `curl 'localhost:9200/_nodes/stats/http' | jq '.nodes[] | {node_name: .name, http_current_open: .http.current_open, http_total_opened: .http.total_opened}'` |

### 默认目录

|      | debian/ubuntu               | rhel/centos            | zip or tar install |
| ---- | --------------------------- | ---------------------- | ------------------ |
| 配置 | /etc/elasticsearch          | /etc/elasticsearch     | <es home>/config   |
| 日志 | /var/log/elasticsearch      | /var/log/elasticsearch | <es home>/logs     |
| 数据 | /var/lib/elasticsearch/data | /var/lib/elasticsearch | <es home>/data     |

## Elasticsearch 操作

### 未分配的分片

| 操作                                                         | 命令                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 查找未分配的分片                                             | `curl 'localhost:9200/_cat/shards' |grep UNASSIGNED`         |
| 查看未分配的解释                                             | `curl 'localhost:9200/_cluster/allocation/explain?pretty'`   |
| 重新设置索引的副本                                           | `curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"number_of_replicas": <DESIRED NUMBER OF REPLICAS>}'` |
| 重新开启索引分配                                             | `curl -XPUT 'localhost:9200/_cluster/settings' -d '{"transient": {"cluster.routing.allocation.enable": "all"}}'` |
| 手动分配                                                     | `curl -XPOST 'localhost:9200/_cluster/reroute' -d '{"commands": [{"allocate": {"index": "<INDEX_NAME>", "shard": <SHARD_NUMBER>, "node": "<NODE_NAME>"}}]}'` |
| 检查磁盘使用情况； 主节点不会将碎片分配给使用磁盘数量> 85％的任何节点 | `curl 'localhost:9200/_cat/allocation?v'` <br />`curl -XPUT 'localhost:9200/_cluster/settings' -d '{"transient": {"cluster.routing.allocation.disk.watermark.low": "90%"}}'` |
| 检查每个节点是否正在运行相同版本的Elasticsearch； 主节点将不会分配给旧版本 | `curl 'localhost:9200/_cat/nodes?v&h=host,name,version'`     |



### 搜索性能

| 操作                                                         | 命令                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 记录慢搜索日志                                               | `curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"index.search.slowlog.threshold.query.warn" : "10s","index.search.slowlog.threshold.fetch.debug": "500ms", "index.indexing.slowlog.threshold.index.info": "5s" }'` |
| 将<DOC类型>的高优先级、低容量文档路由到相同的位置，以便只查询一个碎片 | `curl -XPUT 'localhost:9200/<INDEX_NAME>' -d '{"mappings": {"<DOC_TYPE>": {"_routing": {"required": true}}}}` |
| 合并索引                                                     | ES versions > 2.1.0: <br />`curl -XPOST 'localhost:9200/<INDEX_NAME>/_forcemerge`<br />ES versions < 2.1.0: <br />`curl -XPOST 'localhost:9200/<INDEX_NAME>/_optimize` |

### 索引性能

| 操作                                             | 命令                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| 从JSON文件批量索引文档                           | `curl -XPOST 'localhost:9200/<INDEX_NAME>/<MY_TYPE>/_bulk?pretty' --data-binary "@<YOUR_FILE>.json"` |
| 增加刷新间隔以优化索引编制，而不是立即搜索新数据 | `curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"index": {"refresh_interval": DESIRED_INTERVAL, e.g. "30s"}}'` |
| 禁用合并限制                                     | `curl -XPUT 'localhost:9200/_cluster/settings' -d '{"transient": {"indices.store.throttle.type": "none"}}` |
| 禁用分片复制                                     | `curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"number_of_replicas": 0}` |
| 更少地将跨日志提交到磁盘                         | `curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"index": {"translog": {"durability": "async"}}}` |