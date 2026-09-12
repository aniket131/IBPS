
const TOTAL_TIME_SECONDS = 40 * 60;
const CORRECT_MARK = 1;
const WRONG_MARK = -0.25;

let currentIndex = 0;
let responses = Array(QUESTIONS.length).fill(null);
let status = Array(QUESTIONS.length).fill("unanswered");
let secondsLeft = TOTAL_TIME_SECONDS;
let timerId = null;
let candidateName = "";

const $ = id => document.getElementById(id);

const startScreen = $("startScreen");
const testScreen = $("testScreen");
const resultScreen = $("resultScreen");
const startBtn = $("startBtn");
const candidateInput = $("candidateName");
const consentCheck = $("consentCheck");
const candidateLabel = $("candidateLabel");
const sideCandidateName = $("sideCandidateName");
const timerEl = $("timer");
const sectionTabs = $("sectionTabs");
const questionNumber = $("questionNumber");
const questionSection = $("questionSection");
const questionText = $("questionText");
const questionStatusPill = $("questionStatusPill");
const optionsEl = $("options");
const palette = $("palette");
const saveNextBtn = $("saveNextBtn");
const markReviewBtn = $("markReviewBtn");
const clearBtn = $("clearBtn");
const prevBtn = $("prevBtn");
const submitBtn = $("submitBtn");
const resultSummary = $("resultSummary");
const sectionResults = $("sectionResults");
const restartBtn = $("restartBtn");
const reviewAnswersBtn = $("reviewAnswersBtn");
const answerReview = $("answerReview");
const progressLabel = $("progressLabel");
const progressFill = $("progressFill");
const sectionCountLabel = $("sectionCountLabel");

const sections = [...new Set(QUESTIONS.map(q => q.section))];

function showScreen(screen){
  [startScreen, testScreen, resultScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}

function fmtTime(sec){
  sec = Math.max(0, sec);
  const m = Math.floor(sec/60).toString().padStart(2,"0");
  const s = (sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

function updateStartState(){
  startBtn.disabled = !consentCheck.checked;
}
consentCheck.addEventListener("change", updateStartState);

function renderTabs(){
  sectionTabs.innerHTML = "";
  sections.forEach(section => {
    const count = QUESTIONS.filter(q => q.section === section).length;
    const btn = document.createElement("button");
    btn.className = "tab" + (QUESTIONS[currentIndex].section === section ? " active" : "");
    btn.textContent = `${section} (${count})`;
    btn.onclick = () => {
      const idx = QUESTIONS.findIndex(q => q.section === section);
      if(idx >= 0){
        currentIndex = idx;
        renderQuestion();
      }
    };
    sectionTabs.appendChild(btn);
  });
}

function renderProgress(){
  const answeredCount = responses.filter(v => v !== null).length;
  progressLabel.textContent = `${answeredCount} / ${QUESTIONS.length} answered`;
  progressFill.style.width = `${(answeredCount / QUESTIONS.length) * 100}%`;
}

function renderPalette(){
  palette.innerHTML = "";
  QUESTIONS.forEach((q, idx) => {
    const b = document.createElement("button");
    b.className = "qbtn";
    if(status[idx] === "answered") b.classList.add("answered");
    if(status[idx] === "review") b.classList.add("review");
    if(idx === currentIndex) b.classList.add("current");
    b.textContent = q.id;
    b.title = `Question ${q.id}`;
    b.onclick = () => {
      currentIndex = idx;
      renderQuestion();
    };
    palette.appendChild(b);
  });

  const currentSection = QUESTIONS[currentIndex].section;
  const sectionQuestions = QUESTIONS.filter(q => q.section === currentSection);
  sectionCountLabel.textContent = `${sectionQuestions.length} questions`;
}

function renderStatusPill(){
  const st = status[currentIndex];
  questionStatusPill.className = "status-pill";
  if(st === "answered"){
    questionStatusPill.classList.add("answered");
    questionStatusPill.textContent = "Answered";
  } else if(st === "review"){
    questionStatusPill.classList.add("review");
    questionStatusPill.textContent = "Marked for Review";
  } else {
    questionStatusPill.classList.add("neutral");
    questionStatusPill.textContent = "Not Answered";
  }
}

function renderQuestion(){
  const q = QUESTIONS[currentIndex];
  questionNumber.textContent = `Question ${q.id} of ${QUESTIONS.length}`;
  questionSection.textContent = q.section;
  questionText.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    radio.checked = responses[currentIndex] === i;
    radio.onchange = () => {
      responses[currentIndex] = i;
      renderProgress();
    };

    const span = document.createElement("span");
    span.textContent = `${String.fromCharCode(65+i)}. ${opt}`;

    label.appendChild(radio);
    label.appendChild(span);
    optionsEl.appendChild(label);
  });

  prevBtn.disabled = currentIndex === 0;
  saveNextBtn.textContent = currentIndex === QUESTIONS.length-1 ? "Save Answer" : "Save & Next";

  renderTabs();
  renderPalette();
  renderProgress();
  renderStatusPill();
}

function goNext(){
  if(currentIndex < QUESTIONS.length-1){
    currentIndex++;
    renderQuestion();
  }
}

saveNextBtn.onclick = () => {
  status[currentIndex] = responses[currentIndex] !== null ? "answered" : "unanswered";
  renderProgress();
  if(currentIndex < QUESTIONS.length-1) goNext();
  else renderQuestion();
};

markReviewBtn.onclick = () => {
  status[currentIndex] = "review";
  renderProgress();
  goNext();
};

clearBtn.onclick = () => {
  responses[currentIndex] = null;
  status[currentIndex] = "unanswered";
  renderQuestion();
};

prevBtn.onclick = () => {
  if(currentIndex > 0){
    currentIndex--;
    renderQuestion();
  }
};

function startTimer(){
  timerEl.textContent = fmtTime(secondsLeft);
  timerId = setInterval(() => {
    secondsLeft--;
    timerEl.textContent = fmtTime(secondsLeft);

    if(secondsLeft <= 300){
      timerEl.style.color = "#b91c1c";
    }

    if(secondsLeft <= 0){
      clearInterval(timerId);
      submitTest(true);
    }
  },1000);
}

startBtn.onclick = () => {
  candidateName = candidateInput.value.trim() || "Candidate";
  candidateLabel.textContent = `Candidate: ${candidateName}`;
  sideCandidateName.textContent = candidateName;
  showScreen(testScreen);
  renderQuestion();
  startTimer();
};

submitBtn.onclick = () => {
  if(confirm("Are you sure you want to submit the test now?")){
    submitTest(false);
  }
};

function scoreTest(){
  let correct = 0, wrong = 0, unanswered = 0;
  const sectionStats = {};
  sections.forEach(s => sectionStats[s] = {total:0, correct:0, wrong:0, unanswered:0, score:0});

  QUESTIONS.forEach((q, i) => {
    const s = sectionStats[q.section];
    s.total++;

    if(responses[i] === null){
      unanswered++;
      s.unanswered++;
    } else if(responses[i] === q.answer){
      correct++;
      s.correct++;
      s.score += CORRECT_MARK;
    } else {
      wrong++;
      s.wrong++;
      s.score += WRONG_MARK;
    }
  });

  return {
    correct,
    wrong,
    unanswered,
    score: correct * CORRECT_MARK + wrong * WRONG_MARK,
    sectionStats
  };
}

function submitTest(auto){
  if(timerId) clearInterval(timerId);
  const r = scoreTest();
  const attempted = r.correct + r.wrong;
  const accuracy = attempted ? (r.correct / attempted * 100) : 0;
  const used = TOTAL_TIME_SECONDS - secondsLeft;

  resultSummary.innerHTML = `
    ${auto ? '<div class="auto-note">Time completed. The test was automatically submitted.</div>' : ''}
    <div class="metric-grid">
      <div class="metric"><div class="value">${QUESTIONS.length}</div><div>Total Questions</div></div>
      <div class="metric"><div class="value">${attempted}</div><div>Attempted</div></div>
      <div class="metric"><div class="value">${r.correct}</div><div>Correct</div></div>
      <div class="metric"><div class="value">${r.wrong}</div><div>Wrong</div></div>
      <div class="metric"><div class="value">${r.unanswered}</div><div>Unanswered</div></div>
      <div class="metric"><div class="value">${r.score.toFixed(2)}</div><div>Final Score / 50</div></div>
      <div class="metric"><div class="value">${accuracy.toFixed(2)}%</div><div>Accuracy</div></div>
      <div class="metric"><div class="value">${fmtTime(used)}</div><div>Time Used</div></div>
    </div>
  `;

  let rows = "";
  for(const [name, s] of Object.entries(r.sectionStats)){
    rows += `
      <tr>
        <td>${name}</td>
        <td>${s.total}</td>
        <td>${s.correct}</td>
        <td>${s.wrong}</td>
        <td>${s.unanswered}</td>
        <td><b>${s.score.toFixed(2)}</b></td>
      </tr>`;
  }

  sectionResults.innerHTML = `
    <div style="overflow:auto">
      <table class="section-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Total</th>
            <th>Correct</th>
            <th>Wrong</th>
            <th>Unanswered</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  answerReview.innerHTML = "";
  answerReview.style.display = "none";
  showScreen(resultScreen);
}

reviewAnswersBtn.onclick = () => {
  if(answerReview.style.display === "block"){
    answerReview.style.display = "none";
    return;
  }

  answerReview.style.display = "block";
  answerReview.innerHTML = "<h2>Answer Review</h2>";

  QUESTIONS.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "review-item";

    const user = responses[i] === null
      ? "Not answered"
      : `${String.fromCharCode(65+responses[i])}. ${q.options[responses[i]]}`;

    const correct = `${String.fromCharCode(65+q.answer)}. ${q.options[q.answer]}`;
    const ok = responses[i] === q.answer;

    div.innerHTML = `
      <div style="font-weight:800;margin-bottom:6px">Q${q.id}. ${q.question}</div>
      <div>Your answer: <span class="${ok ? 'correct' : 'wrong'}">${user}</span></div>
      <div>Correct answer: <span class="correct">${correct}</span></div>
    `;
    answerReview.appendChild(div);
  });
};

restartBtn.onclick = () => location.reload();
