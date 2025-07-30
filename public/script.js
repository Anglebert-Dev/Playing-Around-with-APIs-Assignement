const activityElem = document.getElementById("activity");
const adviceElem = document.getElementById("advice");
const quoteElem = document.getElementById("quote");
const quoteAuthorElem = document.getElementById("quote-author");
const metaElem = document.getElementById("activity-meta");
const errorElem = document.getElementById("error-message");
const historyList = document.getElementById("history-list");

let history = [];

// Load history from localStorage on page load
function loadHistory() {
  const savedHistory = localStorage.getItem("boredomBusterHistory");
  if (savedHistory) {
    history = JSON.parse(savedHistory);
    renderHistory();
  }
}

// Save history to localStorage
function saveHistory() {
  localStorage.setItem("boredomBusterHistory", JSON.stringify(history));
}

function addToHistory(activity, advice, quote) {
  const timestamp = new Date().toLocaleString();
  const historyItem = {
    activity,
    advice,
    quote,
    timestamp,
  };

  history.unshift(historyItem);
  if (history.length > 10) history.pop();

  saveHistory();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((item, i) => {
    const li = document.createElement("li");
    const quoteText = item.quote
      ? `"${item.quote.text}" - ${item.quote.author}`
      : "No quote available";
    li.innerHTML = `
            <div class="history-item">
                <div class="history-content">
                    <strong>Activity:</strong> ${item.activity.activity}<br>
                    <strong>Advice:</strong> ${item.advice}<br>
                    <strong>Quote:</strong> ${quoteText}
                </div>
                <div class="history-timestamp">${item.timestamp}</div>
            </div>
        `;
    historyList.appendChild(li);
  });
}

function showError(msg) {
  errorElem.textContent = msg;
  errorElem.style.display = "block";
}

function clearError() {
  errorElem.textContent = "";
  errorElem.style.display = "none";
}

function getFilters() {
  const type = document.getElementById("type").value;
  const participants = document.getElementById("participants").value;
  const params = [];
  if (type) params.push(`type=${encodeURIComponent(type)}`);
  if (participants)
    params.push(`participants=${encodeURIComponent(participants)}`);
  return params.length ? `?${params.join("&")}` : "";
}

async function fetchInspiration(customFilters) {
  activityElem.textContent = "Loading...";
  adviceElem.textContent = "Loading...";
  quoteElem.textContent = "Loading...";
  quoteAuthorElem.textContent = "";
  metaElem.textContent = "";
  clearError();

  let url = "http://localhost:3000/api/inspire";
  if (customFilters !== undefined) {
    url += customFilters;
  } else {
    url += getFilters();
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch inspiration");
    const data = await res.json();
    const act = data.activity;
    activityElem.textContent = act.activity;
    metaElem.innerHTML = `
            <span><b>Type:</b> ${act.type}</span> | 
            <span><b>Participants:</b> ${act.participants}</span> | 
            <span><b>Duration:</b> ${act.duration || "N/A"}</span>
        `;
    adviceElem.textContent = data.advice;
    quoteElem.textContent = data.quote.text;
    quoteAuthorElem.textContent = `- ${data.quote.author}`;
    addToHistory(act, data.advice, data.quote);
  } catch (err) {
    activityElem.textContent = "Could not load activity.";
    adviceElem.textContent = "Could not load advice.";
    quoteElem.textContent = "Could not load quote.";
    quoteAuthorElem.textContent = "";
    metaElem.textContent = "";
    showError("Could not fetch inspiration. Try again!");
  }
}

document
  .getElementById("refresh-btn")
  .addEventListener("click", () => fetchInspiration());
document.getElementById("controls").addEventListener("submit", (e) => {
  e.preventDefault();
  fetchInspiration();
});

document.getElementById("copy-activity").addEventListener("click", () => {
  const text = activityElem.textContent;
  navigator.clipboard.writeText(text);
  showError("Activity copied!");
  setTimeout(clearError, 1200);
});

document.getElementById("copy-advice").addEventListener("click", () => {
  const text = adviceElem.textContent;
  navigator.clipboard.writeText(text);
  showError("Advice copied!");
  setTimeout(clearError, 1200);
});

document.getElementById("copy-quote").addEventListener("click", () => {
  const text = `${quoteElem.textContent} - ${quoteAuthorElem.textContent}`;
  navigator.clipboard.writeText(text);
  showError("Quote copied!");
  setTimeout(clearError, 1200);
});

// Load history when page loads
loadHistory();

// Initial load
fetchInspiration();
