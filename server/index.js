import express from "express";
import http from "http";
import cors from "cors"
import bodyParser from 'body-parser';
const app = express();


import pkg from 'sequelize';
const { Sequelize, DataTypes } = pkg;
const sequelize = new Sequelize('sqlite::memory:', { logging: false });


const Appeal = sequelize.define("appeal", {
    appeal_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tel: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
})

sequelize.sync({ alter: true });

const appeal = sequelize.model.appeal;

app.use(cors())
app.use(bodyParser.json());

app.post("/save_appeal", (req, res) => {
    Appeal.create(req.body).then((appeal) => {
        res.send(JSON.stringify({ status: "ok" }))
    })

})

app.get("/get_appeals", (req, res) => {
    Appeal.findAll().then((appeals) => {
        res.send(JSON.stringify({ status: "ok", appeals }))
    })

})

app.get("/", (req, res) => {
    res.send("hi");
})


app.listen(4000)