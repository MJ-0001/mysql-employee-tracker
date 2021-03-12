class Employee {
  constructor(fname, lname, job, salary, dep, manager) {
  this.fname = fname;
  this.lname = lname;
  this.job = job;
  this.salary = salary;
  this.dep = dep;
  this.manager = manager;
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




module.exports = { Employee, departments, roles, managers };