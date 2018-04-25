const express = require('express');
const app = express();
const fs = require('fs');

const loadData = (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    console.log(data);
    createRoutes(data);
}

//console.log("oi")
const createRoutes = data => {
    app.get('/', (req, res) => {
        res.send(data);
    });

    app.post('/edit/:id/', (req, res) => {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == req.params.id) {
                data[i].name = req.query.name;
            }
        }
        fs.writeFile('./heroes.json', JSON.stringify(data), {
            "encoding": "utf-8"
        }, () => {
            res.send("Salvo");
        });

    });

    app.get('/heroes', (req, res) => {
        res.send(data)
    })
    app.listen(3000, () => {
        console.log("Online");
    });
}

fs.readFile('./heroes.json', loadData);