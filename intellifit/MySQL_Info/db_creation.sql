# Food Entity
CREATE TABLE food(
  food_id int AUTO_INCREMENT,
  food_name varchar(80) NOT NULL,
  food_brand varchar(80) NOT NULL,
  cal_per_gram decimal(5,2) NOT NULL,
  protein_per_gram decimal(5,2) NOT NULL,
  carb_per_gram decimal(5,2) NOT NULL,
  fat_per_gram decimal(5,2) NOT NULL
  PRIMARY KEY(food_id)
);
-- # Insert Statements
INSERT INTO food (food_name, food_brand, cal_per_gram, protein_per_gram,carb_per_gram,fat_per_gram) values ('Apples', 'Sunkist', 1.00);
INSERT INTO food (food_name, food_brand, cal_per_gram, protein_per_gram,carb_per_gram,fat_per_gram) 
VALUES 
    ('Apples', 'Sunkist', 1.00, 0.00, 0.00, 0.00),
    ('Chicken Breast', 'Protein Foods', 2.5, 31.0, 0.00, 3.6),
    ('Broccoli', 'Vegetable Farms', 0.55, 2.8, 5.2, 0.6),
    ('Brown Rice', 'Grain Mills', 1.1, 2.6, 22.96, 0.9),
    ('Salmon', 'Seafood Delight', 2.06, 25.4, 0.00, 13.42),
    ('Almonds', 'Nutty Nuts', 5.7, 21.15, 21.55, 49.42),
    ('Spinach', 'Green Fields', 0.23, 2.9, 3.6, 0.4),
    ('Olive Oil', 'Healthy Oils', 8.8, 0.00, 0.00, 99.6),
    ('Greek Yogurt', 'Dairy Delights', 0.59, 10.0, 3.6, 6.0),
    ('Eggs', 'Farm Fresh', 1.5, 12.56, 0.00, 10.6),
    ('Banana', 'Fruit Co.', 0.89, 1.09, 27.0, 0.33),
    ('Quinoa', 'Grain Mills', 3.2, 4.0, 21.3, 1.6),
    ('Avocado', 'Fresh Greens', 1.6, 2.0, 8.5, 14.66);

# Meal Entity
CREATE TABLE meal(
  meal_id int AUTO_INCREMENT,
  meal_name varchar(80) NOT NULL,
  PRIMARY KEY(meal_id)
);
-- source: https://www.mysqltutorial.org/mysql-basics/mysql-insert-date/
-- https://prahladyeri.github.io/blog/2022/10/mysql-setting-default-date-to-current-date.html
-- Inserting a meal
INSERT INTO meal (meal_name) VALUES ('Breakfast');
INSERT INTO meal (meal_name) VALUES ('Lunch');
INSERT INTO meal (meal_name) VALUES ('Dinner');



-- ! #Meal-Food Associative Entity
CREATE TABLE meal_food_entity(
  mealfood_id INT AUTO_INCREMENT,
  meal_id int,
  food_id int,
  creation_date_mealfood DATE DEFAULT (CURRENT_DATE),
  serving_size DECIMAL(5,2) DEFAULT (100),
  PRIMARY KEY (mealfood_id),
  FOREIGN KEY (meal_id) REFERENCES meal(meal_id),
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);
#Insert Statements
-- Inserting a meal_food_entity entry with specified meal_id and food_id
INSERT INTO meal_food_entity (meal_id, food_id, serving_size) VALUES (1, 5, 150.50);

-- Inserting another entry with different meal_id, food_id, and using the default serving_size
INSERT INTO meal_food_entity (meal_id, food_id) VALUES (2, 13);

-- Inserting an entry with specified meal_id, food_id, creation_date_mealfood, and serving_size
INSERT INTO meal_food_entity (meal_id, food_id, creation_date_mealfood, serving_size) 
VALUES (3, 6, '2024-01-27', 200.75),
(1, 2, '2024-01-28', 150.50),
(2, 8, '2024-01-28', 300.25),
(3, 4, '2024-01-28', 180.00),
(1, 10, '2024-01-29', 250.75),
(2, 1, '2024-01-29', 120.50);
INSERT INTO meal_food_entity (meal_id, food_id, creation_date_mealfood, serving_size)
VALUES 
    (1, 3, '2024-01-30', 175.25),
    (2, 9, '2024-01-30', 220.00),
    (3, 5, '2024-01-31', 190.75),
    (1, 7, '2024-01-31', 280.50),
    (2, 2, '2024-02-01', 150.25),
    (3, 8, '2024-02-01', 300.00);


