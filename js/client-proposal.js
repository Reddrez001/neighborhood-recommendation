// js/client-proposal.js

document.addEventListener('DOMContentLoaded', () => {
    const clientId = localStorage.getItem('loggedInClient');
    if (!clientId) {
      window.location.href = 'client-login.html';
      return;
    }
  
    // Get all jobs posted by this client
    const jobs = fetchRecords('jobs').filter(job => job.clientId == clientId);
    const jobIds = jobs.map(job => job.id);
  
    // Get proposals for these jobs
    const proposals = fetchRecords('proposals').filter(p => jobIds.includes(p.jobId));
    const container = document.getElementById('clientProposals');
  
    if (proposals.length === 0) {
      container.innerHTML = '<p>No proposals received yet.</p>';
    } else {
      proposals.forEach(proposal => {
        const div = document.createElement('div');
        div.className = 'proposal';
        div.innerHTML = `
          <h4>${proposal.name}</h4>
          <p>${proposal.description.substring(0, 50)}...</p>
          <p>Status: ${proposal.status}</p>
        `;
        container.appendChild(div);
      });
    }
  });
  