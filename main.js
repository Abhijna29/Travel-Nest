let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let login = document.getElementById('login');
let loginBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let imageContainer = document.querySelector('.image-container');
let header = document.querySelector('header');

window.scrollY === 0
  ? header.classList.remove('hidden')
  : header.classList.add('hidden');

window.onscroll = () => {
  searchBtn.classList.remove('fa-times');
  searchBar.classList.remove('active');
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  loginForm.classList.remove('active');
};

searchBtn.addEventListener('click', () => {
  searchBtn.classList.toggle('fa-times');
  searchBar.classList.toggle('active');
});

login.addEventListener('click', () => {
  loginForm.classList.add('active');
});

formClose.addEventListener('click', () => {
  loginForm.classList.remove('active');
});

menu.addEventListener('click', () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
});

// home section
var image = document.getElementById('image');
var images = [
  'images/p19.jpg',
  'images/p5.jpg',
  'images/p9.jpg',
  'images/p6.jpg',
  'images/p21.jpg',
];
var index = 0;

function updateImage() {
  image.src = images[index];
  index = (index + 1) % images.length;
}

setInterval(updateImage, 5000);

// static-counter
const countersEl = document.querySelectorAll('.number');
countersEl.forEach((counters) => {
  counters.textContent = 0;

  incrementCounter();

  function incrementCounter() {
    let currentNum = +counters.textContent;
    const data = counters.getAttribute('data');
    const increment = data / 25;

    currentNum = Math.ceil(currentNum + increment);

    if (currentNum < data) {
      counters.textContent = currentNum;
      setTimeout(incrementCounter, 50);
    } else {
      counters.textContent = data;
    }
  }
});

//login-form submission
loginBtn.addEventListener('click', async function (event) {
  event.preventDefault();
  let email = document.querySelector('input[name="email"]').value;
  let password = document.querySelector('input[name="password"]').value;

  if (email && password.length == 6) {
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Logged in successfully');
        loginForm.classList.remove('active'); // Hide the form
        // Optionally, clear the input fields
        document.querySelector('input[name="email"]').value = '';
        document.querySelector('input[name="password"]').value = '';
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      document.querySelector('input[name="email"]').value = '';
      document.querySelector('input[name="password"]').value = '';
    }
  } else if (!email || !password) {
    alert('Please enter email and password correctly');
  } else if (password.length != 6) {
    alert('Password must contain 6 letters!');
  }

  //show the logout button
  login.style.display = 'none';
  document.getElementById('logout').style.display = ' inline';
});

document.getElementById('logout').addEventListener('click', function () {
  alert('User logged out.');
  // Show the login icon and hide the logout icon
  login.style.display = 'inline';
  document.getElementById('logout').style.display = 'none';
});
