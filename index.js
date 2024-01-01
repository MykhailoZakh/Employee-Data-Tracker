const inquirer = require("inquirer");
const fs = require("fs");

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
                    console.log(data.toDo);
                    init();
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
                    console.log(data.toDo);
                    init();
                    break;
                case "Add Role":
                    console.log(data.toDo);
                    init();
                    break;
                case "View All Dpartments":
                    console.log(data.toDo);
                    init();
                    break;
                case "Add Department":
                    console.log(data.toDo);
                    init();
                    break;
                case "Exit":
                    console.log(data.toDo);
                    break;
            }
        })
}
init();