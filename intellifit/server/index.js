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
app.get("/mealsbyday", (req, res) => {
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

app.delete("/mealsbyday/:date", (req, res) => {
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
  `;
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

app.get("/mealsbyday/:date", (req, res) => {
  const dateToParse = req.params.date;
  const parsedDate = dateToParse.split("", 10);
  let processedDate = "";
  for (let i = 0; i < parsedDate.length; i++) {
    processedDate += parsedDate[i];
  }
  const grabIndividualMealsWithMatchingDates = `
  Select * From meal_food_entity mfe WHERE mfe.creation_date_mealfood = "${processedDate}";
  `;
  db.query(grabIndividualMealsWithMatchingDates, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log("Sent back matching items by date")
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
