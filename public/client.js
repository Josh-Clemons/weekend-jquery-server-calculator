$(document).ready(onReady);

let operator = '';
let inputNumberOne = 0;
let inputNumberTwo = 0;
let newCalculationCheck = false;



function onReady() {
    // console.log('we have jquery');
    $('.operation-btn').click(setOperator);
    $('#equals-btn-two').click(sendCalculationData);
    $('#clear-btn').click(clearCalculationData);
    $('.number-btn').click(updateScreen);
    $('#clear-history-btn').click(clearCalculationDataHistory);
    getCalculationData();
}


// TASKS FOR CLIENT SIDE:
// Gather input 1 and 2
// gather operator
// send to server as object
// receive calculation and history from server
// render to DOM
// clear history from 

function removeElement() {
    $(this).remove();
};

function updateScreen () {
    if (newCalculationCheck) {
        $('#calculator-screen').text('');
        newCalculationCheck = false;
    }
    $('#calculator-screen').append($(this).text());
}

function setOperator () {
    // console.log('in setOperator', $(this).attr('id') );
    operator = $(this).text();
    inputNumberOne = $('#calculator-screen').text();
    // console.log('input one in set operator', inputNumberOne);
    $('#calculator-screen').text('');
};

function sendCalculationData () { // build and send object to server
    let calculationData = {
        numberOne: Number(inputNumberOne),
        numberTwo: Number($('#calculator-screen').text()),
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
    $('#calculator-screen').append(`${calc.calculation}`);

    $('#calculation-history-list').empty();
    for (i=calc.history.length-1; i>=0; i--) {
        $('#calculation-history-list').append(`
                <li data-id="${i}">${calc.history[i]}</li>
        `);
    };
    newCalculationCheck = true;
};