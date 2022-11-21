CREATE DATABASE IF NOT EXISTS users_db;

USE users_db;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    name varchar(255),
    age int
);

DROP PROCEDURE IF EXISTS insertRowsTostudent_data;
DELIMITER //  
CREATE PROCEDURE insertRowsTostudent_data()   
BEGIN
DECLARE i INT DEFAULT 1; 
WHILE (i <= 1000) DO
    INSERT INTO users (name, age) VALUES ('user', i);
    
    SET i = i+1;
END WHILE;
END;

CALL insertRowsTostudent_data();

-- INSERT INTO users (name, age) VALUES ('user', RAND()*(100-1)+1);
SELECT count(*) from users;