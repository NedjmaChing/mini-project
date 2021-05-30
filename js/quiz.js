const quizQuestions = questions; // Available from questions.js which was inserted before this current file, which makes it accessible here
let score = 0;
let currentQuestionIndex = 0;

const endButton = document.querySelector('#end-quiz');
const okayButton = document.querySelector('#select');

/**
 * @description Function to display question
 * @param {question} question 
 */
function displayQuestion (question) {
    const questionElement = document.querySelector('#question'); // Get question element from DOM
    questionElement.innerHTML = question.text; // Set the text content to the question
    const optionsContainer = document.querySelector('.options'); // Get container div for options

    question.options.forEach(option => {
        const p = document.createElement('p'); //Create Paragraph element to display option

        const radio = document.createElement('input'); // Create radio input to select option

        radio.setAttribute('type', 'radio'); // Set the input type to radio

        radio.setAttribute('name', 'option'); // Set the name attribute of radio button

        radio.setAttribute('value', option.option); // set the value attribute of radio input to the option label.e.g. A, B, C or D

        const optionText = document.createTextNode(`(${option.option}) ${option.text}`); // Create text content for the option

        p.appendChild(radio); // Add radio option as paragraph child

        p.appendChild(optionText) // Add option text as child after radio button

        optionsContainer.appendChild(p); // Add option to option container
    });
}

/**
 * @description Function to start the quiz
 */
function startQuiz (questionIndex) {
    displayQuestion(quizQuestions[questionIndex]);
}

/**
 * @description Function to end the quiz
 */
function endQuiz () {
    alert('Quiz has ended. Your score is ' + score);
    window.location.href="/" // Redirect user to home page
}

/**
 * @description Function to clear the question so that the next one can be displayed
 */
function clearQuestion () {
    document.querySelector('#question').innerHTML = '';
    document.querySelector('.options').innerHTML = '';
}

/**
 * @description Function to handle when an option is selected
 */
function handleOptionSelect (currentQuestion) {
    const options = document.getElementsByName('option'); // Get the options in a node list
    // Loop through options and find selected option
    options.forEach(option => {
        // Check whether the current option is the selected one
        if (option.checked === true) {
            // Check whether selected answer matches the correct anwer
            if (option.defaultValue === currentQuestion.answer) {
                alert('Correct Answer');
                if (currentQuestionIndex !== quizQuestions.length - 1) {
                    score++;
                    currentQuestionIndex += 1;
                    clearQuestion();
                    displayQuestion(quizQuestions[currentQuestionIndex]);
                } else {
                    endQuiz();
                }
            } else {
                if (currentQuestionIndex !== quizQuestions.length - 1) { 
                    alert ('Wrong Answer');
                    currentQuestionIndex += 1;
                    clearQuestion();
                    displayQuestion(quizQuestions[currentQuestionIndex]);
                } else {
                    endQuiz();
                }
            }
        }
    });
}

okayButton.addEventListener('click', () => {
    handleOptionSelect(quizQuestions[currentQuestionIndex]);
});

startQuiz(currentQuestionIndex);

