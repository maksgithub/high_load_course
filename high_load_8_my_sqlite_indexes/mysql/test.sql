select count(id) from users where age > 50;

select count(id) from users where age = 50;

SET GLOBAL innodb_adaptive_hash_index=OFF;
select count(id) from users where id = 250000;

SET GLOBAL innodb_adaptive_hash_index=ON;
select count(id) from users where age BETWEEN 50 AND 75;