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
      'View a table',
      'Add a new row to a table',
      'Remove a row from a table',
      'Update a table',
      'Exit'
    ]
  })
  .then(answer => {
    switch (answer.option) {
      case 'View a table':
        search();
        break;
      case 'Add a new row to a table':
        add();
        break;
      case 'Remove a row from a table':
        remove();
        break;
      case 'Update a table':
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
    type: 'rawlist',
    message: 'What would you like to view?',
    choices: [
      'View all employees only',
      'View all employees by department',
      'View all employees by role',
      'View all employees by manager',
      'View all roles',
      'View all departments',
      'View all managers',
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
          search();
        });
        break;
      case 'View all employees by department':
        const queryTwo = sql.viewAllEmpDep();
        connection.query(queryTwo, (err, res) => {
          if (err) throw err;
          console.table(res);
          search();
        });
        break;
      case 'View all employees by role':
        const queryThree = sql.viewAllEmpRole();
        connection.query(queryThree, (err, res) => {
          if (err) throw err;
          console.table(res);
          search();
        });
        break;
      case 'View all employees by manager':
        const queryFour = sql.viewAllEmpMan();
        connection.query(queryFour, (err, res) => {
          if (err) throw err;
          console.table(res);
          search();
        });
        break;
      case 'View all roles':
        const queryFive = sql.viewAllRole();
        connection.query(queryFive, (err, res) => {
          if (err) throw err;
          console.table(res);
          search();
        });
        break;
      case 'View all departments':
        const querySix = sql.viewAllDep();
        connection.query(querySix, (err, res) => {
          if (err) throw err;
          console.table(res);
          search();
        });
        break;
      case 'View all managers':
        const querySeven = sql.viewAllMan();
        connection.query(querySeven, (err, res) => {
          if (err) throw err;
          console.table(res);
          search();
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
        search();
    }
  });
};

const add = () => {
  inquirer.prompt({
    name: 'option',
    type: 'list',
    message: 'What would you like to add?',
    choices: [
      'A new employee',
      'A new department',
      'A new role',
      'A new manager',
      'Exit to main menu',
      'Exit all'
    ]
  })
  .then(answer => {
    switch (answer.option) {
      case 'A new employee':
        addEmployee();
        break;
      case 'A new department':
        addDepartment();
        break;
      case 'A new role':
        addRole();
        break;
      case 'A new manager':
        addManager();
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
        search();
    }
  })
}

const addEmployee = () => {
  inquirer.prompt([
    {
    name: 'fName',
    type: 'input',
    message: "Please enter the employee's first name"
    },
    {
    name: 'lName',
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
  .then(({ fName, lName, job, salary, dep, manager }) => {
    const employee = new e.Employee(fName, lName, job, salary, dep, manager);
    const query = sql.insEmp(employee);
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('Success! A new employee was added.');
        add();
      })
  });
};

const addDepartment = () => {
  inquirer.prompt({
    name: 'dep',
    type: 'input',
    message: 'Please enter the name of the department you would like to add: '
  })
  .then(answer => {
    const dep = answer.dep;
    const query = sql.insDep(dep);
    connection.query(query, (err, res) => {
      if (err) throw err;
      cconsole.log('Success! A new department was added.');
      add();
    })
  })
}

const addRole = () => {
  inquirer.prompt([
  {
    name: 'title',
    type: 'input',
    message: 'Please enter the role you would like to add: '
  },
  {
    name: 'salary',
    type: 'input',
    message: 'Please enter the salary: '
  },
  {
    name: 'dep',
    type: 'list',
    message: 'Please select the department the role is in: ',
    choices: [
      'Projects',
      'I&T',
      'HR',
      'Finance'
    ]
  }
  ])
  .then(({ title, salary, dep }) => {
    const role = new e.Role(title, salary, dep);
    const query = sql.insRole(role);
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('Success! A new role was added.');
      add();
    })
  })
}

const addManager = () => {
  inquirer.prompt([
  {
    name: 'fName',
    type: 'input',
    message: "Please enter the manager's first name: "
  },
  {
    name: 'lName',
    type: 'input',
    message: "Please enter the manager's last name: "
  },
  {
    name: 'title',
    type: 'list',
    message: "Please select the manager's job title: ",
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
  }
  ])
  .then(({ fName, lName, title }) => {
    const manager = new e.Manager(fName, lName, title);
    const query = sql.insMan(manager);
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('Success! A new manager was added.');
      add();
    })
  })
}

const remove = () => {
  inquirer.prompt({
    name: 'option',
    type: 'list',
    message: 'What would you like to remove?',
    choices: [
      'An employee',
      'A department',
      'A role',
      'A manager',
      'Exit to main menu',
      'Exit all'
    ]
  })
  .then(answer => {
    switch (answer.option) {
      case 'An employee':
        removeEmployee();
        break;
      case 'A department':
        removeDepartment();
        break;
      case 'A role':
        removeRole();
        break;
      case 'A manager':
        removeManager();
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
        search();
    }
  })
}

const removeEmployee = () => {
  inquirer.prompt([
    {
      name: 'fName',
      type: 'input',
      message: "Enter the employee's first name: "
    },
    {
      name: 'lName',
      type: 'input',
      message: "Enter the employee's last name: "
    },
    {
      name: 'job',
      type: 'list',
      message: "Select the employee's current role: ",
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
  ])
  .then(({ fName, lName , job }) => {
    const employee = new e.Employee(fName, lName, job);
    const query = sql.remEmp(employee);
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Success! ${fName} + ${lName} was removed from the employees table.`);
      remove();
    })
  });
};

const removeDepartment = () => {
  inquirer.prompt([
    {
      name: 'option',
      type: 'list',
      message: 'Select the department you want to remove: ',
      choices: [
        'Projects',
        'I&T',
        'HR',
        'Finance'
      ]
    }
  ])
  .then(answer => {
    const query = sql.remDep(answer.option);
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Success! ${answer.option} was removed from the departments table.`);
      remove();
    })
  })
};

const removeRole = () => {
  inquirer.prompt([
    {
      name: 'option',
      type: 'list',
      message: 'Select the role you want to remove: ',
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
    }
  ])
  .then(answer => {
    const query = sql.remRole(answer.option);
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Success! ${answer.option} was removed from the roles table.`);
      remove();
    })
  })
};

const removeManager = () => {
  inquirer.prompt([
    {
      name: 'fName',
      type: 'input',
      message: "Please enter the manager's first name: ",
    },
    {
      name: 'lName',
      type: 'input',
      message: "Please enter the manager's last name: ",
    }
  ])
  .then((answer) => {
    const query = sql.remMan(answer.fName, answer.lName);
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Success! ${answer.fName} ${answer.lName} was removed from the roles table.`);
    })
  })
};