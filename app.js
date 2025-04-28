function checkResume() {
  const fileInput = document.getElementById('fileInput');
  const resultDiv = document.getElementById('result');

  if (fileInput.files.length === 0) {
    resultDiv.innerHTML = 'Please upload a file first.';
    return;
  }

  const file = fileInput.files[0];
  const allowedTypes = ['application/pdf', 
                        'application/msword', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  if (allowedTypes.includes(file.type)) {
    resultDiv.innerHTML = '✅ Your resume format is compatible with ATS.';
  } else {
    resultDiv.innerHTML = '❌ Unsupported file type. Please upload a PDF, DOC, or DOCX file.';
  }
}
