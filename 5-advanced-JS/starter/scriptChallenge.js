var questionNr, isPlaying, score;

questionNr = 1;
isPlaying = true;
score = 0;

// f-ion constructor
var Question = function(qText, answer, correctAnswer) {
    var userInput;
    this.qText = qText;
    this.answer = answer;
    this.correctAnswer = correctAnswer;
    this.randLog = function() {
        console.log('##########################');
        console.log('Question nr.' + questionNr); 
        console.log(this.qText);
        console.log('');
        console.log('Choose one answer:');
        for (i=0; i < (this.answer).length; i++){
            console.log((i+1) + '.' + this.answer[i] + ' ');
            
        }
        //console.log('');
        questionNr++;
        
        userInput = prompt('Please choose the corect answer (type in the number)');
        if(userInput === 'exit'){
            isPlaying = false;
        }
    }
    
    /*
    // IIFE
        // ans --> this.answer,
        // cAns --> this.correctAnswer,
        // uInp --> userInput
        (function(ans, cAns, uInp,) {
        //index of #ore#t ans. 
        var indexOfAns = ans.indexOf(cAns);
        
        if (uInp != '' && uInp > 0 && uInp <= ans.length) {
            if((uInp - 1) === indexOfAns) {
                console.log('CONGRATULATIONS! The answer is correct.');
            } else {
                console.log('That is not right. Try again.');
            }
    
} else {
    console.log('ERROR!');
}
    })(this.answer, this.correctAnswer, userInput);
    
    */
    
    
    
    
    // SIMPLE F-ION
    // checking corectness
    this.checkAnswer = function() {
        console.log('__________________________');
        
        //index of #ore#t ans. 
        var indexOfAns = this.answer.indexOf(this.correctAnswer);
        
        if (userInput != '' && userInput > 0 && userInput <= this.answer.length) {
            if((userInput - 1) === indexOfAns) {
                console.log('CONGRATULATIONS! The answer is correct.');
                score++;
                
            } else {
                console.log('That is not right. Try again.');
                
            }
    
} else if (userInput === 'exit') {
    console.log('Bye bye!');
} else {
    console.log('ERROR!');
}
    }
    
    
    this.displayScore = function() {
        console.log('Your score: ' + score + '/' + (questionNr-1));
        console.log('__________________________');
    }
    
    
    
    
    
    
    
}

var question1 = new Question('What is the capital city of Costa Rica?', ['Lima', 'Santiago', 'Montevideo', 'San José'], 'San José');

var question2 = new Question('What is the capital city of Uruguay?', ['Lima', 'Santiago', 'Montevideo', 'San José'], 'Montevideo');

var question3 = new Question('What is the capital city of Chile?', ['Lima', 'Santiago', 'Montevideo', 'San José'], 'Santiago');

var question4 = new Question('What is the capital city of Peru?', ['Lima', 'Santiago', 'Montevideo', 'San José'], 'Lima');

// adding questions to an array
var allQuestions = [question1, question2, question3, question4];



while(isPlaying){
    
// random nr. for given number of questionsmin 'allQuestions'
var randNr = Math.floor(Math.random() * allQuestions.length);

// Calling simple f-ion
var randomQuestObj = allQuestions[randNr];
randomQuestObj.randLog();
randomQuestObj.checkAnswer();
randomQuestObj.displayScore();
}



// Calling IIFE







/*

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 'challenge': Rewrite Interview question f-ion using closures.

function interviewQuestion(job){

    return function(name) {
        if (job === 'designer') {
            console.log(name + ' can you please explane what UX design is?');
            
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        
        } else {
        
            console.log('Hello ' + name + '. What do you do?');
        
        }
            
        
    }
}

var questionBuilder = interviewQuestion('builder');
questionBuilder('Pete');

var questionTeacher = interviewQuestion('teacher');
questionTeacher('Andrew');

interviewQuestion('designer') ('Petras');

/////////////////////////////
/// The diferen#e between those two was of doing 'things' (i.e. using closure and using just f-ion that returns another f-ion without closure) is that NOW THE DECISION IS TAKEN RIGHT INSIDE OF THE F-ION THAT WE RETURN.  
//That is possible because we can use 'job' variable to take this decision here, EVEN AFTER interviewQuestion() f-ion has already returned.

// It is better to use CLOSURES it gives a better/cleaner(???) code.
// We got one f-ion and 'if's' are inside of it.

//

*/
