let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
const PORT = 5000;

let calculationHistory = [];
let calculation = 0;

// TASKS FOR SERVER SIDE
// receive calculator data
// complete calculation operation
// add calculation to history
// send calculation and history to client



app.post ('/calculations' , (req, res) => {
    calculation = calculateValue(req.body);
    let equation = `${req.body.numberOne} ${req.body.operator} ${req.body.numberTwo} = ${calculation}`;
    calculationHistory.push(equation);
    // console.log('calculation value' , calculation);
    // console.log('calc history ', calculationHistory);
    res.sendStatus(200);
});

app.get('/calculations' , (req, res) =>{
    res.send({calculation: calculation, history: calculationHistory})
});

app.delete('/calculations', (req, res) => {
    calculation = 0;
    calculationHistory = [];
    res.sendStatus(200);
})



function calculateValue (calc) {
    let answer = 0;
    // console.log('operation being passed' , calc.operator);
    switch (calc.operator) {
        case ('-') : 
            answer = Number(calc.numberOne) - Number(calc.numberTwo);
            break;
        case ('+') :
            // console.log('in plus button switch');
            answer = Number(calc.numberOne) + Number(calc.numberTwo);
            break;
        case ('/') :
            answer = Number(calc.numberOne) / Number(calc.numberTwo);
            break;
        case ('*') :
            answer = Number(calc.numberOne) * Number(calc.numberTwo);
            break;
    }
    return (answer);
}

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});