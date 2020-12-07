class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  // Create a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    //   logic
  }

  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    //  logic
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    // logic here
  }

  // Create a new role
  createRole(role) {
    //  logic here
  }

  // Remove a role from the db
  removeRole(roleId) {
    // logic here
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  findAllDepartments() {
    //  logic here
  }

  // Create a new department
  createDepartment(department) {
    //  logic here
  }

  // Remove a department
  removeDepartment(departmentId) {
    //  logic here
  }

  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    //   logic here
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {
    //   logic here
  }
}
