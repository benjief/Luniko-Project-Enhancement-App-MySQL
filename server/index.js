const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "personnel_system"
});

// Create a route
app.post("/create", (req, res) => {
    const uid = req.body.uid;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // const phone = req.body.phone;
    // const company = req.body.company;

    db.query(
        // User ?s to keep things secure?
        "INSERT INTO personnel (pers_id, pers_fname, pers_lname, pers_email) VALUES (?, ?, ?, ?)",
        [uid, firstName, lastName, email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // End the request by sending a message (in this case); can send whatever you want, really
                console.log("Values inserted!");
                res.send("Values inserted!");
            }
        }
    );
});

app.get('/get', (req, res) => {
    db.query("SELECT * FROM personnel", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// app.get('/get-uids', (req, res) => {
//     db.query("SELECT pers_id FROM personnel", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

app.get('/get-personnel-with-id/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM personnel WHERE pers_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM personnel WHERE pers_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.listen(3001, () => {
    console.log("Yay! Your server is running on port 3001.");
});
