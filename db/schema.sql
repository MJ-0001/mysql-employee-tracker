drop database if exists organisation_db;
create database organisation_db;
use organisation_db;

create table departments (
	id int auto_increment not null,
    name varchar(30),
	primary key (id)
);

create table roles (
	id int auto_increment not null,
    title varchar(30),
	salary decimal,
    department_id int,
	primary key (id),
    foreign key (department_id) references departments(id)
);

create table managers (
	id int auto_increment not null,
    first_name varchar(30),
    last_name varchar(30),
	role_id int,
	primary key (id),
    foreign key (role_id) references roles(id)
);

create table employees (
	id int auto_increment not null,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    department_id int,
	primary key (id),
    foreign key (role_id) references roles(id),
    foreign key (manager_id) references managers(id),
    foreign key (department_id) references departments(id)
);
