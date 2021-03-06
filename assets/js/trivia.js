// URL base
const API = "https://opentdb.com/api.php";
let questionsAPI;
let n = 0; //Question number
let answers = [];
let score = 0;
const form = document.getElementById("main-form");
const questionContainer = document.getElementById("question-container")

const createUrl = e => {
    e.preventDefault();
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;
    const UrlAPI = `${API}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    // console.log(UrlAPI);
    fetchDataAPI(UrlAPI);
}

const fetchDataAPI = url => {
    fetch(url)
    .then(response => response.json())
    .then(result => getQuestions(result.results))
    .catch(err=> console.log(err))
}

const getQuestions = (resultAPI) => {
    questionsAPI = resultAPI;
    
    showContainerQuestion();
    showQuestion();
}




const showQuestion = () => {
    getAnswers();
    
    
    if (questionsAPI[n].type==="boolean"){
        questionContainer.innerHTML =
        ` 
        <div class="question-item">
            <h2>Question #${n+1}</h2>
            <h2>${questionsAPI[n].question}</h2>
            <ul>
                <li><button onclick="handleCheckAnswer(this)" class="button-answer">${answers[0]}</button></li>
                <li><button onclick="handleCheckAnswer(this)" class="button-answer">${answers[1]}</button></li>
            </ul>
        </div>
        `
        ;  
    }
    else {
        questionContainer.innerHTML =
        ` 
        <div class="question-item">
            <h2>Question #${n+1}</h2>
            <h2>${questionsAPI[n].question}</h2>
            <ul>
                <li><button onclick="handleCheckAnswer(this)" class="button-answer">${answers[0]}</button></li>
                <li><button onclick="handleCheckAnswer(this)" class="button-answer">${answers[1]}</button></li>
                <li><button onclick="handleCheckAnswer(this)" class="button-answer">${answers[2]}</button></li>
                <li><button onclick="handleCheckAnswer(this)" class="button-answer">${answers[3]}</button></li>
            </ul>
        </div>
        `
    } 
    
}

const getAnswers = () => {
    answers = questionsAPI[n].incorrect_answers;
    answers = [...answers, questionsAPI[n].correct_answer];
    answers.sort( () => {return Math.random() - 0.5})
}

const showContainerQuestion = () => {
    questionContainer.style.transform = "scaleY(1)";
}


const handleCheckAnswer = button => {
    
    if (button.innerText === questionsAPI[n].correct_answer) {
        // button.classList.remove("button-answer")
        button.classList.add("bg-right")
        calculateScore();
        setTimeout(nextQuestion, 1000);
           
    }
    else {
        button.classList.add("bg-wrong")
        setTimeout(nextQuestion, 500);

    }
}

const calculateScore = () => {
    let rateScore = (100/questionsAPI.length);
    score = score + rateScore;
}

const nextQuestion = () => {
    questionContainer.innerHTML = "";
    answers = [];
    if (questionsAPI.length - 1 !== n) {
        n++;
        showQuestion();
    }
    else{
        questionContainer.innerHTML = "";
        showScore();
    }
    
}

const showScore = () => {
    
    if (score >= 70) {
        questionContainer.innerHTML = `
        <div class="question-item">
        <h1>Congratulations!</h1>
        <h1><span>YOU WON!</span></h1>
        <h2>Here's your score: ${score.toFixed(1)}%</h1>

        <button onclick="playAgain()" class="play-button">Play again!</button>
        </div>
        `      
    }
    else {
        questionContainer.innerHTML = `
        <div class="question-item">
        <h1>I'm sorry</h1>
        <h1><span>YOU LOST...</span></h1>
        <h2>Here's your score: ${score.toFixed(1)}%</h1>

        <button onclick="playAgain()" class="play-button">Try again</button>
        </div>
        `      
    }
}

const playAgain = () => {
    window.location.reload();
}
// Events
form.onsubmit = createUrl;

