$(document).ready(onReady);

let operator = '';
let inputNumberOne = 0;
let inputNumberTwo = 0;



function onReady() {
    console.log('we have jquery');
    $('.operation-btn').click(setOperator);
}


// TASKS FOR CLIENT SIDE:
// Gather input 1 and 2
// gather operator
// send to server as object
// receive calculation and history from server
// render to DOM


function setOperator () {
    // console.log('in setOperator', $(this).attr('id') );
    operator = $(this).attr('id');
};

function sendCalculationData () { // build and send object to server
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: {
            numberOne: $('#firstNumberInput').val(),
            numberTwo: $('#secondNumberInput').val(),
            operator: operator
        }
    }).then // stopping here, need to continue then function

};