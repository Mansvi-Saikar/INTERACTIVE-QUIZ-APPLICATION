const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false},
            { text: "Hyper Text Marketing Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Hyper Text Markup Leveler", correct: false},           
        ]
    },
    {
        question: "Which HTML element is used to define the title of a document?",
        answers: [
            { text: "&lt;head&gt;", correct: false},
            { text: "&lt;title&gt;", correct: true},
            { text: "&lt;header&gt;", correct: false},
            { text: "&lt;top&gt;", correct: false},           
        ] 
    },
    {
        question: "What does the &lt;nav&gt; tag define?",
        answers: [
            {text: "Main content section", correct: false},
            {text: "Navigation links", correct: true},
            {text: "A table", correct: false},
            {text: "Inline text styling", correct: false},
        ]
    },
    {
        question: "Which tag is used to display images in HTML?",
        answers: [
            { text: "&lt;img&gt;", correct: true},
            { text: "&lt;image&gt;", correct: false},
            { text: "&lt;src&gt;", correct: false},
            { text: "&lt;pic&gt;", correct: false},           
        ]
    },
    {
        question: "What does the &lt;br&gt; tag do?",
        answers: [
            { text: "It breaks the text into two sections", correct: false},
            { text: "It creates a bold text", correct: false},
            { text: "It inserts a line break", correct: true},
            { text: "It adds a new row in a table", correct: false},           
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${ questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
