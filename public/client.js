$(document).ready(onReady);

let operator = '';
let inputNumberOne = 0;
let inputNumberTwo = 0;



function onReady() {
    // console.log('we have jquery');
    $('.operation-btn').click(setOperator);
    $('#equals-btn').click(sendCalculationData);
    $('#clear-btn').click(clearCalculationData);
    getCalculationData();
}


// TASKS FOR CLIENT SIDE:
// Gather input 1 and 2
// gather operator
// send to server as object
// receive calculation and history from server
// render to DOM
// clear history from 


function setOperator () {
    // console.log('in setOperator', $(this).attr('id') );
    operator = $(this).text();
};

function sendCalculationData () { // build and send object to server
    let calculationData = {
        numberOne: $('#first-number-input').val(),
        numberTwo: $('#second-number-input').val(),
        operator: operator
    }
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: calculationData
    }).then(function(response){
        $('#first-number-input').val('');
        $('#second-number-input').val('');
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
}

function clearCalculationData () {
    // console.log('in clearCalculationData');
    $.ajax({
        method: 'DELETE',
        url: '/calculations'
    }).then(function(response) {
        getCalculationData();
    }).catch(function(error){
        alert('failed clearcalculationdatta', error);
    });
}

function render (calc) {
    // console.log('calc.calculation in render', calc.calculation);
    $('#calculated-value').empty();
    $('#calculated-value').append(`Total: ${calc.calculation}`);

    $('#calculation-history-list').empty();
    for (i=calc.history.length-1; i>=0; i--) {
        $('#calculation-history-list').append(`
            <li>${calc.history[i]}</li>
        `);
    }
}