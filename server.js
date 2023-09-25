const express = require("express");
const app = express();

app.get("/", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send("hello world");
});
