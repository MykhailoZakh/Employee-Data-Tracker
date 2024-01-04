
const Role = require("./roles");




function viewRoles(init, db) {
    return db.query("SELECT * FROM role JOIN department ON role.department_ID = department.id", (err, res) => {
        if (err) {
            console.error(err);
        } else {
            let arr = [];
            res.forEach((el) => {
                let newRole = new Role(el.title, el.salary, el.name);
                arr.push(newRole);
            })
            console.table(arr);
            init();
        }
    });
};

module.exports = viewRoles;