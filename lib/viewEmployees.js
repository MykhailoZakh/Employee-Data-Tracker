const mysql = require("mysql2");
const Employees = require("./employees");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emloyee_db'
    }
);



function viewEmployees(init) {
    return db.query(`SELECT employee.id,
    employee.first_name, 
    employee.last_name, 
    role.title, 
    role.salary,
    (SELECT CONCAT(manager.first_name, ' ', manager.last_name) 
    FROM employee manager
    WHERE manager.id = employee.manager_id) as manager
FROM 
    employee 
LEFT JOIN 
    role  ON employee.role_id = role.id;`, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            let arr = [];
            console.log(res);

            res.forEach((el) => {
                let newRole = new Employees(el.first_name, el.last_name, el.title, el.salary, el.manager);
                arr.push(newRole);
            })
            console.table(arr);
            init();

        }
    });
}

module.exports = viewEmployees;