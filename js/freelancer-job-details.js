// js/freelancer-job-details.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('id');
    const job = fetchRecords('jobs').find(j => j.id == jobId);
  
    if (!job) {
      document.querySelector('.main').innerHTML = '<p>Job not found.</p>';
      return;
    }
  
    document.getElementById('jobName').textContent = job.name;
    document.getElementById('jobDescription').textContent = job.description;
    document.getElementById('jobBudget').innerHTML = `<strong>Budget:</strong> ${job.budget}`;
    document.getElementById('jobLocation').innerHTML = `<strong>Location:</strong> ${job.location}`;
  
    document.getElementById('applyButton').addEventListener('click', () => {
      // Redirect to the freelancer post proposals page with job id in query
      window.location.href = `freelancer-post-proposals.html?jobId=${job.id}`;
    });
  });
  