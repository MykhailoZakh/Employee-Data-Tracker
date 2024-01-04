const inquirer = require("inquirer");
const mysql = require("mysql2");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emloyee_db'
    }
);

function addDepartment(init) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmantName',
            message: "What is the name of the department?"
        }
    ])
        .then((data) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, data.departmantName, (err, result) => {
                if (err) {
                    console.error(err);
                } else {

                    console.log(`${data.departmantName} was added to the database!`);
                    init();

                }
            })
        })
};

module.exports = addDepartment;