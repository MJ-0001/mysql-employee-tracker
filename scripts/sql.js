// Import module to access objects
const emp = require('../scripts/classes.js');

// Export all SQL functions for use in index.js
module.exports = {
  // View all employees
  viewAllEmp: () => {
    return `
    SELECT * 
    FROM employees;`;
  },

  // View all employees by department
  viewAllEmpDep: () => {
    return `
    SELECT 
      t1.first_name, 
      t1.last_name, 
      t2.name AS department 
    FROM employees AS t1 
    INNER JOIN departments AS t2 
      ON t1.department_id = t2.id;`;
  },

  // View all employees by role
  viewAllEmpRole: () => {
    return `
    SELECT 
      t1.first_name, 
      t1.last_name, 
      t2.title AS role, 
      t2.salary
    FROM employees AS t1 
    INNER JOIN roles AS t2 
      ON t1.role_id = t2.id;`;
  },

  // View all employees by manager
  viewAllEmpMan: () => {
    return `
    SELECT 
      CONCAT(t1.first_name, ' ', t1.last_name) AS employee_name,
      CONCAT(t2.first_name, ' ', t2.last_name) AS manager_name
    FROM employees AS t1
    INNER JOIN managers AS t2
      ON t1.manager_id = t2.id
    ORDER BY manager_name;`;
  },

  // View all departments
  viewAllDep: () => {
    return `
    SELECT *
    FROM departments;`;
  },

  // View all roles
  viewAllRole: () => {
    return `
    SELECT *
    FROM roles;`;
  },

  // View all managers
  viewAllMan: () => {
    return `
    SELECT *
    FROM managers;`;
  },
    
  // Add a new employee
  insEmp: (employee) => {
    let roleId = emp.roles[employee.job]; 
    let manId = emp.managers[employee.manager]; 
    let depId = emp.departments[employee.dep]; 
    return `
    INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) 
    VALUES (${JSON.stringify(employee.fName)}` + ',' + `${JSON.stringify(employee.lName)}` + ',' + `${roleId}` + ',' + `${manId}` + ',' + `${depId});`;
  },

  // Add a new department
  insDep: (dep) => {
    return `
    INSERT INTO departments (name) 
    VALUES (${JSON.stringify(dep)});`;
  },

  // Add a new role
  insRole: (role) => {
    let depId = emp.departments[role.dep];
    return `
    INSERT INTO roles (title, salary, department_id) 
    VALUES (${JSON.stringify(role.title)}` + ',' + `${role.salary}` + ',' + `${depId});`;
  },

  // Add a new manager
  insMan: (manager) => {
    let roleId = emp.roles[manager.title];
    return `
    INSERT INTO managers (first_name, last_name, role_id) 
    VALUES (${JSON.stringify(manager.fName)}` + ',' + `${JSON.stringify(manager.lName)}` 
    + ',' + `${roleId});`;
  },

  // Remove an employee
  remEmp: (employee) => {
    let roleId = emp.roles[employee.job];
    return `
    DELETE FROM employees
    WHERE first_name = ${JSON.stringify(employee.fName)}
      AND last_name = ${JSON.stringify(employee.lName)}
      AND role_id = ${roleId};`;
  },

  // Remove a department
  remDep: (dep) => {
    return `
    DELETE FROM departments
    WHERE name = ${JSON.stringify(dep)};`;
  },

  // Remove a role
  remRole: (role) => {
    return `
    DELETE FROM roles
    WHERE name = ${JSON.stringify(roles)};`;
  },

  // Remove a manager
  remMan: (fName, lName) => {
    return `
    DELETE FROM managers
    WHERE first_name = ${JSON.stringify(fName)}
      AND last_name = ${JSON.stringify(lName)};`;
  },

  // Update a column in the employees table
  updEmp: (name, column, value) => {
    if (isNaN(value)) {
      names = name.split(' ');
      fName = names[0];
      lName = names[1];
      return `
      UPDATE employees
      SET ${column} = ${JSON.stringify(value)}
      WHERE first_name = ${JSON.stringify(fName)}
        AND last_name = ${JSON.stringify(lName)};`;
    } else {
      names = name.split(' ');
      fName = names[0];
      lName = names[1];
      return `
      UPDATE employees
      SET ${column} = ${value}
      WHERE first_name = ${JSON.stringify(fName)}
        AND last_name = ${JSON.stringify(lName)};`;
    }
  }
};