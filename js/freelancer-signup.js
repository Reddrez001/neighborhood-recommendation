// js/freelancer-signup.js

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const fileInput = document.getElementById('profilePicture');
  const reader = new FileReader();

  reader.onload = function () {
    const profilePic = reader.result || "";
    const freelancer = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      location: document.getElementById('location').value,
      skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
      skillLevel: document.getElementById('skillLevel').value,
      profilePicture: profilePic,
      description: "",
      proposals: []
    };

    insertRecord('freelancers', freelancer);
    localStorage.setItem('loggedInFreelancer', freelancer.id);
    window.location.href = 'freelancer-dashboard.html';
  };

  if (fileInput.files && fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    reader.onload();
  }
});
