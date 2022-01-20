const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'personnel_system'
});

app.post('/create', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.firstName;
    const email = req.body.firstName;
    const phone = req.body.firstName;
    const company = req.body.firstName;

    db.query("INSERT INTO personnel (pers_fname, pers_lname, pers_email, pers_phone, pers_company) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, phone, company],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted")
            }
        });
})

app.listen(3001, () => {
    console.log("Yay! Your server is running on port 3001.");
});

