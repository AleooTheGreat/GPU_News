document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = sessionStorage.getItem('loggedIn');

  if (!isLoggedIn && window.location.pathname !== '/login.html') {
    window.location.href = 'login.html';
  }

  if (document.getElementById("articles")) {
    if (isLoggedIn) {
      console.log('User is logged in');
      
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
    } else {
      console.log('User is not logged in');
    }

    loadArticles();
  }

  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.style.display = 'block'; 
    logoutButton.addEventListener('click', () => {
      console.log('Logout button clicked');
      sessionStorage.removeItem('loggedIn');
      window.location.href = 'login.html';
    });
  } else {
    console.error('Logout button not found');
  }

  // Background Color Change Logic
  const sectionsToChange = [
    document.querySelector('header'),
    document.querySelector('.first_part'),
    document.querySelector('.latest-news-section')
  ];

  const changeBackgroundColors = () => {
    sectionsToChange.forEach(section => {
      if (section.style.backgroundColor === 'rgba(0, 0, 0, 0.7)') {
        section.style.backgroundColor = 'rgba(0, 0, 255, 0.7)';
      } else {
        section.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      }
    });
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'G' || event.key === 'g') {
      changeBackgroundColors();
    }
  });
});

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
    deleteArticleFromServer(title, description, link); 
  });

  if (persist) {
    saveArticle(title, description, link);
  }

  console.log('Article added to the DOM');
}

// Delete article from local storage
function removeArticleFromStorage(title, description, link) {
  let storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
  storedArticles = storedArticles.filter(article => article.title !== title || article.description !== description || article.link !== link);
  localStorage.setItem('articles', JSON.stringify(storedArticles));
}

// Save article to the server
function saveArticle(title, description, link) {
  const article = { title, description, link };

  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Delete article from the server
function deleteArticleFromServer(title, description, link) {
  const article = { title, description, link };

  fetch('http://localhost:3000/delete', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Article deleted from server:', data);
  })
  .catch((error) => {
    console.error('Error deleting article:', error);
  });
}

// Load articles from the server
function loadArticles() {
  fetch('http://localhost:3000/articles')
    .then(response => response.json())
    .then(articles => {
      articles.forEach(article => {
        addNewArticle(article.title, article.description, article.link, false);
      });
    })
    .catch((error) => {
      console.error('Error loading articles:', error);
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

// setTimeout or setInterval 
setInterval(() => {
  console.log("Interval running every 2 seconds");
}, 2000);

// localStorage 
const articles = [
  { title: "Article 1", description: "salut sunt un articol din local storage :) ", link: "" },
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

// Validating form data using regular expressions
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
