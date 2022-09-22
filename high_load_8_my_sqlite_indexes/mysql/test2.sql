SET GLOBAL innodb_adaptive_hash_index=ON;
select * from users2 where name = 'user3466345' 
or name = 'user634532'
or name = 'user4232'
or name = 'user4232'
or name = 'user232'
or name = 'user32232'
;

select count(id) from users where age = 50;

SET GLOBAL innodb_adaptive_hash_index=OFF;
select count(id) from users2 where id = 250000;

SET GLOBAL innodb_adaptive_hash_index=ON;
select count(id) from users where age BETWEEN 50 AND 75;

SET GLOBAL innodb_adaptive_hash_index=OFF;
create INDEX users2 USING HASH on users2 (age);