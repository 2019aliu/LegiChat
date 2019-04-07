CREATE TABLE users(email VARCHAR(100), username VARCHAR(100), password VARCHAR(100), zipcode INT, PRIMARY KEY(email), UNIQUE(username));

DELIMITER $$

CREATE PROCEDURE initialize_user(email_u VARCHAR(100), username_u VARCHAR(100), password_u VARCHAR(100), zipcode_u INT)
BEGIN
    INSERT INTO users(email, username, password, zipcode) VALUE (email_u, username_u, password_u, zipcode_u);
END;$$

DELIMITER ;