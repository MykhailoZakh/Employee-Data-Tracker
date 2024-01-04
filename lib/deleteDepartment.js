const inquirer = require("inquirer");



function deleteDepartment(init, db) {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.error(err)
            return;
        }

        departmentArray = [];
        res.forEach(obj => departmentArray.push(obj.name));
        console.log(departmentArray);
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: `Which department do you want to delete?`,
                choices: departmentArray
            }
        ])
            .then((data) => {
                console.log(data);
                const deleteObj = res.filter(obj => data.name == obj.name);
                console.log(deleteObj.id);
                db.query(`DELETE FROM department WHERE id = ? `, deleteObj[0].id, (err, result) => {
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

module.exports = deleteDepartment;