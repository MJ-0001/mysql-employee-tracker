 const emp = require('../scripts/classes.js');

module.exports = {
  viewAllEmp: () => {
    return `
    SELECT * 
    FROM employees;`;
  },

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
    
  insEmp: (employee) => {
    let roleId = emp.roles[employee.job]; 
    let manId = emp.managers[employee.manager]; 
    let depId = emp.departments[employee.dep]; 
    return `
    INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) 
    VALUES (${JSON.stringify(employee.fname)}` + ',' + `${JSON.stringify(employee.lname)}` + ',' + `${roleId}` + ',' + `${manId}` + ',' + `${depId});`;
  },

  insDep: (employee) => {
    return `
    INSERT INTO departments (name) 
    VALUES (${employee.dep});`;
  },

  insRole: (employee) => {
    return `
    INSERT INTO roles (title, salary) 
    VALUES (${employee.job}` + ',' + `${employee.salary});`;
  },

  insMan: (employee) => {
    let manager = employee.manager.split(' ');
    return `
    INSERT INTO managers (first_name, last_name) 
    VALUES (${manager});`;
  },

  remEmp: (table, condition) => {
    return `
    DELETE FROM` + table +
    `WHERE` + condition + `;`;
  },

  updEmp: () => {
    return `
    UPADATE` + table +
    `SET`
  }

}
