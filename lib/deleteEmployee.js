const inquirer = require("inquirer");



function deleteEmployee(init, db) {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.error(err)
            return;
        }

        nameArray = [];
        res.forEach(obj => nameArray.push(`${obj.first_name} ${obj.last_name}`));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: `Which employee do you want to delete?`,
                choices: nameArray
            }
        ])
            .then((data) => {

                const deleteObj = res.filter(obj => data.name == (`${obj.first_name} ${obj.last_name}`));
                //query to delete employee by ID
                db.query(`DELETE FROM employee WHERE id = ? `, deleteObj[0].id, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`${data.name} was deleted from the database!`);
                        init();
                    }
                })
            })
    })
};

module.exports = deleteEmployee;