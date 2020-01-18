// BUDGET CONTROLLER
let budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percents = -1;
    };

    Expense.prototype.calcPercents = function (totalIncome) {
        if(totalIncome > 0) {
            this.percents = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percents = -1;
        }
    };

    Expense.prototype.getPercents = function () {
        return this.percents;
    };

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let calculateTotals = function (type) {
        let sum = 0;
        data.allItems[type].forEach(function (current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;
            // create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // add to array
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function (type, id) {
            let ids, index;
            ids = data.allItems[type].map(function (current) {
               return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            // calculate income and expenses
            calculateTotals('exp');
            calculateTotals('inc');

            // calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate percentage we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculateAllPercents: function () {
            data.allItems.exp.forEach(function (current) {
                current.calcPercents(data.totals.inc);
            });
        },

        getAllPercents: function () {
            let allPercents = data.allItems.exp.map(function (current) {
               return current.getPercents();
            });
            return allPercents;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                percentage: data.percentage,
                expenses: data.totals.exp,
                incomes: data.totals.inc
            }
        },

        testing: function () {
            console.log(data);
        }
    };
})();



// UI CONTROLLER
let UIController = (function () {

    let DOMQueries = {
        type: '.add__type',
        description: '.add__description',
        price: '.add__value',
        addButton: '.add__btn',
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        budgetValue: '.budget__value',
        budgetIncomeValue: '.budget__income--value',
        budgetExpensesValue: '.budget__expenses--value',
        budgetExpensesPercentage: '.budget__expenses--percentage',
        container: '.container',
        expensesPercents: '.item__percentage',
        dateMonth: '.budget__title--month'
    };

    let formatNumber = function(num, type) {
        let numSplit, integerPart, decimalPart, sign;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        integerPart = numSplit[0];
        decimalPart = numSplit[1];

        if(integerPart.length > 3) {
            integerPart = integerPart.substr(0, integerPart.length - 3) + ',' + integerPart.substr(integerPart.length - 3, integerPart.length);
        }

        type === 'exp' ? sign = '-' : sign = "+";

        return sign + ' ' + integerPart + '.' + decimalPart + ' ₴';
    };

    let nodelistForEach = function(list, callback) {
        for(let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getData: function () {
            return {
                type: document.querySelector(DOMQueries.type).value,
                description: document.querySelector(DOMQueries.description).value,
                price: parseFloat(document.querySelector(DOMQueries.price).value) // convert price to float
            }
        },
        addListItem: function(obj, type) {
            let htmlString, newHtmlString, inputField;
            // create html string with placeholder
            if(type === 'inc') {
                htmlString = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                htmlString = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }

            // change placeholder to real data
            newHtmlString = htmlString.replace('%id%', obj.id);
            newHtmlString = newHtmlString.replace('%description%', obj.description);
            newHtmlString = newHtmlString.replace('%value%', formatNumber(obj.value, type));

            // push string to UI
            if(type === 'inc') {
                inputField = document.querySelector(DOMQueries.incomeList)
            } else if(type === 'exp') {
                inputField = document.querySelector(DOMQueries.expensesList)
            }
            inputField.insertAdjacentHTML('beforeend', newHtmlString);

        },

        deleteListItem: function (item) {
            let selected = document.getElementById(item);
            selected.parentNode.removeChild(selected);
        },

        clearFields: function() {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMQueries.description + ', ' + DOMQueries.price);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMQueries.budgetValue).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMQueries.budgetIncomeValue).textContent = formatNumber(obj.incomes, 'inc');
            document.querySelector(DOMQueries.budgetExpensesValue).textContent = formatNumber(obj.expenses, 'exp');

            if(obj.percentage > 0) {
                document.querySelector(DOMQueries.budgetExpensesPercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMQueries.budgetExpensesPercentage).textContent = '---';
            }
        },

        displayPercents: function (percents) {

            let fields = document.querySelectorAll(DOMQueries.expensesPercents);

            nodelistForEach(fields, function (current, index) {
                if(percents[index] > 0) {
                    current.textContent = percents[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayDate: function () {
            let year, date, month;
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            date = new Date();

            year = date.getFullYear();
            month = date.getMonth();

            document.querySelector(DOMQueries.dateMonth).textContent = months[month] + ' ' + year;

        },

        changeBorder: function () {
            var fields = document.querySelectorAll(DOMQueries.type + ',' + DOMQueries.description + ',' + DOMQueries.price);

            nodelistForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMQueries.addButton).classList.toggle('red');
        },

        getDOMQueries: function () {
            return DOMQueries;
        }
    }
})();



// GLOBAL CONTROLLER
let Controller = (function (budgetCtrl, UICtrl) {

    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMQueries();

        document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.type).addEventListener('change', UICtrl.changeBorder);
    };

    let updateBudget = function() {
        // calculate budget
        budgetCtrl.calculateBudget();

        // return budget
        let budget = budgetCtrl.getBudget();

        // display budget in the UI
        UICtrl.displayBudget(budget);
    };

    let updatePercents = function () {
        // calcuate percents
        budgetCtrl.calculateAllPercents();

        // read from controller
        let percents = budgetCtrl.getAllPercents();

        // update UI
        UICtrl.displayPercents(percents);
    };

    let ctrlAddItem = function() {
        // read values
        let input = UICtrl.getData();
        console.log(input);

        if(input.description !== "" && !isNaN(input.price) && input.price > 0) {

            // add variable to budget controller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.price);

            // add variable to UI controller
            UICtrl.addListItem(newItem, input.type);

            // Clear fields
            UICtrl.clearFields();

            // Calculate and update budget
            updateBudget();

            // Update percents
            updatePercents();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID, splitID, type, id;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            // delete from data
            budgetCtrl.deleteItem(type, id);

            // delete from UI
            UICtrl.deleteListItem(itemID);

            // update budget
            updateBudget();

            // Update percents
            updatePercents();
        }
    };

    return {
        initialize: function () {
            UICtrl.displayBudget({
                budget: 0,
                percentage: -1,
                expenses: 0,
                incomes: 0
            });
            setupEventListeners();
            UICtrl.displayDate();
        }
    }

})(budgetController, UIController);

Controller.initialize();