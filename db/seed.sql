insert into departments (name)
values  ('Projects'),
        ('I&T'),
        ('HR'),
        ('Finance');


insert into roles (title, salary, department_id)
values  ('Project Manager', 40000, 1),
        ('Senior Project Manager', 50000, 1),
        ('Developer', 45000, 2),
        ('Test Manager', 35000, 2),
        ('Business Analyst', 40000, 1),
        ('Solutions Architect', 60000, 2),
        ('DBA', 45000, 2),
        ('People Lead', 45000, 3),
        ('Finance Officer', 45000, 4);

    
insert into managers (first_name, last_name, role_id)
values  ('Mark', 'Wills', 2),
        ('Matt', 'Jones', 3),
        ('Zoe', 'Cavill', 1),
        ('Nicola', 'Hall', 4),
        ('Liz', 'Pigney', 6),
        ('Thomas', 'Brown', 5),
        ('Chris', 'Lee', 7);
           
           
insert into employees (first_name, last_name, role_id, manager_id, department_id)
values  ('Allan', 'Mohan', 1, 1, 1),
        ('Mark', 'Wills', 1, 5, 1),
        ('Eddie', 'Doherty', 1, 1, 6),
        ('Sue', 'Batty', 1, 3, 2),
        ('Vicky', 'Godsall', 1, 3, 3),
        ('Sat', 'Sophal', 5, 4, 3),
        ('Sonya', 'Armstrong', 6, 6, 5),
        ('Liz', 'Kenny', 1, 5, 4);