document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Add event listener to verify button
  document.getElementById('verify-btn').addEventListener('click', verifyStudent);
  
  // Add event listener for Enter key in input field
  document.getElementById('identifier').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      verifyStudent();
    }
  });
});

function verifyStudent() {
  const identifier = document.getElementById('identifier').value.trim();
  const spinner = document.getElementById('spinner');
  const resultBox = document.getElementById('result');
  
  if (!identifier) {
    showToast('Please enter an email or certificate ID');
    return;
  }
  
  // Show loading spinner
  spinner.classList.remove('hidden');
  resultBox.style.display = 'none';
  
  // Simulate API call (replace with actual verification logic)
  setTimeout(() => {
    spinner.classList.add('hidden');
    
    // Sample response - replace with actual verification result
    // For demo purposes, we'll randomly return valid or invalid
    const isValid = Math.random() > 0.3; // 70% chance of valid
    
    if (isValid) {
      const sampleResponse = {
        valid: true,
        name: "John Doe",
        course: "Advanced Web Development",
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        certificateId: "VOC-" + new Date().getFullYear() + "-" + 
          Math.floor(10000 + Math.random() * 90000)
      };
      displayResult(sampleResponse);
    } else {
      displayResult({ valid: false });
    }
  }, 1500);
}

function displayResult(data) {
  const resultBox = document.getElementById('result');
  
  if (data.valid) {
    resultBox.innerHTML = `
      <h3>Certificate Verified Successfully</h3>
      <p class="valid"><i class="fas fa-check-circle"></i> This certificate is valid and authentic</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Course:</strong> ${data.course}</p>
      <p><strong>Date Issued:</strong> ${data.date}</p>
      <p><strong>Certificate ID:</strong> ${data.certificateId}</p>
      <div class="certificate-actions">
        <button class="download-btn">
          <i class="fas fa-download"></i> Download Certificate
        </button>
        <button class="share-btn">
          <i class="fas fa-share-alt"></i> Share
        </button>
      </div>
    `;
  } else {
    resultBox.innerHTML = `
      <h3>Verification Failed</h3>
      <p class="invalid"><i class="fas fa-times-circle"></i> This certificate could not be verified</p>
      <p>Please check the information you entered or contact support if you believe this is an error.</p>
      <div class="support-contact">
        <p>Need help? <a href="mailto:support@vaultofcodes.com">Contact support</a></p>
      </div>
    `;
  }
  
  resultBox.style.display = 'block';
  
  // Add event listeners to any dynamically created buttons
  const downloadBtn = resultBox.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('Download feature would be implemented here');
    });
  }
  
  const shareBtn = resultBox.querySelector('.share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      showToast('Share feature would be implemented here');
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}