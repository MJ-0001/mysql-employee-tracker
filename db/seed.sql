insert into departments (name)
    values  ('Projects'),
            ('I&T'),
            ('HR'),
            ('Finance'),
            ('Business Services'),
            ('Counter Fraud');


insert into roles (title, salary, department_id)
	values  ('Project Manager', 40000, 1),
            ('Senior Project Manager', 50000, 1),
		    ('Developer', 45000, 2),
            ('Test Manager', 35000, 2),
            ('Project Support Manager', 25000, 1),
            ('Business Analyst', 40000, 1),
            ('Solutions Architect', 60000, 2),
            ('Technical Architect', 60000, 2),
            ('DBA', 45000, 2),
            ('Receptionist', 25000, 5),
            ('Customer Services Assistant', 30000, 5),
            ('Investigator', 45000, 6),
            ('Finance Officer', 50000, 4),
            ('Lead Developer', 60000, 2),
            ('Finance Lead', 60000, 4),
            ('HR Lead', 60000, 3),
            ('Business Lead', 50000, 5),
            ('Fraud Lead', 50000, 6);
    
insert into managers (first_name, last_name, role_id)
	values  ('Mark', 'Wills', 2),
		    ('Matt', 'Jones', 14),
            ('Zoe', 'Cavill', 17),
            ('Nicola', 'Hall', 16),
            ('Liz', 'Pigney', 18),
            ('Thomas', 'Brown', 15);
           
           
insert into employees (first_name, last_name, role_id, manager_id, department_id)
    values  ('Allan', 'Mohan', 1, 1, 1),
            ('Mark', 'Wills', 1, 5, 1),
            ('Eddie', 'Doherty', 1, 1, 6),
            ('Sue', 'Batty', 1, 3, 2),
            ('Vicky', 'Godsall', 1, 3, 3),
            ('Sat', 'Sophal', 5, 4, 3),
            ('Sonya', 'Armstrong', 6, 6, 5),
            ('Liz', 'Kenny', 11, 5, 4);