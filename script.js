const questions = [
    {
        question: "Qual è la capitale della Francia?",
        answers: [
            {text: "Parigi", correct: true},
            {text: "Roma", correct: false},
            {text: "Londra", correct: false},
            {text: "Mosca", correct: false},
        ]
    },
    {
        question: "Quale Animale è da considerare Erbivoro?",
        answers: [
            {text: "Lupo", correct: false},
            {text: "Tigre", correct: false},
            {text: "Elefante", correct: true},
            {text: "Leone", correct: false},
        ]
    },
    {
        question: "Qual è la nazione è la più grande?",
        answers: [
            {text: "Stati Uniti D'America", correct: true},
            {text: "Spagna", correct: false},
            {text: "Giappone", correct: false},
            {text: "Argentina", correct: false},
        ]
    },
    {
        question: "In che anno fù scoperta L'america?",
        answers: [
            {text: "1490", correct: false},
            {text: "1592", correct: false},
            {text: "1500", correct: false},
            {text: "1492", correct: true},
        ]
    },
];

const questionElement =  document.getElementById('question');
const answersElement =  document.getElementById('answers-button');
const nextAnswer =  document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    currentQuestionIndex = 0;
    score = 0;
    nextAnswer.innerHTML = "Successivo"
    showQuestion();
};

function showQuestion() {
    resetQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answersElement.appendChild(button);
        if(answer.correct === true) {
            button.dataset.correct = answer.correct;
            console.log(button.dataset.correct);
        }
        button.addEventListener('click',selectAnswer);
    })
}

function resetQuestion() {
    nextAnswer.style.display = "none";
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correctAnswer = selectedButton.dataset.correct === "true"
    if (correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answersElement.children).forEach(answer =>{
        if(answer.dataset.correct === "true"){
            answer.classList.add('correct');
        }

        answer.disabled = true;
    })

    nextAnswer.style.display = "block"
}

function handleNextAnswer() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore() {
    resetQuestion();
    questionElement.innerText = ` Il tuo punteggio: ${score}/${questions.length}`;
    nextAnswer.innerHTML = "Gioca di nuovo"
    nextAnswer.style.display = "block"
}
nextAnswer.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextAnswer();
    } else {
        loadQuestion();
    }
})
   
loadQuestion();