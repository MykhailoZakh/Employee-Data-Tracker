const inquirer = require("inquirer");


function updateManager(init, db) {
    return db.query("SELECT * FROM employee", (err, res) => {

        if (err) {
            console.error(err);
        } else {
            const managerArray = ['No manager'];
            const nameArray = [];
            res.forEach(obj => managerArray.push(`${obj.first_name} ${obj.last_name}`));
            res.forEach(obj => nameArray.push(`${obj.first_name} ${obj.last_name}`));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'name',
                    message: `Which employee's manager do you want to update?`,
                    choices: nameArray
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: `Which manager do you want to assign to the selected employee?`,
                    choices: managerArray
                }
            ])
                .then((data) => {
                    const nameObj = res.filter(obj => (`${obj.first_name} ${obj.last_name}`) == data.name);
                    const managerObj = res.filter(obj => (`${obj.first_name} ${obj.last_name}`) == data.manager);

                    db.query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerObj[0].id, nameObj[0].id], (error, respo) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log(`${data.name}'s role was updated!`)
                            init();
                        }
                    })
                })
        }


    })
};


module.exports = updateManager;