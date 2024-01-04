const inquirer = require("inquirer");
const viewEmployees = require("./lib/viewEmployees");
const addEmployees = require("./lib/addEmployees");
const updateEmployee = require("./lib/updateEmployee");
const viewRoles = require("./lib/viewRoles");
const addRole = require("./lib/addRole");
const addDepartment = require("./lib/addDepartment");
const viewDepartment = require("./lib/viewDepartment");




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
                    viewEmployees(init);
                    break;

                case "Add Employee":
                    addEmployees(init);
                    break;

                case "Update Employee Role":
                    updateEmployee(init);
                    break;

                case "View All Roles":
                    viewRoles(init);
                    break;

                case "Add Role":
                    addRole(init);
                    break;

                case "View All Dpartments":
                    viewDepartment(init);
                    break;

                case "Add Department":
                    addDepartment(init);
                    break;

                case "Exit":
                    console.log(`Good Bye`);
                    break;
            }
        })
};


init();