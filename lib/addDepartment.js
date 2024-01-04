const inquirer = require("inquirer");



function addDepartment(init, db) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?"
        }
    ])
        .then((data) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, data.departmentName, (err, result) => {
                if (err) {
                    console.error(err);
                } else {

                    console.log(`${data.departmentName} was added to the database!`);
                    init();

                }
            })
        })
};

module.exports = addDepartment;