CREATE DATABASE IF NOT EXISTS chore_repo_standards
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'chore_repo_user'@'localhost'
IDENTIFIED BY 'ChoreRepo_2026';

ALTER USER 'chore_repo_user'@'localhost'
IDENTIFIED BY 'ChoreRepo_2026';

GRANT ALL PRIVILEGES ON chore_repo_standards.* 
TO 'chore_repo_user'@'localhost';

FLUSH PRIVILEGES;

EXIT;







DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=chore_repo_standards
DB_USERNAME=chore_repo_user
DB_PASSWORD=ChoreRepo_2026