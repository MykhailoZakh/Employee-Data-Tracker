const inquirer = require("inquirer");



function deleteRole(init, db) {
    db.query("SELECT * FROM role", (err, res) => {
        if (err) {
            console.error(err)
            return;
        }

        roleArray = [];
        res.forEach(obj => roleArray.push(obj.title));

        inquirer.prompt([
            {
                type: 'list',
                name: 'title',
                message: `Which role do you want to delete?`,
                choices: roleArray
            }
        ])
            .then((data) => {

                const deleteObj = res.filter(obj => data.title == obj.title);

                db.query(`DELETE FROM role WHERE id = ? `, deleteObj[0].id, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`${data.title} was deleted from the database!`);
                        init();
                    }
                })
            })
    })
};

module.exports = deleteRole;