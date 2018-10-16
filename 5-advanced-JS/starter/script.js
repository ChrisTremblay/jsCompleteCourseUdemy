/*var Person = function(name, yearOfBirth, job){
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
}

Person.prototype.calculateAge = function() {
	console.log(2016-this.yearOfBirth);
};

var john = new Person("John", 1990, "Teacher");
var jane = new Person("Jane", 1965, "Designer");
var mark = new Person("Mark", 1943, "Retired");

john.calculateAge();
jane.calculateAge();
mark.calculateAge();*/

/*
var personProto = {
	calculateAge: function() {
		console.log(2016-this.yearOfBirth);
	}
};
var john = Object.create(personProto);
john.name = "John";
john.yearOfBirth = "1990";
john.job = "Teacher";

var jane = Object.create(personProto, {
	name: {value:"Jane"},
	yearOfBirth: {value: 1965},
	job: {value: "Designer"}
});*/

/*var years = [1992, 2006, 1947, 1987, 1923];

function arrayCalc(arr, fn){
	var arrRes = [];
	for(var i = 0; i<arr.length; i++){
		arrRes.push(fn(arr[i]));
	}
	return arrRes;
}

function calculateAge(el){
	return 2018-el;
}

function isFullAge(el){
	return el >= 18;
}

function maxHeartRate(el){
	if(el >= 18 && el <= 80){
		return Math.round(206.9 - (0.67 * el));
	}else{
		return -1;
	}
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var maxHeartRates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(fullAges);
console.log(maxHeartRates);*/

function interviewQuestion(job){
	if(job === "designer"){
		return function(name){
			console.log(`${name}, can you please explain what UX design is?`);
		};
	}else if(job === "teacher"){
		return function(name){
			console.log(`${name}, what subject do you teach?`);
		};
	}else{
		return function(name){
			console.log(`${name}, what do you do?`)
		}
	}
}

interviewQuestion("teacher")("Mark");