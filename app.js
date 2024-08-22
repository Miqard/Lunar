const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mainRouter    = require("./main_router");
var bodyParser      = require('body-parser');


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
// SERVER SETUP
const app   = express();
const PORT  = 3001;
const LPORT = 8000;
const local = true;
const HOST  = "0.0.0.0"

app.use(express.json()); // Middleware for parsing JSON data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use(mainRouter);


if (local) {
    app.listen(LPORT, () => {
        console.log(`App Listening on localhost Port ${LPORT}`);
    });    
}
else {
    app.listen(PORT, HOST, () => {
        console.log(`App Listening on WiFi address Port ${PORT}`);
    });
        
}



