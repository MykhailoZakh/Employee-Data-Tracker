const mysql = require("mysql2");
const inquirer = require("inquirer");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emloyee_db'
    },
    console.log("Welcom to Employee Manager")
);

function updateEmployee(init) {
    return db.query("SELECT * FROM employee", (err, res) => {
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
                        console.log(nameObj);
                        console.log(roleObj);
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