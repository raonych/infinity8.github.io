const $startGameButton = document.querySelector(".start-quizz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click",displayNextQuestion)

let currentQuestionIndex = 0;
let totalCorrect = 0


function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
   resetState()
   if (questions.length === currentQuestionIndex) {
    return finishGame()
   }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct

        }
        $answersContainer.appendChild(newAnswer)
        newAnswer.addEventListener("click", selectAnswer)
    })
}
function resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target 
    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }
    document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true

        if (button.dataset.correct) {
            button.classList.add("correct")
          
        } else {
            button.classList.add("incorrect")
        }
        
    })
    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect *100/ totalQuestion)
    let message = ""
    switch (true) {
        case (performance >= 90):
            message = "Excelente :)"
            break
        case (performance >= 70):
            message = "Bom :)"
            break
        case (performance >= 50):
            message = "Regular"
            break
            default:
            message = "Pode Melhorar :("
    }
    $questionsContainer.innerHTML = 
    `
    <p class=final-message>
    Você acertou ${totalCorrect} de ${totalQuestion} de questões!
    </p>
    <span>Resultado: ${message}</span>
    <button class=button onclick=window.location.reload()>Reiniciar o teste</button>
    `
}

const questions = [
    {
        question: "Qual destes filmes NÃO FOI dirigido por Ridley Scott", 
        answers: [
            {text: "Blade Runner: 2049", correct: true},
            {text: "Alien, o 8° Passageiro", correct: false},
            {text: "Casa Gucci", correct: false},
            {text: "Gladiador", correct: false},
    
        ]
    },
    {
        question: 'O comercial "1984" foi baseado em um livro de mesmo nome. Qual é o autor deste livro?', 
        answers: [
            {text: "Fiódor Dostoiévski", correct: false},
            {text: "George Orwell", correct: true},
            {text: "Edgar Allan Poe", correct: false},
            {text: "Machado de Assis", correct: false},
    
        ]
    },
    {
        question: '"Gosto de estar no set de Ridley porque os atores podem atuar [...]". A pessoa que disse isso sobre Ridley se chama...', 
        answers: [
            {text: "Kevin Spacey", correct: false},
            {text: "Steve Jobs", correct: false},
            {text: "Pedro Pascal", correct: false},
            {text: "Russell Crowe", correct: true},

        ]
    },
    {
        question: "Qual foi o processador presente no Altair 8800?", 
        answers: [
            {text: "Intel 8800", correct: false},
            {text: "Intel 8048", correct: false},
            {text: "Intel 8088", correct: false},
            {text: "Intel 8080", correct: true},

        ]
    },
    {
        question: "De acordo com o artigo, qual é a família de processadores mais famosa da Intel?", 
        answers: [
            {text: "Intel Core", correct: false},
            {text: "Intel Pentium", correct: true},
            {text: "Intel Celeron", correct: false},
            {text: "Intel 8000", correct: false},

        ]
    },
    {
        question: "Quem foi o primeiro presidente do Brasil?", 
        answers: [
            {text: "Getúlio Vargas", correct: false},
            {text: "Campos Sales", correct: false},
            {text: "Floriano Peixoto", correct: false},
            {text: "Deodoro da Fonseca", correct: true},

        ]
    },
    
]