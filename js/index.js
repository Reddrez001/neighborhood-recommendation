// js/index.js

document.addEventListener('DOMContentLoaded', () => {
    const jobs = fetchRecords('jobs');
    const container = document.querySelector('.jobs-container');
  
    if (jobs.length === 0) {
      container.innerHTML = '<p>No jobs available. Please check back later.</p>';
    } else {
      jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
          <h3>${job.name}</h3>
          <p>${job.description.substring(0, 50)}...</p>
          <p class="job-info"><span>Budget: ${job.budget}</span> • <span>Location: ${job.location}</span></p>
        `;
        // On click, if freelancer logged in, go to job details; otherwise prompt login.
        card.addEventListener('click', () => {
          if (!localStorage.getItem('loggedInFreelancer')) {
            alert('Please login as a freelancer to view job details.');
            window.location.href = 'freelancer-login.html';
          } else {
            window.location.href = `freelancer-job-details.html?id=${job.id}`;
          }
        });
        container.appendChild(card);
      });
    }
  });
  