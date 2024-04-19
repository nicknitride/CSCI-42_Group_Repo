/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const { Axios } = require("axios");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nickwuzhere",
  database: "intellifit_test",
  timezone: "utc", // set timezone to UTC
  multipleStatements: true, //Enables complex commands, such as resetting auto_increment
});
const app = express();
const PORT = 3003;
app.use(cors());
app.use(express.json());
app.get("/meals/day", (req, res) => {
  db.query(
    `
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
        mfe.creation_date_mealfood
    ORDER BY
        mfe.creation_date_mealfood;
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.send(result);
      console.log("Displayed meals grouped by day with total calories");
    }
  );
});

app.delete("/meals/day/:date", (req, res) => {
  const dateToDelete = req.params.date;
  const parsedDate = dateToDelete.split("", 10);
  let processedDate = "";
  for (let i = 0; i < parsedDate.length; i++) {
    processedDate += parsedDate[i];
  }
  console.log("Parsed Date: " + parsedDate);
  const deleteBYDateSQL = `
  DELETE FROM meal_food_entity 
  WHERE meal_food_entity.creation_date_mealfood = "${processedDate}"
  ;`;
  db.query(deleteBYDateSQL, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(
      "Endpoint has deleted all matching meals with the date " +
        processedDate +
        " " +
        result
    );
  });
});
// NodeJS MySQL Delete https://www.w3schools.com/nodejs/nodejs_mysql_delete.asp

app.get("/meals/day/:date", (req, res) => {
  const dateToParse = req.params.date;
  const parsedDate = dateToParse.split("", 10);
  let processedDate = "";
  for (let i = 0; i < parsedDate.length; i++) {
    processedDate += parsedDate[i];
  }
  const grabIndividualMealsWithMatchingDates = `
  SELECT mfe.mealfood_id, f.food_name, f.food_brand, m.meal_name, (f.cal_per_gram * mfe.serving_size) AS "Calories", mfe.creation_date_mealfood, mfe.serving_size, 
  f.cal_per_gram, f.protein_per_gram, f.fat_per_gram, f.carb_per_gram
  FROM meal_food_entity mfe 
  JOIN food f ON f.food_id = mfe.food_id
  JOIN meal m ON m.meal_id = mfe.meal_id
  WHERE mfe.creation_date_mealfood = "${processedDate}"
  ORDER by mfe.meal_id ASC;
  `;
  db.query(grabIndividualMealsWithMatchingDates, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log("Sent back matching items by date");
  });
});

app.get("/meals/today", (req, res) => {
  const GetMealsFromTodaySQL = `
  SELECT mfe.mealfood_id, f.food_name, f.food_brand, m.meal_name, mfe.serving_size, f.protein_per_gram, f.cal_per_gram, f.fat_per_gram, f.carb_per_gram, mfe.creation_date_mealfood
  from meal_food_entity mfe 
  JOIN food f ON f.food_id = mfe.food_id
  JOIN meal m ON m.meal_id = mfe.meal_id
  where DATE(mfe.creation_date_mealfood) = CURDATE() ORDER BY mfe.meal_id;
  `;
  db.query(GetMealsFromTodaySQL, (err, result) => {
    if (err) {
      console.log("Error getting meals/today " + err);
    }
    console.log("Sent meals/today", result);
    res.send(result);
  });
});

app.post("/meals/reset/mealfood", (req, res) => {
  //This resets the mealfood_id, use upon deletion to keep the next and previous buttons working
  const ResetMFESQL = `
  SET  @num := 0;
  UPDATE meal_food_entity 
  SET mealfood_id = @num := (@num+1);
  ALTER TABLE meal_food_entity AUTO_INCREMENT =1 ;
  `;
  db.query(ResetMFESQL, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(
      "Successfully reset the meal_food_enttiy auto_increment",
      result
    );
    res.send("Successfully reset the meal_food_enttiy auto_increment");
  });
});

app.get("/meals/today/totalcal", (req, res) => {
  const getTotalCallForTodaySQL = `
  SELECT 
  SUM(mfe.serving_size * f.cal_per_gram) AS total_calories,
  SUM(mfe.serving_size * f.protein_per_gram) AS total_protein,
  SUM(mfe.serving_size * f.fat_per_gram) AS total_fat,
  SUM(mfe.serving_size * f.carb_per_gram) AS total_carbs
  FROM meal_food_entity mfe
  JOIN food f on f.food_id = mfe.food_id
  JOIN meal m on m.meal_id = mfe.meal_id
  where DATE(mfe.creation_date_mealfood) = CURDATE() ORDER BY mfe.meal_id;
  `;
  db.query(getTotalCallForTodaySQL, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("Successfully sent totals for Today view", result);
    res.send(result);
  });
});

app.get("/meals/today/totalcal/:date", (req, res) => {
  const date = req.params.date;
  const getTotalCallForTodaySQL = `
  SELECT 
  SUM(mfe.serving_size * f.cal_per_gram) AS total_calories,
  SUM(mfe.serving_size * f.protein_per_gram) AS total_protein,
  SUM(mfe.serving_size * f.fat_per_gram) AS total_fat,
  SUM(mfe.serving_size * f.carb_per_gram) AS total_carbs
  FROM meal_food_entity mfe
  JOIN food f on f.food_id = mfe.food_id
  JOIN meal m on m.meal_id = mfe.meal_id
  where DATE(mfe.creation_date_mealfood) = "${date}" ORDER BY mfe.meal_id;
  `;
  console.log(getTotalCallForTodaySQL);
  db.query(getTotalCallForTodaySQL, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("Successfully sent totals for Today view", result);
    res.send(result);
  });
});

app.post("/meal/edit/:jsonstring", (req, res) => {
  const data = JSON.parse(req.params.jsonstring);
  const sendEditedMealFood = `
  UPDATE meal_food_entity
  SET serving_size = ${data["serving_size"]}
  WHERE meal_food_entity.mealfood_id = ${data["mealfood_id"]};
  `;
  console.log(
    "In meal/edit/:jsonstring post function",
    data,
    sendEditedMealFood
  );
  db.query(sendEditedMealFood, (err, result) => {
    if (err) {
      console.log(
        "Edit has failed, check if database supports the number size, currently it supports xxxx.xx as a value max"
      );
      console.log(err);
      res.status(500).send("Number value is either negative outside of realistic range, please try again")
    }
    res.send(result);
  });

  // !? TODO Finish this Function
});

app.get("/food/all", (req, res) => {
  const getAllFood = `select * from food LIMIT 10;`;
  console.log("Sending list of all food items");
  db.query(getAllFood, (err, result) => {
    if (err) {
      console.log("Failed inside food/all index.js");
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/meal/addentry", (req, res) => {
  // Parse the data from the request body
  const { mealID, foodID, servingSize, selectedDate } = req.body;

  // Construct the SQL query to insert a new entry into the meal_food_entity table
  const insertEntrySQL = `
    INSERT INTO meal_food_entity (meal_id, food_id, creation_date_mealfood, serving_size)
    VALUES (${mealID}, ${foodID}, "${selectedDate}", ${servingSize})
  `;

  // Execute the SQL query
  db.query(insertEntrySQL, (err, result) => {
    if (err) {
      console.log("Error adding meal entry:", err);
      res.status(500).send("Error: invalid meal serving size!");
    } else {
      console.log("Meal entry added successfully");
      res.send(result);
    }
  });
});

app.post("/meal/delete-single-item",(req,res)=>{
  const {mealfood_id} = req.body;
  const deleteSingleItem = `
  DELETE FROM meal_food_entity WHERE meal_food_entity.mealfood_id = ${mealfood_id}
  `
  db.query(deleteSingleItem, (err, result)=>{
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log(result)
      res.status(200).send(result);
    }
  })
})

app.post("/food/search",(req,res)=>{
  const {search_term} = req.body;
  const searchMealFoodSQL = `
  SELECT * FROM food
  WHERE LOWER(food_name) LIKE "%${search_term.toLowerCase()}%" 
  OR LOWER(food_brand) LIKE "%${search_term.toLowerCase()}%"
  `
  db.query(searchMealFoodSQL,(err,result)=>{
    if(err){
      console.log(err);
      console.log()
      res.status(500).send(err);
    }
    else{
      console.log("Performed search for "+search_term);
      console.log(result);
      res.send(result);
    }
  })
})

// Food data export see "/food/all"
// MealFoodExport
app.get("/mealfood/export",(req,res)=>{
  const downMealFood = `
  SELECT * FROM meal_food_entity
  `
  db.query(downMealFood,(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log("Exported all meal food entities")
      console.log(result)
      res.send(result);
    }
  })
})

function fixDateforRedirect(date){
  const shortenedDateArray = date.split("", 10);
  const fixedDate = shortenedDateArray
    .splice(0.1)
    .toString()
    .replace(/[,]/g, "");
  console.log(shortenedDateArray, fixedDate);
  return fixedDate;
}

// MealFoodImport
app.post("/mealfood/import",(req,res)=>{
  const {mealfood_id, meal_id, food_id, creation_date_mealfood, serving_size} = req.body;
  const populateDB = `
  INSERT INTO meal_food_entity (mealfood_id, meal_id, food_id,creation_date_mealfood, serving_size)
    VALUES (${mealfood_id}, ${meal_id}, ${food_id}, "${fixDateforRedirect(creation_date_mealfood)}",${serving_size})
  `
  db.query(populateDB,(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log("Exported all meal food entities")
      console.log(result)
      res.send(result);
    }
  })
})



app.post("/mealfood/purge",(req,res)=>{
  const eraseDB = `
  DELETE FROM meal_food_entity;
  `
  db.query(eraseDB,(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log("Deleted all meal food entities")
      console.log(result)
      res.send(result);
    }
  })
})

app.post("/food/purge",(req,res)=>{
  const eraseDB = `
  DELETE FROM food;
  `
  db.query(eraseDB,(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log("Deleted all food entities")
      console.log(result)
      res.send(result);
    }
  })
})

// MealFoodImport
app.post("/food/import",(req,res)=>{
  const {food_id, food_name, food_brand, protein_hundred_grams, carb_hundred_grams, fat_hundred_grams } = req.body;
  const populateDB = `
  INSERT INTO food (food_id, food_name, food_brand, protein_hundred_grams, carb_hundred_grams, fat_hundred_grams )
    VALUES (${food_id}, "${food_name}", "${food_brand}", ${protein_hundred_grams}, ${carb_hundred_grams}, ${fat_hundred_grams} )
  `
  db.query(populateDB,(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log("Added  all meal food entries")
      console.log(result)
      res.send(result);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
