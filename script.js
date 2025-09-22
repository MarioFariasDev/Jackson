const treinos = [
  {
    dia: "DIA 1 – Fullbody A (ênfase Peito/Tríceps)",
    tecnica: "Pré-exaustão + Reverse Pyramid",
    objetivo: "Estímulo global com foco em peito e tríceps",
    exercicios: [
      ["Crossover polia baixa", "3", "15", "Pré-exaustão", "Alongamento completo"],
      ["Supino reto barra", "4", "6-8-10-12", "Reverse pyramid", "Reduz carga a cada série"],
      ["Agachamento frontal", "3", "10", "-", "Core firme e postura ereta"],
      ["Remada baixa máquina", "3", "10", "Cadência 3-0-2", "Controle na fase excêntrica"],
      ["Tríceps francês barra W", "3", "12", "-", "Cotovelos estáveis"],
      ["Rosca direta barra", "3", "12", "-", "Pico na contração"],
      ["Prancha com elevação de pernas", "3", "30s + 15", "Bi-set", "Core ativo"]
    ]
  },
  {
    dia: "DIA 2 – Fullbody B (ênfase Costas/Bíceps)",
    tecnica: "Cluster set + Drop-set",
    objetivo: "Espessura dorsal e pico de bíceps",
    exercicios: [
      ["Puxada frente pegada supinada", "4", "10", "Cadência 3-1-1", "Controle no retorno"],
      ["Remada curvada barra", "3", "8", "Cluster set", "4x2 reps com pausas curtas"],
      ["Stiff com halteres", "3", "10", "3s descida", "Explosivo na subida"],
      ["Supino inclinado halteres", "3", "10", "-", "Peitoral superior ativo"],
      ["Rosca direta barra", "3", "10", "Drop-set final", "Última série até falha"],
      ["Rosca alternada inclinada", "3", "12", "-", "Rotação completa"],
      ["Crunch com peso + prancha", "3", "15 + 30s", "Bi-set", "Core completo"]
    ]
  },
  {
    dia: "DIA 3 – Fullbody C (ênfase Pernas/Core)",
    tecnica: "Tensão contínua + Isometria",
    objetivo: "Ênfase em inferiores com estímulo global",
    exercicios: [
      ["Agachamento livre", "4", "8-10", "-", "Foco em técnica perfeita"],
      ["Passada com halteres", "3", "10/10", "-", "Controle profundo"],
      ["Supino inclinado barra", "3", "8", "-", "Força máxima"],
      ["Remada unilateral halter", "3", "12", "-", "Conexão mente-músculo"],
      ["Elevação lateral halteres", "3", "12", "-", "Amplitude total"],
      ["Tríceps corda", "3", "12-15", "-", "Última até falha"],
      ["Prancha lateral + abdominal oblíquo", "3", "30s + 15", "Bi-set", "Estabilidade do core"]
    ]
  },
  {
    dia: "DIA 4 – Fullbody D (ênfase Ombros/Braços)",
    tecnica: "Supersérie + Pump",
    objetivo: "Densidade estética de ombros e braços",
    exercicios: [
      ["Desenvolvimento halteres", "4", "8-10", "-", "Amplitude total"],
      ["Elevação lateral + frontal", "3", "12+12", "Supersérie", "Sem descanso"],
      ["Supino reto halteres", "3", "10", "-", "Foco em contração"],
      ["Rosca direta + martelo", "3", "10+10", "Bi-set", "Pump de bíceps"],
      ["Tríceps francês + tríceps banco", "3", "12+falha", "Bi-set", "Exaustão final"],
      ["Crossover 3 ângulos", "3", "15", "Pump final", "Estético total"],
      ["Abdominal supra com peso", "3", "15", "-", "Controle de lombar"]
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






