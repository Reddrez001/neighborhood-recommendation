// js/client-profile.js

document.addEventListener('DOMContentLoaded', () => {
    const clientId = localStorage.getItem('loggedInClient');
    if (!clientId) {
      window.location.href = 'client-login.html';
      return;
    }
    const client = findRecord('clients', 'id', parseInt(clientId));
    if (client) {
      document.getElementById('profileName').textContent = client.name;
      document.getElementById('profileEmail').textContent = client.email;
      document.getElementById('profileLocation').textContent = client.location;
      document.getElementById('profileSkillsNeeded').textContent = client.skillsNeeded.join(', ');
      document.getElementById('profilePicture').src = client.profilePicture || 'default-profile.png';
    }
  });
  