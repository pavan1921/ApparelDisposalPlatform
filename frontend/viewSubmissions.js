// Fetch and display submissions
fetch('http://localhost:3000/submissions')
  .then(response => response.json())
  .then(submissions => {
    const submissionsList = document.getElementById('submissionsList');
    submissions.forEach(submission => {
      const submissionItem = document.createElement('div');
      submissionItem.innerHTML = `
        <h3>${submission.name}</h3>
        <p>Type: ${submission.type}</p>
        <p>Condition: ${submission.condition}</p>
        <p>Purpose: ${submission.purpose}</p>
      `;
      submissionsList.appendChild(submissionItem);
    });
  })
  .catch(error => console.error('Error fetching submissions:', error));
