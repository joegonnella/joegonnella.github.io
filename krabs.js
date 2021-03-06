(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'green';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What is Mr. Krabs' first name?",
      answers: {
        a: "Derek",
        b: "Clancy",
        c: "Moe",
        d: "Eugene"
      },
      correctAnswer: "d"
    },
    {
      question: "Whose grave does Mr. Krbas defile to get his claws on a rare novelty drinks hat?",
      answers: {
        a: "His father's",
        b: "Smitty Werben Jaeger Man Jensen's",
        c: "Margaret Thatcher's",
        d: "Nosferatu's"
      },
      correctAnswer: "b"
    },
	{
      question: "On which ship was Mr. Krabs the head chef?",
      answers: {
        a: "S.S. Diarrhoea",
        b: "S.S. Gourmet",
        c: "H.M.S. Titanic",
        d: "The Mayflower"
      },
      correctAnswer: "a"
    },
    {
      question: "How much money does Mr. Krabs sell SpongeBob to the Flying Dutchman for?",
      answers: {
        a: "62 cents",
        b: "1 dollar",
        c: "1 cent",
        d: "12 dollars"
      },
      correctAnswer: "a"
    },
	{
      question: "Which lipstick does Mr. Krbas identify on his 1 millionth dollar?",
      answers: {
        a: "Coral Blue No.5 Semi-gloss",
        b: "Electric Yellow No.3 Matte",
        c: "Coral Blue No.2 Semi-gloss",
        d: "Forest Green No.1 Satin"
      },
      correctAnswer: "c"
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
