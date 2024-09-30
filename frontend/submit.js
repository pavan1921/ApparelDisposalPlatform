document.getElementById('submitForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const condition = document.getElementById('condition').value;
    const purpose = document.getElementById('purpose').value;
  
    const submission = { name, type, condition, purpose };
  
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    })
      .then(response => response.text())
      .then(data => {
        alert('Submission successful!');
        window.location.href = 'submissions.html'; // Redirect to view submissions after success
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error occurred while submitting data.');
      });
  });
  