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
