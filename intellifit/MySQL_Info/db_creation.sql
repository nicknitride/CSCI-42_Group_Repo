-- # Food Entity
-- -- Draft new food entity
create table food(
food_id int auto_increment,
food_name varchar(80) not null,
food_brand varchar(80) not null,
protein_hundred_grams decimal(5,2) not null,
carb_hundred_grams decimal(5,2) not null,
fat_hundred_grams decimal(5,2) not null,
protein_per_gram  decimal(6,3) AS (protein_hundred_grams/100),
carb_per_gram decimal(6,3) AS (carb_hundred_grams/100),
fat_per_gram decimal(6,3) AS (fat_hundred_grams/100),
cal_per_gram decimal (7,3) AS ((carb_per_gram*4)+(protein_per_gram*4)+(fat_per_gram*9)),
PRIMARY KEY(food_id)
);

INSERT INTO food(food_name, food_brand, protein_hundred_grams, carb_hundred_grams, fat_hundred_grams)
VALUES
("Grilled Chicken Breast", "FitPro", 25.5, 0.5, 3.2),
("Organic Brown Rice", "Nature's Harvest", 2.0, 45.0, 0.9),
("Wild-Caught Salmon", "Ocean Delight", 22.0, 0.0, 13.5),
("Fresh Broccoli", "Green Farms", 2.8, 11.2, 0.3),
("Extra Virgin Olive Oil", "Mediterra", 0.0, 0.0, 100.0),
("Whole Grain Bread", "Healthy Bites", 10.0, 50.0, 2.0),
("Farm Fresh Eggs", "EcoEggs", 12.5, 1.0, 10.0),
("Organic Quinoa", "Organic Harvest", 4.0, 21.0, 1.6),
("Greek Yogurt", "YogurtLicious", 10.0, 4.0, 2.0),
("Organic Spinach", "Greens Galore", 2.9, 3.6, 0.4),
("Roasted Almonds", "Nuts n' More", 21.1, 22.0, 49.4),
("Sweet Potato", "Farm Fresh Produce", 1.6, 20.1, 0.1),
("Cottage Cheese", "Dairy Delight", 11.1, 3.4, 2.3),
("Fresh Avocado", "Avocado King", 2.0, 8.5, 14.7),
("Lean Grass-Fed Beef", "Green Pastures", 26.0, 0.0, 17.0);

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
  serving_size DECIMAL(6,2) not null,
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
INSERT INTO meal_food_entity (meal_id, food_id, serving_size)
VALUES
(1, 1, 150.50),
(1, 2, 200.25),
(2, 3, 100.75),
(2, 4, 75.30),
(3, 5, 300.00),
(3, 6, 50.80),
(1, 7, 180.40),
(2, 8, 250.10),
(3, 9, 120.75),
(1, 10, 90.20);



