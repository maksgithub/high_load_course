select count(id) from users where age > 50;

select count(id) from users where age = 50;

select count(id) from users where age = 50 or age = 25 or age = 75;
SET GLOBAL innodb_adaptive_hash_index=OFF;
