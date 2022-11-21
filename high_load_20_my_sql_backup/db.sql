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
WHILE (i <= 4) DO
    INSERT INTO users (name, age) VALUES ('user', RAND()*(100-1)+1);
    -- INSERT INTO student_data ( enroll_id,term,specialization) VALUES (i,"term1", "Computers");
    SET i = i+1;
END WHILE;
END;
//  
DELIMITER ;

CALL insertRowsTostudent_data();

INSERT INTO users (name, age) VALUES ('user', RAND()*(100-1)+1);
SELECT * from users;