INSERT INTO department (name) VALUES 
("Engineering"), 
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (title, salary, department_ID) VALUES 
("Sales Lead", 100000, 4),
("Salesperson", 80000, 4),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Account Manager", 160000, 2),
("Accountant", 125000, 2),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Jhon", "Doe", 1, 0),
("Mike", "Chan", 4, 1),
("Ashley", "Rodriguez", 2, 0),
("Kevin", "Tupik", 3, 4),
("Kunal", "Singh", 7, 0),
("Malia", "Brown", 6, 8),
("Sarah", "Lourd", 5, 0),
("Tom", "Allen", 8, 0);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;