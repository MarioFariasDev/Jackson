const treinos = [
  {
    dia: "DIA 1 – Peito + Tríceps + Core",
    tecnica: "Pré-exaustão + Rest-pause",
    objetivo: "Densidade máxima em peito e tríceps",
    exercicios: [
      ["Crossover polia baixa", "3", "15", "Pré-exaustão", "Alongamento total"],
      ["Supino reto barra", "4", "10-8-6-6", "Rest-pause na última", "Força máxima"],
      ["Supino inclinado halteres", "3", "10", "-", "Controle e amplitude"],
      ["Tríceps francês halter", "3", "12", "-", "Movimento controlado"],
      ["Tríceps corda", "3", "12-15", "Drop-set final", "Pump no tríceps"],
      ["Prancha com elevação", "3", "30s + 15", "Bi-set", "Core ativo"]
    ]
  },
  {
    dia: "DIA 2 – Costas + Bíceps",
    tecnica: "Drop-set + Cadência lenta",
    objetivo: "Espessura dorsal e pico de bíceps",
    exercicios: [
      ["Puxada frente pegada aberta", "4", "12-10-8-6", "-", "Contração total"],
      ["Remada curvada barra", "4", "8", "Cadência 3-0-1", "Controle no tronco"],
      ["Pulldown supinado", "3", "12", "-", "Sem balanço"],
      ["Rosca direta barra", "4", "10", "Drop-set na última", "Explosão de pump"],
      ["Rosca alternada halter", "3", "12", "-", "Rotação completa"],
      ["Rosca Scott", "2", "Até falha", "-", "Descida lenta"]
    ]
  },
  {
    dia: "DIA 3 – Pernas + Ombros",
    tecnica: "Bi-set + Isometria",
    objetivo: "Equilíbrio de inferiores com ênfase em deltoides",
    exercicios: [
      ["Stiff com halteres", "4", "10", "3s descida", "Explosivo na subida"],
      ["Afundo com passada", "3", "8/8", "-", "Controle profundo"],
      ["Agachamento frontal", "3", "10", "-", "Core firme"],
      ["Desenvolvimento halteres", "3", "10", "-", "Amplitude máxima"],
      ["Elevação lateral + frontal", "3", "12+12", "Bi-set", "Sem descanso"],
      ["Encolhimento halteres", "3", "15", "Isometria no topo", "Trapézio ativo"]
    ]
  },
  {
    dia: "DIA 4 – Peito + Ombros (ângulos)",
    tecnica: "Supersérie + FST-7",
    objetivo: "Ênfase no peitoral superior e deltoides",
    exercicios: [
      ["Crucifixo inclinado + supino inclinado", "3+3", "15 + 10", "Supersérie", "Pré-exaustão"],
      ["Supino reto máquina", "3", "8-10", "-", "Carga moderada"],
      ["Crossover em Y", "3", "12", "-", "Alongamento máximo"],
      ["Desenvolvimento barra guiada", "3", "10", "-", "Controle total"],
      ["Elevação lateral máquina", "7", "10-12", "FST-7", "30s descanso entre séries"]
    ]
  },
  {
    dia: "DIA 5 – Braços + Core",
    tecnica: "Bi-set + Falha mecânica",
    objetivo: "Pump extremo e definição nos braços",
    exercicios: [
      ["Tríceps testa + tríceps corda", "3", "12+12", "Bi-set", "Sem descanso"],
      ["Rosca direta + martelo", "3", "10+10", "Bi-set", "Volume máximo"],
      ["Rosca Scott", "3", "10", "Pausa no topo", "Explodir na subida"],
      ["Paralela banco", "3", "Até falha", "-", "Controle lento"],
      ["Crossover 3 ângulos", "3", "15", "Pump final", "Peito cheio"],
      ["Abdominal supra com peso", "3", "15", "-", "Controle de lombar"]
    ]
  },
  {
    dia: "DIA 6 – Fullbody Leve/Moderado",
    tecnica: "Circuito + Pump",
    objetivo: "Estímulo global com intensidade moderada",
    exercicios: [
      ["Supino inclinado halteres", "3", "12", "-", "Amplitude máxima"],
      ["Agachamento livre", "3", "12", "-", "Execução perfeita"],
      ["Remada baixa máquina", "3", "12", "-", "Controle no final"],
      ["Elevação lateral", "3", "15", "-", "Pump total"],
      ["Tríceps corda", "3", "15", "-", "Última até falha"],
      ["Rosca alternada", "3", "15", "-", "Pump e rotação"],
      ["Abdominal prancha dinâmica", "3", "30s", "-", "Core firme"]
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





