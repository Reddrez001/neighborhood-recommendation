// js/freelancer-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const freelancerId = localStorage.getItem('loggedInFreelancer');
    if (!freelancerId) {
      window.location.href = 'freelancer-login.html';
      return;
    }
    
    const freelancer = findRecord('freelancers', 'id', parseInt(freelancerId));
    const jobs = fetchRecords('jobs');
  
    // Recommend jobs that match freelancer skills and location
    const recommendedJobs = jobs.filter(job => {
      const skillMatch = freelancer.skills.some(skill => job.skillsNeeded.includes(skill));
      const locationMatch = freelancer.location.toLowerCase() === job.location.toLowerCase();
      return skillMatch && locationMatch;
    });
    
    const recommendedContainer = document.getElementById('recommendedJobs');
    if (recommendedJobs.length === 0) {
      recommendedContainer.innerHTML = '<p>No recommended jobs at this time.</p>';
    } else {
      recommendedJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
          <h3>${job.name}</h3>
          <p>${job.description.substring(0, 50)}...</p>
        `;
        jobCard.addEventListener('click', () => {
          window.location.href = `freelancer-job-details.html?id=${job.id}`;
        });
        recommendedContainer.appendChild(jobCard);
      });
    }
  
    // Load draft proposals for the freelancer
    const proposals = fetchRecords('proposals').filter(p => p.freelancerId == freelancer.id && p.status === 'draft');
    const draftContainer = document.getElementById('draftProposals');
    if (proposals.length === 0) {
      draftContainer.innerHTML = '<p>No draft proposals.</p>';
    } else {
      proposals.forEach(proposal => {
        const proposalDiv = document.createElement('div');
        proposalDiv.className = 'proposal';
        proposalDiv.innerHTML = `
          <h4>${proposal.name}</h4>
          <p>${proposal.description.substring(0, 50)}...</p>
          <p>Status: ${proposal.status}</p>
        `;
        draftContainer.appendChild(proposalDiv);
      });
    }
  });
  