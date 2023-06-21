'use strict'
const express= require('express')
const app= express()
const userRouter= require('./auth/router')

app.use(express.json())
app.use(userRouter)
app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi');
}
function start(port) {
    app.listen(port, () => {
        console.log(`server is up and listen on ${port}`)
    });
}
module.exports = {
    start: start,
    app: app,
}