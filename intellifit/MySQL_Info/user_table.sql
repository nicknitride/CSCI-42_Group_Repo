DROP TABLE user;
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(300) NOT NULL,
    calorie_goal INT,
    protein_goal INT,
    weight_kg DECIMAL(5,2),
    height_cm DECIMAL(5,2)
);

INSERT INTO user (username, password, calorie_goal, protein_goal, weight_kg, height_cm) 
VALUES 
    ('user1', 'password1', 2000, 100, 70.5, 170.2),
    ('user2', 'password2', 1800, 90, 65.3, 165.5),
    ('user3', 'password3', 2200, 110, 80.1, 175.0),
    ('user4', 'password4', NULL, NULL, 72.0, 168.8),
    ('user5', 'password5', 1900, NULL, NULL, NULL);

-- These passwords are temporary, they have to be salted first