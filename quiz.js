const questions = [
    {
      question: "Which of the following programming languages is commonly used for creating responsive web pages?",
      options: ["HTML", "Python", "CSS", "Java"],
      answer: "HTML"
    },
    {
      question: "What does API stand for?",
      options: ["Advanced Programming Interface", "Application Programming Interface", "Automated Programming Interface", "Application Process Integration"],
      answer: "Application Programming Interface"
    },
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which programming language is used for web development?",
      options: ["Java", "Python", "HTML", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyperlinks and Text Markup Language", "Hypertext Markup Language", "Home Tool Markup Language", "Hyper Text Manipulation Language"],
      answer: "Hypertext Markup Language"
    },
    {
      question: "Which company developed the JavaScript programming language?",
      options: ["Microsoft", "Google", "Apple", "Netscape"],
      answer: "Netscape"
    },
    {
      question: "What is the purpose of a version control system like Git?",
      options: ["To manage databases", "To track changes in files and collaborate with developers", "To create web applications", "To optimize website performance"],
      answer: "To track changes in files and collaborate with developers"
    },
    {
      question: "Which type of malware is designed to block access to a computer system until a ransom is paid?",
      options: ["Worm", "Trojan", "Ransomware", "Spyware"],
      answer: "Ransomware"
    },
    {
      question: "What does CPU stand for?",
      options: ["Computer Processing Unit", "Central Processing Unit", "Control Processing Unit", "Central Program Unit"],
      answer: "Central Processing Unit"
    },
    {
      question: "What does RAM stand for?",
      options: ["Random Access Memory", "Read-Only Memory", "Run-All Memory", "Remote Access Memory"],
      answer: "Random Access Memory"
    }
  ];
  
  const quizContainer = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  const scoreCardContainer = document.getElementById("scorecard");
  
  let userAnswers = [];
  
  function displayQuiz() {
    let quizHTML = "";
    questions.forEach((q, index) => {
      const optionsHTML = q.options
        .map(
          (option, optionIndex) => `
          <li>
            <input type="radio" name="question${index}" id="q${index}option${optionIndex}" value="${option}">
            <label for="q${index}option${optionIndex}">${option}</label>
          </li>
        `
        )
        .join("");
  
      quizHTML += `
        <div>
          <p><strong>Q${index + 1}:</strong> ${q.question}</p>
          <ul>${optionsHTML}</ul>
        </div>
      `;
    });
    quizContainer.innerHTML = quizHTML;
  }
  
  function submitQuiz() {
    userAnswers = [];
    let score = 0;
  
    questions.forEach((q, index) => {
      const selectedOption = document.querySelector(
        `input[name="question${index}"]:checked`
      );
      if (selectedOption) {
        userAnswers.push(selectedOption.value);
        if (selectedOption.value === q.answer) {
          score++;
        }
      } else {
        userAnswers.push(null);
      }
    });
  
    // Display scorecard
    const totalQuestions = questions.length;
    let scoreCardHTML = `<h2>Your Score</h2>`;
    scoreCardHTML += `<p>Welcome, ${localStorage.getItem("username")}!</p>`;
    scoreCardHTML += `<p>You scored ${score} out of ${totalQuestions}</p>`;
  
    scoreCardHTML += `<h2>Scorecard</h2>`;
    scoreCardHTML += `<ul>`;
    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === q.answer;
      const questionStatus = isCorrect ? "correct" : "wrong";
      const correctAnswer = q.answer;
  
      scoreCardHTML += `
        <li>
          Q${index + 1}: <strong>${questionStatus}</strong>
          (Your answer: ${userAnswer || "Not answered"})
          ${!isCorrect ? ` - Correct Answer: ${correctAnswer}` : ""}
        </li>
      `;
    });
    scoreCardHTML += `</ul>`;
  
    scoreCardContainer.innerHTML = scoreCardHTML;
    scoreCardContainer.style.display = "block";
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
  }
  
  submitButton.addEventListener("click", submitQuiz);
  displayQuiz();
  