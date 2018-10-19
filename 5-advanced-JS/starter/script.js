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

/*function interviewQuestion(job){
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

interviewQuestion("teacher")("Mark");*/

/*(function(){
	var score = Math.random()*10;
	console.log(score >= 5);
})();*/

/*function retirement(retirementAge){
	var a = "years left until retirment";
	return function(yearOfBirth){
		var age = 2018 - yearOfBirth;
		console.log(`${retirementAge - age} ${a}`);
	}	
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1992);
retirementIceland(1992);
retirementGermany(1992);*/

/*function interviewQuestion(job){
	return function(name){
		if(job === "designer"){
			console.log(`${name}, can you please explain what UX design is?`);
		} else if(job === "teacher"){
			console.log(`${name}, what subject do you teach?`);
		} else{
			console.log(`${name}, what do you do?`);
		}
	}
}

interviewQuestion("teacher")("John");*/

/*var john = {
	name: "John",
	age: 26,
	job: "teacher",
	presentation: function(style, timeOfDay){
		if(style === "formal"){
			console.log(`Good ${timeOfDay}, Ladies and gentlemen! I am ${this.name} and I am a ${this.age} ${this.job}`);
		} else if(style === "friendly"){
			console.log(`Hey! What is up?! I am ${this.name} and I am a ${this.age} ${this.job}. Have a nice ${timeOfDay}`);
		}
	}
};

var emily = {
	name: "Emily",
	age: 35,
	job: "designer"
};

var johnFriendly = john.presentation.bind(john,"friendly");

johnFriendly("afternoon");

var emilyFormal = john.presentation.bind(emily, "formal");
emilyFormal("night");*/


(function (){
	function Question(question, answers, correct){
		this.question = question;
		this.answers = answers;
		this.correct = correct;
	};

	Question.prototype.displayQuestion = function() {
		console.log(this.question);
		for(var i = 0; i<this.answers.length; i++){
			console.log(`${i}: ${this.answers[i]}`);
		}
	}

	Question.prototype.checkAnswer = function(ans, callback) {
		var sc;

		if(ans === this.correct){
			console.log("Correct!");
			sc = callback(true);
		}else{
			console.log("Wrong..");
			sc = callback(false);
		}
		this.displayScore(sc);
	}

	Question.prototype.displayScore = function(score){
		console.log(`Your current score is ${score}`);
		console.log("==============================");
	}

	var q1 = new Question("Is JS the best language in the world?", ["Yes", "No"], 0);
	var q2 = new Question("What is my name?", ["Thomas", "Jacques", "Chris"], 2);
	var q3 = new Question("What is the cutest pet?", ["Cat", "Dog", "Snake", "Parrot"], 1);
	var questions = [q1, q2, q3];

	function score(){
		var sc = 0;
		return function(correct){
			if(correct){
				sc++;
			}
			return sc;
		}
	}
	
	var keepScore = score();

	function nextQuestion(){
		var n = Math.floor(Math.random()*questions.length);
		questions[n].displayQuestion();
		var answer = prompt("Please select the correct answer.");
			
		if(answer != "exit"){
			questions[n].checkAnswer(parseInt(answer), keepScore);
			nextQuestion();
		}
	}
	nextQuestion();
})();
