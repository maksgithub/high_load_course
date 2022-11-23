CREATE DATABASE IF NOT EXISTS users_db;
USE users_db;

CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    age int,
    PRIMARY KEY (id)
);

DROP PROCEDURE IF EXISTS insertUsers;
DELIMITER //  
CREATE PROCEDURE insertUsers()   
BEGIN
DECLARE i INT DEFAULT 1; 
WHILE (i <= 1000) DO
    INSERT INTO users (name, age) VALUES ('user', i);
    SET i = i+1;
END WHILE;
END;

USE users_db;
CALL insertUsers();
SELECT * FROM users;