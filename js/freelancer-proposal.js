// js/freelancer-proposal.js

document.addEventListener('DOMContentLoaded', () => {
    const freelancerId = localStorage.getItem('loggedInFreelancer');
    if (!freelancerId) {
      window.location.href = 'freelancer-login.html';
      return;
    }
  
    const proposals = fetchRecords('proposals').filter(p => p.freelancerId == freelancerId);
    const container = document.getElementById('proposalList');
  
    if (proposals.length === 0) {
      container.innerHTML = '<p>No proposals submitted yet.</p>';
    } else {
      // Group proposals by status
      const groups = { draft: [], pending: [], rejected: [], accepted: [] };
      proposals.forEach(p => {
        groups[p.status] = groups[p.status] || [];
        groups[p.status].push(p);
      });
  
      for (const status in groups) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'proposal-group';
        groupDiv.innerHTML = `<h3>${status.charAt(0).toUpperCase() + status.slice(1)} Proposals</h3>`;
        groups[status].forEach(proposal => {
          const proposalDiv = document.createElement('div');
          proposalDiv.className = 'proposal';
          proposalDiv.innerHTML = `<h4>${proposal.name}</h4><p>${proposal.description.substring(0, 50)}...</p>`;
          groupDiv.appendChild(proposalDiv);
        });
        container.appendChild(groupDiv);
      }
    }
  });
  