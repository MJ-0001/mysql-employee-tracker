class Employee {
  constructor(fName, lName, job, salary, dep, manager) {
  this.fName = fName;
  this.lName = lName;
  this.job = job;
  this.salary = salary;
  this.dep = dep;
  this.manager = manager;
  }
}

class Role  {
  constructor(title, salary, dep) {
    this.title = title;
    this.salary = salary;
    this.depId = dep;
  }
}

class Manager  {
  constructor(fName, lName, title) {
    this.fName = fName;
    this.lName = lName;
    this.title = title;
  }
}

const departments = {
  'Projects': 1,
  'I&T': 2,
  'HR': 3,
  'Finance': 4
};

const roles = {
  'Project Manager': 1,
  'Senior Project Manager': 2,
  'Developer': 3,
  'Test Manager': 4,
  'Business Analyst': 5,
  'Solutions Architect': 6,
  'DBA': 7,
  'People Lead': 8,
  'Finance Officer': 9
};

const managers = {
  'Mark Wills': 1,
  'Matt Jones': 2,
  'Zoe Cavill': 3,
  'Nicola Hall': 4,
  'Liz Pigney': 5,
  'Thomas Brown': 6,
  'Chris Lee': 7
};




module.exports = { Employee, Role, Manager, departments, roles, managers };