-- # Total Calories Per Meal (Cumulative, doesn't separate by date)
SELECT
    m.meal_id,
    m.meal_name,
    SUM(f.cal_per_gram * mf.serving_size) AS total_calories
FROM
    meal m
JOIN
    meal_food_entity mf ON m.meal_id = mf.meal_id
JOIN
    food f ON mf.food_id = f.food_id
GROUP BY
    m.meal_id, m.meal_name;
# Total Calories (Separated by date)
SELECT 
    m.meal_id,
    m.meal_name,
    mf.creation_date_mealfood AS meal_date,
    SUM(f.cal_per_gram * mf.serving_size) AS total_calories
FROM
    meal m
JOIN 
    meal_food_entity mf ON m.meal_id = mf.meal_id
JOIN 
    food f ON mf.food_id = f.food_id
GROUP BY
    m.meal_id, m.meal_name, mf.creation_date_mealfood;
Join Types: https://commons.wikimedia.org/wiki/File:SQL_Joins.svg
- Both of these use inner joins

# Daily Calorie Total (ISO Date and used for the Meal Dashboard)

    SELECT
    DATE_FORMAT(mfe.creation_date_mealfood, '%Y-%m-%d') AS day,
    SUM(f.cal_per_gram * mfe.serving_size) AS "Total Calories"
    FROM
        meal_food_entity mfe
    JOIN
        meal m ON mfe.meal_id = m.meal_id
    JOIN
        food f ON mfe.food_id = f.food_id
    GROUP BY
        mfe.creation_date_mealfood;
    
# Display all meals and food associated to a meal given a date, with calorie count, in index.js adjust as needed
SELECT mfe.mealfood_id, f.food_name, f.food_brand, m.meal_name, (f.cal_per_gram * mfe.serving_size) AS "Calories", mfe.creation_date_mealfood
FROM meal_food_entity mfe 
JOIN food f ON f.food_id = mfe.food_id
JOIN meal m ON m.meal_id = mfe.meal_id
WHERE mfe.creation_date_mealfood = "2024-01-30";



