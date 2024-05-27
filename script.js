// script.js
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');
const forgotForm = document.getElementById('forgot-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const registerNameInput = document.getElementById('name');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const forgotEmailInput = document.getElementById('forgot-email');
const loginErrorMsg = document.getElementById('login-error-msg');
const registerSuccessMsg = document.getElementById('register-success-msg');
const registerErrorMsg = document.getElementById('register-error-msg');
const forgotMsg = document.getElementById('forgot-msg');
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Switch between tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const activeTab = tab.getAttribute('data-tab');
    tabContents.forEach(content => {
      if (content.getAttribute('data-tab') === activeTab) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  // Check if the user credentials are valid
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const user = registeredUsers.find((user) => user.email === email && user.password === password);

  if (user) {
    // Successful login
    localStorage.setItem('username', user.name);
    loginErrorMsg.textContent = '';
    window.location.href = 'quiz.html'; // Redirect to the quiz portal
  } else {
    // Invalid credentials
    loginErrorMsg.textContent = 'Invalid email or password';
  }
});

// Handle registration form submission
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = registerNameInput.value;
  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;

  // Check if the user is already registered
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const isUserRegistered = registeredUsers.some((user) => user.email === email);

  if (isUserRegistered) {
    // User is already registered
    registerSuccessMsg.textContent = '';
    registerErrorMsg.textContent = 'User already registered. Please log in.';
  } else {
    // Register the user
    const newUser = { name, email, password };
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    registerErrorMsg.textContent = '';
    registerSuccessMsg.textContent = 'Registration successful! You can now log in.';
    registrationForm.reset();
  }
});

// Handle forgot password form submission
forgotForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = forgotEmailInput.value;

  // Check if the user is registered
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const isUserRegistered = registeredUsers.some((user) => user.email === email);

  if (isUserRegistered) {
    // User is registered, show message
    forgotMsg.textContent = 'An email with password reset instructions has been sent.';
    forgotEmailInput.value = '';
  } else {
    // User is not registered
    forgotMsg.textContent = 'This email is not registered. Please check the email address.';
  }
});
