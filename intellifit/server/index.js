/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const { Axios } = require("axios");
const bcrypt = require("bcrypt");
const { format } = require("path");
const { duration } = require("@mui/material");
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
app.get("/meals/day/:loggedInUser", (req, res) => {
  const {loggedInUser} = req.params;
  db.query(
    `
    SELECT
    DATE_FORMAT(mfe.creation_date_mealfood, '%Y-%m-%d') AS creation_date_mealfood,
    SUM(f.cal_per_gram * mfe.serving_size) AS "Calories"
    FROM
        meal_food_entity mfe
    JOIN
        meal m ON mfe.meal_id = m.meal_id
    JOIN
        food f ON mfe.food_id = f.food_id
    WHERE 
        mfe.created_by = "${loggedInUser}"
    GROUP BY
        mfe.creation_date_mealfood, mfe.created_by
    ORDER BY
        mfe.creation_date_mealfood;

    `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.send(result);
      console.log("Displayed meals grouped by day with total calories",result);
    }
  );
});

app.delete("/meals/day/:date/:loggedInUser", (req, res) => {
  const loggedInUser = req.params.loggedInUser;
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
  AND meal_food_entity.created_by = "${loggedInUser}"
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

app.get("/meals/day/:date/:loggedInUser", (req, res) => {
  const loggedInUser = req.params.loggedInUser;
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
  AND mfe.created_by = "${loggedInUser}"
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

app.get("/meals/today/:loggedInUser", (req, res) => {
  const {loggedInUser} = req.params;
  const GetMealsFromTodaySQL = `
  SELECT mfe.mealfood_id, f.food_name, f.food_brand, m.meal_name, mfe.serving_size, f.protein_per_gram, f.cal_per_gram, f.fat_per_gram, f.carb_per_gram, mfe.creation_date_mealfood, mfe.created_by
  from meal_food_entity mfe 
  JOIN food f ON f.food_id = mfe.food_id
  JOIN meal m ON m.meal_id = mfe.meal_id
  where DATE(mfe.creation_date_mealfood) = CURDATE() 
  AND mfe.created_by = "${loggedInUser}"
  ORDER BY mfe.meal_id;
  ;
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

app.get("/meals/today/totalcal/:loggedInUser", (req, res) => {
  const {loggedInUser} = req.params;
  const getTotalCallForTodaySQL = `
  SELECT 
  SUM(mfe.serving_size * f.cal_per_gram) AS total_calories,
  SUM(mfe.serving_size * f.protein_per_gram) AS total_protein,
  SUM(mfe.serving_size * f.fat_per_gram) AS total_fat,
  SUM(mfe.serving_size * f.carb_per_gram) AS total_carbs
  FROM meal_food_entity mfe
  JOIN food f on f.food_id = mfe.food_id
  JOIN meal m on m.meal_id = mfe.meal_id
  where DATE(mfe.creation_date_mealfood) = CURDATE() 
  AND mfe.created_by = "${loggedInUser}"
  ORDER BY mfe.meal_id;
  `;
  db.query(getTotalCallForTodaySQL, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("Successfully sent totals for Today view", result);
    res.send(result);
  });
});

app.get("/meals/today/totalcal/:date/:loggedInUser", (req, res) => {
  const loggedInUser = req.params.loggedInUser;
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
  where DATE(mfe.creation_date_mealfood) = "${date}"
  AND mfe.created_by = "${loggedInUser}"
  ORDER BY mfe.meal_id
  ;
  `;
  // console.log(getTotalCallForTodaySQL);
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
      res
        .status(500)
        .send(
          "Number value is either negative outside of realistic range, please try again"
        );
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
  const { mealID, foodID, servingSize, selectedDate, loggedInUser } = req.body;

  // Construct the SQL query to insert a new entry into the meal_food_entity table
  const insertEntrySQL = `
    INSERT INTO meal_food_entity (meal_id, food_id, creation_date_mealfood, serving_size, created_by)
    VALUES (${mealID}, ${foodID}, "${selectedDate}", ${servingSize}, "${loggedInUser}")
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

app.post("/food/addentry", (req, res) => {
  const {
    food_name,
    food_brand,
    protein_hundred_grams,
    carb_hundred_grams,
    fat_hundred_grams,
  } = req.body;
  const addFoodSQL = `
  INSERT INTO food(food_name, food_brand, protein_hundred_grams, carb_hundred_grams, fat_hundred_grams)
  VALUES
  ("${food_name}", "${food_brand}", ${protein_hundred_grams}, ${carb_hundred_grams}, ${fat_hundred_grams});
  `;
  db.query(addFoodSQL, (err, result) => {
    if (err) {
      res.status(500).send("Error: possibly invalid macronutrient values");
    } else {
      res.status(200).send("Added to Food DB!");
    }
  });
});

app.post("/meal/delete-single-item", (req, res) => {
  const { mealfood_id } = req.body;
  const deleteSingleItem = `
  DELETE FROM meal_food_entity WHERE meal_food_entity.mealfood_id = ${mealfood_id}
  `;
  db.query(deleteSingleItem, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.post("/food/search", (req, res) => {
  const { search_term } = req.body;
  const searchMealFoodSQL = `
  SELECT * FROM food
  WHERE LOWER(food_name) LIKE "%${search_term.toLowerCase()}%" 
  OR LOWER(food_brand) LIKE "%${search_term.toLowerCase()}%"
  `;
  db.query(searchMealFoodSQL, (err, result) => {
    if (err) {
      console.log(err);
      console.log();
      res.status(500).send(err);
    } else {
      console.log("Performed search for " + search_term);
      console.log(result);
      res.send(result);
    }
  });
});

// Food data export see "/food/all"
// MealFoodExport
app.get("/mealfood/export", (req, res) => {
  const downMealFood = `
  SELECT * FROM meal_food_entity
  `;
  db.query(downMealFood, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("Exported all meal food entities");
      console.log(result);
      res.send(result);
    }
  });
});

function fixDateforRedirect(date) {
  const shortenedDateArray = date.split("", 10);
  const fixedDate = shortenedDateArray
    .splice(0.1)
    .toString()
    .replace(/[,]/g, "");
  console.log(shortenedDateArray, fixedDate);
  return fixedDate;
}

// MealFoodImport
app.post("/mealfood/import", (req, res) => {
  const {
    mealfood_id,
    meal_id,
    food_id,
    creation_date_mealfood,
    serving_size,
  } = req.body;
  const populateDB = `
  INSERT INTO meal_food_entity (mealfood_id, meal_id, food_id,creation_date_mealfood, serving_size)
    VALUES (${mealfood_id}, ${meal_id}, ${food_id}, "${fixDateforRedirect(
    creation_date_mealfood
  )}",${serving_size})
  `;
  db.query(populateDB, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("Exported all meal food entities");
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/mealfood/purge", (req, res) => {
  const eraseDB = `
  DELETE FROM meal_food_entity;
  `;
  db.query(eraseDB, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("Deleted all meal food entities");
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/food/purge", (req, res) => {
  const eraseDB = `
  DELETE FROM food;
  `;
  db.query(eraseDB, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("Deleted all food entities");
      console.log(result);
      res.send(result);
    }
  });
});

// MealFoodImport
app.post("/food/import", (req, res) => {
  const {
    food_id,
    food_name,
    food_brand,
    protein_hundred_grams,
    carb_hundred_grams,
    fat_hundred_grams,
  } = req.body;
  const populateDB = `
  INSERT INTO food (food_id, food_name, food_brand, protein_hundred_grams, carb_hundred_grams, fat_hundred_grams )
    VALUES (${food_id}, "${food_name}", "${food_brand}", ${protein_hundred_grams}, ${carb_hundred_grams}, ${fat_hundred_grams} )
  `;
  db.query(populateDB, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("Added  all meal food entries");
      console.log(result);
      res.send(result);
    }
  });
});

// Authentication Start
app.post("/register",async (req, res) => {
  const { username, password } = req.body;
  try{
    const passwordSalt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, passwordSalt);
    const insertUser = `INSERT INTO user (username, password) 
    values ("${username}","${hashedPass}")`;
    db.query(insertUser, (err, result) => {
      if (err) {
        console.log(err);
        if(err.code==="ER_DUP_ENTRY"){
          res.status(500).send("Username already exists, please try again or login");
        }
        else{
          // console.log(err);
          res.status(500).send("Error: Try Again");
        }
      } 
      else {
        console.log("Account registered")
        res.send("Account Registered, Welcome!");
      }
    });
  }catch{
    res.status(500).send("Failed")
  }

});

app.post("/login",async (req,res)=>{
  console.log("Triggered login")
  const {username, password} = req.body;
  var foundPassword = "";
  const checkUsername = `
  SELECT user.password from user where BINARY user.username = "${username}"
  LIMIT 1
  `
  db.query(checkUsername,async (err, result)=>{
    if(err){
      res.status(500).send("Server error")
    }
    else{
      if(result.length===0){
        res.send("User doesn't exist")
      }
      else{
        foundPassword = result[0].password;
        console.log("Found:"+foundPassword)
        try{
          if(await bcrypt.compare(password,foundPassword)){
            console.log(await bcrypt.compare(password,foundPassword))
            res.send("Success")
          }else{
            res.send("Incorrect username or password")
          }
        }catch{
          res.send("Server failed")
        }
      }
    }
  })
})
// Authentication End

// User Logic Start
app.post("/userinfo",(req,res)=>{
  const {username} = req.body;
  const getUser = `
  SELECT * from user WHERE BINARY "${username}" = user.username
  `
  db.query(getUser,(err,result)=>{
    if(err){
      res.status(500).send("Failed")
      console.log(err);
    }
    else{
      res.send(result)
      console.log(result);
    }
  })
})

app.post("/userinfo/update",(req,res)=>{
  const{protein_goal, calorie_goal, weight_kg, height_cm, username} = req.body;
  const updateInfo = `
    UPDATE user 
    SET protein_goal = ${protein_goal}, calorie_goal = ${calorie_goal}, 
    weight_kg = ${weight_kg}, height_cm = ${height_cm}
    WHERE BINARY username = "${username}"
  `;
  db.query(updateInfo, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to update user information");
    } else {
      console.log("User information updated successfully");
      res.send("User information updated successfully");
    }
  });
})

// User Logic End

app.get("/workouts", (req, res) => {
    const getWorkouts =`SELECT workout_id, workout_name FROM workout ORDER BY workout_name ASC;`;
    db.query(getWorkouts, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-1", (req, res) => { 
  const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id, 
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id=workout_exercise_entry.exercise_id
    AND workout.workout_id=1
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-2", (req, res) => {
    const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id,
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id=workout_exercise_entry.exercise_id
    AND workout.workout_id=2
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-3", (req, res) => {
    const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id,
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id=workout_exercise_entry.exercise_id
    AND workout.workout_id=3
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-4", (req, res) => {
    const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id,
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id=workout_exercise_entry.exercise_id
    AND workout.workout_id=4
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-5", (req, res) => {
    const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id, 
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id=workout_exercise_entry.exercise_id
    AND workout.workout_id=5
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-6", (req, res) => {
    const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id,
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id=workout_exercise_entry.exercise_id
    AND workout.workout_id=6
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-7", (req, res) => {
    const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id,
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id=workout_exercise_entry.exercise_id
    AND workout.workout_id=7
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/ex_entries-8", (req, res) => {
    const getWorkoutEntries = `SELECT workout_exercise_entry.workout_id, workout.workout_name, exercise.exercise_id,
    exercise.exercise_name, workout_exercise_entry.entry_type 
    FROM workout, exercise, workout_exercise_entry 
    WHERE workout.workout_id = workout_exercise_entry.workout_id 
    AND exercise.exercise_id = workout_exercise_entry.exercise_id
    AND workout.workout_id=8
    ORDER BY exercise.exercise_name ASC;`;
    db.query(getWorkoutEntries, (err, result) => {
      if(err){
        console.log("could not retrieve");
        console.log(err);
      }
      res.send(result);
    })
});

app.get("/exercises-Recent/:loggedInUser", (req, res) => {
  const {loggedInUser} = req.params; 
  const getExercisesRecent =  `SELECT ec.exercise_completed_id, e.exercise_name, w.completed_date, ec.completed_type 
                              FROM exercise_completed ec 
                              INNER JOIN exercise e ON ec.exercise_id = e.exercise_id 
                              INNER JOIN workout_completed w ON ec.workout_completed_id = w.workout_completed_id 
                              WHERE w.completed_date = (SELECT MAX(completed_date) FROM workout_completed)
                              AND ec.created_by = "${loggedInUser}";`;
  db.query(getExercisesRecent, (err, result) => {
    if(err){
      console.log("could not retrieve");
      console.log(err);
    }
    res.send(result);
  })
});

app.post('/addTo_WorkoutCompleted', (req, res) => {
    const {loggedInUser, date} = req.body;
    const addWorkoutDate =  `INSERT INTO workout_completed(completed_date, created_by) VALUES("${date}", "${loggedInUser}");`;
    db.query(addWorkoutDate, (err, data) => {
      if(err){
        console.log("Error adding entry into workout_completed:", err);
        res.status(500).send("Failed to add entry");
      } else {
        console.log(data)
        console.log("workout_completed Logged");
        res.send(data);
      }
    })
})

app.post('/addTo_ExerciseCompleted', (req, res) => {
  const addExerciseCompleted = "INSERT INTO exercise_completed (`workout_completed_id`, `exercise_id`, `completed_type`, `created_by`) VALUES (?, ?, ?, ?);";
  const getWorkoutCompletedID = `SELECT workout_completed_id FROM workout_completed ORDER BY workout_completed_id DESC LIMIT 1;`;
  
  db.query(getWorkoutCompletedID, (err, result) => {
      if (err) {
          console.log("Error fetching workout_completed_id:", err);
          res.status(500).send("Failed to fetch workout_completed_id");
          return;
      }

      const workoutCompletedID = result[0].workout_completed_id;

      const exercise = req.body.exercise;
      var getWorkoutType = '';
      
      if((exercise >= 1 && exercise <= 18) || (exercise >= 27 && exercise <= 34) || (exercise == 37) 
      || (exercise >= 39 && exercise <= 42)){
        getWorkoutType = 'set-rep-weight';
      } else if ((exercise >= 19 && exercise <= 22)) {
        getWorkoutType = 'distance';
      } else {
        getWorkoutType = 'set-rep-duration';
      }

      const exerciseValues = [
          workoutCompletedID,
          req.body.exercise,
          getWorkoutType,
          req.body.loggedInUser
      ];

      // Execute the insert query with the retrieved workout_completed_id
      db.query(addExerciseCompleted, exerciseValues, (err, data) => {
          if (err) {
              console.log("Error adding entry into exercise_completed:", err);
              res.status(500).send("Failed to add entry");
          } else {
              console.log("exercise_completed Logged");
              res.send(data);
          }
      });
  });
});

app.post('/addTo_DurationCompleted', (req, res) => {
    const addDuration = "INSERT INTO duration_completed(`exercise_completed_id`, `duration`, `created_by`) VALUES (?, ?, ?);";
    const getExerciseCompletedID = `SELECT e.exercise_completed_id 
                                    FROM exercise_completed e, workout_completed w 
                                    WHERE e.workout_completed_id=w.workout_completed_id 
                                    ORDER BY e.workout_completed_id DESC LIMIT 1;`;

    db.query(getExerciseCompletedID, (err, result) => {
      if (err) {
          console.log("Error fetching exercise_completed_id:", err);
          res.status(500).send("Failed to fetch exercise_completed_id");
          return;
      }

      const exercise_completed_id = result[0].exercise_completed_id;

      const tableValues = [
          exercise_completed_id+1,
          req.body.duration,
          req.body.loggedInUser
      ]
  
      db.query(addDuration, tableValues, (err, data) => {
          if (err) {
              console.log("Error adding entry into duration_completed:", err);
              res.status(500).send("Failed to add entry");
          } else {
              console.log("duration_completed Logged");
              res.send(data);
          }
      });
  });
})

app.post('/addTo_OtherTables', (req, res) => {
    const addSRW = "INSERT INTO set_rep_weight_completed(`exercise_completed_id`, `sets`, `reps`, `weight`, `created_by`) VALUES(?);";
    const addSRD = "INSERT INTO set_rep_duration_completed(`exercise_completed_id`, `sets`, `reps`, `duration`, `created_by`) VALUES(?);";
    const addDistance = "INSERT INTO distance_completed(`exercise_completed_id`, `distance`, `created_by`) VALUES (?);";
    const getExerciseCompletedID = `SELECT e.exercise_completed_id 
                                    FROM exercise_completed e, workout_completed w 
                                    WHERE e.workout_completed_id=w.workout_completed_id 
                                    ORDER BY e.workout_completed_id DESC LIMIT 1;`;
    //`SELECT exercise_completed_id 
    //FROM exercise_completed ORDER BY exercise_completed_id DESC LIMIT 1;`;

     db.query(getExerciseCompletedID, (err, result) =>{
      if (err) {
        console.log("Error fetching workout_completed_id:", err);
        res.status(500).send("Failed to fetch workout_completed_id");
        return;
      }
      const exerciseCompletedID = result[0].exercise_completed_id;

      var values = [];
 
      const exercise = req.body.exercise;

      if((exercise >= 1 && exercise <= 18) || (exercise >= 27 && exercise <= 34) || (exercise == 37) 
      || (exercise >= 39 && exercise <= 42)){
        values = [
          exerciseCompletedID+1,
          req.body.sets,
          req.body.reps,
          req.body.weight,
          req.body.loggedInUser
        ]
        db.query(addSRW, [values], (err, data) => {
          if(err){
            console.log("Error adding SRW:", err);
            res.status(500).send("Failed to add entry");
          } else {
            console.log("SRW Logged");
            res.send(data);
          }
        })
      } else if ((exercise >= 19 && exercise <= 22)) {
        values = [
          exerciseCompletedID+1,
          req.body.distance,
          req.body.loggedInUser
        ]
        db.query(addDistance, [values], (err, data) => {
          if(err){
            console.log("Error adding distance:", err);
            res.status(500).send("Failed to add entry");
          } else {
            console.log("Distance Logged");
            res.send(data);
          }
        })
      } else {
        values = [
          exerciseCompletedID+1,
          req.body.sets,
          req.body.reps,
          req.body.duration,
          req.body.loggedInUser
        ]
        db.query(addSRD, [values], (err, data) => {
          if(err){
            console.log("Error adding SRD:", err);
            res.status(500).send("Failed to add entry");
          } else {
            console.log("SRD Logged");
            res.send(data);
          }
        })
      }

    })
})

app.get()

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});