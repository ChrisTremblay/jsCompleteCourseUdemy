/*const box6 = {
	color: 'green',
	position: 1,
	clickMe: function() {
		document.querySelector('.green').addEventListener('click', () => {
			alert(`This is box number ${this.position} and it is ${this.color}`);
		});
	}
}

box6.clickMe();

function Person(name){
	this.name = name;
}

Person.prototype.myFriends6 = function(friends){
	const arr = friends.map(el => `${this.name} is friend with ${el}`);
	console.log(arr);
}

const friends = ["Bob", "Dylan", "Marc"];
new Person('John').myFriends6(friends);

function calcAgeRetirement(year){
	const age = new Date().getFullYear() - year;
	return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1992);
console.log(age);
console.log(retirement);*/

/*const boxes = document.querySelectorAll('.box');
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach( el => el.style.backgroundColor = 'dodgerblue');

for(const el of boxesArr6){
	if(el.className.includes('blue')){
		continue;
	}else{
		el.textContent = "I changed to blue";
	}
}

const ages = [12, 6, 25, 45, 67, 5, 23];

console.log(ages.findIndex(el => el>=18));
console.log(ages.find(el => el>= 18));*/

/*function addFourAges(a, b, c, d){
	return a+b+c+d;
}

var ages = [1, 2, 3, 4];
var sum2 = addFourAges.apply(null, ages);

const max = addFourAges(...ages);

const family1 = ['John', 'Jane', 'Marc'];
const family2 = ['Marie', 'Bob', 'Ann'];

const tot = [...family1, ...family2];*/

/*function isFullAge(limit, ...years){
	years.forEach( el => console.log((2018-el)>=limit));
}

isFullAge(1, 1990, 2005, 1965, 2010, 2014, 1934);*/

/*const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript release?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct!');
question.set(false, 'Wrong, try again.');

//question.forEach((val, key) => console.log(`${key} => '${val}'`));

console.log(question.get('question'));
for(let [key, val] of question.entries()){
	if(typeof(key) === 'number'){
		console.log(`${key}. ${val}`);
	}
}
const ans = parseInt(prompt('Answer'));
console.log(question.get(ans === question.get('correct')));*/

/*
class Person {
	constructor (name, yearOfBirth, job){
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	}
	calculateAge(){
		let age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	}
}

class Athlete extends Person{
	constructor(name, yearOfBirth, job, olympicGames, medals){
		super(name, yearOfBirth, job);
		this.olympicGames = olympicGames;
		this.medals = medals;
	}

	wonMedal(){
		this.medals++;
		console.log(this.medals);
	}
}

const john = new Athlete('John', 1990, 'swimmer', 3, 10);
john.wonMedal();
john.calculateAge();
*/

class TownElement{
	constructor(name, buildYear){
		this.name = name;
		this.buildYear = buildYear;
	}
}

class Park extends TownElement{
	constructor(name, buildYear, trees, parkArea){
		super(name, buildYear);
		this.trees = trees;
		this.parkArea = parkArea;
	}
	calculateTreeDensity(){
		return this.trees/this.parkArea;
	}
}

class Street extends TownElement{
	constructor(name, buildYear, length, classification = 'normal'){
		super(name, buildYear);
		this.length = length;
		this.classification = classification;
	}
}

function calculateAverageAge(parks){
	let average = 0;
	for(let [key, val] of parks.entries()){
		average+= (new Date().getFullYear() - val.buildYear);
	}
	return average/parks.size;
}

function calculateLengthAndAverage(streets){
	let total=0;
	for(let [key, val] of streets.entries()){
		total += val.length;
	}
	return [total, total/streets.size];
}



const parks = new Map();
const streets = new Map();

parks.set('1', new Park('Green Park', 1904, 10000, 100));
parks.set('2', new Park('National Park', 1932, 514, 45));
parks.set('3', new Park('Green Park', 1987, 500, 10));

streets.set('1', new Street('Ocean Avenue', 1999, 7, "big"));
streets.set('2', new Street('Evergreen Street', 2008, 2, "small"));
streets.set('3', new Street('4th Street', 2015, 15, "normal"));
streets.set('4', new Street('Sunset Boulevard', 1982, 20, "huge"));

let aboveThousand = 0, key=0;

console.log("----PARKS REPORT----");
console.log(`Our ${parks.size} parks have an average age of ${calculateAverageAge(parks)} years`)
for(let [key, val] of parks.entries()){
	console.log(`${val.name} has a tree density of ${val.calculateTreeDensity()} trees per square km`);
	if(val.trees > aboveThousand){
		aboveThousand = val.trees;
		parkInQuestion = key;
	}
}
console.log(`${parks.get(parkInQuestion).name} has more than 1000 trees.`);

console.log("----STREETS REPORT----");
console.log(`Our ${streets.size} have a total length of ${calculateLengthAndAverage(streets)[0]} km, with an average of ${calculateLengthAndAverage(streets)[1]} km.`);
for(let [key, val] of streets.entries()){
	console.log(`${val.name}, built in ${val.buildYear}, is a ${val.classification} street.`);
}