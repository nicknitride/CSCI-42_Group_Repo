docker pull mysql
docker run mysql -t intellifit_mysql -p 81000:3306
docker run -e MYSQL_ROOT_PASSWORD=temppass --name \
intellifit_mysql_database -p 8100:3306 mysql 