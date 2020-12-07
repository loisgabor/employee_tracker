DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary INT,
  department_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Laura", "Bash", 345, 25),("Jennifer", "Lawrence", 13,255), ("Gerard", "Butler", 6324, 3452);

-- INSERT INTO role(title, salary, department_id)
-- VALUES ("Sales", 5.6, 452),("Sales", 6.5, 234),("Manager", 8.7, 868);

-- SELECT * FROM employee;
-- SELECT * FROM role;

SELECT * FROM employee;
