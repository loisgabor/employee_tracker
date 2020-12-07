const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const employeeArray = [];
const managerArray = [];

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
});
// ------------------START - SWITCH CASE ------------//
function start() {
  inquirer.prompt(introQuestion).then((data) => {
    switch (data.firstQuestion) {
      case "View all employees":
        viewEmployees();
        break;
      case "View all departments":
        viewDepartment();
        break;
      case "View all roles":
        viewRole();
        break;
      case "Add employee":
        addEmployee();
        break;
      case "Update employee role":
        updateEmployee();
        break;
      case "Add department":
        addDepartment();
        break;
      case "Add role":
        addRoles();
        break;
      case "Exit":
        exit();
        break;
    }
  });
}
//----------------METHODS-----------------------//
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table("______________________________", res);
    start();
  });
};

const viewDepartment = () => {
  connection.query("SELECT * FROM Department", (err, res) => {
    if (err) throw err;
    console.table("______________________________", res);
    start();
  });
};
const viewRole = () => {
  connection.query("SELECT * FROM Role", (err, res) => {
    if (err) throw err;
    console.table("______________________________", res);
    start();
  });
};
const addEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    else {
      res.forEach((row) => {
        console.log(row.first_name);
        managerArray.push({
          name: row.first_name + " " + row.last_name,
          value: row.emp_id,
        });
      });
      console.log(managerArray);
      inquirer.prompt(addEmployeeQuestions).then(function (data) {
        connection.query("INSERT INTO employee SET ?", {
          first_name: data.employeeFirstName,
          last_name: data.employeeLastName,
          role_id: data.role_id,
          manager_id: data.employeeManager,
        });
        employeeArray.push(data);
        console.table(employeeArray);
        start();
      });
    }
  });
};
const updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    else {
      res.forEach((row) => {
        console.log(row.first_name);
        employeeArray.push({
          name: row.first_name + " " + row.last_name,
          value: row.id,
        });
      });
      // console.log(managerArray);
      inquirer.prompt(updateEmployeeQuestions).then(function (data) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?;", [
          data.employeeUpdateRole,
          data.employeeUpdate,
        ]);
        // employeeArray.push(data);
        // console.table(employeeArray);
        start();
      });
    }
  });
};
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What department would you like to add?",
      name: "departmentName",
    })
    .then(function (data) {
      connection.query("INSERT INTO department SET ?", {
        name: data.departmentName,
      });
      start();
    });
};

const addRoles = () => {
  let departmentArray = [];
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    else {
      res.forEach((row) => {
        // console.log(row.first_name);
        departmentArray.push({
          name: row.name,
          value: row.id,
        });
      });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What role would you like to add?",
            name: "newTitle",
          },
          {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary",
          },
          {
            type: "list",
            message: "What is the department id?",
            name: "departmentId",
            choices: departmentArray,
          },
        ])
        .then(function (data) {
          connection.query("INSERT INTO role SET ?", {
            title: data.newTitle,
            salary: data.salary,
            department_id: data.departmentId,
          });
          start();
        });
    }
  });
};
const exit = () => {
  connection.end();
};

//------------------QUESTIONS----------------/
const introQuestion = {
  type: "list",
  name: "firstQuestion",
  message: "What would you like to do?",
  choices: [
    "View all employees",
    "View all departments",
    "View all roles",
    "Add employee",
    "Add department",
    "Add role",
    "Update employee role",
    "Exit",
  ],
};
const addEmployeeQuestions = [
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
  {
    type: "list",
    message: "Who is the employee's manager",
    choices: managerArray,
    name: "employeeManager",
  },
];

const updateEmployeeQuestions = [
  {
    type: "list",
    name: "employeeUpdate",
    message: "Which employee's role would you like to update",
    choices: employeeArray,
  },
  {
    type: "list",
    name: "employeeUpdateRole",
    message: "What is the employee's new role?",
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
