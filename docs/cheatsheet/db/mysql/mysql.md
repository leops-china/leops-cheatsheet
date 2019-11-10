# SQL 语句

## create

```sql
-- 创建数据库
create database if not exists dbname default charset utf8 collate utf8_general_ci;

-- 创建表
create table `newtable` (
`id`  int not null ,
`user`  varchar(255) not null ,
`sex`  tinyint(255) null default 1 ,
`createtime`  timestamp not null on update current_timestamp ,
`desc`  varchar(255) character set utf8mb4 collate utf8mb4_general_ci null default '' comment '描述' ,
primary key (`id`),
index `idx_sex` (`sex`) using btree
)engine=innodb default character set=utf8mb4 collate=utf8mb4_general_ci auto_increment=1;

-- 查询结果创建新表
create table dudu as  SELECT product_id,name,category_name,time,kept_time,price,pattern,style,color,category,image,description FROM "Content" where name not like '';


-- 创建分区表
CREATE TABLE sales (
    id INT AUTO_INCREMENT,
    amount DOUBLE NOT NULL,
    order_day DATETIME NOT NULL,
    PRIMARY KEY(id, order_day)
) ENGINE=Innodb PARTITION BY RANGE(YEAR(order_day)) (
    PARTITION p_2010 VALUES LESS THAN (2010),
    PARTITION p_2011 VALUES LESS THAN (2011),
    PARTITION p_2012 VALUES LESS THAN (2012),
    PARTITION p_catchall VALUES LESS THAN MAXVALUE);

-- 创建视图
create view v as select * from table;
create view v as select id,name,age from table;
create view v[vid,vname,vage] as select id,name,age from table;
create view 数据库1.v as (select * from 数据库1.table1) union all (select * from 数据库2.table2);

-- 创建函数
DELIMITER $$
CREATE FUNCTION hello_world()
  RETURNS TEXT
  LANGUAGE SQL
BEGIN
  RETURN 'Hello World';
END;
$$
DELIMITER ;

-- 创建触发器

-- 监听delete操作，在delete操作后在触发
CREATE TRIGGER `c_del` AFTER DELETE ON `testdb`.`logs` FOR EACH ROW DELETE IGNORE FROM `testdb`.`logs_new` WHERE `testdb`.`logs_new`.`id` <=> OLD.`id`
old.列名可以引用被删除的行的值。
new.列名可以引用被插入和更改的行的值。

-- 监听update操作，在update操作后在触发
CREATE TRIGGER `c_upd` AFTER UPDATE ON `testdb`.`logs` FOR EACH ROW REPLACE INTO `testdb`.`logs_new` (`id`, `created`, `modifyed`) VALUES (NEW.`id`, NEW.`created`, NEW.`modifyed`)

-- 监听install操作，在install操作后在触发
CREATE TRIGGER `c_ins` AFTER INSERT ON `testdb`.`logs` FOR EACH ROW REPLACE INTO `testdb`.`logs_new` (`id`, `created`, `modifyed`) VALUES (NEW.`id`, NEW.`created`, NEW.`modifyed`)

-- 创建事件
-- 每10秒执行一次
delimiter $$
drop event if exists evt_test;
create event evt_test
  on schedule every 10 SECOND
  starts CURDATE() do
  begin
    insert into student(Name, ClassName) values('ss','bb');
    insert into student(Name, ClassName) values('Uk','mmm');
    update student set `Name`='234m' where Name='A六';
  end $$
delimiter


```

## alert

```sql
-- 添加表字段
ALTER TABLE `back_user` ADD COLUMN `userid`  int NULL AFTER `user_login_time`;

-- 删除表字段
ALTER TABLE `user` DROP COLUMN `desc`;

-- 更改列的默认值(只修改.frm文件，不修改数据)
alter table film alter cloumn rental_duration set default 5;

-- 添加索引
alter table city_demo add key (city(7));

-- 添加唯一索引
alter table `table_name` add unique ( `column` )

-- 添加主键索引
alter table tabname add primary key(col)

-- 添加联合索引
alter table city_demo add key (id,test_id);

-- 删除索引
alter table table_name drop index index_name ; #删除普通索引
alter table table_name drop primary key ;   #删除主键索引

-- 更改表字段
alter table chatter_users alter column ip varchar(50) NULL;
alter table address modify column city char(30);
alter table address modify column city varchar(50);
alter table `Wxxxxx` modify column `CONTENT` varchar(30) character set utf8 not null;
alter table test add  sex char(4) after name; #在name字段后面添加

-- 更改表编码
alter table user_logins  default charset utf8;
alter table comments convert to character set utf8;
alter table comments default charset utf8;

alter table `table_name` add index index_name ( `column` )
alter table `table_name` add fulltext ( `column`)

-- 更改表名
alter table test  rename to test_new;

-- 添加表分区
ALTER TABLE members ADD PARTITION (PARTITION p3 VALUES LESS THAN (2000));

-- 更改表结构，使用更换物理文件
create table film_new like film;
alter table film_new add column `used` varchar(256) NULL;
flush tables with read lock;

# mv film.frm film_temp.frm
# mv film_new.frm film.frm
# mv film_temp.frm film_new.frm

-- 解锁表
unlock tables;
show columns from film;
drop table film_new;

-- 修改该任务为未启动
alter EVENT evt_test disable;

-- innodb表的碎片的整理
alter table tbname engine=innodb;
```

## drop

```sql
-- 删除库
drop database if exists db_name

-- 删除表
drop table test;

-- 删除事件
drop event if exists evt_test;

-- 删除函数
drop function if exists func_name

-- 删除触发器
drop trigger if exists trigger_name

-- 删除视图
drop view if exists view_name

-- 清空表
truncate table table_name；

-- 更改表名
rename table test to test_new;
```

## delete

```sql
-- 删除所有表记录
delete from somelog

-- 删除user为jcole的记录
delete from somelog where user = 'jcole'
```

## insert

```sql
-- 插入单挑数据
insert into student value  ('1', '2')

-- 插入数据
insert into users (name, age) values('lulu',25);
insert into uses set name = 'lulu', age = 25;

-- 插入数据，并忽略错误
insert ignore into users (name, age) values('lulu',25);

-- 将查询的结果插入表
insert into users (name, age) select name,age from old_users;

-- 插入多条数据
insert into `goods_type` (`id`, `type`, `name`) values (1, 1, 'hw手机'), (2, 0, 'xiaomi'), (3, 1, 'apple');

-- 从文件中加载数据
load data infile 'data.txt' into table table2 fields terminated by ',';
```

## update

```sql
-- 使id值
update t set id = id + 1;

-- 替换字符串
update `channel_path` set url_path = REPLACE(url_path, 'https://test.com', 'http://test.com');

-- 跨表更新
update product p, productprice pp set pp.price = pp.price * 0.8 where p.productid = pp.productid and p.datecreated < '2004-01-01'

-- 匹配更新
update platform_advise set user_id = (select bu.id from borrow_user bu where bu.user_account = phone )
```

## select

```sql
-- 获取日期
select curdate() -- 获取当天
select DATE_SUB(CURDATE(), INTERVAL 7 DAY)  -- 获取前7天
select subdate(curdate(),date_format(curdate(),'%w')-1) -- 获取当前日期在本周的周一
select subdate(curdate(),date_format(curdate(),'%w')-2) -- 获取当前日期在本周的周二
select subdate(curdate(),date_format(curdate(),'%w')-7) -- 获取当前日期在本周的周日

-- 上周一，上周日
set @l_n = date_format(date_sub(curdate(),interval 1 week), '%Y-%m-%d 00:00:00');
set @l_nn = date_format(date_sub(curdate(),interval 1 week) + 6, '%Y-%m-%d 00:00:00');

set @d_start = DATE_FORMAT(DATE_ADD(now(),INTERVAL -22 day),'%Y-%m-%d 00:00:00');
set @d_end = DATE_FORMAT(DATE_ADD(now(),INTERVAL -21 day),'%Y-%m-%d 00:00:00');

set @u_start = unix_timestamp(DATE_FORMAT(DATE_ADD(now(),INTERVAL -22 day),'%Y-%m-%d 00:00:00'));
set @u_end = unix_timestamp(DATE_FORMAT(DATE_ADD(now(),INTERVAL -21 day),'%Y-%m-%d 00:00:00'));

SELECT @l_n, @l_nn

-- 查看表所有记录
select * from mytable;

-- 查看表中指定字段的所有记录
select columna,columnb from mytable;

-- 去除重复值
select distinct columna,columnb from mytable;

-- 查看表中指定字段的所有记录，结果按照time字段倒序排序
select college, region, time from tournament order by time desc;

-- 使用别名排序
select college, region as r, seed as s from tournament order by r, s;

-- 使用列排序
select college, region, seed from tournament order by 2, 3;

-- 过滤条件
select col_name from tbl_name where col_name > 0;
-- compopr参数指定关系比较运算符："="， "<"， ">"， "<="， ">=" 或 "<>"。

-- 分组查询，在分组后过滤col2为2的记录
select count(col1) as col2 from t group by col2 having col2 = 2;

-- 分组查询，在分组前过滤t为2的记录
select count(col1) as col2 from t where t = 2 group by col2 ;

-- 分页查询
select * from tbl limit 5;
select * from tbl limit 5,10;

-- 模版查询
set @a=1;
prepare stmt from 'select * from tbl limit ?';
execute stmt using @a;

set @skip=1; set @numrows=5;
prepare stmt from 'select * from tbl limit ?, ?';
execute stmt using @skip, @numrows;

-- 内连接查询
select * from a, b on a.aid =b.bid
select * from a inner join b on a.aid =b.bid
-- 结果只显示符合条件的记录.

-- 左连接查询
select * from a left join b on a.aid = b.bid
-- 结果： 左表(a)的记录将会全部表示出来,而右表(b)只会显示符合搜索条件的记录(例子中为: a.aid = b.bid).  b表记录不足的地方均为null.

-- 右连接查询
select * from a right joing b on a.aid = b.bid
-- 结果: 和left join的结果刚好相反,这次是以右表(b)为基础的,a表不足的地方用null填充. 

-- 联合查询
select * from a left join b on a.id = b.id where t = 1
union
select * from a right join b on a.id = b.id where t = 1;

-- 联合查询，不消除重复行
select * from a left join b on a.id = b.id where t = 1
union all
select * from a right join b on a.id = b.id where t = 1;

-- 如果on 后面的条件字段名称一致，可以使用using关键字，如下
select * from a left join b on a.id = b.id
select * from a left join b using id

-- 延迟关联查询
SELECT
	*
FROM
	flow_statis
INNER JOIN (
	SELECT
		id
	FROM
		flow_statis
	ORDER BY
		request_time DESC
	LIMIT 1500000,
	10
) fs USING (id);


-- 使用自定义变量
set @num :=0;
select id,@num := @num+1 from borrow_user;


-- 使用绑定变量
set @sql :='select id,user_account from borrow_user where user_account = ?';
prepare bu from @sql;
set @phone := '15821534912';
execute bu using @phone;
deallocate prepare bu;


-- 事务查询
select trx_state, trx_started, trx_requested_lock_id, trx_mysql_thread_id,trx_query from information_schema.innodb_trx


-- 将查询数据导出到文件
select a,b,a+b into outfile '/tmp/result.txt'
  fields terminated by ',' optionally enclosed by '"'
  lines terminated by '\n'
  from test_table;



-- 根据身份证信息来获取用户属性
select
  case left(id_number,2)
        when '11' then '北京市'
        when '12' then '天津市'
        when '13' then '河北省'
        when '14' then '山西省'
        when '15' then '内蒙古自治区'
        when '21' then '辽宁省'
        when '22' then '吉林省'
        when '23' then '黑龙江省'
        when '31' then '上海市'
        when '32' then '江苏省'
        when '33' then '浙江省'
        when '34' then '安徽省'
        when '35' then '福建省'
        when '36' then '江西省'
        when '37' then '山东省'
        when '41' then '河南省'
        when '42' then '湖北省'
        when '43' then '湖南省'
        when '44' then '广东省'
        when '45' then '广西壮族自治区'
        when '46' then '海南省'
        when '50' then '重庆市'
        when '51' then '四川省'
        when '52' then '贵州省'
        when '53' then '云南省'
        when '54' then '西藏自治区'
        when '61' then '陕西省'
        when '62' then '甘肃省'
        when '63' then '青海省'
        when '64' then '宁夏回族自治区'
        when '65' then '新疆维吾尔自治区'
        when '71' then '台湾省'
        when '81' then '香港特别行政区'
        when '82' then '澳门特别行政区'
        else '未知'
        end as 省份 ,
  year(curdate())-if(length(id_number)=18,substring(id_number,7,4),if(length(id_number)=15,concat('19',substring(id_number,7,2)),null)) as 年龄,
  case if(length(id_number)=18, cast(substring(id_number,17,1) as UNSIGNED)%2, if(length(id_number)=15,cast(substring(id_number,15,1) as UNSIGNED)%2,3))
    when 1 then '男'
    when 0 then '女'
    else '未知'
    end as 性别
from t_users limit 10;

-- 随机6位字符串
select char(if(floor(rand()*2)=0,65+floor(rand()*26),48+floor(rand()*9)),if(floor(rand()*2)=0,65+floor(rand()*26),48+floor(rand()*9)),if(floor(rand()*2)=0,65+floor(rand()*26),48+floor(rand()*9)),if(floor(rand()*2)=0,65+floor(rand()*26),48+floor(rand()*9)),if(floor(rand()*2)=0,65+floor(rand()*26),48+floor(rand()*9)),if(floor(rand()*2)=0,65+floor(rand()*26),48+floor(rand()*9)))

-- 随机身份证
concat('44030319',cast(UNIX_TIMESTAMP()+floor(rand()*8000000000) as char ))

-- 随机手机号
UNIX_TIMESTAMP()*10+floor(rand()*4000000000)
```

## grant

```sql
-- 授权
grant all privileges on test.* to user_01@"172.16.%.%" identified by '123456';
flush privileges;

-- 授权niuwatest用户 就有show slave staus的权限
grant replication client on *.* to 'test'@'%'；

-- 从库复制权限
grant replication slave on *.* to 'rep'@'192.168.77.130' identified by 'rep' ;

-- 查看用户授权情况
show grants for root@localhost

-- 新用户授权
create  user test@localhost identified by 'test'; #默认是usage 连接权限。
grant all on test.* to 'test'@'localhost'

-- 所有权限
grant all privileges on *.* to root@"%" identified by '123456' with grant option;
flush privileges;

-- 企业生产环境如何授权
-- 1. 博客，cms，对web连接用户采用最小化原则
grant select,insert,update,delete,create,drop on blog.* to 'blog'@localhost  identified by 'passwd';
-- 2. 对主从库授权（主为写，从为读）
-- 主库授权
grant select,insert,update,delete,create,drop on blog.* to 'blog'@localhost  identified by 'passwd';
-- 从库授权
grant select on blog.* to 'blog'@localhost  identified by 'passwd';
```

## show

```sql
-- 查看变量
show variables；

-- 查看全局变量
show global  variables；

-- 查看设置的变量
set GLOBAL connect_timeout=20;
show variables like 'connect_timeout';

-- 查看状态
show status -- 本次连接的系统状态信息
show global status -- 系统的全局状态信息


-- 查看表数据
SHOW TABLE STATUS
SHOW TABLE STATUS where `Name` NOT LIKE 'tree%';
SHOW TABLES WHERE `Tables_in_<DatabaseName>` NOT LIKE 'tree%';

-- 查看全局状态
show global status;

-- 查看进程
show processlist; -- 只列出前100条
show full processlist;

-- 查看创建数据库的命令
show create database testdata\G;

-- 查看已建表的语句
-- show create table student\G;

-- 查看表结构
desc student;
show columns from student;

-- 查看binlog信息
show binary logs;

-- 查看从库状态
show slave status\G;

-- 查看主库状态
show master status\G;

-- 查看server uuid
select @@server_uuid;
```
