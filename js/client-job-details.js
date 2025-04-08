// js/client-job-details.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('id');
    const jobs = fetchRecords('jobs');
    const job = jobs.find(j => j.id == jobId);
  
    if (!job) {
      document.querySelector('.main').innerHTML = '<p>Job not found.</p>';
      return;
    }
  
    document.getElementById('jobName').textContent = job.name;
    document.getElementById('jobDescription').textContent = job.description;
    document.getElementById('jobBudget').innerHTML = `<strong>Budget:</strong> ${job.budget}`;
    document.getElementById('jobLocation').innerHTML = `<strong>Location:</strong> ${job.location}`;
  
    // Load proposals for this job
    const proposals = fetchRecords('proposals').filter(p => p.jobId == job.id);
    const proposalContainer = document.getElementById('proposalContainer');
    if (proposals.length === 0) {
      proposalContainer.innerHTML = '<p>No proposals yet.</p>';
    } else {
      proposals.forEach(proposal => {
        const proposalDiv = document.createElement('div');
        proposalDiv.className = 'proposal';
        proposalDiv.innerHTML = `
          <h4>${proposal.name}</h4>
          <p>${proposal.description.substring(0, 50)}...</p>
          <p>Status: ${proposal.status}</p>
          <button onclick="updateProposalStatus(${proposal.id}, 'accepted')">Accept</button>
          <button onclick="updateProposalStatus(${proposal.id}, 'rejected')">Reject</button>
        `;
        proposalContainer.appendChild(proposalDiv);
      });
    }
  });
  
  // Helper function for updating proposal status
  function updateProposalStatus(proposalId, newStatus) {
    updateRecord('proposals', proposalId, { status: newStatus });
    alert(`Proposal ${newStatus}.`);
    location.reload();
  }
  