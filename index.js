const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");
const Role = require("./lib/roles");
const Department = require("./lib/departments");
const Employees = require("./lib/employees");
const { response } = require("express");
const departmantArray = ['Engineering', 'Finance']
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emloyee_db'
    },
    console.log("Welcom to Employee Manager")
);

const init = function () {
    inquirer.prompt([
        {
            type: "list",
            message: "What you like to do?",
            name: "toDo",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Dpartments", "Add Department", "Exit"]
        }
    ])
        .then((data) => {
            switch (data.toDo) {
                case "View All Employees":

                    db.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id", (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            let arr = [];
                            res.forEach((el) => {
                                let newRole = new Employees(el.first_name, el.last_name, el.title, el.salary);
                                arr.push(newRole);
                            })
                            console.table(arr);
                            init();
                        }
                    });
                    break;
                case "Add Employee":
                    // inquirer.prompt([
                    //     {
                    //         type: "input",
                    //         massage:
                    //     }
                    // ])
                    break;

                case "Update Employee Role":
                    console.log(data.toDo);
                    init();
                    break;

                case "View All Roles":
                    db.query("SELECT * FROM role JOIN department ON role.department_ID = department.id", (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            let arr = [];
                            res.forEach((el) => {
                                let newRole = new Role(el.title, el.salary, el.name);
                                arr.push(newRole);
                            })
                            console.table(arr);
                            init();
                        }
                    });
                    break;

                case "Add Role":
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'roleName',
                            message: 'What is the name of the role?',
                        },
                        {
                            type: 'input',
                            name: 'roleSalary',
                            message: 'What is the salary of the role?',
                        },
                        {
                            type: 'list',
                            name: 'department',
                            message: 'Which department does the role belong to?',
                            choices: departmantArray
                        }
                    ])
                        .then((data) => {
                            console.log(data);
                            db.query(`INSERT INTO role (title, salary) VALUES ("${data.roleName}", ${data.roleSalary})`, (err, response) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    db.query(`SELECT * FROM role`, (err, response) => console.error(err));
                                    init();
                                }
                            })
                        })
                    break;

                case "View All Dpartments":
                    db.query("SELECT * FROM department", (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            let arr = [];
                            res.forEach((el) => {
                                let newRole = new Department(el.name);
                                arr.push(newRole);
                            })
                            console.table(arr);
                            init();
                        }
                    });
                    break;

                case "Add Department":
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'departmantName',
                            message: "What is the name of the department?"
                        }
                    ])
                        .then((data) => {
                            db.query(`INSERT INTO department (name) VALUES ("${data.departmantName}")`, (err, result) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    db.query("SELECT * FROM department", (err, res) => {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            let arr = [];
                                            res.forEach((el) => {
                                                let newRole = new Department(el.name);
                                                arr.push(newRole);
                                            })
                                            console.table(arr);
                                            init();
                                        }
                                    });
                                }
                            })
                        })
                    break;

                case "Exit":
                    console.log(`Good Bye`);
                    break;
            }
        })
};


init();