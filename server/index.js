const express = require('express');
const app = express();
const mysql = requrie('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'personnel_system'
});

// Create a route
app.post('/create', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const company = req.body.company;

    db.query(
        'INSERT INTO personnel (pers_fname, pers_lname, pers_email, pers_phone, pers_company) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, company], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // End the request by sending a message (in this case); can send whatever you want, really
                res.send("Values inserted!");
            }
        }
    );
})

app.listen(3001, () => {
    console.log("Yay! Your server is running on port 3001.");
});

