(function () {
    function Questions(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Questions.prototype.logQuestion = function () {
        console.log(this.question);

        for(let i = 0; i < this.answers.length; i++) {
            console.log(i + " " + this.answers[i]);
        }
    };

    Questions.prototype.checkAnswer = function(ans) {
        if(ans === this.correct) {
            console.log('You are right!');
        } else {
            console.log('You are mistaken');
        }
    };


    let question1 = new Questions('What is your name?', ['Alex', 'Maxim', 'Michael'], 0);
    let question2 = new Questions('What is your birth month?', ['February', 'May', 'January'], 2);
    let question3 = new Questions('What is your born country?', ['Ukraine', 'USA', 'GB'], 0);

    let questions = [question1, question2, question3];



    function Repeat() {
        let random_quest = Math.floor(Math.random() * questions.length);

        questions[random_quest].logQuestion();

        let user_answer = parseInt(prompt('What is your answer?'));

        questions[random_quest].checkAnswer(user_answer);

        Repeat();
    }
    Repeat();

})();