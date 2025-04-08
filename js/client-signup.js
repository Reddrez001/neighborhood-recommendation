// js/client-signup.js

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById('profilePicture');
    const reader = new FileReader();
  
    reader.onload = function () {
      const profilePic = reader.result || "";
      const client = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        location: document.getElementById('location').value,
        skillsNeeded: document.getElementById('skillsNeeded').value.split(',').map(s => s.trim()),
        profilePicture: profilePic,
        job: [] // To be filled with job IDs later
      };
  
      insertRecord('clients', client);
      localStorage.setItem('loggedInClient', client.id);
      window.location.href = 'client-dashboard.html';
    };
  
    if (fileInput.files && fileInput.files[0]) {
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      reader.onload();
    }
  });
  