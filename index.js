'use strict';
require("dotenv").config();

let port = process.env.PORT || 3030;
const app = require('./src/server');
const { db } = require('./src/auth/models/index');
db.sync(
    // {force:true}
    )
    .then(() => {
        app.start(port);
    })