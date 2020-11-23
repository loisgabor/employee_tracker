const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const introQuestion = {
  type: "list",
  name: "firstQuestion",
  message: "What would you like to do?",
  choices: [
    "View all employees",
    "View all employees by department",
    "View all employees by manager",
    "Add employee",
    "Remove employee",
    "Update employee role",
    "Update employee manager",
  ],
};
const addEmployee = [
  {
    type: "input",
    name: "employeeFirstName",
    message: "What is employee's first name?",
  },
  {
    type: "input",
    name: "employeeLastName",
    message: "What is employee's last name?",
  },
  {
    type: "input",
    name: "employeeRole",
    message: "What is employee's role",
  },
];

const updateEmployee = [
  {
    type: "input",
    name: "employeeUpdateManager",
    message: "Which employee's manager do you want to update",
  },
  {
    type: "input",
    name: "employeeUpdateManager",
    message:
      "Which employee do you want to set as manager for the selected employee",
  },
];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "LoisElizabeth123",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
  //   afterConnection();
});

// function afterConnection() {
//   connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }

function start() {
  inquirer.prompt(introQuestion).then((data) => {
    switch (data) {
      case "View all employees":
        //   console.table(employee_db);
        break;
      case "View all employees by department":
        break;
      case "View all employees by manager":
        break;
      case "Add employee":
        return inquirer.prompt(addEmployee);
        // .then(function (data) {
        //   connection.query("INSERT INTO employee SET ?", {
        //     first_name: data.first_name,
        //     last_name: data.last_name,
        //     role_id: data,
        //   });
        // });
        break;
      case "Remove employee":
        break;
      case "Update employee role":
        break;
      case "Update employee manager":
        break;
    }
  });
}
