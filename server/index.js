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
    database: "luniko_pe"
});

// Create a route
app.post("/create-personnel", (req, res) => {
    const uid = req.body.uid;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // const phone = req.body.phone;
    // const company = req.body.company;

    db.query(
        // Use ?s to keep things secure?
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

// Write request to DB
app.post("/create-request", (req, res) => {
    const uid = req.body.uid;
    const company = req.body.company;
    const scopeType = req.body.scopeType;
    const department = req.body.department;
    const description = req.body.description;
    const value = req.body.value;

    db.query(
        "INSERT INTO request (req_submitter, req_company, req_scope_type, req_dept, req_descr, req_value) VALUES (?, ?, ?, ?, ?, ?)",
        [uid, company, scopeType, department, description, value], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // End the request by sending a message (in this case); can send whatever you want, really
                console.log("Request inserted!");
                res.send(result);
            }
        }
    );
});

// Write identification to DB
app.post("/create-identification", (req, res) => {
    const uid = req.body.uid;
    const req_id = req.body.req_id;

    db.query(
        "INSERT INTO identification (pers_id, req_id) VALUES (?, ?)",
        [uid, req_id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // End the request by sending a message (in this case); can send whatever you want, really
                console.log("Identification inserted!");
                res.send("Identification inserted!");
            }
        }
    );
});

app.get('/get-all-personnel', (req, res) => {
    db.query("SELECT * FROM personnel", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

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
