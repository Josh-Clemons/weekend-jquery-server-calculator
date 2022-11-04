let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
const PORT = 5000;


// TASKS FOR SERVER SIDE
// receive calculator data
// complete calculation operation
// add calculation to history
// send calculation and history to client


