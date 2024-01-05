// Declaring npm palages MySQL and Inquirer
const mysql = require("mysql2");
const inquirer = require("inquirer");

// Importing fuctions for all cases of app from lib folder
const viewEmployees = require("./lib/viewEmployees");
const addEmployees = require("./lib/addEmployees");
const updateEmployee = require("./lib/updateEmployee");
const viewRoles = require("./lib/viewRoles");
const addRole = require("./lib/addRole");
const addDepartment = require("./lib/addDepartment");
const viewDepartment = require("./lib/viewDepartment");
const updateManager = require("./lib/updateManager");
const deleteDepartment = require("./lib/deleteDepartment");
const deleteRole = require("./lib/deleteRole");
const deleteEmployee = require("./lib/deleteEmployee");

// creating connection to emloyee_db database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emloyee_db'
    },
    console.log("Welcom to Employee Manager")
);

// Initializing function to start the app with different chooses
const init = function () {
    inquirer.prompt([
        {
            type: "list",
            message: "What you like to do?",
            name: "toDo",
            choices: ["View All Employees", "Update Employee Manager", "Add Employee", "Update Employee Role",
                "Delete Employee", "View All Roles", "Add Role", "Delete Role", "View All Dpartments", "Add Department", "Delete Department", "Exit"]
        }
    ])
        .then((data) => {
            // Switching between all cases of app functions
            switch (data.toDo) {
                case "View All Employees":
                    viewEmployees(init, db);
                    break;
                case "Update Employee Manager":
                    updateManager(init, db);
                    break;
                case "Add Employee":
                    addEmployees(init, db);
                    break;

                case "Update Employee Role":
                    updateEmployee(init, db);
                    break;

                case "Delete Employee":
                    deleteEmployee(init, db);
                    break;

                case "View All Roles":
                    viewRoles(init, db);
                    break;

                case "Add Role":
                    addRole(init, db);
                    break;

                case "Delete Role":
                    deleteRole(init, db);
                    break;

                case "View All Dpartments":
                    viewDepartment(init, db);
                    break;

                case "Add Department":
                    addDepartment(init, db);
                    break;

                case "Delete Department":
                    deleteDepartment(init, db);
                    break;

                case "Exit":
                    console.log(`Good Bye`);
                    break;
            }
        })
};

// calling init function when app starts
init();