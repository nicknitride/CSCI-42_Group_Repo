# Access Root User
`sudo mysql -u root -p`
# Database Creation:
- `create database <db name>`
## Selecting the database:
- `use <db name>`
## Show currently selected database
- `SELECT DATABASE();`

# Database Listing and Misc.
## List all databases or all tables
- SHOW DATABASES;
- SHOW TABLES;
## Delete a database
- `drop database <db name>`
## List Tables
- ` show tables;`
## Describe Table Structure:
- `DESC <table name>`
## Delete a Table
- `drop table <table name>`

# Table Creation:
```MySQL
CREATE TABLE your_table (
  column1 datatype1,
  column2 datatype2,
  -- Add more columns as needed
);
``` 
# Data Insertion
https://dev.mysql.com/doc/refman/8.0/en/loading-tables.html
# More on Table Creation:
https://www.mysqltutorial.org/mysql-basics/mysql-primary-key/

# Get Port (Useful for backend integration)
SHOW GLOBAL VARIABLES LIKE 'PORT';

# Reset Password etc.
https://docs.fedoraproject.org/en-US/quick-docs/installing-mysql-mariadb/#_installing_mariadb_server_from_the_fedora_modular_repository



