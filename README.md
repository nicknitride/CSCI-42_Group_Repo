# Getting Started
1. Head into intellifit
`npm install` to install all the needed packages (make sure you have node)
2. Head into intellifit/server
`npm install` again to install the server files
3. terminal 1: `npm run dev` (from intellifit)(This is the actual webpage code)
4. terminal 2: `npm run test` (from intellifit/server)(This is the mysql server) 
# MySQL Setup
1. Install MySQL (on WSL preferably)
2. Head into the MySQL_Info folder
- db_creation contains all the info needed to recreate the database I have on my machine (for testing, I'll upload an ER diagram of the meal stuff later)
- Queries.sql are the queries I used for the backend of the project
    - Working:
    - Meal Page:
        - Edit, Delete, and Day View (Weekly View and Search are a little harder to implement)
# Misc. (inside the src folder)
- ## index.js (server code)
- ## components folder (where the reusable components are)
- ## css folder (css for the components)
- ## component-pages folder (these are the components that are the actual webpages, they call on the re-usable components to render the webpage)(I've also kept the css for these pages in this folder)
# TO-DO:
1. Edit the food entity to contain protein, carbohydrates, and fat (this requires a semi-difficult rewrite of the Meal infrastructure pages)