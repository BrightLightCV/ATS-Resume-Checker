function analyzeCV() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please upload a file.');
    return;
  }

  const problems = [];
  const solutions = [];
  let score = 100;

  // Check file type
  if (file.type === "application/pdf") {
    score = 70;
  } else if (file.name.endsWith(".docx")) {
    score = 95;
  } else {
    alert('Unsupported file type.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const arrayBuffer = event.target.result;

    if (file.name.endsWith(".docx")) {
      mammoth.extractRawText({ arrayBuffer: arrayBuffer })
        .then(function(result) {
          processText(result.value);
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      processText(""); // PDF placeholder
    }
  };
  
  reader.readAsArrayBuffer(file);

  function processText(text) {
    // 1. Check for images
    if (text.includes("Graphic") || text.includes("Image")) {
      problems.push("Contains images.");
      solutions.push("Remove all images from your CV.");
      score -= 10;
    }

    // 2. Check for symbols
    const symbolRegex = /[^\w\s.,'-]/g;
    if (symbolRegex.test(text)) {
      problems.push("Contains special symbols.");
      solutions.push("Remove unnecessary special characters.");
      score -= 5;
    }

    // 3. Check if keywords exist
    const keywords = ["experience", "skills", "education", "certifications", "projects"];
    let foundKeywords = 0;
    keywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) {
        foundKeywords++;
      }
    });
    if (foundKeywords < 3) {
      problems.push("Missing important keywords.");
      solutions.push("Add sections like Experience, Skills, Education, Projects.");
      score -= 15;
    }

    // Display results
    document.getElementById('score').innerText = score + "%";
    
    const problemsList = document.getElementById('problemsList');
    problemsList.innerHTML = "";
    problems.forEach(problem => {
      const li = document.createElement('li');
      li.innerText = problem;
      problemsList.appendChild(li);
    });

    const solutionsList = document.getElementById('solutionsList');
    solutionsList.innerHTML = "";
    solutions.forEach(solution => {
      const li = document.createElement('li');
      li.innerText = solution;
      solutionsList.appendChild(li);
    });
  }
}
