const treinos = [
  {
    dia: "DIA 1 – PEITO + TRÍCEPS + CORE",
    tecnica: "Drop-set + Cadência 3s descida",
    objetivo: "Volumizar peitoral e ativar estabilizadores",
    exercicios: [
      { nome: "Supino reto com barra", series: "4", reps: "10-8-6", tecnica: "Drop-set na última", obs: "" },
      { nome: "Supino inclinado com halteres", series: "3", reps: "10", tecnica: "Cadência 3s", obs: "" },
      { nome: "Crucifixo máquina", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Tríceps pulley corda", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Tríceps banco (peso livre)", series: "3", reps: "10", tecnica: "", obs: "" },
      { nome: "Prancha abdominal", series: "3", reps: "40 seg", tecnica: "", obs: "" },
      { nome: "Elevação de pernas", series: "3", reps: "15", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 2 – COSTAS + BÍCEPS",
    tecnica: "Bi-set + Rest-pause",
    objetivo: "Abertura e densidade dorsal",
    exercicios: [
      { nome: "Puxada frente pegada aberta", series: "4", reps: "12", tecnica: "", obs: "" },
      { nome: "Remada curvada com barra", series: "3", reps: "10", tecnica: "", obs: "" },
      { nome: "Pulldown com triangulo", series: "3", reps: "12", tecnica: "Rest-pause", obs: "" },
      { nome: "Rosca direta com barra", series: "3", reps: "10", tecnica: "", obs: "" },
      { nome: "Rosca martelo + Rosca concentrada", series: "3", reps: "12+10", tecnica: "Bi-set", obs: "" },
      { nome: "Encolhimento halteres", series: "3", reps: "20", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 3 – PERNAS COMPLETAS",
    tecnica: "Cadência + Bi-set",
    objetivo: "Fortalecimento total de MMII",
    exercicios: [
      { nome: "Agachamento livre", series: "4", reps: "10", tecnica: "Cadência 3s", obs: "" },
      { nome: "Leg press 45° + Cadeira extensora", series: "3", reps: "12+15", tecnica: "Bi-set", obs: "" },
      { nome: "Mesa flexora", series: "4", reps: "12", tecnica: "", obs: "" },
      { nome: "Passada com halteres", series: "3", reps: "10 cada perna", tecnica: "", obs: "" },
      { nome: "Glúteo na polia", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Panturrilha sentada", series: "4", reps: "20", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 4 – OMBROS + CORE + CORRIDA",
    tecnica: "Circuito + Drop-set",
    objetivo: "Estética, resistência e definição",
    exercicios: [
      { nome: "Elevação lateral + Elevação frontal", series: "3", reps: "12+12", tecnica: "Bi-set", obs: "" },
      { nome: "Desenvolvimento com halteres", series: "3", reps: "10", tecnica: "Drop-set na última", obs: "" },
      { nome: "Remada alta com barra", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Abdominal infra + prancha lateral", series: "3", reps: "15 + 30s", tecnica: "Bi-set", obs: "" },
      { nome: "Corrida leve", series: "-", reps: "5km", tecnica: "Ritmo moderado", obs: "Regenerativo" }
    ]
  }
];



// --- RENDERIZAÇÃO DOS TREINOS ---
const treinoContainer = document.getElementById("treinoContainer");
const progresso = JSON.parse(localStorage.getItem("progresso") || "{}");

treinos.forEach((treino, i) => {
  const card = document.createElement("div");
  card.className = "card";

  let html = `
    <h2>${treino.dia}</h2>
    <p><strong>Técnica:</strong> ${treino.tecnica}</p>
    <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
    <table class="exercise-table">
      <thead>
        <tr>
          <th>✔</th>
          <th>Exercício</th>
          <th>Séries</th>
          <th>Reps</th>
          <th>Técnica</th>
          <th>Obs</th>
          <th>Descanso</th>
        </tr>
      </thead>
      <tbody>`;

  treino.exercicios.forEach((ex, j) => {
    const key = `d${i}_e${j}`;
    const checked = progresso[key]?.feito ? "checked" : "";
    const doneClass = progresso[key]?.feito ? "done" : "";

    html += `<tr class="exercise-row ${doneClass}" data-key="${key}">`;
    html += `<td><input type="checkbox" ${checked}></td>`;
    html += `<td>${ex.nome || "-"}</td>`;
    html += `<td>${ex.series || "-"}</td>`;
    html += `<td>${ex.reps || "-"}</td>`;
    html += `<td>${ex.tecnica || "-"}</td>`;
    html += `<td>${ex.obs || "-"}</td>`;
    html += `
      <td>
        <button class="timer-btn" onclick="iniciarTimer(this)">⏱️</button>
        <span class="timer-display">00:00</span>
      </td>
    </tr>`;
  });

  html += `</tbody></table>`;
  card.innerHTML = html;
  treinoContainer.appendChild(card);
});

// --- CHECKBOX PROGRESSO ---
document.querySelectorAll(".exercise-row input[type='checkbox']").forEach(input => {
  input.addEventListener("change", function () {
    const row = this.closest(".exercise-row");
    const key = row.dataset.key;
    const feito = this.checked;
    row.classList.toggle("done", feito);
    progresso[key] = { feito };
    localStorage.setItem("progresso", JSON.stringify(progresso));
  });
});

// --- TIMER POR EXERCÍCIO ---
function iniciarTimer(btn) {
  const span = btn.nextElementSibling;
  let tempo = 60;
  span.textContent = formatar(tempo);
  btn.disabled = true;

  const intervalo = setInterval(() => {
    tempo--;
    span.textContent = formatar(tempo);
    if (tempo <= 0) {
      clearInterval(intervalo);
      btn.disabled = false;
      span.textContent = "✔️";
    }
  }, 1000);
}

function formatar(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
}

// --- FEEDBACK ---
const feedback = document.getElementById("feedback");
const feedbackSalvo = localStorage.getItem("feedbackGlobal");
if (feedbackSalvo) feedback.value = feedbackSalvo;

document.getElementById("salvarFeedback").addEventListener("click", () => {
  localStorage.setItem("feedbackGlobal", feedback.value);
  alert("Feedback salvo com sucesso!");
});
