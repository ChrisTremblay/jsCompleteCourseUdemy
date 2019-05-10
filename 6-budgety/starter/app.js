//BUDGET CONTROLLER
var budgetController = (function() {
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function(totalIncome){
		if(totalIncome>0){
			this.percentage = Math.round((this.value / totalIncome)*100);
		}else{
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function(){
		return this.percentage;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			expense: [],
			income: []
		},
		totals: {
			expense: 0,
			income: 0
		},
		budget: 0,
		percentage: -1
	};

	var calculateTotal = function(type){
		var sum = 0;
		data.allItems[type].forEach(function(e){
			sum += e.value;
		});
		data.totals[type]=sum;
	};

	return {
		addItem: function(type, desc, val){
			var newItem, ID;
			
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length-1].id + 1;
			}else{
				ID = 0;
			}

			if(type === "expense"){
				newItem = new Expense(ID, desc, val);
			} else if(type === "income"){
				newItem = new Income(ID, desc, val);
			}else{
				console.log("Invalid type");
			}

			data.allItems[type].push(newItem);
			return newItem;
		},

		deleteItem: function(type, id){
			var index, ids;
			ids = data.allItems[type].map(function(current){
				return current.id;
			});
			index = ids.indexOf(id);

			if(index !== -1){
				data.allItems[type].splice(index, 1);
			}
		},

		calculateBudget: function(){
			calculateTotal("expense");
			calculateTotal("income");
			data.budget = data.totals.income - data.totals.expense;
			if(data.totals.income>0){
				data.percentage = Math.round((data.totals.expense/data.totals.income)*100);
			}else{
				data.percentage = -1;
			}
		},

		calculatePercentages: function(){
			data.allItems.expense.forEach(function(current){
				current.calcPercentage(data.totals.income);
			});
		},

		getPercentages: function(){
			var allPerc = data.allItems.expense.map(function(current){
				return current.getPercentage();
			});
			return allPerc;
		},

		getBudget: function(){
			return {
				budget: data.budget,
				totalIncome: data.totals.income,
				totalExpense: data.totals.expense,
				percentage: data.percentage
			}
		},

		testing: function(){
			console.log(data);
		}
	};
})();

//UI CONTROLLER
var UIController = (function(){
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensePercentageLabel: '.item__percentage'
	};

	return {
		getInput: function(){
			return {
				type: document.querySelector(DOMstrings.inputType).value, //income or expense
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		},

		addListItem: function(obj, type){
			var html, newHtml, element;

			if(type ==="income"){
				element = DOMstrings.incomeContainer;
        		html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        	}else if(type ="expense"){
        		element = DOMstrings.expenseContainer;
        		html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        	}

        	newHtml = html.replace('%id%', obj.id);
        	newHtml = newHtml.replace('%description%', obj.description);
        	newHtml = newHtml.replace('%value%', obj.value);

        	document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
     	},

     	deleteListItem: function(id){
     		document.getElementById(id).parentNode.removeChild(document.getElementById(id));
     	},

     	clearFields: function(){
     		var fields, fieldsArr;

     		fields = document.querySelectorAll(DOMstrings.inputDescription + ', '+ DOMstrings.inputValue);
     		fieldsArr = Array.prototype.slice.call(fields);

     		fieldsArr.forEach(function(current, index, array){
     			current.value = "";
     		});

     		fieldsArr[0].focus();
     	},

     	displayBudget: function(obj){
     		document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
     		document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
     		document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExpense;
     		if(obj.percentage > 0){
     			document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage +'%';
     		}else{
     			document.querySelector(DOMstrings.percentageLabel).textContent = "--";
     		}
     	},

     	displayPercentages: function(percentages){
     		var fields = document.querySelectorAll(DOMstrings.expensePercentageLabel);
     		
     		var nodeListForEach = function(list, callback){
     			for(var i=0; i<list.length; i++){
     				callback(list[i], i);
     			}
     		};

     		nodeListForEach(fields, function(current, index){
     			if(percentages[index] > 0){
     				current.textContent = percentages[index] + '%';
     			}else{
     				current.textContent = "---"
     			}
     		});
     	},

		getDOMstrings: function(){
			return DOMstrings;
		}
	};
})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
	var setupEventListeners = function(){
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(e){
			if(e.keyCode === 13 || e.which === 13){
				ctrlAddItem();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};

	var updateBudget = function(){
		budgetCtrl.calculateBudget();
		var budget = budgetCtrl.getBudget();
		UICtrl.displayBudget(budget); 
	};

	var updatePercentages = function(){
		budgetCtrl.calculatePercentages();
		var percentages = budgetCtrl.getPercentages();
		UICtrl.displayPercentages(percentages);
	}

	var ctrlAddItem = function(){
		var input, newItem;
		input = UICtrl.getInput();

		if(input.description != "" && !isNaN(input.value) && input.value > 0){
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			UICtrl.addListItem(newItem, input.type);
			UICtrl.clearFields();
			updateBudget();
			updatePercentages();
		}
	};

	var ctrlDeleteItem = function(e){
		var itemID, splitID, type, ID;
		itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
		if(itemID){
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			budgetCtrl.deleteItem(type, ID);
			UICtrl.deleteListItem(itemID);
			updateBudget();
			updatePercentages();
		}
	};

	return {
		init: function(){
			console.log("App started");
			UICtrl.displayBudget({
				budget: 0,
				totalIncome: 0,
				totalExpense: 0,
				percentage: 0
			}); 
			setupEventListeners();
		}
	};
})(budgetController, UIController);
controller.init();