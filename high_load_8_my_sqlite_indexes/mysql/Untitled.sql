SET SQL_SAFE_UPDATES = 0;
DELETE from users;

CREATE TABLE users2 AS SELECT * FROM users;
SET GLOBAL innodb_flush_log_at_trx_commit=1;

select count(id) from users;
select count(id) from users2;

select count(id) from users where age > 50;
select count(id) from your_table where val > 50;

select count(id) from users where name = 'name7777777';


INSERT INTO users (name, age)
VALUES ('user', 10);

SET GLOBAL innodb_flush_log_at_trx_commit=0;
call while_example()