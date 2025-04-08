// js/freelancer-post-proposals.js

document.addEventListener('DOMContentLoaded', () => {
    const freelancerId = localStorage.getItem('loggedInFreelancer');
    if (!freelancerId) {
      window.location.href = 'freelancer-login.html';
      return;
    }
  
    // Get the jobId from query parameters
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('jobId');
  
    document.getElementById('postProposalForm').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const proposal = {
        name: document.getElementById('proposalName').value,
        description: document.getElementById('proposalDescription').value,
        price: document.getElementById('proposalPrice').value,
        milestone: document.getElementById('proposalMilestone').value,
        jobId: parseInt(jobId),
        freelancerId: parseInt(freelancerId),
        status: 'draft' // Initial status can be set as draft
        // Add additional fields like attachments if needed
      };
  
      insertRecord('proposals', proposal);
      alert('Proposal saved as draft.');
      window.location.href = 'freelancer-proposal.html';
    });
  });
  