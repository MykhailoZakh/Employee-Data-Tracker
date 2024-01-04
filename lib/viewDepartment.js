
const mysql = require("mysql2");
const Department = require("./departments");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emloyee_db'
    }
);

function viewDepartment(init) {
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