const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const menuButton = $("#menu-toggle");
const menu = $("#menu");
menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
$$("nav a").forEach(link => link.addEventListener("click", () => {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const themeButton = $("#theme-toggle");
const savedTheme = localStorage.getItem("agro-theme");
const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
if (savedTheme === "dark" || (!savedTheme && prefersDark)) document.body.classList.add("dark");
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("agro-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function updateScroll() {
  const available = document.documentElement.scrollHeight - innerHeight;
  $("#progress-bar").style.width = available > 0 ? (scrollY / available * 100) + "%" : "0%";
}
addEventListener("scroll", updateScroll, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
$$(".reveal").forEach(element => revealObserver.observe(element));

const countObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  $$(".counter").forEach(counter => {
    const target = Number(counter.dataset.target);
    const started = performance.now();
    const duration = 1200;
    function tick(now) {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased).toLocaleString("pt-BR");
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
  countObserver.disconnect();
}, { threshold: .4 });
countObserver.observe($(".stats-grid"));

const sections = $$("main section[id]");
const navigationLinks = $$("nav a");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach(link => link.classList.toggle("active", link.hash === "#" + entry.target.id));
  });
}, { rootMargin: "-30% 0px -60%", threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

const solutions = {
  drones: {
    number: "01",
    title: "Olhos no céu, decisões no solo",
    text: "Drones mapeiam áreas extensas, identificam pragas e falhas no plantio antes que o problema se espalhe. Assim, o produtor age somente onde é necessário.",
    benefits: ["Monitoramento rápido e preciso", "Menor desperdício de insumos", "Decisões baseadas em imagens"],
    image: "Assente/drone-ia.png",
    alt: "Drone monitorando uma plantação"
  },
  ia: {
    number: "02",
    title: "Dados que antecipam o amanhã",
    text: "A inteligência artificial combina histórico da lavoura, previsão do tempo e imagens para detectar padrões e apoiar escolhas mais seguras.",
    benefits: ["Previsão de pragas e doenças", "Planejamento da colheita", "Uso eficiente de recursos"],
    image: "Assente/agricultura-ia.png",
    alt: "Tecnologia de inteligência artificial aplicada à agricultura"
  },
  irrigacao: {
    number: "03",
    title: "Cada gota no lugar certo",
    text: "Sensores de umidade e controladores automáticos entregam água conforme a necessidade real de cada área, reduzindo perdas.",
    benefits: ["Economia de água e energia", "Menos estresse para as plantas", "Controle em tempo real"],
    image: "Assente/agricultura-ia.png",
    alt: "Plantação acompanhada por sistema inteligente"
  },
  satelites: {
    number: "04",
    title: "Uma visão ampla da lavoura",
    text: "Satélites e sensores acompanham clima, vigor das plantas e condições do solo, convertendo grandes áreas em informações claras.",
    benefits: ["Acompanhamento de áreas extensas", "Alertas antecipados", "Histórico para comparar safras"],
    image: "Assente/drone-ia.png",
    alt: "Monitoramento remoto de uma área agrícola"
  }
};

$$("[data-solution]").forEach(button => button.addEventListener("click", () => {
  const data = solutions[button.dataset.solution];
  $$("[data-solution]").forEach(item => item.setAttribute("aria-selected", String(item === button)));
  $("#solution-number").textContent = data.number;
  $("#solution-title").textContent = data.title;
  $("#solution-text").textContent = data.text;
  $("#solution-benefits").innerHTML = data.benefits.map(item => "<li>" + item + "</li>").join("");
  $("#solution-image").src = data.image;
  $("#solution-image").alt = data.alt;
  $("#solution-panel").focus({ preventScroll: true });
}));

const questions = [
  { question: "Qual tecnologia aplica água somente quando o solo precisa?", options: ["Irrigação inteligente", "Colheita manual", "Queimada controlada"], answer: 0, explanation: "Sensores de umidade tornam a irrigação mais precisa." },
  { question: "Por que a rotação de culturas protege o solo?", options: ["Aumenta a erosão", "Repõe nutrientes e quebra ciclos de pragas", "Elimina toda a biodiversidade"], answer: 1, explanation: "Alternar culturas melhora a fertilidade e ajuda no controle de pragas." },
  { question: "Como drones ajudam uma produção sustentável?", options: ["Aplicando insumos em toda parte", "Substituindo toda decisão humana", "Localizando problemas para uma ação direcionada"], answer: 2, explanation: "O mapeamento permite agir apenas nos pontos necessários." },
  { question: "Qual fonte pode gerar energia limpa na propriedade rural?", options: ["Carvão mineral", "Energia solar", "Gasolina"], answer: 1, explanation: "Painéis solares aproveitam uma fonte renovável e reduzem emissões." },
  { question: "O que fortalece a relação campo-cidade?", options: ["Consumo consciente e valorização da produção responsável", "Desperdício de alimentos", "Uso ilimitado de recursos"], answer: 0, explanation: "Consumidores informados incentivam práticas responsáveis em toda a cadeia." }
];
let questionIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const item = questions[questionIndex];
  answered = false;
  $("#quiz-step").textContent = "Pergunta " + (questionIndex + 1) + " de " + questions.length;
  $("#quiz-progress").style.width = ((questionIndex + 1) / questions.length * 100) + "%";
  $("#quiz-score").textContent = score + " pts";
  $("#quiz-question").textContent = item.question;
  $("#quiz-feedback").textContent = "";
  $("#quiz-next").hidden = true;
  $("#quiz-options").innerHTML = item.options.map((option, index) =>
    '<button type="button" data-option="' + index + '">' + String.fromCharCode(65 + index) + ". " + option + "</button>"
  ).join("");
}

$("#quiz-options").addEventListener("click", event => {
  const button = event.target.closest("[data-option]");
  if (!button || answered) return;
  answered = true;
  const selected = Number(button.dataset.option);
  const item = questions[questionIndex];
  const buttons = $$("#quiz-options button");
  buttons.forEach(itemButton => itemButton.disabled = true);
  buttons[item.answer].classList.add("correct");
  if (selected === item.answer) {
    score += 20;
    $("#quiz-feedback").textContent = "Correto! " + item.explanation;
  } else {
    button.classList.add("wrong");
    $("#quiz-feedback").textContent = "Quase! " + item.explanation;
  }
  $("#quiz-score").textContent = score + " pts";
  $("#quiz-next").textContent = questionIndex === questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
  $("#quiz-next").hidden = false;
});

$("#quiz-next").addEventListener("click", () => {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
    return;
  }
  $("#quiz-step").textContent = "Desafio concluído";
  $("#quiz-progress").style.width = "100%";
  $("#quiz-question").textContent = score >= 80 ? "Excelente! Você cultiva boas ideias." : score >= 60 ? "Muito bem! Continue aprendendo." : "Toda mudança começa com conhecimento.";
  $("#quiz-options").innerHTML = "";
  $("#quiz-feedback").textContent = "Resultado final: " + score + " de 100 pontos.";
  $("#quiz-next").textContent = "Refazer desafio";
  $("#quiz-next").onclick = () => {
    questionIndex = 0;
    score = 0;
    $("#quiz-next").onclick = null;
    renderQuestion();
  };
});
renderQuestion();

const format = number => Math.round(number).toLocaleString("pt-BR");
function updateSimulation() {
  const area = Number($("#area").value);
  const consumption = Number($("#consumption").value);
  const efficiency = Number($("#efficiency").value);
  const daily = area * consumption * efficiency / 100;
  $("#area-output").textContent = format(area);
  $("#consumption-output").textContent = format(consumption);
  $("#efficiency-output").textContent = efficiency;
  $("#water-result").textContent = format(daily) + " L";
  $("#monthly-result").textContent = format(daily * 30) + " litros";
}
$$('#water-form input[type="range"]').forEach(input => input.addEventListener("input", updateSimulation));
updateSimulation();

const pledgeForm = $("#pledge-form");
const savedPledge = localStorage.getItem("agro-pledge");
if (savedPledge) {
  const savedInput = pledgeForm.querySelector('[value="' + savedPledge + '"]');
  if (savedInput) savedInput.checked = true;
  $("#pledge-message").textContent = "Seu compromisso atual: " + savedPledge + ".";
}
pledgeForm.addEventListener("submit", event => {
  event.preventDefault();
  const selected = pledgeForm.elements.pledge.value;
  if (!selected) {
    $("#pledge-message").textContent = "Escolha uma atitude para continuar.";
    return;
  }
  localStorage.setItem("agro-pledge", selected);
  $("#pledge-message").textContent = "Compromisso registrado: " + selected + "!";
});