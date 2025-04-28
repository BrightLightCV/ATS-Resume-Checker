function checkResume() {
  const fileInput = document.getElementById('fileInput');
  const result = document.getElementById('result');

  if (!fileInput.files.length) {
    result.innerText = 'Please upload a resume file.';
    return;
  }

  const fileName = fileInput.files[0].name;
  if (fileName.endsWith('.pdf') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    result.innerText = 'Resume uploaded successfully! Basic ATS check passed.';
  } else {
    result.innerText = 'Unsupported file format. Please upload a PDF or Word document.';
  }
}
