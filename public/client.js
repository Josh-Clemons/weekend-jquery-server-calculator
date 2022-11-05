$(document).ready(onReady);

let operator = '';
let inputNumberOne = 0;
let inputNumberTwo = 0;
let newCalculationCheck = true;
let newRefresh = true;



function onReady() {
    // console.log('we have jquery');
    $('.operation-btn').click(setOperator);
    $('#equals-btn-two').click(sendCalculationData);
    $('#clear-btn').click(clearCalculationData);
    $('.number-btn').click(updateScreen);
    $('#clear-history-btn').click(clearCalculationDataHistory);
    updateScreen();
    getCalculationData();
    
}


// TASKS FOR CLIENT SIDE:
// Gather input 1 and 2
// gather operator
// send to server as object
// receive calculation and history from server
// render to DOM
// clear history

function updateScreen () {
    if (newCalculationCheck) { // sets calculator screen to 0 on page refresh or when a new calculation is started
        $('#calculator-screen').text('');
        newCalculationCheck = false;
        inputNumberOne = '';
        inputNumberTwo = '';
        operator = '';
    }

    if (operator !== '' && inputNumberOne === '') {
        inputNumberOne = $('#calculator-screen').text();
    }
    
    if (inputNumberOne !== '') {
        inputNumberTwo += $(this).text();
    }

    $('#calculator-screen').append($(this).text());
}

function setOperator () {
    operator = $(this).text();
    updateScreen();
    $('#calculator-screen').append($(this).text());

};

function sendCalculationData () { // build and send object to server
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

function getCalculationData () {
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then(function (response) {
        // console.log(response);
        render(response);
    }).catch(function(error) {
        alert('error running getcalculationdata', error);
    });
};

function clearCalculationData () {
    $('#first-number-input').val('');
    $('#second-number-input').val('');
};

function clearCalculationDataHistory () {
    // console.log('in clearCalculationData');
    $.ajax({
        method: 'DELETE',
        url: '/calculations'
    }).then(function(response) {
        getCalculationData();
    }).catch(function(error){
        alert('failed clearcalculationdatta', error);
    });
};

function render (calc) {
    // console.log('calc.calculation in render', calc.calculation);
    $('#calculator-screen').empty();
    if (newRefresh){
        $('#calculator-screen').text('0');
        newRefresh = false;
    } else {
        $('#calculator-screen').append(`=${calc.calculation}`);
    }
    $('#calculation-history-list').empty();
    for (i=calc.history.length-1; i>=0; i--) {
        $('#calculation-history-list').append(`
                <li data-id="${i}">${calc.history[i]}</li>
        `);
    };
    newCalculationCheck = true;
};