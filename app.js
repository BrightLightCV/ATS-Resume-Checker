function analyzeCV() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please upload a file.');
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
      // حاليا PDF مش مدعوم بالكامل هنا
      processText("");
    }
  };
  reader.readAsArrayBuffer(file);
}

function processText(text) {
  let score = 100;
  const problems = [];
  const solutions = [];

  // 1. التحقق من الأقسام الأساسية
  const sections = ["experience", "education", "skills", "certifications", "contact"];
  let foundSections = 0;
  sections.forEach(section => {
    if (text.toLowerCase().includes(section)) {
      foundSections++;
    }
  });
  if (foundSections < sections.length) {
    problems.push(`Missing important sections: ${sections.length - foundSections} sections missing.`);
    solutions.push(`Add missing sections: ${sections.join(", ")}.`);
    score -= 20;
  }

  // 2. التحقق من الكلمات المفتاحية
  const keywords = ["project", "team", "managed", "developed", "lead"];
  let foundKeywords = 0;
  keywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      foundKeywords++;
    }
  });
  if (foundKeywords < 3) {
    problems.push("Lack of strong action keywords.");
    solutions.push("Use action verbs like 'managed', 'developed', 'led', etc.");
    score -= 15;
  }

  // 3. التحقق من طول الـ CV
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 300) {
    problems.push("CV is too short (< 300 words).");
    solutions.push("Expand your CV with detailed achievements and experiences.");
    score -= 10;
  } else if (wordCount > 1000) {
    problems.push("CV is too long (> 1000 words).");
    solutions.push("Keep your CV concise, ideally between 1-2 pages.");
    score -= 10;
  }

  // 4. التحقق من وجود صور أو رموز
  const specialChars = /[^a-zA-Z0-9\s.,;:'"()-]/;
  if (specialChars.test(text)) {
    problems.push("Contains special characters or symbols.");
    solutions.push("Remove unnecessary symbols and special characters.");
    score -= 10;
  }

  // تحديث الواجهة
  const progress = document.getElementById('progress');
  progress.style.width = score + "%";
  progress.innerText = score + "%";

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
