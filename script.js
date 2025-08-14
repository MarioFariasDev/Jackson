const treinos = [
  {
    dia: "DIA 1 – PEITO + TRÍCEPS + CORE",
    tecnica: "FST-7 no final + Cadência",
    objetivo: "Estimular volume e vascularização",
    exercicios: [
      { nome: "Supino inclinado com barra", series: "4", reps: "10", tecnica: "", obs: "" },
      { nome: "Supino reto com halteres", series: "3", reps: "10", tecnica: "Cadência 3s descida", obs: "" },
      { nome: "Crossover polia alta", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Tríceps testa com barra", series: "3", reps: "10", tecnica: "", obs: "" },
      { nome: "Tríceps francês unilateral", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Crucifixo máquina", series: "7", reps: "12", tecnica: "FST-7", obs: "30s descanso" },
      { nome: "Abdominal canivete", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Prancha com apoio frontal", series: "3", reps: "40s", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 2 – COSTAS + BÍCEPS",
    tecnica: "Rest-pause + Bi-set",
    objetivo: "Densidade e pico de bíceps",
    exercicios: [
      { nome: "Barra fixa assistida", series: "4", reps: "8", tecnica: "", obs: "" },
      { nome: "Remada baixa na polia", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Pullover com halteres", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Rosca direta + Rosca alternada", series: "3", reps: "10+10", tecnica: "Bi-set", obs: "" },
      { nome: "Rosca concentrada unilateral", series: "3", reps: "10", tecnica: "Rest-pause", obs: "" },
      { nome: "Encolhimento na máquina", series: "4", reps: "15", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 3 – PERNAS COMPLETAS",
    tecnica: "Drop-set + Foco unilateral",
    objetivo: "Volume e simetria dos MMII",
    exercicios: [
      { nome: "Leg press 45°", series: "4", reps: "12", tecnica: "Drop-set na última", obs: "" },
      { nome: "Agachamento búlgaro", series: "3", reps: "10 cada perna", tecnica: "", obs: "" },
      { nome: "Cadeira extensora", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Cadeira flexora", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Stiff com halteres", series: "3", reps: "10", tecnica: "", obs: "" },
      { nome: "Glúteo com caneleira", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Panturrilha no leg press", series: "4", reps: "20", tecnica: "", obs: "" }
    ]
  },
  {
    dia: "DIA 4 – OMBROS + CORE + CORRIDA",
    tecnica: "Circuito + Drop-set",
    objetivo: "Estética, resistência e definição",
    exercicios: [
      { nome: "Desenvolvimento na máquina", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Elevação lateral", series: "3", reps: "15/10/8", tecnica: "Drop-set", obs: "" },
      { nome: "Crucifixo inverso no peck deck", series: "3", reps: "12", tecnica: "", obs: "" },
      { nome: "Encolhimento com barra por trás", series: "3", reps: "20", tecnica: "", obs: "" },
      { nome: "Abdominal com anilha", series: "3", reps: "15", tecnica: "", obs: "" },
      { nome: "Prancha lateral com rotação", series: "3", reps: "30s", tecnica: "", obs: "" },
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



