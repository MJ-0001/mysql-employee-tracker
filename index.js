require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const sql = require('./sql.js');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'organisation_db'
});

connection.connect(err => {
  if (err) throw err;
  search();
});

const search = () => {
  inquirer.prompt({
    name: 'option',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'Add a new employee',
      'Remove an employee',
      'Update an employee',
      'Exit'
    ]
  })
  .then(answer => {
    switch (answer.option) {
      case 'View all employees':
        searchAllEmp();
        break;
      case 'Add a new employee':
        addEmp();
        break;
      case 'Remove an employee':
        remEmp();
        break;
      case 'Update an employee':
        updEmp();
        break;
      case 'Exit':
        connection.end();
        console.log('Connection successfully terminated!');
        break;
      default:
        console.log(`${answer.option} is not an option, please try again.`);
        search();
        break;
    }
  });
};

const searchAllEmp = () => {
  inquirer.prompt({
    name: 'allEmp',
    type: 'list',
    message: 'How would you like to view all employees?',
    choices: [
      'View all employees only',
      'View all employees by department',
      'View all employees by role',
      'View all employees by manager',
      'Exit to main menu',
      'Exit all'
    ]
  })
  .then(answer => {
    switch (answer.allEmp) {
      case 'View all employees only':
        const queryOne = sql.viewAllEmp();
        connection.query(queryOne, (err, res) => {
          if (err) throw err;
          console.table(res);
          searchAllEmp();
        });
        break;
      case 'View all employees by department':
        const queryTwo = sql.viewAllEmpDep();
        connection.query(queryTwo, (err, res) => {
          if (err) throw err;
          console.table(res);
          searchAllEmp();
        });
        break;
      case 'Exit to main menu':
        search();
        break;
      case 'Exit all':
        connection.end();
        console.log('Connection successfully terminated!');
        break;
      default:
        console.log('Please choose an option');
        searchAllEmp();
    }
  });
};