const treinos = [
  {
    dia: "DIA 1 – PEITO + TRÍCEPS + CORE",
    tecnica: "Drop-set + Cadência 3s descida",
    objetivo: "Volumizar peitoral e ativar estabilizadores",
    exercicios: [
      ["Supino reto com barra", "4", "10-8-6", "Drop-set na última"],
      ["Supino inclinado com halteres", "3", "10", "Cadência 3s"],
      ["Crucifixo máquina", "3", "12", ""],
      ["Tríceps pulley corda", "3", "15", ""],
      ["Tríceps banco (peso livre)", "3", "10", ""],
      ["Prancha abdominal", "3", "40 seg", ""],
      ["Elevação de pernas", "3", "15", ""]
    ]
  },
  {
    dia: "DIA 2 – COSTAS + BÍCEPS",
    tecnica: "Bi-set + Rest-pause",
    objetivo: "Abertura e densidade dorsal",
    exercicios: [
      ["Puxada frente pegada aberta", "4", "12", ""],
      ["Remada curvada com barra", "3", "10", ""],
      ["Pulldown com triangulo", "3", "12", "Rest-pause"],
      ["Rosca direta com barra", "3", "10", ""],
      ["Rosca martelo + Rosca concentrada", "3", "12+10", "Bi-set"],
      ["Encolhimento halteres", "3", "20", ""]
    ]
  },
  {
    dia: "DIA 3 – PERNAS COMPLETAS",
    tecnica: "Cadência + Bi-set",
    objetivo: "Fortalecimento total de MMII",
    exercicios: [
      ["Agachamento livre", "4", "10", "Cadência 3s"],
      ["Leg press 45° + Cadeira extensora", "3", "12+15", "Bi-set"],
      ["Mesa flexora", "4", "12", ""],
      ["Passada com halteres", "3", "10 cada perna", ""],
      ["Glúteo na polia", "3", "15", ""],
      ["Panturrilha sentada", "4", "20", ""]
    ]
  },
  {
    dia: "DIA 4 – OMBROS + CORE + CORRIDA",
    tecnica: "Circuito + Drop-set",
    objetivo: "Estética, resistência e definição",
    exercicios: [
      ["Elevação lateral + Elevação frontal", "3", "12+12", "Bi-set"],
      ["Desenvolvimento com halteres", "3", "10", "Drop-set na última"],
      ["Remada alta com barra", "3", "12", ""],
      ["Abdominal infra + prancha lateral", "3", "15 + 30s", "Bi-set"],
      ["Corrida leve", "-", "5km", "Ritmo moderado"]
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
