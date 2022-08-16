const startButton = document.querySelector(".startBox .button");
const takeButton = document.querySelector(".takeButton button");
const infoBox = document.querySelector(".infoBox");
const exitButton = infoBox.querySelector(".buttons .quit");
const continueButton = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


startButton.onclick = function() {
    return infoBox.classList.add("activeInfo");
}

exitButton.onclick = function(){
    return infoBox.classList.remove("activeInfo");
}

continueButton.onclick = function(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0); 
    queCounter(1); 
    startTimer(15); 
}

let timeValue =  15;
let que_count = 0;
let que_number = 1;
let userScore = 0;
let counter;

const quit_quiz = resultBox.querySelector(".buttons .quit");

quit_quiz.onclick = function() {
    return window.location.reload();
}

const nextButton = document.querySelector("footer .nextButton");
const resultButton = document.querySelector("footer .resultButton");
const bottom_ques_counter = document.querySelector("footer .total_que");

nextButton.onclick = function() {
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_number++; 
        showQuestions(que_count); 
        queCounter(que_number);
        clearInterval(counter); 
        startTimer(timeValue);  
        timeText.textContent = "Time Left"; 
        nextButton.classList.remove("show"); 
    }
    
}
resultButton.onclick = function() {
    clearInterval(counter); 
    showResult(); 
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    optionList.innerHTML = option_tag;
    
    const option = optionList.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    if(que_count < questions.length - 1){ 
    clearInterval(counter); 
    let userAns = answer.textContent; 
    let correctAnswer = questions[que_count].answer; 
    const allOptions = optionList.children.length; 
    
    if(userAns == correctAnswer){ 
        userScore += 1; 
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){ 
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); 
    }
    nextButton.classList.add("show"); 
} 
else {
    clearInterval(counter);
    let userAns = answer.textContent; 
    let correctAnswer = questions[que_count].answer; 
    const allOptions = optionList.children.length; 
    if(userAns == correctAnswer){ 
        userScore += 1; 
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){ 
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); 
    }
        resultButton.classList.remove("hidden");
        resultButton.classList.add("show"); 
    }
}

function showResult(){
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.remove("activeQuiz"); 
    resultBox.classList.add("activeResult"); 
    const scoreText = resultBox.querySelector(".score_text");
    if (userScore > 6){ 
        
        let scoreTag = '<span> Congratulations!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 1){ 
        let scoreTag = '<span> Good, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { 
        let scoreTag = '<span> Sorry, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = optionList.children.length; 
            let correctAnswer = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correctAnswer){ 
                    optionList.children[i].setAttribute("class", "option correct"); 
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled"); 
            }
            nextButton.classList.add("show"); 
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}