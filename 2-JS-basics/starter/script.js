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

/*const johnTeamPoints = [90, 120, 123];
const mikeTeamPoints = [116, 120, 120];
const maryTeamPoints = [50, 134, 200];

var avgJohn = 0, avgMike = 0, avgMary = 0;

for(var i = 0; i<johnTeamPoints.length; i++){
	avgJohn += johnTeamPoints[i];
	avgMike += mikeTeamPoints[i];
	avgMary += maryTeamPoints[i]; 
}

avgJohn = Math.round(avgJohn / johnTeamPoints.length);
avgMike = Math.round(avgMike / mikeTeamPoints.length);
avgMary = Math.round(avgMary / maryTeamPoints.length);

console.log(`${avgJohn}, ${avgMike}, ${avgMary}`)

if(avgJohn > avgMike && avgJohn>avgMary){
	console.log(`John's team wins with an average of ${avgJohn} points.`);
}else if(avgMike > avgJohn && avgMike>avgMary){
	console.log(`Mike's team wins with an average of ${avgMike} points.`);
}else if(avgMary > avgJohn && avgMary>avgMike){
	console.log(`Mary's team wins with an average of ${avgMary} points.`);
}*/

/////////////////////////////
/* Functions
   Lecture 20 */
/////////////////////////////

/*function calculateAge(birthYear){
	return 2018 - birthYear;
}

console.log(calculateAge(1992));

function yearsToRetirement(birthYear, firstName){
	(62 - calculateAge(birthYear) > 0) ? console.log(`${firstName} you will retire in ${62 - calculateAge(birthYear)} years`) : console.log(`${firstName} enjoy your retirement`);
}

yearsToRetirement(1992, "Chris");*/

/////////////////////////////
/* Arrays
   Lecture 22 */
/////////////////////////////

const bills = [124, 48, 268];
const tips = [0.2, 0.15, 0.1];

function calculateTip(bills){
	toPay = [];
	for(var i = 0; i<bills.length; i++){
		if(bills[i]<50){toPay.push(bills[i]+bills[i]*tips[0]);}
		else if(bills[i]>=50 && bills[i] <= 200){toPay.push(bills[i]+bills[i]*tips[1]);}
		else{toPay.push(bills[i]+bills[i]*tips[2]);}
	}
	return toPay;
}

var totalToPay = calculateTip(bills);
console.log(totalToPay);