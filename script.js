const treinos = [
  {
    dia: "DIA 1 – Fullbody A (ênfase Peito/Tríceps)",
    tecnica: "Pré-exaustão + Reverse Pyramid",
    objetivo: "Estímulo global com foco em peito e tríceps",
    exercicios: [
      { nome: "Crossover polia baixa", series: "3", reps: "15", tecnica: "Pré-exaustão", obs: "Alongamento completo" },
      { nome: "Supino reto barra", series: "4", reps: "6-8-10-12", tecnica: "Reverse pyramid", obs: "Reduz carga a cada série" },
      { nome: "Agachamento frontal", series: "3", reps: "10", tecnica: "-", obs: "Core firme e postura ereta" },
      { nome: "Remada baixa máquina", series: "3", reps: "10", tecnica: "Cadência 3-0-2", obs: "Controle na fase excêntrica" },
      { nome: "Tríceps francês barra W", series: "3", reps: "12", tecnica: "-", obs: "Cotovelos estáveis" },
      { nome: "Rosca direta barra", series: "3", reps: "12", tecnica: "-", obs: "Pico na contração" },
      { nome: "Prancha com elevação de pernas", series: "3", reps: "30s + 15", tecnica: "Bi-set", obs: "Core ativo" }
    ]
  },
  {
    dia: "DIA 2 – Fullbody B (ênfase Costas/Bíceps)",
    tecnica: "Cluster set + Drop-set",
    objetivo: "Espessura dorsal e pico de bíceps",
    exercicios: [
      { nome: "Puxada frente pegada supinada", series: "4", reps: "10", tecnica: "Cadência 3-1-1", obs: "Controle no retorno" },
      { nome: "Remada curvada barra", series: "3", reps: "8", tecnica: "Cluster set", obs: "4x2 reps com pausas curtas" },
      { nome: "Stiff com halteres", series: "3", reps: "10", tecnica: "3s descida", obs: "Explosivo na subida" },
      { nome: "Supino inclinado halteres", series: "3", reps: "10", tecnica: "-", obs: "Peitoral superior ativo" },
      { nome: "Rosca direta barra", series: "3", reps: "10", tecnica: "Drop-set final", obs: "Última série até falha" },
      { nome: "Rosca alternada inclinada", series: "3", reps: "12", tecnica: "-", obs: "Rotação completa" },
      { nome: "Crunch com peso + prancha", series: "3", reps: "15 + 30s", tecnica: "Bi-set", obs: "Core completo" }
    ]
  },
  {
    dia: "DIA 3 – Fullbody C (ênfase Pernas/Core)",
    tecnica: "Tensão contínua + Isometria",
    objetivo: "Ênfase em inferiores com estímulo global",
    exercicios: [
      { nome: "Agachamento livre", series: "4", reps: "8-10", tecnica: "-", obs: "Foco em técnica perfeita" },
      { nome: "Passada com halteres", series: "3", reps: "10/10", tecnica: "-", obs: "Controle profundo" },
      { nome: "Supino inclinado barra", series: "3", reps: "8", tecnica: "-", obs: "Força máxima" },
      { nome: "Remada unilateral halter", series: "3", reps: "12", tecnica: "-", obs: "Conexão mente-músculo" },
      { nome: "Elevação lateral halteres", series: "3", reps: "12", tecnica: "-", obs: "Amplitude total" },
      { nome: "Tríceps corda", series: "3", reps: "12-15", tecnica: "-", obs: "Última até falha" },
      { nome: "Prancha lateral + abdominal oblíquo", series: "3", reps: "30s + 15", tecnica: "Bi-set", obs: "Estabilidade do core" }
    ]
  },
  {
    dia: "DIA 4 – Fullbody D (ênfase Ombros/Braços)",
    tecnica: "Supersérie + Pump",
    objetivo: "Densidade estética de ombros e braços",
    exercicios: [
      { nome: "Desenvolvimento halteres", series: "4", reps: "8-10", tecnica: "-", obs: "Amplitude total" },
      { nome: "Elevação lateral + frontal", series: "3", reps: "12+12", tecnica: "Supersérie", obs: "Sem descanso" },
      { nome: "Supino reto halteres", series: "3", reps: "10", tecnica: "-", obs: "Foco em contração" },
      { nome: "Rosca direta + martelo", series: "3", reps: "10+10", tecnica: "Bi-set", obs: "Pump de bíceps" },
      { nome: "Tríceps francês + tríceps banco", series: "3", reps: "12+falha", tecnica: "Bi-set", obs: "Exaustão final" },
      { nome: "Crossover 3 ângulos", series: "3", reps: "15", tecnica: "Pump final", obs: "Estético total" },
      { nome: "Abdominal supra com peso", series: "3", reps: "15", tecnica: "-", obs: "Controle de lombar" }
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







