require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const sql = require('./scripts/sql.js');
const e = require('./scripts/classes.js');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'organisation_db'
});

connection.connect(err => {
  if (err) throw err;
  menu();
});

const menu = () => {
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
        search();
        break;
      case 'Add a new employee':
        add();
        break;
      case 'Remove an employee':
        remove();
        break;
      case 'Update an employee':
        update();
        break;
      case 'Exit':
        connection.end();
        console.log('Connection successfully terminated!');
        break;
      default:
        console.log(`${answer.option} is not an option, please try again.`);
        menu();
        break;
    }
  });
};

const search = () => {
  inquirer.prompt({
    name: 'option',
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
    switch (answer.option) {
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
      case 'View all employees by role':
        const queryThree = sql.viewAllEmpRole();
        connection.query(queryThree, (err, res) => {
          if (err) throw err;
          console.table(res);
          searchAllEmp();
        });
        break;
      case 'View all employees by manager':
        const queryFour = sql.viewAllEmpMan();
        connection.query(queryFour, (err, res) => {
          if (err) throw err;
          console.table(res);
          searchAllEmp();
        });
        break;
      case 'Exit to main menu':
        menu();
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

const add = () => {
  inquirer.prompt([
    {
    name: 'fname',
    type: 'input',
    message: "Please enter the employee's first name"
    },
    {
    name: 'lname',
    type: 'input',
    message: "Please enter the employee's last name"
    },
    {
    name: 'job',
    type: 'list',
    message: 'What role is the employee filling?',
    choices: [
      'Project Manager',
      'Senior Project Manager',
      'Developer',
      'Test Manager',
      'Business Analyst',
      'Solutions Architect',
      'DBA',
      'People Lead',
      'Finance Officer'
    ]
    },
    {
    name: 'salary',
    type: 'list',
    message: 'What pay band is the employee on?',
    choices: [
      25000,
      30000,
      35000,
      40000,
      45000,
      50000,
      60000
    ]
    },
    {
    name: 'dep',
    type: 'list',
    message: 'What department is the employee joining?',
    choices: [
      'Projects',
      'I&T',
      'HR',
      'Finance'
    ]
    },
    {
    name: 'manager',
    type: 'list',
    message: 'Who will be managing the employee?',
    choices: [
      'Mark Wills',
      'Matt Jones',
      'Zoe Cavill',
      'Nicola Hall',
      'Liz Pigney',
      'Thomas Brown',
      'Chris Lee'
    ]
    }
  ])
  .then(({ fname, lname, job, salary, dep, manager }) => {
    const employee = new e.Employee(fname, lname, job, salary, dep, manager);
    const query = sql.insEmp(employee);
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
      })
  });
};