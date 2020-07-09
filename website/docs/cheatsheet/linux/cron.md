# cron

## 语法

```bash
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of week (0 - 6) 
# │ │ │ │ │
# │ │ │ │ │
# │ │ │ │ │
# * * * * *  command to execute
```

- `*` 代表任何值
- `,` 值列表分隔符 (如3,5,12)
- `–` 值的范围 (如 5-12)
- `/` 步长值( */10分钟 表示它将每10分钟运行一次)

## 特殊关键字

| 关键字  | 相当于          |
| ------- | --------------- |
| @yearly | 0 0 1 1 *       |
| @daily  | 0 0 * * *       |
| @hourly | 0 * * * *       |
| @reboot | Run at startup. |

## 例子

```
# 每分钟执行
*    *    *    *    *  cmd

# 每15分钟执行   
*/15 *    *    *    *  cmd

#在每个星期日的晚上8点运行
0    20    *    *    0 cmd

# 在每天5点，10点，15点时运行
0 5,10,15 *    *    *  cmd

# 每天凌晨
0 0 * * * cmd

# 运行时间为6:07,6:12,6:17,6:22,6:27，依此类推，直到6:57
0 7-59/5 06 * * * cmd
```



## crontab命令

```bash
crontab -e # 编辑或创建crontab文件
crontab -l # 显示crontab文件
crontab -r # 删除crontab文件
crontab -v # 显示上次编辑crontab文件的时间
crontab cron.file # 导入文件中的cron
```

## 日志

```bash
less +G /var/log/cron


sudo journalctl _COMM=cron

# or

journalctl _COMM=cron --since="date" --until="date"
```

## 工具

- https://crontab-generator.org/

