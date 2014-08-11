$(document).ready(function() {

var quiz = [{
  "question": "Guess the Artist",
  "choices": ["Pablo Picasso", "Henri Matisse", "Andy Warhol"],
  "correct": "Pablo Picasso",
  "image": "https://raw.githubusercontent.com/LorenSiegel/ModernArtQuiz/gh-pages/images/Picasso_LesDemoisellesDAvignon.jpg"
}, {
  "question": "Guess the Artist",
  "choices": ["Edgar Degas", "Edouard Manet", "Vincent van Gogh"],
  "correct": "Vincent van Gogh",
    "image": "https://raw.githubusercontent.com/LorenSiegel/ModernArtQuiz/gh-pages/images/vanGogh_StarryNight.jpg"
}, {
    "question": "Guess the Artist",
  "choices": ["Henri Matisse", "Claude Monet", "Paul Gauguin"],
  "correct": "Henri Matisse",
    "image": "https://raw.githubusercontent.com/LorenSiegel/ModernArtQuiz/gh-pages/images/Matisse_LaDanse.jpg"
}, {
  "question": "Guess the Artist",
  "choices": ["Claude Monet", "Jasper Johns", "Marcel Duchamp"],
  "correct": "Marcel Duchamp",
    "image": "https://raw.githubusercontent.com/LorenSiegel/ModernArtQuiz/gh-pages/images/Duchamp_Fontaine.jpg"
}, {
  "question": "Guess the Artist",
  "choices": ["Andy Warhol", "James Turrel", "Jasper Johns"],
  "correct": "The Ashcan School",
    "image": "https://raw.githubusercontent.com/LorenSiegel/ModernArtQuiz/gh-pages/images/Turrel.jpg"
}];


// define elements
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");


var currentQuestion = 0,
  score = 0,
  askingQuestion = true;

function $(id) { // shortcut for document.getElementById
  return document.getElementById(id);
}

function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";
    
  $("Artimage").src = quiz[currentQuestion].image;

  // loop through choices, and create radio buttons
  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    quiz[currentQuestion].question;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0) {
    scoreContainer.textContent = "Score: 0 right answers out of " +
      quiz.length + " possible.";
    submitBtn.textContent = "Submit Answer";
  }
}

function checkAnswer() {
  // are we asking a question, or proceeding to next question?
  if (askingQuestion) {
    submitBtn.textContent = "Next Question";
    askingQuestion = false;

    // determine which radio button they clicked
    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
      }

      // get index of correct answer
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    // setup if they got it right, or wrong
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }

    scoreContainer.textContent = "Score: " + score + " right answers out of " +
      quiz.length + " possible.";
  } else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    // if we're not on last question, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  content.innerHTML = "<h2>You've Completed the Quiz!</h2>" +
    "<h2>Below are your results:</h2>" +
    "<h2>" + score + " out of " + quiz.length + " questions, " +
    Math.round(score / quiz.length * 100) + "%<h2>";
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);
});

