$(document).ready(onReady);

let operator = '';

function onReady() {
    console.log('we have jquery');
    $('.operation-btn').click(setOperator);
}








///////// TAKING A BREAK, I THINK IT WOULD BE BETTER TO START
///////// WRITING IN SERVER INSTEAD OF STARTING HERE AND MOVING OVER
function setOperator() {
    console.log($(this).attr('id'));
    operator = $(this).attr('id');
}



function runCalculator () {

}