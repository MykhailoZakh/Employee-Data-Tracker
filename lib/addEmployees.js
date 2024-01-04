
const inquirer = require("inquirer");




function insertEmp(firstName, lastName, roleID, managerID) {
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
                // console.log(res);
                const roleArray = [];
                const nameArray = [`No manager`];
                role.forEach(obj => roleArray.push(obj.title));
                res.forEach(obj => nameArray.push(`${obj.first_name} ${obj.last_name}`));
                // console.log(nameArray);
                // console.log(roleArray);
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
                    // console.log(data)
                    // insertEmp(firstName, lastName, roleID, managerID)
                    const roleObj = role.filter(obj => obj.title == data.role);
                    console.log(roleObj);
                    if (data.manager == `No manager`) {
                        insertEmp(data.firstName, data.lastName, roleObj[0].id, 0);
                    } else {
                        const managerObj = res.filter(obj => (`${obj.first_name} ${obj.last_name}`) == data.manager);
                        // console.log(managerObj[0].eid);
                        insertEmp(data.firstName, data.lastName, roleObj[0].id, managerObj[0].id);
                    }
                    console.log(`${data.firstName} ${data.lastName} added to the database!`);
                    init();


                });
            }
        });
    });
}

module.exports = addEmployees;