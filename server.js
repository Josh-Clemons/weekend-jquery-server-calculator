let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
const PORT = 5000;

let calculationHistory = [];
let calculation = 0;


app.post ('/calculations' , (req, res) => {
    calculation = calculateValue(req.body);
    let equation = `${req.body.numberOne}${req.body.operator}${req.body.numberTwo} = ${calculation}`;
    calculationHistory.push(equation);
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
    switch (calc.operator) {
        case ('-') : 
            answer = Number(calc.numberOne) - Number(calc.numberTwo);
            break;
        case ('+') :
            answer = Number(calc.numberOne) + Number(calc.numberTwo);
            break;
        case ('/') :
            answer = Number(calc.numberOne) / Number(calc.numberTwo);
            break;
        case ('*') :
            answer = Number(calc.numberOne) * Number(calc.numberTwo);
            break;
    }
    return (Math.round(answer * 100000000) / 100000000);
}

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});