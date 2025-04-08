// js/client-dashboard.js 

document.addEventListener('DOMContentLoaded', () => {
  const clientId = localStorage.getItem('loggedInClient');
  if (!clientId) {
    window.location.href = 'client-login.html';
    return;
  }

  // Get the logged-in client's record.
  const clients = fetchRecords('clients');
  const client = clients.find(c => c.id == clientId);

  // --- Load Jobs Posted by the Client ---
  const allJobs = fetchRecords('jobs');
  const clientJobs = allJobs.filter(job => job.clientId === client.id);
  const postedJobsContainer = document.getElementById('postedJobs');

  if (clientJobs.length === 0) {
    postedJobsContainer.innerHTML = '<p>You have not posted any jobs.</p>';
  } else {
    clientJobs.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.className = 'job-card';
      jobCard.innerHTML = `
        <h3>${job.name}</h3>
        <p>${job.description.substring(0, 50)}...</p>
      `;
      jobCard.addEventListener('click', () => {
        window.location.href = `client-job-details.html?id=${job.id}`;
      });
      postedJobsContainer.appendChild(jobCard);
    });
  }

  // --- Recommend Freelancers Based on Matching Skills and Location ---
  const freelancers = fetchRecords('freelancers');
  const recommendedContainer = document.getElementById('recommendedFreelancers');
  
  // Compare freelancer skills with client's skills needed.
  const recommendations = freelancers.filter(freelancer => {
    const skillMatch = freelancer.skills.some(skill =>
      client.skillsNeeded.includes(skill)
    );
    const locationMatch = freelancer.location.toLowerCase() === client.location.toLowerCase();
    return skillMatch && locationMatch;
  });

  if (recommendations.length === 0) {
    recommendedContainer.innerHTML = '<p>No recommended freelancers at this time.</p>';
  } else {
    recommendations.forEach(freelancer => {
      const card = document.createElement('div');
      // Use the new CSS class for an Upwork-inspired freelancer card
      card.className = 'freelancer-card';
      card.innerHTML = `
        <img src="${freelancer.profilePicture || 'default-profile.png'}" alt="${freelancer.name}'s profile picture" class="freelancer-img">
        <h4 class="freelancer-name">${freelancer.name}</h4>
        <p class="freelancer-skills"><strong>Skills:</strong> ${Array.isArray(freelancer.skills) ? freelancer.skills.join(', ') : freelancer.skills}</p>
        <p class="freelancer-location"><strong>Location:</strong> ${freelancer.location}</p>
      `;
      // Clicking the card redirects to the freelancer's profile page.
      card.addEventListener('click', () => {
        window.location.href = `../freelancer/freelancer-view-details.html?id=${freelancer.id}`;
      });
      recommendedContainer.appendChild(card);
    });
  }
});
