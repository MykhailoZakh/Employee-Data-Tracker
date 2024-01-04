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

function addRole(init) {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.error(err);
        } else {
            // console.log(res);
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
                    // console.log(data);
                    depObj = res.filter(obj => obj.name == data.department);
                    // console.log(depObj)
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