const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "components"
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});

app.post('/add', (req, res) => {
    const sql = "INSERT INTO product (`Name`, `Price`, `Stock`, `Category`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.price,
        req.body.stock,
        req.body.category
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});

app.put('/update/:id', (req, res) => {
    const sql = "update product set `Name` = ?, `Price` = ?, `Stock` = ?, `Category` = ? where Id = ?"
    const values = [
        req.body.name,
        req.body.price,
        req.body.stock,
        req.body.category
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});

app.delete('/product/:id', (req, res) => {
    const sql = "DELETE FROM product WHERE Id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.listen(8001, () => {
    console.log("listening");
})