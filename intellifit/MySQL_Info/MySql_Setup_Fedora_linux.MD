# Useful command (userdel)
- Allows the deletion of a specified user
`userdel -f <user>`
# See users on linux machine
`less /etc/passwd | grep <user name>`
# MySQL Install
[Official Install Instructions (Fedora)](https://docs.fedoraproject.org/en-US/quick-docs/installing-mysql-mariadb/)
1. Download the repo file from [this link](https://dev.mysql.com/downloads/repo/yum/)
- `sudo dnf install <path to downloaded rpm>`
- `sudo dnf install mysql-community-server`
2. Or Skip ahead and Install regularly (Default Package Available):
- `sudo dnf install mysql-community-server`
3. Start the MySQL Service and Enable at Log-In:

- `sudo systemctl enable mysqld`
- `sudo systemctl start mysqld`

4. Answer the security prompts:
- `sudo mysql_secure_installation`
5. Usage: 
- `sudo mysql -u root -p`
5.a Future Removal:
- `sudo dnf remove {community-mysql-server|mariadb-server}`
