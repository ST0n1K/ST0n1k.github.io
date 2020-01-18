/*
let johnMass = prompt("What is John mass?");
let markMass = prompt("What is Mark mass?");
let johnHeight = prompt("What is John height?");
let markHeight = prompt("What is Mark height?");

let BMIJohn = johnMass / (johnHeight * johnHeight);
let BMIMark = markMass / (markHeight * markHeight);

let whoIsBigger = BMIMark >= BMIJohn;
console.log("Is Mark's BMI higher than John's? " + whoIsBigger);



let johnGame1 = 89;
let johnGame2 = 120;
let johnGame3 = 103;
let mikeGame1 = 116;
let mikeGame2 = 94;
let mikeGame3 = 123;
let maryGame1 = 97;
let maryGame2 = 134;
let maryGame3 = 105;

let averageTeam1 = (johnGame1 + johnGame2 + johnGame3) / 3;
let averageTeam2 = (mikeGame1 + mikeGame2 + mikeGame3) / 3;
let averageTeam3 = (maryGame1 + maryGame2 + maryGame3) / 3;

if(averageTeam1 > averageTeam2 && averageTeam1 > averageTeam3) {
    console.log('Team1 is winner');
} else if(averageTeam2 > averageTeam1 && averageTeam2 > averageTeam3) {
    console.log('Team2 is winner');
} else if(averageTeam3 > averageTeam1 && averageTeam3 > averageTeam2) {
    console.log('Team3 is winner');
} else {
    console.log('Draw');
}



let bills = [124, 48, 268];
let tips = [];

var CalculateTip = function (bill) {
    let tip;
    if(bill < 50) {
        tip = bill * 0.2;
        tips.push(tip + bill)
    } else if(bill > 50 && bill < 200) {
        tip = bill * 0.15;
        tips.push(tip + bill)
    } else if(bill > 200) {
        tip = bill * 0.1;
        tips.push(tip + bill)
    }
}

for(let i = 0; i < bills.length; i++) {
    CalculateTip(bills[i]);
}

console.log(tips);



let mark = {
    name: 'Mark',
    lastName: 'Smith',
    mass: 80,
    height: 1.82,
    CalculateBMI: function () {
        this.BMI = this.mass / (this.height * this.height);
    }
};

let john = {
    name: 'John',
    lastName: 'Smith',
    mass: 78,
    height: 1.87,
    CalculateBMI: function () {
        this.BMI = this.mass / (this.height * this.height);
    }
};
john.CalculateBMI();
mark.CalculateBMI();

if(mark.BMI > john.BMI) {
    console.log(mark.name + ' ' + mark.lastName + ' has BMI ' + mark.BMI + ' higher than ' + john.name + ' ' + john.lastName + john.BMI)
} else if(mark.BMI < john.BMI) {
    console.log(john.name + ' ' + john.lastName + ' has BMI ' + john.BMI + ' higher than ' + mark.name + ' ' + mark.lastName + mark.BMI)
} else if(mark.BMI === john.BMI) {
    console.log(john.name + ' ' + john.lastName + ' has BMI ' + john.BMI + ' similar to ' + mark.name + ' ' + mark.lastName + mark.BMI)
}

*/

let family1 = {
    bills: [124, 48, 268, 180, 42],
    calculateTip: function () {
        let tip;
        this.tips = [];
        this.allSum = [];
        for(let i = 0; i < this.bills.length; i++) {
            if(this.bills[i] < 50) {
                tip = this.bills[i] * 0.2;
                console.log(tip);
                this.tips.push(tip);
                this.allSum.push(tip + this.bills[i]);
            } else if(this.bills[i] > 50 && this.bills[i] < 200) {
                tip = this.bills[i] * 0.15;
                console.log(tip);
                this.tips.push(tip);
                this.allSum.push(tip + this.bills[i]);
            } else if(this.bills[i] > 200) {
                tip = this.bills[i] * 0.1;
                console.log(tip);
                this.tips.push(tip);
                this.allSum.push(tip + this.bills[i]);
            }
        }
    }
};

let family2 = {
    bills: [77, 375, 110, 45],
    calculateTip: function () {
        let tip;
        this.tips = [];
        this.allSum = [];
        for(let i = 0; i < this.bills.length; i++) {
            if(this.bills[i] < 100) {
                tip = this.bills[i] * 0.2;
                console.log(tip);
                this.tips.push(tip);
                this.allSum.push(tip + this.bills[i]);
            } else if(this.bills[i] > 100 && this.bills[i] < 300) {
                tip = this.bills[i] * 0.1;
                console.log(tip);
                this.tips.push(tip);
                this.allSum.push(tip + this.bills[i]);
            } else if(this.bills[i] >300) {
                tip = this.bills[i] * 0.25;
                console.log(tip);
                this.tips.push(tip);
                this.allSum.push(tip + this.bills[i]);
            }
        }
    }
};

var CalculateAverageTips = function(bills) {
    let sum = 0;
    for(let i = 0; i < bills.length; i++) {
        sum += bills[i];
    }
    let average = sum / bills.length;
    return average;
}



family1.calculateTip();
console.log(family1.tips);

family2.calculateTip();
console.log(family2.tips);

console.log(CalculateAverageTips(family1.tips));
console.log(CalculateAverageTips(family2.tips));

if(CalculateAverageTips(family1.tips) > CalculateAverageTips(family2.tips)) {
    console.log("Family1 tips are higher");
} else if(CalculateAverageTips(family1.tips) < CalculateAverageTips(family2.tips)) {
    console.log("Family2 tips are higher");
} else {
    console.log("Tips are similar");
}