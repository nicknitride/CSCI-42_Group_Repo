/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nickwuzhere",
  database: "intellifit_test",
  timezone: 'utc'  // set timezone to UTC
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
  ;`
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
  f.cal_per_gram
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

app.post("/meal/edit/:jsonstring",(req,res)=>{
  const data = JSON.parse(req.params.jsonstring);
  const sendEditedMealFood = `
  UPDATE meal_food_entity
  SET serving_size = ${data["serving_size"]}
  WHERE meal_food_entity.mealfood_id = ${data["mealfood_id"]};
  `;
  console.log("In meal/edit/:jsonstring post function", data,sendEditedMealFood);
  db.query(sendEditedMealFood,(err, result) => {
    if (err) {
      console.log("Edit has failed, check if database supports the number size, currently it supports xxxx.xx as a value max");
      console.log(err);
    }
    res.send(result);
  });

  // !? TODO Finish this Function
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
