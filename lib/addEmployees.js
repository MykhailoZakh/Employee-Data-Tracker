
const inquirer = require("inquirer");




function insertEmp(firstName, lastName, roleID, managerID, db) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    (?, ?, ?, ?)`, [firstName, lastName, roleID, managerID], (err, response) => {
        if (err) {
            console.error(err);
        }
    })
}
//  JOIN role ON employee.role_id = role.id
function addEmployees(init, db) {
    return db.query("SELECT * FROM employee", (err, res) => {
        db.query("SELECT * FROM role", (er, role) => {


            if (err || er) {
                console.error(err);
                console.error(er);
            } else {

                const roleArray = [];
                const nameArray = [`No manager`];
                role.forEach(obj => roleArray.push(obj.title));
                res.forEach(obj => nameArray.push(`${obj.first_name} ${obj.last_name}`));

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: `What is the employee's first name?`,
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: `What is the employee's last name?`,
                    },
                    {
                        type: "list",
                        message: "What is the employee's role?",
                        name: "role",
                        choices: roleArray
                    },
                    {
                        type: "list",
                        message: "Who is the employee's manager?",
                        name: "manager",
                        choices: nameArray
                    }
                ]).then((data) => {

                    const roleObj = role.filter(obj => obj.title == data.role);

                    if (data.manager == `No manager`) {
                        insertEmp(data.firstName, data.lastName, roleObj[0].id, 0, db);
                    } else {
                        const managerObj = res.filter(obj => (`${obj.first_name} ${obj.last_name}`) == data.manager);
                        ;
                        insertEmp(data.firstName, data.lastName, roleObj[0].id, managerObj[0].id, db);
                    }
                    console.log(`${data.firstName} ${data.lastName} added to the database!`);
                    init();


                });
            }
        });
    });
}

module.exports = addEmployees;