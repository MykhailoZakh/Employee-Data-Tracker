const mysql = require("mysql2");
const inquirer = require("inquirer");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emloyee_db'
    },
    console.log("Welcom to Employee Manager")
);

function updateEmployee(init) {
    db.query("SELECT employee.first_name, employee.last_name FROM employee", (err, data) => {

    })
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Which department does the role belong to?',
            choices: departmentArray
        }
    ])

};


module.exports = updateEmployee;