///////////////////////////////////////
// Lecture: Hoisting

calcAge(1965);

function calcAge(year){
    console.log(2018-year);
}

var retirement = function(year) {
    console.log(65- (2018-year));
}

console.log(age);
var age = 26;


function foo(){
    var age = 50;
    console.log(age);
}

foo();
console.log(age);

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









