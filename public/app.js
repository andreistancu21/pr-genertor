const useCases = [
  {
    title: "Marketing",
    detail: "Genereaza 5 variante de hook pentru o campanie social media."
  },
  {
    title: "Product",
    detail: "Transforma feedback-ul clientilor in backlog prioritizat."
  },
  {
    title: "Support",
    detail: "Compune raspunsuri empatice pentru intrebari repetitive."
  }
];

const goalInput = document.getElementById("goal");
const audienceInput = document.getElementById("audience");
const constraintsInput = document.getElementById("constraints");
const output = document.getElementById("promptOutput");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const useCaseList = document.getElementById("useCaseList");
const quizFeedback = document.getElementById("quizFeedback");

function renderUseCases() {
  useCaseList.innerHTML = useCases
    .map(
      (item) => `
        <div class="use-case">
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </div>
      `
    )
    .join("");
}

function buildPrompt(goal, audience, constraints) {
  return [
    "Rol: Esti un asistent AI orientat pe claritate si actiune.",
    `Obiectiv: ${goal || "[completeaza obiectivul]"}`,
    `Audienta: ${audience || "[completeaza audienta]"}`,
    `Constrangeri: ${constraints || "[adauga constrangeri concrete]"}`,
    "Format de livrare: raspuns structurat in 3 sectiuni: Context, Solutie, Next Steps.",
    "Verificare: incheie cu 2 intrebari de clarificare daca lipsesc informatii."
  ].join("\n");
}

generateBtn.addEventListener("click", () => {
  const prompt = buildPrompt(
    goalInput.value.trim(),
    audienceInput.value.trim(),
    constraintsInput.value.trim()
  );

  output.textContent = prompt;
});

clearBtn.addEventListener("click", () => {
  goalInput.value = "";
  audienceInput.value = "";
  constraintsInput.value = "";
  output.textContent = "Promptul tau va aparea aici...";
  quizFeedback.textContent = "";
});

document.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.answer === "good") {
      quizFeedback.textContent = "Corect. Specific si masurabil iti creste calitatea output-ului.";
      return;
    }

    quizFeedback.textContent = "Incearca din nou. Gandeste in termeni de instructiuni clare.";
  });
});

renderUseCases();
