let score = 0;

const topics = {
    "color-blindness": [
      {
        question: "Which text is more readable for colorblind users?",
        options: [
          { text: "Light gray text on white background", isCorrect: false },
          { text: "Black text on white background", isCorrect: true }
        ],
        explanation: "High contrast helps colorblind users differentiate text from the background."
      },
      {
        question: "Which design is better for colorblind users?",
        options: [
          { text: "Traffic light indicators with no additional symbols", isCorrect: false },
          { text: "Traffic light indicators with shapes and labels", isCorrect: true }
        ],
        explanation: "Shapes and labels make it easier to differentiate states."
      },
      {
        question: "Which website design is more accessible?",
        options: [
          { text: "A website that uses color alone to indicate required fields", isCorrect: false },
          { text: "A website with asterisks and labels for required fields", isCorrect: true }
        ],
        explanation: "Symbols and text ensure clarity for all users."
      },
      {
        question: "Which color scheme is more accessible?",
        options: [
          { text: "Red and green color-coded chart", isCorrect: false },
          { text: "A chart with patterns and high-contrast colors", isCorrect: true }
        ],
        explanation: "Patterns and contrast ensure accessibility for colorblind users."
      },
      {
        question: "Which design is better for colorblind users?",
        options: [
          { text: "A red-green color-coded chart", isCorrect: false },
          { text: "A chart with patterns and labels", isCorrect: true }
        ],
        explanation: "Patterns and labels provide alternatives to color distinctions."
      }
    ],
    "dyslexia": [
      {
        question: "Which font is easier for users with dyslexia?",
        options: [
          { text: "Decorative and cursive fonts", isCorrect: false },
          { text: "Sans-serif fonts like Arial", isCorrect: true }
        ],
        explanation: "Sans-serif fonts with clear spacing are easier to read for users with dyslexia."
      },
      {
        question: "Which text spacing is better?",
        options: [
          { text: "Cramped and tightly packed text", isCorrect: false },
          { text: "Well-spaced lines and words", isCorrect: true }
        ],
        explanation: "Clear spacing improves readability for users with dyslexia."
      }
    ]
};

function showMenu() {
    const introDiv = document.getElementById("intro");
    const menuDiv = document.getElementById("menu");
    
    // Fade out intro and fade in menu
    introDiv.classList.add("hidden");
    setTimeout(() => {
        menuDiv.style.display = "block";
        menuDiv.classList.remove("hidden");
    }, 500); // Match the CSS transition duration
}

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function startGame(topic) {
    const introDiv = document.getElementById("intro");
    const gameDiv = document.getElementById("game-container");
    const menuDiv = document.getElementById("menu");
    const questions = [...topics[topic]]; // Clone the questions array to avoid modifying the original
    shuffleArray(questions); // Randomize the question order
    
    introDiv.classList.add("hidden");
    menuDiv.style.display = "none";
    gameDiv.style.display = "block";
    let currentQuestionIndex = 0;
    score = 0; // Reset score at the start of the game

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }

        const question = questions[currentQuestionIndex];
        const options = [...question.options]; // Clone options to avoid modifying the original
        shuffleArray(options); // Randomize the order of options

        // Update the placeholders with the question content
        document.getElementById("question-text").textContent = question.question;

        const optionsContainer = document.getElementById("options-container");
        optionsContainer.innerHTML = ""; // Clear previous options

        // Dynamically create buttons for the options
        options.forEach((option) => {
            const button = document.createElement("button");
            button.className = "answer-button";
            button.textContent = option.text;
            button.dataset.correct = option.isCorrect; // Set a data attribute for correctness
            button.addEventListener("click", () => {
              const isCorrect = button.dataset.correct === "true";
              checkAnswer(isCorrect, button); // Pass the button to the checkAnswer function
            });
            optionsContainer.appendChild(button);
        });

        document.getElementById("progress").textContent = `Question: ${currentQuestionIndex + 1}/${questions.length}`;
        document.getElementById("score-display").textContent = `Score: ${score}`;

    }

    function checkAnswer(isCorrect, button) {
        const buttons = document.querySelectorAll(".answer-button");
        const feedback = document.getElementById("feedback");
        const feedbackIcon = document.createElement("i");// Create the icon element
      
        // Disable all buttons to prevent further clicks
        buttons.forEach((btn) => {
          btn.disabled = true; // Disable each button
          btn.classList.add("disabled"); // Optionally add a visual cue (CSS class)
        });

        // Configure the feedback icon
        feedbackIcon.style.marginLeft = "10px";
        feedbackIcon.style.fontSize = "3rem";
      
        if (isCorrect) {
          feedback.textContent = "Correct! " + questions[currentQuestionIndex].explanation;
          feedback.style.color = "green";
          feedbackIcon.style.color = "green";
          feedbackIcon.className = "fas fa-check-circle";
          score++;
        } else {
          feedback.textContent = "Incorrect. " + questions[currentQuestionIndex].explanation;
          feedback.style.color = "red";
          feedbackIcon.style.color = "red";
          feedbackIcon.className = "fas fa-times-circle";
        }
      
        // Append the icon to the clicked button
        button.appendChild(feedbackIcon);
        
        currentQuestionIndex++;
        document.getElementById("score-display").textContent = `Score: ${score}`;
        
      
        // Delay to show feedback before loading the next question
        setTimeout(() => {
          loadQuestion(); // Load next question
        }, 5000);
    }

    function endGame() {
        gameDiv.innerHTML = `
            <div class="d-flex justify-content-center align-items-center">
              <div class="end-box">
                <h2 class="mt-5 mb-4">You are now at the end!</h2>
                <p>You scored: ${score}</p>
                <button class="btn btn-secondary mt-2" onclick="location.reload()">Return to Menu</button>
              </div>
            </div>
        `;
    }

    loadQuestion();
}

let currentChat = 1;
const totalChats = 3; // Update if you add more bubbles

function navigateChat(direction) {
    // Hide the current chat bubble
    document.getElementById(`chat-${currentChat}`).style.display = "none";

    // Update the current chat index
    currentChat += direction;

    // Show the new chat bubble
    document.getElementById(`chat-${currentChat}`).style.display = "block";

    // Handle button visibility
    document.getElementById("prev-button").style.display = currentChat > 1 ? "inline-block" : "none";
    document.getElementById("next-button").style.display = currentChat < totalChats ? "inline-block" : "none";
    
    
}