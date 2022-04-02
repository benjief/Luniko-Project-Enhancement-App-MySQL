const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "",
//     database: "luniko_pe"
// });

const db = mysql.createConnection({
    user: "ntzi52mknsjwhyar",
    host: "en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    password: "n7e3tkngvli21m8q",
    database: "q7vrrrkirjc2me4f"
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

// Update owned request in DB
app.put("/update-owned-request", (req, res) => {
    const reasonRejected = req.body.reasonRejected;
    const effort = req.body.effort;
    const approved = req.body.approved;
    const rejected = req.body.rejected;
    const status = req.body.status;
    const comments = req.body.comments;
    const id = req.body.id

    db.query(
        `UPDATE request 
         SET 
             rsn_rejected = ?,
             req_effort = ?,
             req_approved = ?,
             req_rejected = ?,
             req_status = ?,
             req_comments = ?
         WHERE 
             req_id = ?`,
        [reasonRejected, effort, approved, rejected, status, comments, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Request updated!");
                res.send(result);
            }
        }
    );
});

// Update submitted request in DB
app.put("/update-submitted-request/", (req, res) => {
    const company = req.body.company;
    const scopeType = req.body.scopeType;
    const department = req.body.department;
    const description = req.body.description;
    const value = req.body.value;
    const id = req.body.id;

    db.query(
        `UPDATE request 
         SET 
            req_company = ?,
            req_scope_type = ?,
            req_dept = ?,
            req_descr = ?,
            req_value = ?
         WHERE 
             req_id = ?`,
        [company, scopeType, department, description, value, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Request updated!");
                res.send(result);
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
        `INSERT INTO request (
            req_submitter, 
            req_company, 
            req_scope_type, 
            req_dept, 
            req_descr, 
            req_value) 
            VALUES (?, ?, ?, ?, ?, ?)`,
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

app.delete("/remove-request/:requestID", (req, res) => {
    const requestID = req.params.requestID;

    db.query(
        `DELETE FROM request (
            WHERE req_id = ?`,
        requestID, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Request removed!");
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

app.post("/remove-identifications/:req-id", (req, res) => {
    const req_id = req.params.reqID;

    db.query(
        `DELETE FROM identification
         WHERE req_id = ?`,
        [req_id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // End the request by sending a message (in this case); can send whatever you want, really
                console.log("Identification deleted!");
                res.send("Identification deleted!");
            }
        }
    );
});

// Write ownership to DB
app.post("/create-ownership", (req, res) => {
    const uid = req.body.uid;
    const req_id = req.body.req_id;

    db.query(
        "INSERT INTO ownership (pers_id, req_id) VALUES (?, ?)",
        [uid, req_id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // End the request by sending a message (in this case); can send whatever you want, really
                console.log("Ownership inserted!");
                res.send("Ownership inserted!");
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

app.get('/get-identifiers-for-submitted-request/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT 
            CONCAT(personnel.pers_fname, " ", personnel.pers_lname) AS pers_name, personnel.pers_id
         FROM
            personnel
         JOIN
         (SELECT 
            pers_id
         FROM
            identification
         WHERE
            req_id = ?) identifiers ON personnel.pers_id = identifiers.pers_id`,
        id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/get-identifier-names-for-submitted-request/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT 
            CONCAT(pers_fname, " ", pers_lname) AS 'pers_name'
         FROM
            personnel
         JOIN
         (SELECT 
            pers_id
         FROM
            identification
         WHERE
            req_id = ?) identifiers ON personnel.pers_id = identifiers.pers_id`,
        id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/get-all-emails', (req, res) => {
    db.query("SELECT pers_email FROM personnel", (err, result) => {
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

app.get('/get-submitted-requests-for-id/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT 
            request.req_id,
            CONCAT(pers_fname, ' ', pers_lname) AS 'req_submitter',
            DATE_FORMAT(req_date, '%M %d, %Y') AS 'req_date',
            DATE_FORMAT(req_updated, '%M %d, %Y at %h:%i%p') AS 'req_updated',
            req_scope_type,
            req_dept,
            req_descr,
            req_value,
            req_approved,
            req_rejected,
            rsn_rejected,
            req_status,
            req_comments
        FROM
            request
            JOIN
            (SELECT 
                pers_id, pers_fname, pers_lname
            FROM
                personnel) submitter_info ON req_submitter = pers_id
            JOIN
            (SELECT 
                req_id
            FROM
                identification
            WHERE
                pers_id = ?) matching_ids ON request.req_id = matching_ids.req_id
        ORDER BY req_updated DESC`,
        id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/get-owned-requests-for-id/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT
            request.req_id,
            req_company,
            CONCAT(pers_fname, ' ', pers_lname) AS 'req_submitter',
            DATE_FORMAT(req_date, '%M %d, %Y') AS 'req_date',
            DATE_FORMAT(req_updated, '%M %d, %Y at %h:%i%p') AS 'req_updated',
            req_scope_type,
            req_dept,
            req_descr,
            req_value,
            req_effort,
            req_priority,
            req_approved,
            req_rejected,
            rsn_rejected,
            req_status,
            req_comments
        FROM 
            request
            JOIN
            (SELECT 
                pers_id, pers_fname, pers_lname
                FROM
                    personnel) submitter_info ON req_submitter = pers_id
                    JOIN
                (SELECT 
                    req_id
                FROM
                    ownership
                WHERE
                    pers_id = ?) matching_ids ON request.req_id = matching_ids.req_id
        ORDER BY req_value DESC;`,
        id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/get-request-details-for-id/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT 
            request.req_id,
            req_company,
            CONCAT(pers_fname, ' ', pers_lname) AS 'req_submitter',
            pers_id AS 'req_submitter_id',
            DATE_FORMAT(req_date, '%M %d, %Y') AS 'req_date',
            DATE_FORMAT(req_updated, '%M %d, %Y at %h:%i%p') AS 'req_updated',
            req_scope_type,
            req_dept,
            req_descr,
            req_value,
            req_effort,
            req_approved,
            req_rejected,
            rsn_rejected,
            req_status,
            req_comments
        FROM
            request
                JOIN
            (SELECT 
                pers_id, pers_fname, pers_lname
            FROM
                personnel) submitter_info ON req_submitter = pers_id
        WHERE 
            req_id = ?`,
        id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/get-request-owners-for-id/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT 
        CONCAT(pers_fname, ' ', pers_lname) AS 'req_owner'
        FROM
            personnel
                JOIN
            (SELECT 
                pers_id
            FROM
                ownership
            WHERE
                req_id = ?) test ON personnel.pers_id = test.pers_id;`,
        id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/get-unowned-requests-for-id/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT 
            request.req_id,
            CONCAT(pers_fname, ' ', pers_lname) AS 'req_submitter',
            DATE_FORMAT(req_date, '%M %d, %Y') AS 'req_date',
            DATE_FORMAT(req_updated, '%M %d, %Y at %h:%i%p') AS 'req_updated',
            req_scope_type,
            req_dept,
            req_descr,
            req_value,
            req_approved,
            req_rejected,
            req_comments
        FROM
            request
                JOIN
            (SELECT 
                pers_id, pers_fname, pers_lname
            FROM
                personnel) submitter_info ON req_submitter = pers_id
        WHERE
            req_id NOT IN (SELECT 
                    req_id
                FROM
                    ownership
                WHERE
                    pers_id = ?)
                AND req_rejected <> 1
        ORDER BY req_date ASC`,
        id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/get-unowned-requests-for-id/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT 
            request.req_id,
            CONCAT(pers_fname, ' ', pers_lname) AS 'req_submitter',
            DATE_FORMAT(req_date, '%M %d, %Y') AS 'req_date',
            DATE_FORMAT(req_updated, '%M %d, %Y at %h:%i%p') AS 'req_updated',
            req_scope_type,
            req_dept,
            req_descr,
            req_value,
            req_approved,
            req_rejected,
            req_comments
        FROM
            request
                JOIN
            (SELECT 
                pers_id, pers_fname, pers_lname
            FROM
                personnel) submitter_info ON req_submitter = pers_id
        WHERE
            req_id NOT IN (SELECT 
                    req_id
                FROM
                    ownership
                WHERE
                    pers_id = ?)
                AND req_rejected <> 1
        ORDER BY req_date ASC`,
        id, (err, result) => {
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
});

// app.listen(3001, () => {
//     console.log("Yay! Your server is running on port 3001.");
// });

app.listen(process.env.PORT || 3001, () => {
    console.log("Your server is running!");
});