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
    "Exit",
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
    type: "list",
    name: "employeeRole",
    message: "What is employee's role",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
    ],
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
    switch (data.firstQuestion) {
      case "View all employees":
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        });
        break;
      case "View all employees by department":
        break;
      case "View all employees by manager":
        break;
      case "Add employee":
        console.log("this worked");

        inquirer
          .prompt(addEmployee)
          // .then(inquirer.prompt(introQuestion));

          .then(function (data) {
            connection.query("INSERT INTO employee SET ?", {
              first_name: data.employeeFirstName,
              last_name: data.employeeLastName,
            });
            console.table(data);
            start();
          });
        // });
        break;
      case "Remove employee":
        // var removal = (data) =>{
        // connection.query("SELECT * FROM employee", (err, res) => {
        // inquirer.prompt({
        //   type: "list",
        //   name: "employeeRemoval",
        //   message: "Which employee would you like to remove?",
        //   choices: function (res) {
        //     var employeeArray = [];
        //     for (var i = 0; i < data.length; i++) {
        //       employeeArray.push(data[i].first_name, last_name);
        //     }
        //     return employeeArray;
        //   },
        // });

        connection.query("DELETE FROM employee", (err, res) => {
          if (err) throw err;

          inquirer.prompt({
            type: "list",
            name: "employeeRemoval",
            message: "Which employee would you like to remove?",
            choices: function (value) {
              var employeeArray = [];
              for (var i = 0; i < res.length; i++) {
                employeeArray.push(res[i].first_name, last_name);
              }
              return employeeArray;
            },
          });
        });

        // start();

        break;
      case "Update employee role":
        break;
      case "Update employee manager":
        break;
    }
  });
}
