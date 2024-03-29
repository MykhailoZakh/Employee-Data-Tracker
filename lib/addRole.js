const inquirer = require("inquirer");




function addRole(init, db) {
    // quert to get all data from department
    db.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.error(err);
        } else {
            // storing department names as array
            const departmentArray = [];
            res.forEach(obj => departmentArray.push(obj.name));
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
                    choices: departmentArray
                }
            ])
                .then((data) => {

                    depObj = res.filter(obj => obj.name == data.department);
                    // Inserting new role info to role table
                    db.query(`INSERT INTO role (title, salary, department_ID) VALUES ( ?, ?, ?)`, [data.roleName, data.roleSalary, depObj[0].id], (err, response) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`${data.roleName} was added to the database!`);
                            init();
                        }
                    })
                })
        }
    })

}

module.exports = addRole;