

const Department = require("./departments");


function viewDepartment(init, db) {
    // quert to get all info from department table
    db.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.error(err);
        } else {
            let arr = [];
            res.forEach((el) => {
                let newRole = new Department(el.name);
                arr.push(newRole);
            })
            console.table(arr);
            init();
        }
    });
};

module.exports = viewDepartment;