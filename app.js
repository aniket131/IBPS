
const TOTAL_TIME_SECONDS = 40 * 60;
const CORRECT_MARK = 1;
const WRONG_MARK = -0.25;
const PRACTICE_PASS_SCORE = 30; // 60% of 50. Practice benchmark only.
const HISTORY_KEY = "nainaIbpsMockAttemptsV1";

let currentIndex = 0;
let responses = Array(QUESTIONS.length).fill(null);
let status = Array(QUESTIONS.length).fill("unanswered");
let secondsLeft = TOTAL_TIME_SECONDS;
let timerId = null;
let candidateName = "Naina Dalvi";
let latestAttempt = null;

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
const passFailBanner = $("passFailBanner");
const resultSummary = $("resultSummary");
const sectionResults = $("sectionResults");
const restartBtn = $("restartBtn");
const reviewAnswersBtn = $("reviewAnswersBtn");
const answerReview = $("answerReview");
const progressLabel = $("progressLabel");
const progressFill = $("progressFill");
const sectionCountLabel = $("sectionCountLabel");
const copySummaryBtn = $("copySummaryBtn");
const downloadReportBtn = $("downloadReportBtn");
const printBtn = $("printBtn");
const copyStatus = $("copyStatus");
const historyBtn = $("historyBtn");
const historyModal = $("historyModal");
const closeHistoryBtn = $("closeHistoryBtn");
const closeHistoryBtn2 = $("closeHistoryBtn2");
const historyContent = $("historyContent");
const clearHistoryBtn = $("clearHistoryBtn");

const welcomeVoice = $("welcomeVoice");
const startChime = $("startChime");
const submitChime = $("submitChime");
const resultChime = $("resultChime");
const resultVoice = $("resultVoice");

const sections = [...new Set(QUESTIONS.map(q => q.section))];

function safePlay(audio, delay=0){
  if(!audio) return;
  const run = () => {
    try{
      audio.currentTime = 0;
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(()=>{});
    }catch(e){}
  };
  if(delay > 0) setTimeout(run, delay);
  else run();
}

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

function formatDate(iso){
  return new Date(iso).toLocaleString("en-IN", {
    year:"numeric", month:"short", day:"2-digit",
    hour:"2-digit", minute:"2-digit"
  });
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
  if(currentIndex < QUESTIONS.length-1) goNext();
  else renderQuestion();
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
  candidateName = "Naina Dalvi";
  candidateLabel.textContent = `Candidate: ${candidateName}`;
  sideCandidateName.textContent = candidateName;

  safePlay(startChime);
  safePlay(welcomeVoice, 250);

  showScreen(testScreen);
  renderQuestion();
  startTimer();
};

submitBtn.onclick = () => {
  safePlay(submitChime);
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

function getHistory(){
  try{
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  }catch(e){
    return [];
  }
}

function saveAttempt(attempt){
  const history = getHistory();
  history.unshift(attempt);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 25)));
}

function buildAttempt(auto, r, attempted, accuracy, used){
  return {
    id: `NAINA-${Date.now()}`,
    candidate: candidateName,
    date: new Date().toISOString(),
    autoSubmitted: auto,
    total: QUESTIONS.length,
    attempted,
    correct: r.correct,
    wrong: r.wrong,
    unanswered: r.unanswered,
    score: Number(r.score.toFixed(2)),
    accuracy: Number(accuracy.toFixed(2)),
    timeUsedSeconds: used,
    status: r.score >= PRACTICE_PASS_SCORE ? "PASS" : "FAIL",
    benchmark: PRACTICE_PASS_SCORE,
    sectionStats: r.sectionStats,
    responses: [...responses]
  };
}

function submitTest(auto){
  if(timerId) clearInterval(timerId);

  if(responses[currentIndex] !== null && status[currentIndex] === "unanswered"){
    status[currentIndex] = "answered";
  }

  const r = scoreTest();
  const attempted = r.correct + r.wrong;
  const accuracy = attempted ? (r.correct / attempted * 100) : 0;
  const used = TOTAL_TIME_SECONDS - secondsLeft;

  latestAttempt = buildAttempt(auto, r, attempted, accuracy, used);
  saveAttempt(latestAttempt);

  const passed = latestAttempt.status === "PASS";
  passFailBanner.innerHTML = `
    <div class="passfail-banner ${passed ? "pass" : "fail"}">
      <div>
        <h2>${passed ? "Great work, Naina!" : "Keep going, Naina!"}</h2>
        <p>${passed
          ? `You crossed the practice benchmark of ${PRACTICE_PASS_SCORE}/50. Keep improving your speed and accuracy.`
          : `This attempt is below the practice benchmark of ${PRACTICE_PASS_SCORE}/50. Review the weak areas and try again — improvement comes one mock at a time.`
        }</p>
      </div>
      <div class="passfail-badge">${latestAttempt.status}</div>
    </div>
  `;

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
  copyStatus.textContent = "";
  showScreen(resultScreen);

  safePlay(resultChime);
  safePlay(resultVoice, 450);
}

function buildAnswerReviewHtml(attempt = latestAttempt){
  if(!attempt) return "";
  return QUESTIONS.map((q, i) => {
    const selected = attempt.responses[i];
    const user = selected === null
      ? "Not answered"
      : `${String.fromCharCode(65+selected)}. ${q.options[selected]}`;
    const correct = `${String.fromCharCode(65+q.answer)}. ${q.options[q.answer]}`;
    const ok = selected === q.answer;
    return `
      <div class="review-item">
        <div style="font-weight:800;margin-bottom:6px">Q${q.id}. ${q.question}</div>
        <div>Your answer: <span class="${ok ? 'correct' : 'wrong'}">${user}</span></div>
        <div>Correct answer: <span class="correct">${correct}</span></div>
      </div>`;
  }).join("");
}

reviewAnswersBtn.onclick = () => {
  if(answerReview.style.display === "block"){
    answerReview.style.display = "none";
    return;
  }
  answerReview.style.display = "block";
  answerReview.innerHTML = "<h2>Complete Answer Review</h2>" + buildAnswerReviewHtml();
};

function shareSummaryText(attempt){
  if(!attempt) return "";
  const sectionLines = Object.entries(attempt.sectionStats)
    .map(([name,s]) => `${name}: ${s.score.toFixed(2)}/${s.total} (${s.correct} correct, ${s.wrong} wrong)`)
    .join("\n");

  return `IBPS Mock Test for Naina Dalvi
Date: ${formatDate(attempt.date)}
Practice Result: ${attempt.status}
Score: ${attempt.score.toFixed(2)}/50
Accuracy: ${attempt.accuracy.toFixed(2)}%
Attempted: ${attempt.attempted}/50
Correct: ${attempt.correct}
Wrong: ${attempt.wrong}
Unanswered: ${attempt.unanswered}
Time Used: ${fmtTime(attempt.timeUsedSeconds)}

Section-wise:
${sectionLines}

Practice benchmark: ${PRACTICE_PASS_SCORE}/50 (not an official IBPS cutoff)

Keep going, Naina — one mock at a time.`;
}

copySummaryBtn.onclick = async () => {
  const text = shareSummaryText(latestAttempt);
  try{
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Result summary copied. You can paste it into WhatsApp, email, or any message.";
  }catch(e){
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    copyStatus.textContent = "Result summary copied.";
  }
};

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

function downloadFullReport(attempt){
  if(!attempt) return;

  const answerRows = QUESTIONS.map((q,i) => {
    const selected = attempt.responses[i];
    const user = selected === null ? "Not answered" : `${String.fromCharCode(65+selected)}. ${q.options[selected]}`;
    const correct = `${String.fromCharCode(65+q.answer)}. ${q.options[q.answer]}`;
    const state = selected === q.answer ? "Correct" : selected === null ? "Unanswered" : "Wrong";
    return `<tr>
      <td>${q.id}</td>
      <td>${escapeHtml(q.section)}</td>
      <td>${escapeHtml(q.question)}</td>
      <td>${escapeHtml(user)}</td>
      <td>${escapeHtml(correct)}</td>
      <td>${state}</td>
    </tr>`;
  }).join("");

  const sectionRows = Object.entries(attempt.sectionStats).map(([name,s]) => `
    <tr>
      <td>${escapeHtml(name)}</td>
      <td>${s.total}</td>
      <td>${s.correct}</td>
      <td>${s.wrong}</td>
      <td>${s.unanswered}</td>
      <td>${s.score.toFixed(2)}</td>
    </tr>`).join("");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Naina Dalvi - IBPS Mock Result</title>
<style>
body{font-family:Arial,sans-serif;margin:32px;color:#172033}
h1{color:#0b1f3a}.banner{padding:16px;border-radius:10px;background:${attempt.status==="PASS"?"#ecfdf5":"#fff7ed"};margin:16px 0}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0}
.metric{border:1px solid #dbe3ee;border-radius:8px;padding:12px}
.metric b{display:block;font-size:22px}
table{width:100%;border-collapse:collapse;margin:16px 0;font-size:12px}
th,td{border:1px solid #dbe3ee;padding:8px;text-align:left;vertical-align:top}
th{background:#f4f7fb}
.small{font-size:12px;color:#64748b}
</style></head><body>
<h1>IBPS Mock Test for Naina Dalvi</h1>
<div class="small">Attempt: ${escapeHtml(attempt.id)} • ${escapeHtml(formatDate(attempt.date))}</div>
<div class="banner"><b>Practice Result: ${attempt.status}</b><br>Practice benchmark: ${PRACTICE_PASS_SCORE}/50. This is not an official IBPS cutoff.</div>
<div class="grid">
<div class="metric"><b>${attempt.score.toFixed(2)}</b>Score / 50</div>
<div class="metric"><b>${attempt.accuracy.toFixed(2)}%</b>Accuracy</div>
<div class="metric"><b>${attempt.correct}</b>Correct</div>
<div class="metric"><b>${attempt.wrong}</b>Wrong</div>
<div class="metric"><b>${attempt.unanswered}</b>Unanswered</div>
<div class="metric"><b>${attempt.attempted}</b>Attempted</div>
<div class="metric"><b>${fmtTime(attempt.timeUsedSeconds)}</b>Time Used</div>
<div class="metric"><b>${attempt.status}</b>Practice Status</div>
</div>

<h2>Section-wise Performance</h2>
<table><thead><tr><th>Section</th><th>Total</th><th>Correct</th><th>Wrong</th><th>Unanswered</th><th>Score</th></tr></thead>
<tbody>${sectionRows}</tbody></table>

<h2>Answer-by-Answer Review</h2>
<table><thead><tr><th>Q</th><th>Section</th><th>Question</th><th>Naina's Answer</th><th>Correct Answer</th><th>Status</th></tr></thead>
<tbody>${answerRows}</tbody></table>

<p><b>Keep going, Naina — one mock at a time.</b></p>
<p class="small">Prepared as a personal practice report. Not an official IBPS scorecard.</p>
</body></html>`;

  const blob = new Blob([html], {type:"text/html;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date(attempt.date).toISOString().slice(0,10);
  a.href = url;
  a.download = `Naina_Dalvi_IBPS_Mock_Result_${date}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

downloadReportBtn.onclick = () => downloadFullReport(latestAttempt);
printBtn.onclick = () => {
  if(answerReview.style.display !== "block"){
    answerReview.style.display = "block";
    answerReview.innerHTML = "<h2>Complete Answer Review</h2>" + buildAnswerReviewHtml();
  }
  window.print();
};

function renderHistory(){
  const history = getHistory();
  if(!history.length){
    historyContent.innerHTML = `<div class="history-empty">No attempts saved yet. Naina's submitted tests will appear here.</div>`;
    return;
  }

  const rows = history.map((a, idx) => `
    <tr>
      <td>${idx+1}</td>
      <td>${formatDate(a.date)}</td>
      <td><b>${Number(a.score).toFixed(2)}/50</b></td>
      <td>${Number(a.accuracy).toFixed(2)}%</td>
      <td>${a.correct}</td>
      <td>${a.wrong}</td>
      <td>${a.unanswered}</td>
      <td><span class="${a.status==="PASS"?"history-pass":"history-fail"}">${a.status}</span></td>
    </tr>`).join("");

  historyContent.innerHTML = `
    <div style="overflow:auto">
      <table class="history-table">
        <thead>
          <tr><th>#</th><th>Date</th><th>Score</th><th>Accuracy</th><th>Correct</th><th>Wrong</th><th>Unanswered</th><th>Status</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p style="font-size:12px;color:#64748b;margin-top:12px">
      These records are stored in this browser using local storage. They are not automatically sent to another phone or computer.
    </p>`;
}

historyBtn.onclick = () => {
  renderHistory();
  historyModal.classList.remove("hidden");
};
closeHistoryBtn.onclick = () => historyModal.classList.add("hidden");
closeHistoryBtn2.onclick = () => historyModal.classList.add("hidden");
historyModal.addEventListener("click", e => {
  if(e.target === historyModal) historyModal.classList.add("hidden");
});

clearHistoryBtn.onclick = () => {
  if(confirm("Clear all saved attempt history from this browser?")){
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  }
};

restartBtn.onclick = () => location.reload();
