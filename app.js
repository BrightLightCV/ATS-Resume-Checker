function checkResume() {
  const fileInput = document.getElementById('fileInput');
  const scoreDiv = document.getElementById('score');
  const scoreSection = document.getElementById('scoreSection');
  const feedbackDiv = document.getElementById('feedback');

  if (fileInput.files.length === 0) {
    alert('Please upload your resume file!');
    return;
  }

  const file = fileInput.files[0];
  let score = 0;
  let feedback = '';

  const allowedTypes = {
    'application/pdf': 70,
    'application/msword': 85, // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 95 // .docx
  };

  if (allowedTypes[file.type]) {
    score = allowedTypes[file.type];
    feedback = 'Good job! Try to optimize keywords for better ATS results.';
  } else {
    score = 40;
    feedback = 'Unsupported file type for ATS systems. Please upload PDF, DOC, or DOCX.';
  }

  scoreSection.style.display = 'block';
  scoreDiv.textContent = `${score}%`;
  feedbackDiv.textContent = feedback;
}
