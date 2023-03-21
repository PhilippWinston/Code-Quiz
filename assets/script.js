//ref w3schools for the model

document.addEventListener("DOMContentLoaded", function () {
  // Get the modal
  var modal = document.getElementById("highscoreModal");

  // Get the button that opens the modal
  var btn = document.getElementById("highscoreButton");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var questions = [
    {
      q: "What is the correct HTML tag for inserting an image?",
      c: ["a. <image>", "b. <img>", "c. <picture>", "d. <img src=''>"],
      a: "b. <img>",
    },
    {
      q: "What is the correct HTML tag for creating a hyperlink?",
      c: ["a. <a>", "b. <link>", "c. <hyperlink>", "d. <href>"],
      a: "a. <a>",
    },

    {
      q: "Which property is used to change the background color of an element in CSS?",
      c: [
        "a. background-color",
        "b. color",
        "c. text-color",
        "d. background-image",
      ],
      a: "a. background-color",
    },
    {
      q: "Which property is used to specify the font size in CSS?",
      c: ["a. font-style", "b. font-size", "c. text-size", "d. size"],
      a: "b. font-size",
    },
    {
      q: "Which keyword is used to declare a variable in JavaScript?",
      c: ["a. let", "b. var", "c. const", "d. all of the above"],
      a: "d. all of the above (although let, var, and const are specifically used for variable declaration)",
    },
    {
      q: "Which class in Bootstrap is used to create a button?",
      c: ["a. .btn", "b. .button", "c. .button-group", "d. .btn-group"],
      a: "a. .btn",
    },
  ];

  const startButton = document.getElementById("start-btn");
  const quizContainer = document.getElementById("q");
  const choicesContainer = document.getElementById("c");
  const answerContainer = document.getElementById("a");
  const timerContainer = document.getElementById("time");
  const gameContainer = document.getElementById("game-container");
  const gameOverContainer = document.getElementById("game-over");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const highscoreButton = document.getElementById("highscoreButton");
  const highscoreModal = document.getElementById("highscoreModal");
  let score = 0;
  const scoreDisplay = document.getElementById("current-score");
  let finalScore = document.getElementById("final-score");
  let highScores = [];
  let highScoreList = document.getElementById('highScoreList')

  var currentQuestionIndex = 0;
  var timeLeft = 60;
  var timerId;
  function displayQuestion(question) {
    quizContainer.innerHTML = question.q;
    choicesContainer.innerHTML = "";

    for (let index = 0; index < question.c.length; index++) {
      const choice = question.c[index];
      const choice_btn = document.createElement("button");
      console.log(choice_btn);
      choice_btn.textContent = choice;
      choice_btn.setAttribute("class", "choice-btn");
      choice_btn.value = choice;
      choice_btn.addEventListener("click", function (event) {
        console.log(event.target.value);
        const input = event.target.value;

        if (currentQuestionIndex < questions.length - 1) {
          if (input === question.a) {
            console.log("Correct!");
            score = score + 10;
            scoreDisplay.innerText = "Current Score:" + score;

            console.log(score);
          } else {
            console.log("wrong");
            score = score - 10;
            scoreDisplay.innerText = "Current Score:" + score;

            console.log(score);
          }
          currentQuestionIndex++;
          displayQuestion(questions[currentQuestionIndex]);
        } else {
          //End game here
          gameOverContainer.setAttribute("class", "game-over");
          gameContainer.setAttribute("class", "hidden");
          startButton.setAttribute("class", "");
          finalScore.innerText = score + " Points!";
        }
      });
      choicesContainer.appendChild(choice_btn);
    }
  }
  function startGame() {
    console.log("starting game");
    displayQuestion(questions[currentQuestionIndex]);
    answerContainer.innerHTML = "answer";
    gameContainer.setAttribute("class", "");
    startButton.setAttribute("class", "hidden");
    currentQuestionIndex = 0;
    gameOverContainer.setAttribute("class", "hidden");
    score = 0;
    scoreDisplay.innerText = "Current Score:" + score;
  }
  console.log(questions);
  console.log(timerContainer);
  initStoage();

  startButton.addEventListener("click", startGame);
  submitButton.addEventListener("click", function () {
    //initialsInput.value
    console.log(initialsInput.value + score);
    highScores.push(initialsInput.value + ', ' + score)
    initialsInput.value = '';
    storeHighScores()
    gameOverContainer.setAttribute("class", "hidden");

  });
  function initStoage() {
    // Get stored todos from localStorage
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedScores !== null) {
      highScores = storedScores;
    }
    for (let index = 0; index < highScores.length; index++) {
      const highScore = highScores[index];
      const highScoreEl = document.createElement("p");
      highScoreEl.textContent = highScore;
      highScoreList.appendChild(highScoreEl)
    }
  }

  function storeHighScores() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("scores", JSON.stringify(highScores));
  }
});
