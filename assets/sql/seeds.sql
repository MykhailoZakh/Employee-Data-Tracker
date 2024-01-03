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
("Jhon", "Doe", 1, 1),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, 1),
("Kevin", "Tupik", 4, 3),
("Kunal", "Singh", 5, 1),
("Malia", "Brown", 6, 1),
("Sarah", "Lourd", 7, 1),
("Tom", "Allen", 8, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;