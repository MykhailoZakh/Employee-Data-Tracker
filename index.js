const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");
const Role = require("./lib/roles");
const Department = require("./lib/departments");
const Employees = require("./lib/employees");
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

                    db.query("SELECT * FROM employee", (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            let arr = [];
                            res.forEach((el) => {
                                let newRole = new Employees(el.first_name, el.last_name);
                                arr.push(newRole);
                            })
                            console.table(arr);
                            init();
                        }
                    });
                    break;
                case "Add Employee":
                    console.log(data.toDo);
                    init();
                    break;

                case "Update Employee Role":
                    console.log(data.toDo);
                    init();
                    break;

                case "View All Roles":
                    db.query("SELECT * FROM role", (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            let arr = [];
                            res.forEach((el) => {
                                let newRole = new Role(el.title, el.selary);
                                arr.push(newRole);
                            })
                            console.table(arr, ["title", "selary"]);
                            init();
                        }
                    });
                    break;

                case "Add Role":
                    console.log(data.toDo);
                    init();
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
                    console.log(data.toDo);
                    init();
                    break;

                case "Exit":
                    console.log(`Good Bye`);
                    break;
            }
        })
};


init();