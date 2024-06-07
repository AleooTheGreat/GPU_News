document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  if (sessionStorage.getItem('loggedIn')) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('logout-button').style.display = 'block';
    // Redirect to main.html
    window.location.href = 'main.html';
  } else {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('logout-button').style.display = 'none';
  }

  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Dummy authentication, replace with real authentication
    if (username === 'alex' && password === '091527') {
      sessionStorage.setItem('loggedIn', true);
      window.location.href = 'main.html';
    } else {
      alert('Invalid username or password');
    }
  });

  document.getElementById('logout-button').addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
  });
});

// Additional script for article management and animations
// Function to add a new article
function addNewArticle(title, description, link, persist = true) {
  console.log('Adding new article with title:', title, 'description:', description, 'and link:', link);
  const newArticle = document.createElement("a");
  newArticle.href = link;
  newArticle.target = "_blank";
  newArticle.className = "article-row";
  newArticle.innerHTML = `
    <h3 class="article-title">${title}</h3>
    <p class="article-description">${description}</p>
    <button class="delete-button">Delete</button>
  `;
  const articleSection = document.getElementById("articles");
  articleSection.appendChild(newArticle);

  const deleteButton = newArticle.querySelector('.delete-button');
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    articleSection.removeChild(newArticle);
    removeArticleFromStorage(title, description, link);
  });

  if (persist) {
    saveArticle(title, description, link);
  }

  console.log('Article added to the DOM');
}

// Save article to server
function saveArticle(title, description, link) {
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, link })
  })
  .then(response => response.json())
  .then(data => console.log('Article saved:', data))
  .catch(error => console.error('Error saving article:', error));
}

// Load articles from session storage
function loadArticles() {
  const storedArticles = JSON.parse(sessionStorage.getItem('articles')) || [];
  storedArticles.forEach(article => {
    addNewArticle(article.title, article.description, article.link, false);
  });
}

// Remove articles from session storage
function removeArticleFromStorage(title, description, link) {
  let storedArticles = JSON.parse(sessionStorage.getItem('articles')) || [];
  storedArticles = storedArticles.filter(article => article.title !== title || article.description !== description || article.link !== link);
  sessionStorage.setItem('articles', JSON.stringify(storedArticles));
}

// Ensure this script only runs on the articles page
if (document.getElementById("articles")) {
  loadArticles();

  const articleSection = document.getElementById("articles");

  // Add button for adding new articles
  const addButton = document.createElement("button");
  addButton.textContent = "Post New Article";
  addButton.style.display = "block";
  addButton.style.margin = "20px auto";
  addButton.style.padding = "10px 20px";
  addButton.style.fontSize = "16px";
  document.body.insertBefore(addButton, document.body.firstChild);

  const addArticleForm = document.createElement("form");
  addArticleForm.innerHTML = `
    <input type="text" id="article-title" placeholder="Article Title" required style="margin: 10px; padding: 5px; font-size: 16px;">
    <input type="text" id="article-description" placeholder="Article Description" required style="margin: 10px; padding: 5px; font-size: 16px;">
    <input type="url" id="article-link" placeholder="Article Link" required style="margin: 10px; padding: 5px; font-size: 16px;">
    <input type="email" id="email" placeholder="Enter your email" required style="margin: 10px; padding: 5px; font-size: 16px;">
    <button type="submit" style="margin: 10px; padding: 10px 20px; font-size: 16px;">Submit</button>
  `;
  addArticleForm.style.display = "none";
  addArticleForm.style.flexDirection = "column";
  addArticleForm.style.margin = "20px auto";
  addArticleForm.style.maxWidth = "600px";
  document.body.insertBefore(addArticleForm, document.body.children[1]);

  addButton.addEventListener("click", () => {
    addArticleForm.style.display = "flex";
  });

  addArticleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("article-title").value;
    const description = document.getElementById("article-description").value;
    const link = document.getElementById("article-link").value;

    console.log('Form submitted with title:', title, 'description:', description, 'and link:', link);

    if (title && description && link) {
      addNewArticle(title, description, link);
      addArticleForm.reset();
      addArticleForm.style.display = "none";
    } else {
      alert("Please fill out all fields.");
    }
  });
}

// Using and modifying mouse and keyboard events
document.addEventListener("click", (event) => {
  console.log("Document clicked", event);
});

document.addEventListener("keydown", (event) => {
  console.log("Key pressed: ", event.key);
});

// Modifying properties with animations
document.querySelector(".back-to-main").textContent = "Return to Main Page";
document.querySelector(".back-to-main").style.transition = "color 0.5s, background-color 0.5s";
document.querySelector(".back-to-main").addEventListener("mouseover", () => {
  document.querySelector(".back-to-main").style.backgroundColor = "darkblue";
  document.querySelector(".back-to-main").style.color = "white";
});
document.querySelector(".back-to-main").addEventListener("mouseout", () => {
  document.querySelector(".back-to-main").style.backgroundColor = "";
  document.querySelector(".back-to-main").style.color = "";
});

//  setTimeout or setInterval 
setInterval(() => {
  console.log("Interval running every 2 seconds");
}, 2000);

//  localStorage 
const articles = [
  { title: "Article 1", description: "Description 1" },
  { title: "Article 2", description: "Description 2" },
];
localStorage.setItem("articles", JSON.stringify(articles));

// Math, Array, String, Date classes
const randomIndex = Math.floor(Math.random() * articles.length);
console.log(`Random Article: ${articles[randomIndex].title}`);

// Randomly changing the value of a property 
function changeBackgroundColor() {
  const colors = ["red", "blue", "green", "purple"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}
setInterval(changeBackgroundColor, 5000);

// classList, target or currentTarget properties
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("nav-link")) {
    console.log("Navigation link clicked");
  }
});

// getComputedStyle, stopPropagation 
document.querySelector(".nav-link").addEventListener("click", (event) => {
  event.stopPropagation();
  const style = getComputedStyle(event.target);
  console.log("Nav link font size:", style.fontSize);
});

//Validating form data using regular expressions
const form = document.createElement("form");
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "Enter your email";
form.appendChild(emailInput);

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";
form.appendChild(submitButton);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    alert("Valid email");
  } else {
    alert("Invalid email");
  }
});

document.body.appendChild(form);
