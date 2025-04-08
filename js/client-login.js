// js/client-login.js

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const client = findRecord('clients', 'email', email);
  
    if (client && client.password === password) {
      localStorage.setItem('loggedInClient', client.id);
      window.location.href = 'client-dashboard.html';
    } else {
      alert("Invalid email or password.");
    }
  });
  