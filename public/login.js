document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'alex' && password === '091527') {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'main.html';
    } else {
      alert('Invalid username or password');
    }
  });
});
