

const Department = require("./departments");


function viewDepartment(init, db) {
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