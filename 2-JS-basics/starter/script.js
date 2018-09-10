/* Variables and datatypes */

/*var firstName = 'Chris';
var lastName = 'Doe';
var age = 45;*/


/////////////////////////////
/* Variable mutation and type coercion 
   Lecture 9 */
/////////////////////////////

/*var firstName = "Chris";
var age = 18;
var job, isMarried;
job= "Teacher";
isMarried = false;

console.log(`${firstName} is ${age} years old and is practising as a ${job}`);

age = "eighteen";
job = "Driver";
console.log(`${firstName} is ${age} years old and is practising as a ${job}`);

var name = prompt("What's his last name?");
console.log(name);*/

/////////////////////////////
/* Basic operators
   Lecture 10 */
/////////////////////////////

const currentYear = 2018;
const yearJohn = 1966;
const yearMark = 1967;

const ageJohn = currentYear - yearJohn;
const ageMark = currentYear - yearMark;

console.log(ageJohn);
console.log(ageMark);

ageJohn > ageMark ? console.log("John older") : console.log("Mark older");