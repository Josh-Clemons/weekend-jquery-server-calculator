$(document).ready(onReady);

let operator = '';
let inputNumberOne = '0';
let inputNumberTwo = '0';
let newCalculationCheck = true;
let newRefresh = true;
let calc = {};


function onReady() {
    // console.log('we have jquery');
    $('.operation-btn').click(setOperator);
    $('#equals-btn-two').click(sendCalculationData);
    $('#clear-btn').click(clearCalculationData);
    $('.number-btn').click(updateScreen);
    $('#clear-history-btn').click(clearCalculationDataHistory);
    $('#calculation-history-list').on('click', 'li', rerunCalc);
    updateScreen();
    getCalculationData();
    
}

function updateScreen () { // updates calculator screen and sets input numbers to a variable
    if (newCalculationCheck) { // sets calculator screen to 0 on page refresh or when a new calculation is started
        $('#calculator-screen').text('');
        newCalculationCheck = false;
        inputNumberOne = '';
        inputNumberTwo = '';
        operator = '';
    }

    //the below if statements are used in-lieu of clearing the calculator display, in order to match the stretch goal graphic
    if (operator !== '' && inputNumberOne === '') {
        inputNumberOne = $('#calculator-screen').text();
    }
    
    if (inputNumberOne !== '') {
        inputNumberTwo += $(this).text();
    }

    $('#calculator-screen').append($(this).text());
}

function setOperator () { // sets operator value for use in switch case on server side
    if (operator === ''){ // only sets operator on first click
        operator = $(this).text();
        updateScreen();
        $('#calculator-screen').append($(this).text());
    }
};

function sendCalculationData () { // build and send object to server

    if (inputNumberOne === '' || operator === '' || inputNumberTwo === '') {
        alert('Missing calculation data!')
        return;
    } else if (isNaN(inputNumberOne) || isNaN(inputNumberTwo)){
        alert('One of your numbers is wrong!');
        return;
    };
    
    
    let calculationData = {
        numberOne: Number(inputNumberOne),
        numberTwo: Number(inputNumberTwo),
        operator: operator
    }
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: calculationData
    }).then(function(response){
        clearCalculationData();
        getCalculationData ();
    }).catch(function(error){
        alert('failed post', error)
    });
};

function getCalculationData () { // gets calculation data from server then sends to render
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then(function (response) {
        // console.log(response);
        calc = response;
        render(response);
    }).catch(function(error) {
        alert('error running getcalculationdata', error);
    });
};

function clearCalculationData () { // clears calculator screen when 'C' is clicked
    newCalculationCheck = true;
    updateScreen();
    calc.calculation = '0';
    render(calc);
};

function clearCalculationDataHistory () { //server call to delete history data
    $.ajax({
        method: 'DELETE',
        url: '/calculations'
    }).then(function(response) {
        getCalculationData();
    }).catch(function(error){
        alert('failed clearcalculationdatta', error);
    });
};

function rerunCalc () { // displays calc history item on calculator screen when clicked
    newCalculationCheck = true;
    $('#calculator-screen').empty();
    $('#calculator-screen').append($(this).text());
};


function render (res) {
    // console.log('calc.calculation in render', calc.calculation);
    $('#calculator-screen').empty();
    if (newRefresh || res.calculation === '0' || !(res.calculation) ){
        $('#calculator-screen').text('= 0');
        newRefresh = false;
    } else if (res.history) {
        $('#calculator-screen').append(`${res.history[res.history.length-1]}`);
    }
    $('#calculation-history-list').empty();
    for (i=res.history.length-1; i>=0; i--) {
        $('#calculation-history-list').append(`
                <li data-id="${i}">${res.history[i]}</li>
        `);
    };
    newCalculationCheck = true;
};