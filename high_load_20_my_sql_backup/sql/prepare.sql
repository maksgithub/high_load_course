CREATE DATABASE IF NOT EXISTS users_db;
USE users_db;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    age int,
    PRIMARY KEY (id)
);

DROP PROCEDURE IF EXISTS insertRowsTostudent_data;
DELIMITER //  
CREATE PROCEDURE insertRowsTostudent_data()   
BEGIN
DECLARE i INT DEFAULT 1; 
WHILE (i <= 10000) DO
    INSERT INTO users (name, age) VALUES ('user', i);
    SET i = i+1;
END WHILE;
END;