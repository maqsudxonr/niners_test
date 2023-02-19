var images = document.querySelectorAll('img')

document.querySelector('.right').onclick = right;
document.querySelector('.left').onclick = left;

var li = document.querySelectorAll('li')

var counter = 0;

function right(){
    images[counter].classList.remove('active')
    li[counter].classList.remove('active-li')
    counter++;
    
    if(images.length == counter){
        counter = 0;
    }
    
    images[counter].classList.add('active')
    li[counter].classList.add('active-li')
    autoplay()
}

function left(){
    images[counter].classList.remove('active')
    li[counter].classList.remove('active-li')
    counter--;
    
    if(counter < 0){
        counter = images.length - 1
    }
    
    images[counter].classList.add('active')
    li[counter].classList.add('active-li')
    autoplay()
}


for(var i = 0; i < li.length; i++){
    li[i].onclick = function(){
        
        for(var j = 0; j<li.length; j++){
            li[j].classList.remove('active-li');
            images[j].classList.remove('active');
        }
        
        this.classList.add('active-li')
        var dataSlide = this.getAttribute('data-slide')
        images[dataSlide].classList.add('active')
        counter = dataSlide
        
    }
}


var timer;

function autoplay(){
    timer = setTimeout(right, 4000)
}

autoplay()





const quizData = [
    {
        question: "I ... speak English",
        a: "can",
        b: "have",
        c: "have been",
        d: "like",
        correct: "a",
    },
    {
        question: "Which sentence is correct?",
        a: "I didn't get some apples.",
        b: "I haven't got any time.",
        c: "There's any milk in the fridge.",
        d: "i didn't went for a walk",
        correct: "b",
    },
    {
        question: "What is the answer to this question? I like tennis.",
        a: "I am also.",
        b: "So do I.",
        c: "So like I.",
        d: "so did I.",
        correct: "b",
    },
    {
        question: "What is the opposite of dangerous?",
        a: "easy",
        b: "comfortable",
        c: "safe",
        d: "none of the above",
        correct: "c",
    },
    {
        question: "Which answers to the following question are correct? Whose book is it?",
        a: "It's mine.",
        b: "It's my.",
        c: "It my book",
        d: "none of the above",
        correct: "a",
    },


];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const answerScore = document.querySelector('.answer__score')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}




submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer == quizData[currentQuiz].correct) {
           score++
       }

       currentQuiz++

       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
        if(score == 1){
            answerScore.innerHTML = 'Beginner'
            // answerScore.style.background = 'white'
            // answerScore.style.background.width = '15px'
        }else if(score == 2){
            answerScore.innerHTML = 'Elementary'
        }else if(score == 3){
            answerScore.innerHTML = 'Pre-intermediate'
        }else if(score == 4){
            answerScore.innerHTML = 'Intermediate'
        }else if(score == 5){
            answerScore.innerHTML = 'Upper-intermediate'
        }

           quiz.innerHTML = `
           <h2 class="test__content_question-title">Вы правильно ответили на ${score}/${quizData.length} вопросов <br> Ваш уровень: </h2>
           <button class="test__contetn-btn" onclick="location.reload()">Reload</button>
           `


       }
    }
})