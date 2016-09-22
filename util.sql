/**************************sqlite***************************/

--SQLite 运算符
--逻辑运算符：
-- AND	     AND 运算符允许在一个 SQL 语句的 WHERE 子句中的多个条件的存在。
-- OR   	 OR 运算符用于结合一个 SQL 语句的 WHERE 子句中的多个条件。
-- BETWEEN	 BETWEEN 运算符用于在给定最小值和最大值范围内的一系列值中搜索值。
-- ||	     连接两个不同的字符串，得到一个新的字符串。
-- LIKE	     LIKE 运算符用于把某个值与使用通配符运算符的相似值进行比较。
-- GLOB  	 GLOB 运算符用于把某个值与使用通配符运算符的相似值进行比较。GLOB 与 LIKE 不同之处在于，它是大小写敏感的。

-- NOT  	 NOT 运算符是所用的逻辑运算符的对立面。比如 NOT EXISTS、NOT BETWEEN、NOT IN，等等。它是否定运算符。
-- EXISTS	 EXISTS 运算符用于在满足一定条件的指定表中搜索行的存在。
-- IN	     IN 运算符用于把某个值与一系列指定列表的值进行比较。
-- NOT IN	 IN 运算符的对立面，用于把某个值与不在一系列指定列表的值进行比较。
-- IS NULL	 NULL 运算符用于把某个值与 NULL 值进行比较。
-- IS	     IS 运算符与 = 相似。
-- IS NOT	 IS NOT 运算符与 != 相似。
-- UNIQUE	 UNIQUE 运算符搜索指定表中的每一行，确保唯一性（无重复）。

SELECT AGE FROM COMPANY 
WHERE EXISTS (SELECT AGE FROM COMPANY WHERE SALARY > 65000);




/**************************sql基本语法***************************/


--SELECT 语句用于从表中选取数据。
SELECT 列名称 FROM 表名称
-- DISTINCT 用于返回唯一不同的值。
SELECT DISTINCT 列名称 FROM 表名称 WHERE 列 运算符 值
--ORDER BY 语句用于对结果集进行排序。默认升序ASC。
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC


--INSERT INTO 语句用于向表格中插入新的行。
INSERT INTO table_name VALUES (值1, 值2,....)
INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)


--Update 语句用于修改表中的数据。
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值


--DELETE 语句用于删除表中的行。
DELETE FROM 表名称 WHERE 列名称 = 值
--删除所有行
DELETE FROM table_name




--WHERE 子句中搜索列的指定模式 
--LIKE
SELECT column_name(s) FROM table_name WHERE column_name LIKE pattern
eg: City LIKE 'N%'; City LIKE '%lon%'; City NOT LIKE '%lon%'
      %         替代一个或多个字符
      _	        仅替代一个字符
[要匹配的字符]  字符列中的任何单一字符
[^charlist]或[!charlist]  不在字符列中的任何单一字符
-- GLOB 大小写敏感
      *         替代一个或多个字符
      ？        仅替代一个字符
--IN 操作符
SELECT * FROM Persons WHERE LastName IN ('Adams','Carter')
--BETWEEN 操作符。这些值可以是数值、文本或者日期。
SELECT column_name(s) FROM table_name WHERE column_name BETWEEN value1 AND value2


--  as   可以为列名称和表名称指定别名（Alias）。
--表的 SQL Alias 语法
SELECT column_name(s) FROM table_name AS alias_name
--列的 SQL Alias 语法
SELECT column_name AS alias_name FROM table_name


--JOIN 用于根据两个或多个表中的列之间的关系
JOIN 或 INNER JOIN: 如果表中有至少一个匹配，则返回行
LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行
RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行
FULL JOIN: 只要其中一个表中存在匹配，就返回行


--UNION 操作符用于合并两个或多个 SELECT 语句的结果集。UNION 操作符选取不同的值。
SELECT column_name(s) FROM table_name1
UNION
SELECT column_name(s) FROM table_name2
--如果允许重复的值，请使用 UNION ALL。
SELECT column_name(s) FROM table_name1
UNION ALL
SELECT column_name(s) FROM table_name2


--SELECT INTO 语句从一个表中选取数据，然后把数据插入另一个表中。
SELECT LastName,Firstname INTO 新表 [可选 IN 'Backup.mdb']
FROM Persons WHERE City='Beijing'


--CREATE DATABASE 用于创建数据库。
CREATE DATABASE database_name

--CREATE TABLE 语句用于创建数据库中的表。
CREATE TABLE 表名称
(
列名称1 数据类型  NOT NULL  PRIMARY KEY,--不为空，主键
列名称2 数据类型  CHECK (列名称2>0),    --给定条件
列名称2 数据类型  DEFAULT 'Sandnes'     --默认值
....
)

--CREATE INDEX 语句用于在表中创建索引。
--在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。
CREATE INDEX index_name ON table_name (column_name)
CREATE UNIQUE INDEX index_name ON table_name (column_name1 DESC,column_name2)--唯一，降序，多个


--DROP 语句，可以轻松地删除索引、表和数据库。
DROP INDEX index_name;
DROP TABLE 表名称 --删除表
DROP DATABASE 数据库名称 --删除数据库
TRUNCATE TABLE 表名称 --清空表


--ALTER TABLE 语句用于在已有的表中添加、修改或删除列。
ALTER TABLE table_name ADD column_name datatype --添加列
ALTER TABLE table_name DROP COLUMN column_name  --删除列
ALTER TABLE table_name ALTER COLUMN column_name datatype --改变表中列的数据类型


--视图是可视化的表。
CREATE VIEW view_name AS
SELECT column_name(s) FROM table_name WHERE condition --创建视图

CREATE OR REPLACE VIEW view_name AS
SELECT column_name(s) FROM table_name WHERE condition --更新视图

DROP VIEW view_name  --撤销视图























