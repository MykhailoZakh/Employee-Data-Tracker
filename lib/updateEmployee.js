
const inquirer = require("inquirer");


function updateEmployee(init, db) {
    // query to taking all data from employee table
    return db.query("SELECT * FROM employee", (err, res) => {
        // query to taking all data from role table
        db.query("SELECT * FROM role", (er, role) => {
            if (err) {
                console.error(err);
            } else {
                const roleArray = [];
                const nameArray = [];
                role.forEach(obj => roleArray.push(obj.title));
                res.forEach(obj => nameArray.push(`${obj.first_name} ${obj.last_name}`));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'name',
                        message: `Which employee's role do you want to update?`,
                        choices: nameArray
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: `Which role do you want to assign to the selected employee?`,
                        choices: roleArray
                    }
                ])
                    .then((data) => {
                        const nameObj = res.filter(obj => (`${obj.first_name} ${obj.last_name}`) == data.name);
                        const roleObj = role.filter(obj => obj.title == data.role);
                        // query to update  role_id from employee table by employee id
                        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleObj[0].id, nameObj[0].id], (error, respo) => {
                            if (error) {
                                console.error(error);
                            } else {
                                console.log(`${data.name}'s role was updated!`)
                                init();
                            }
                        })
                    })
            }
        });

    })
};


module.exports = updateEmployee;