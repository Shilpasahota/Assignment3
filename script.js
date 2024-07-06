const quizForm = document.getElementById('quizForm');
const questionContainer = document.getElementById('questionContainer');
const resultContainer = document.getElementById('resultContainer');

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    // Add more questions as needed
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionContainer.innerHTML = `<h2>${currentQuizData.question}</h2>`;
    currentQuizData.options.forEach(option => {
        const optionElement = document.createElement('input');
        optionElement.type = 'radio';
        optionElement.name = 'quizOption';
        optionElement.value = option;
        optionElement.id = option;
        const label = document.createElement('label');
        label.textContent = option;
        questionContainer.appendChild(optionElement);
        questionContainer.appendChild(label);
        questionContainer.appendChild(document.createElement('br'));
    });
}

function checkAnswer() {
    const userAnswer = document.querySelector('input[name="quizOption"]:checked').value;
    const currentQuizData = quizData[currentQuestion];
    if (userAnswer === currentQuizData.answer) {
        score++;
        questionContainer.classList.add('correct-answer');
    } else {
        questionContainer.classList.add('incorrect-answer');
    }
    // Display next question or final score
    currentQuestion++;
    setTimeout(() => {
        questionContainer.classList.remove('correct-answer');
        questionContainer.classList.remove('incorrect-answer');
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizForm.style.display = 'none';
    resultContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} out of ${quizData.length}</p>`;
    resultContainer.style.display = 'block';
}

// "Fake" authentication to start quiz
const authenticated = confirm('Are you ready to start the quiz?');
if (authenticated) {
    displayQuestion();
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        checkAnswer();
    });
} else {
    alert('Quiz canceled.');
}

