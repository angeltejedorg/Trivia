// URL base
const API = "https://opentdb.com/api.php";
let questionsAPI;
let nQuestions = 0;
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

    console.log(questionsAPI[nQuestions].question)
    
    questionContainer.innerHTML =
    ` 
    <div class="question-item">
        <h2>${questionsAPI[nQuestions].question}</h2>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    `
    ;   
}

const showContainerQuestion = () => {
    questionContainer.style.transform = "scaleY(1)";
}

// Events
form.onsubmit = createUrl;