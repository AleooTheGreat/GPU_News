document.addEventListener('DOMContentLoaded', () => {
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
  });
  