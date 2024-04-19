-- # Food Entity
-- -- Draft new food entity
DROP DATABASE intellifit_test;
CREATE DATABASE intellifit_test;
USE intellifit_test;

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
CHECK (protein_hundred_grams >= 0),
CHECK (carb_hundred_grams >= 0),
CHECK (fat_hundred_grams >= 0),
CHECK (protein_hundred_grams <= 999.99),
CHECK (carb_hundred_grams <= 999.99),
CHECK (fat_hundred_grams <= 999.99),
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

-- # Meal Entity
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
  CHECK (serving_size >= 0 AND serving_size <= 9999.99),
  PRIMARY KEY (mealfood_id),
  FOREIGN KEY (meal_id) REFERENCES meal(meal_id),
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);
-- #Insert Statements
-- Inserting a meal_food_entity entry with specified meal_id and food_id
INSERT INTO meal_food_entity (meal_id, food_id, serving_size) VALUES (1, 5, 150.50);

-- Inserting another entry with different meal_id, food_id, and using the default serving_size
INSERT INTO meal_food_entity (meal_id, food_id) VALUES (2, 13);

-- Inserting an entry with specified meal_id, food_id, creation_date_mealfood, and serving_size
-- Inserting three whole days of meals into the mealfood table
INSERT INTO meal_food_entity (meal_id, food_id, creation_date_mealfood, serving_size)
VALUES
-- Day 1
(1, 1, CURDATE(), 150.5),  -- Adjust the food_id as needed
(1, 2, CURDATE(), 200.25), -- Adjust the food_id as needed
(2, 3, CURDATE(), 100.75), -- Adjust the food_id as needed
-- Day 2
(2, 4, CURDATE() + INTERVAL 1 DAY, 75.3),  -- Adjust the food_id as needed
(3, 5, CURDATE() + INTERVAL 1 DAY, 300.0), -- Adjust the food_id as needed
(3, 6, CURDATE() + INTERVAL 1 DAY, 50.8),  -- Adjust the food_id as needed
-- Day 3
(1, 7, CURDATE() + INTERVAL 2 DAY, 180.4), -- Adjust the food_id as needed
(2, 8, CURDATE() + INTERVAL 2 DAY, 250.1), -- Adjust the food_id as needed
(3, 9, CURDATE() + INTERVAL 2 DAY, 120.75); -- Adjust the food_id as needed


-- # Workout Entity
CREATE TABLE exercise (
    exercise_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(50),
    exercise_desc VARCHAR(510)
);
CREATE TABLE workout (
    workout_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    workout_name VARCHAR(50),
    goal VARCHAR(50)
);
CREATE TABLE workout_exercise_entry (
    workout_exercise_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    workout_id INT,
    exercise_id INT,
    entry_type VARCHAR(25),
    FOREIGN KEY (workout_id) REFERENCES workout(workout_id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id),
    CHECK
    ( entry_type IN ('Set-Rep', 'Set-Rep-Duration', 'Duration', 'Distance') )
);
CREATE TABLE set_rep_entry (
    workout_exercise_id INT,
    sets INT,
    reps INT,
    FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercise_entry(workout_exercise_id)
);
CREATE TABLE set_rep_duration_entry (
    workout_exercise_id INT,
    sets INT,
    reps INT,
    duration TIME,
    FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercise_entry(workout_exercise_id)
);
CREATE TABLE duration_entry (
    workout_exercise_id INT,
    duration TIME,
    FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercise_entry(workout_exercise_id)
);
CREATE TABLE distance_entry (
    workout_exercise_id INT,
    distance FLOAT(2),
    FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercise_entry(workout_exercise_id)
);

CREATE TABLE workout_completed (
    workout_completed_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    completed_date DATE
);
CREATE TABLE exercise_completed (
    exercise_completed_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    workout_completed_id INT,
    exercise_id INT,
    completed_type VARCHAR(25),
    FOREIGN KEY (workout_completed_id) REFERENCES workout_completed(workout_completed_id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id),
    CHECK
    ( completed_type IN ('Set-Rep-Weight', 'Set-Rep-Duration', 'Duration', 'Distance') )
);
CREATE TABLE set_rep_weight_completed (
    exercise_completed_id INT,
    sets INT,
    reps INT,
    weight FLOAT(2),
    FOREIGN KEY (exercise_completed_id) REFERENCES exercise_completed(exercise_completed_id)
);
CREATE TABLE set_rep_duration_completed (
    exercise_completed_id INT,
    sets INT,
    reps INT,
    duration TIME,
    FOREIGN KEY (exercise_completed_id) REFERENCES exercise_completed(exercise_completed_id)
);
CREATE TABLE duration_completed (
    exercise_completed_id INT,
    duration TIME,
    FOREIGN KEY (exercise_completed_id) REFERENCES exercise_completed(exercise_completed_id)
);
CREATE TABLE distance_completed (
    exercise_completed_id INT,
    distance FLOAT(2),
    FOREIGN KEY (exercise_completed_id) REFERENCES exercise_completed(exercise_completed_id)
);

INSERT INTO workout (workout_id, workout_name, goal) VALUES 
    (0, 'Legs', 'Resistance'),
    (1, 'Push', 'Resistance'),
    (2, 'Pull', 'Resistance'),
    (3, 'Running', 'Cardio'),
    (4, 'HIIT', 'Cardio'),
    (5, 'Full Body', 'Bodyweight'),
    (6, 'Core', 'Bodyweight'),
    (7, 'Stretch', 'Flexibility')
;
INSERT INTO exercise (exercise_id, exercise_name, exercise_desc) VALUES
    (0, 'Barbell Squat', 'Perform barbell squats by standing with your feet shoulder-width apart. Take a deep breath and unrack a weighted barbell, holding it on your upper back. Keep your chest up and your back straight as you hinge your hips and knees to lower your body through a full range of motion into a squat position'),
    (1, 'Romanian Deadlifts', 'A deadlift in which the body is bent at the hips and the knees are not bent.'),
    (2, 'Dumbbell Lunge', 'Dumbbell lunges are a weighted variation of forward lunges. Perform dumbbell lunges by holding a dumbbell in each hand as you take a big step forward and lower yourself until your front leg and back leg are both at nearly a 90-degree angle.'),
    (3, 'Barbell Hip Thrusts', 'A lower-body strength training exercise defined by lifting your lower back and torso with your knees bent and your upper body resting on a bench.'),
    (4, 'Dumbbell Leg curl', 'The hamstring curl, also called a leg curl, is an exercise that strengthens the hamstrings. It involves bending your knees and moving your heels toward your butt while the rest of your body stays still. Typically, the exercise is done on a leg curl machine.'),
    (5, 'Calf Raise', 'Perform calf raises by standing tall with your feet hip-width apart. Lift your body by pushing into the fronts of your feet, activating your calf muscles as you stand on your tiptoes. Return to a regular stance and repeat the movement pattern.'),
    (6, 'Barbell Bench Press', 'It involves lying on a bench and pressing weight upward using either a barbell or a pair of dumbbells. During a bench press, you lower the weight down to chest level and then press upwards while extending your arms.'),
    (7, 'Standing OverHead Press', 'Stand upright and keep the back straight. Hold a dumbbell in each hand, at the shoulders, with an overhand grip. Thumbs are on the inside and knuckles face up. Exhale as you raise the weights above the head in a controlled motion. Pause briefly at the top of the motion.'),
    (8, 'Tricep Dip', 'It involves raising and lowering your body on your hands with your arms bent behind you, while in a sitting position with your legs straight out in front of you.'),
    (9, 'Dumbbell Floor Fly', 'Press the dumbbells up so you are holding them above the chest, palms facing each other. Keep a soft bend in the elbow. Take a deep breath as you slowly lower the dumbbells in an arc movement until the arms are in line with your body and your elbows are close to touching the floor.'),
    (10, 'Cable Tricep Extension', 'Attach a rope to a cable stack as high as possible and assume a standing position. Grasp the rope with a neutral grip (palms facing in) and lean forward slightly by hinging at the hips. Initiate the movement by extending the elbows and flexing the triceps. Pull the rope downward until the elbows are almost locked out and then slowly lower under control back to the starting position.'),
    (11, 'Dumbbell Lateral Raise', 'Firstly, grab a couple of dumbbells and stand with them by your sides, with your palms facing your body. Stand tall with your core switched on and shoulder blades pulled back and down. Keeping your back straight, and your upper body still – that means no swinging – lift the dumbbells out to your side with a slight bend at your elbows, keeping the weights higher than your forearms. Lift until your arms are parallel to the floor, then slowly lower to the start position.'),
    (12, 'Deadlift', 'In a deadlift, you lift the weight from the ground to thigh-level using primarily your leg and hip muscles, but with the assistance of most of the large muscle groups of your body. The deadlift is usually performed with a bar and plates or a fixed barbell, but you can also do it with dumbbells.'),
    (13, 'Pull up', 'An exercise in which one hangs by the hands from a support (such as a horizontal bar) and pulls oneself up until the chin is level with the support.'),
    (14, 'Dumbbell Row', 'Dumbbell rows recreate the muscle movement that you would be performing if you were to be rowing on a boat—pulling your shoulders back, sliding your elbows along your side, squeezing your shoulder blades that then lead to pulling your chest up towards the sky, bending your elbows and then extending your arms out again.'),
    (15, 'Dumbbell Shrug', 'Dumbbell shrugs, also known as dumbbell shoulder shrugs, are an isolation exercise targeting your upper trapezius muscles. Perform dumbbell shrugs by grabbing a pair of dumbbells and holding them by your sides with a neutral grip. Keep your arms straight as you lift your shoulders toward your ears.'),
    (16, 'Dumbbell Bicep Curl', 'Hold a dumbbell with your palm facing upward. Slowly curl the weight up by bending your elbow, keeping your elbow close to your body. Then slowly lower the weight to the starting position.'),
    (17, 'Rope Face Pull', 'Assume a split stance with the arms straight out in front of you utilizing a pronated grip. Inhale and pull the rope towards your face with the elbows high. Slowly lower the rope back to the starting position and repeat for the desired number of repetitions on both sides.'),
    (18, 'Speed Run', 'A type of running workout in which you are running for certain intervals near, at, or even faster than your VO2max pace.'),
    (19, 'Distance Run', 'Long-distance running, or endurance running, is a form of continuous running over distances of at least 3 km (1.9 mi). Physiologically, it is largely aerobic in nature and requires stamina as well as mental strength. Ideally adding 2 km every week to the run'),
    (20, 'Challenge Run', 'A slightly shorter distance than distance running, on not so ideal or challenging terrain. Speed and time can vary'),
    (21, 'Recovery Run', 'A slow paced run for around 2-3 km.'),
    (22, 'Burpee', 'A burpee is essentially a two-part exercise: a pushup followed by a leap in the air.'),
    (23, 'Body Squat', 'The bodyweight squat involves shifting your hips back and "sitting" toward the ground while in a standing position, stopping once your thighs are parallel with the ground, then pushing through the heels to straighten your legs and return to standing.'),
    (24, 'Push Up', 'Push-ups are exercises to strengthen your arms and chest muscles. They are done by lying with your face towards the floor and pushing with your hands to raise your body until your arms are straight.'),
    (25, 'Bicycle Crunches', 'Raise your knees to a 90-degree angle and alternate extending your legs as if pedaling a bike. Twist your body to touch your elbow to the opposite knee with each pedal motion.'),
    (26, 'Jump Squat', 'A jump squat is a plyometric exercise (a jump-training exercise) that adds a jumping motion to a traditional squat. Jump squats are bodyweight exercises characterized by leaping directly upwards at the top of the movement.'),
    (27, 'Walking Lunge', 'Walking lunges are a variation on the static lunge exercise. Instead of standing back upright after performing a lunge on one leg, as you would in a static bodyweight lunge, you “walk” forward by lunging out with the other leg.'),
    (28, 'Inverted Pull up', 'Unlike a pull up, which uses a vertical pull, the inverted row uses a horizontal pull to target the lats, traps, rhomboids, delts, and biceps. Inverted rows are typically set around hip weight but can be made more or less challenging by lowering or increasing the height of the bar from the floor.'),
    (29, 'Sit up', 'A conditioning exercise performed from a supine position by raising the torso to a sitting position and returning to the original position without using the arms or lifting the feet.'),
    (30, 'Alternate Straight Leg Lower', 'Slowly lower one leg as you exhale and maintain the position of hip flexion on the other side. Return back to the starting position and repeat on the opposite side.'),
    (31, 'Side Plank', 'ie on your side with your legs straight and your feet stacked on top of each other. (It helps to do this on a yoga mat or another soft surface.) Place your forearm flat on the ground, under your shoulder. Push through your feet and forearm to lift your hips up toward the ceiling. Avoid rotating your hips.'),
    (32, 'Plank to Hip Raise', 'Start from elbow plank position. Squeeze your tail bone and raise your hips. Return to plank position.'),
    (33, 'Stomach Vacuum', 'The stomach vacuum exercise involves breathing out air while sucking in the stomach to engage the core. It is an isometric exercise to strengthen the core muscles.'),
    (34, 'Couch Stretch', 'Get into a half-kneeling position in front of a couch, chair or bench. Your left foot should be flat on the floor, with your left knee bent 90 degrees and directly above your left foot. Your right knee should be behind you, at least 6 inches in front of the couch or chair. Your torso should be upright.'),
    (35, '90/90 Stretch', 'Sit on the floor and bend one leg in front of your body with your hip rotated out. Position it so your lower leg and knee are resting on the ground. Your leg should form a 90-degree angle, and your ankle should be neutral so your foot is pointing straight.'),
    (36, 'Foam Roller Thoracic Stretch with Pec Stretch', ' Lay on a foam roller with it going right down your spine and your neck supported. Your feet should be flat on the ground with your knees bent. Bring your arms up and out at the side with your palms up. Let gravity pull your arms down creating a stretch in your chest.'),
    (37, 'Lat Stretch', 'Begin this latissimus dorsi stretch standing tall with your back straight and hands above your head. Gently lean to one side until you feel a mild to moderate stretch in the side of your upper back and shoulder. Hold for 5 seconds and then return to the starting position.'),
    (38, 'Bird Dogs', 'Point one arm out straight in front and extend the opposite leg behind you, forming a straight line from your extended hand to your extended foot. Keep your hips squared to the ground. If your low back begins to sag, raise your leg only as high as you can while keeping the back straight.Hold for a few seconds, then return to your hands and knees. Keep your abs engaged throughout the entire exercise and work to minimize any extra motion in your hips during the weight shift. Switch to the other side.'),
    (39, 'World’s Greatest Stretch', 'This is a three-part stretch. Begin by lunging forward, with your front foot flat on the ground and on the toes of your back foot. With your knees bent, squat down until your knee is almost touching the ground. Keep your torso erect, and hold this position for 10-20 seconds.'),
    (40, 'Wall Angel', 'Stand with your back against the wall, feet hip-width apart, and your heels about 6-8 inches away from the wall. Keep your lower back, mid-back, and the back of your head in contact with the wall. Position your arms at a 90-degree angle, with your elbows and wrists touching the wall.Slowly slide your arms upward along the wall while keeping in contact with the wall, as far as you can. Hold the stretched position for a moment, then reverse and repeat.'),
    (41, 'Kettlebell Windmill', 'The windmill is performed by turning the feet to 45 degrees, pushing the hips out and then reaching down steadily with your weight on the back leg.')
;
INSERT INTO workout_exercise_entry (workout_exercise_id, workout_id, exercise_id, entry_type) VALUES
    (0, 0, 0, 'Set-Rep'),
    (1, 0, 1, 'Set-Rep'),
    (2, 0, 2, 'Set-Rep'),
    (3, 0, 3, 'Set-Rep'),
    (4, 0, 4, 'Set-Rep'),
    (5, 0, 5, 'Set-Rep'),
    (6, 1, 6, 'Set-Rep'),
    (7, 1, 7, 'Set-Rep'),
    (8, 1, 8, 'Set-Rep'),
    (9, 1, 9, 'Set-Rep'),
    (10, 1, 10, 'Set-Rep'),
    (11, 1, 11, 'Set-Rep'),
    (12, 2, 12, 'Set-Rep'),
    (13, 2, 13, 'Set-Rep'),
    (14, 2, 14, 'Set-Rep'),
    (15, 2, 15, 'Set-Rep'),
    (16, 2, 16, 'Set-Rep'),
    (17, 2, 17, 'Set-Rep'),
    (18, 3, 18, 'Distance'),
    (19, 3, 19, 'Distance'),
    (20, 3, 20, 'Distance'),
    (21, 3, 21, 'Distance'),
    (22, 4, 22, 'Set-Rep-Duration'),
    (23, 4, 23, 'Set-Rep-Duration'),
    (24, 4, 24, 'Set-Rep-Duration'),
    (25, 4, 25, 'Set-Rep-Duration'),
    (26, 5, 26, 'Set-Rep'),
    (27, 5, 24, 'Set-Rep'),
    (28, 5, 13, 'Set-Rep'),
    (29, 5, 27, 'Set-Rep'),
    (30, 5, 8, 'Set-Rep'),
    (31, 5, 28, 'Set-Rep'),
    (32, 6, 29, 'Set-Rep'),
    (33, 6, 30, 'Set-Rep'),
    (34, 6, 31, 'Set-Rep'),
    (35, 6, 32, 'Set-Rep'),
    (36, 6, 33, 'Set-Rep'),
    (37, 7, 34, 'Set-Rep-Duration'),
    (38, 7, 35, 'Set-Rep-Duration'),
    (39, 7, 36, 'Set-Rep'),
    (40, 7, 37, 'Set-Rep-Duration'),
    (41, 7, 38, 'Set-Rep'),
    (42, 7, 39, 'Set-Rep'),
    (43, 7, 40, 'Set-Rep'),
    (44, 7, 41, 'Set-Rep')
;
INSERT INTO set_rep_entry(workout_exercise_id, sets, reps) VALUES
    (0, 2, 5),
    (1, 2, 5),
    (2, 2, 10),
    (3, 2, 10),
    (4, 2, 10),
    (5, 2, 20),
    (6, 2, 8),
    (7, 2, 8),
    (8, 2, 10),
    (9, 2, 8),
    (10, 2, 10),
    (11, 2, 10),
    (12, 2, 5),
    (13, 2, 5),
    (14, 2, 10),
    (15, 2, 10),
    (16, 2, 10),
    (17, 2, 10),
    (26, 2, 10),
    (27, 2, 15),
    (28, 2, 10),
    (29, 2, 10),
    (30, 2, 10),
    (31, 2, 10),
    (32, 2, 15),
    (33, 2, 15),
    (34, 2, 15),
    (35, 2, 15),
    (36, 2, 5),
    (39, 2, 10),
    (41, 2, 6),
    (42, 2, 6),
    (43, 2, 10),
    (44, 2, 6)
;
INSERT INTO set_rep_duration_entry (workout_exercise_id, sets, reps, duration) VALUES
    (22, 2, 1, 20),
    (23, 2, 1, 20),
    (24, 2, 1, 20),
    (25, 2, 1, 20),
    (37, 2, 2, 30),
    (38, 2, 2, 0),
    (40, 2, 2, 30)
;
INSERT INTO distance_entry (workout_exercise_id, distance) VALUES
    (18, 2),
    (19, 3),
    (20, 2),
    (21, 3)
;
