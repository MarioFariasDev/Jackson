const treinos = [
  {
    dia: "DIA 1 – PEITO + TRÍCEPS + CORE",
    tecnica: "Superset + Isometria final",
    objetivo: "Explosão de força e volume",
    exercicios: [
      { nome: "Supino reto barra + Flexão explosiva", series: "4", reps: "8+10", tecnica: "Superset", obs: "" },
      { nome: "Supino inclinado halteres", series: "3", reps: "10", tecnica: "Cadência 3-0-1", obs: "" },
      { nome: "Crossover polia baixa", series: "3", reps: "12", tecnica: "Isometria final 10s", obs: "" },
      { nome: "Tríceps corda", series: "3", reps: "12", tecnica: "Rest-pause na última", obs: "" },
      { nome: "Tríceps mergulho paralela", series: "3", reps: "8-10", tecnica: "", obs: "" },
      { nome: "Abdominal infra com bola", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Prancha dinâmica", series: "3", reps: "30s", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 2 – COSTAS + BÍCEPS",
    tecnica: "Bi-set + Rest-pause",
    objetivo: "Densidade e força de puxada",
    exercicios: [
      { nome: "Puxada frente pegada supinada", series: "4", reps: "10", tecnica: "", obs: "" },
      { nome: "Remada curvada + Pullover", series: "3", reps: "10+12", tecnica: "Bi-set", obs: "" },
      { nome: "Remada unilateral halteres", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Rosca direta barra", series: "3", reps: "10", tecnica: "Rest-pause", obs: "" },
      { nome: "Rosca 21", series: "3", reps: "21", tecnica: "7 baixa, 7 alta, 7 completa", obs: "" },
      { nome: "Encolhimento halteres", series: "4", reps: "20", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 3 – PERNAS COMPLETAS",
    tecnica: "Superset + Drop-set",
    objetivo: "Volume, simetria e resistência",
    exercicios: [
      { nome: "Agachamento livre", series: "4", reps: "10", tecnica: "Cadência 3-0-1", obs: "" },
      { nome: "Avanço + Cadeira extensora", series: "3", reps: "12+15", tecnica: "Superset", obs: "" },
      { nome: "Cadeira flexora", series: "3", reps: "12", tecnica: "Drop-set na última", obs: "" },
      { nome: "Stiff com barra", series: "3", reps: "10", tecnica: "", obs: "" },
      { nome: "Glúteo 4 apoios polia", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Panturrilha em pé", series: "5", reps: "20", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 4 – OMBROS + CORE + CORRIDA",
    tecnica: "Circuito + Superset",
    objetivo: "Estética e condicionamento",
    exercicios: [
      { nome: "Desenvolvimento militar barra", series: "4", reps: "10", tecnica: "", obs: "" },
      { nome: "Elevação lateral + Elevação frontal", series: "3", reps: "12+12", tecnica: "Superset", obs: "" },
      { nome: "Crucifixo inverso polia", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Encolhimento halteres", series: "3", reps: "20", tecnica: "", obs: "" },
      { nome: "Abdominal lateral com halteres", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Prancha frontal + prancha lateral", series: "3", reps: "30s cada", tecnica: "Circuito", obs: "" },
      { nome: "Corrida leve", series: "-", reps: "5km", tecnica: "Ritmo regenerativo", obs: "" }
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




