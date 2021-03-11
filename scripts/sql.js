const e = require('./classes.js');

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

  addEmp: () => {
    return `
    INSERT INTO employees (first_name, last_name, roleId, managerId) 
    VALUES (` + e.firstName + e.last_name + e.roleId + e.managerId + `)`;
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
