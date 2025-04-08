// js/client-post-job.js

document.getElementById('postJobForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const clientId = localStorage.getItem('loggedInClient');
    if (!clientId) {
      alert('Please log in as a client.');
      window.location.href = 'client-login.html';
      return;
    }
  
    const job = {
      name: document.getElementById('jobName').value,
      description: document.getElementById('jobDescription').value,
      budget: document.getElementById('jobBudget').value,
      location: document.getElementById('jobLocation').value,
      skillsNeeded: document.getElementById('jobSkills').value.split(',').map(s => s.trim()),
      clientId: parseInt(clientId)
      // Add additional fields as needed
    };
  
    insertRecord('jobs', job);
    alert('Job posted successfully.');
    window.location.href = 'client-dashboard.html';
  });
  