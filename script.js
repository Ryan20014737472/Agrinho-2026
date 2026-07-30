// ===========================================
// AGRO FORTE - FUTURO SUSTENTÁVEL
// Desenvolvido por Ryan Batistel
// ===========================================

console.log("Site carregado com sucesso!");

// ===========================
// BOTÃO VOLTAR AO TOPO
// ===========================

const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {

    if (window.scrollY > 350) {
        btnTopo.style.display = "flex";
    } else {
        btnTopo.style.display = "none";
    }

});

btnTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ===========================
// ANIMAÇÃO DOS CARDS
// ===========================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";
        card.style.boxShadow = "0 0 25px rgba(57,255,20,.8)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";
        card.style.boxShadow = "";

    });

});

// ===========================
// BOTÃO CONHEÇA O PROJETO
// ===========================

const explorar = document.querySelector(".btn");

if (explorar) {

    setInterval(() => {

        explorar.animate([
            { transform: "scale(1)" },
            { transform: "scale(1.07)" },
            { transform: "scale(1)" }
        ], {
            duration: 800,
            easing: "ease"
        });

    }, 3000);

}

// ===========================
// FORMULÁRIO
// ===========================

const formulario = document.getElementById("formulario-contato");

if (formulario) {
    const avisoFormulario = document.getElementById("mensagemFormulario");
    let temporizadorAviso;

    function mostrarAviso(texto, tipo = "sucesso") {
        clearTimeout(temporizadorAviso);
        avisoFormulario.textContent = texto;
        avisoFormulario.classList.toggle("erro", tipo === "erro");
        avisoFormulario.hidden = false;

        temporizadorAviso = setTimeout(() => {
            avisoFormulario.hidden = true;
        }, 5000);
    }

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const campos = [...formulario.querySelectorAll("[required]")];
        const campoInvalido = campos.find((campo) => !campo.value.trim() || !campo.checkValidity());

        campos.forEach((campo) => campo.removeAttribute("aria-invalid"));

        if (campoInvalido) {
            campoInvalido.setAttribute("aria-invalid", "true");
            campoInvalido.focus();
            mostrarAviso("Complete todos os campos corretamente para enviar sua mensagem.", "erro");
            return;
        }

        mostrarAviso("Mensagem enviada com sucesso! Obrigado por apoiar um futuro sustentável.");
        formulario.reset();
    });
}
// ===========================
// ESTATÍSTICAS ANIMADAS
// ===========================

const contadores = document.querySelectorAll(".contador");

function animarContadores() {

    contadores.forEach(contador => {

        const alvo = Number(contador.dataset.target);
        let valor = 0;

        const velocidade = Math.max(1, Math.ceil(alvo / 120));

        function atualizar() {

            valor += velocidade;

            if (valor < alvo) {

                contador.textContent = valor.toLocaleString("pt-BR");
                requestAnimationFrame(atualizar);

            } else {

                contador.textContent = alvo.toLocaleString("pt-BR");

            }

        }

        atualizar();

    });

}

const secaoEstatisticas = document.querySelector(".estatisticas");

if (secaoEstatisticas) {

    const observer = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting) {

            animarContadores();
            observer.disconnect();

        }

    });

    observer.observe(secaoEstatisticas);

}

// ===========================
// TEMA CLARO / ESCURO
// ===========================

const botaoTema = document.getElementById("theme-toggle");

if (botaoTema) {

    if (localStorage.getItem("tema") === "claro") {

        document.body.classList.add("light-theme");
        botaoTema.textContent = "☀️";

    } else {

        botaoTema.textContent = "🌙";

    }

    botaoTema.addEventListener("click", () => {

        botaoTema.classList.remove("tema-animando");
        void botaoTema.offsetWidth;
        botaoTema.classList.add("tema-animando");
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {

            localStorage.setItem("tema", "claro");
            botaoTema.textContent = "☀️";

        } else {

            localStorage.setItem("tema", "escuro");
            botaoTema.textContent = "🌙";

        }

    });

}

// ===========================
// ANIMAÇÃO AO APARECER
// ===========================

const elementos = document.querySelectorAll(".card, .numero, .quiz-box");

const observerAnimacao = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

elementos.forEach(elemento => {

    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(40px)";
    elemento.style.transition = "0.7s";

    observerAnimacao.observe(elemento);

});
// ===========================
// QUIZ DA SUSTENTABILIDADE
// ===========================

const perguntas = [

{
    pergunta: "1. Qual tecnologia ajuda a economizar água na agricultura?",
    opcoes: [
        "Chuva",
        "Irrigação Inteligente",
        "Regadores manuais"
    ],
    correta: 1
},

{
    pergunta: "2. Qual prática ajuda a preservar o solo?",
    opcoes: [
        "Usar máquinas agrícolas em excesso",
        "Regar constantemente",
        "Rotação de culturas"
    ],
    correta: 2
},

{
    pergunta: "3. Qual destas é uma fonte de energia renovável?",
    opcoes: [
        "Carvão",
        "Energia Solar",
        "Gasolina"
    ],
    correta: 1
},

{
    pergunta: "4. O uso de drones agrícolas serve para:",
    opcoes: [
        "Monitorar plantações",
        "Derrubar árvores",
        "Aumentar queimadas"
    ],
    correta: 0
},

{
    pergunta: "5. O principal objetivo da sustentabilidade é:",
    opcoes: [
        "Produzir preservando o meio ambiente",
        "Explorar todos os recursos naturais",
        "Aumentar o desmatamento"
    ],
    correta: 0
}

];

let perguntaAtual = 0;
let pontos = 0;

const tituloPergunta = document.getElementById("pergunta");
const botoesQuiz = document.querySelectorAll(".quiz-btn");
const resultadoQuiz = document.getElementById("resultadoQuiz");
const caixaQuiz = document.querySelector(".quiz-box");

function soltarConfetes() {
    const cores = ["#39ff14", "#ffffff", "#ffd93d", "#63c5da", "#ff7eb3"];

    for (let indice = 0; indice < 28; indice++) {
        const confete = document.createElement("span");
        confete.className = "confete";
        confete.style.left = `${Math.random() * 100}vw`;
        confete.style.background = cores[indice % cores.length];
        confete.style.setProperty("--deslocamento", `${(Math.random() - .5) * 180}px`);
        confete.style.animationDelay = `${Math.random() * .18}s`;
        document.body.appendChild(confete);
        confete.addEventListener("animationend", () => confete.remove());
    }
}

function mostrarErroQuiz() {
    caixaQuiz.classList.remove("erro-quiz");
    void caixaQuiz.offsetWidth;
    caixaQuiz.classList.add("erro-quiz");
}

function carregarPergunta() {

    caixaQuiz.classList.remove("erro-quiz");
    const atual = perguntas[perguntaAtual];

    tituloPergunta.textContent = atual.pergunta;

    botoesQuiz.forEach((botao, indice) => {

        botao.style.display = "block";
        botao.disabled = false;

        botao.textContent = atual.opcoes[indice];

        botao.style.background = "";
        botao.style.color = "";

    });

    resultadoQuiz.innerHTML = "";

}

function responder(opcao) {

    botoesQuiz.forEach(botao => botao.disabled = true);

    if (opcao === perguntas[perguntaAtual].correta) {

        pontos++;

        botoesQuiz[opcao].style.background = "#39ff14";
        botoesQuiz[opcao].style.color = "black";

        resultadoQuiz.innerHTML = "✅ Resposta correta!";
        soltarConfetes();

    } else {

        botoesQuiz[opcao].style.background = "#ff4444";

        botoesQuiz[perguntas[perguntaAtual].correta].style.background = "#39ff14";

        resultadoQuiz.innerHTML = "❌ Resposta incorreta.";
        mostrarErroQuiz();

    }

    setTimeout(() => {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            carregarPergunta();

        } else {

            finalizarQuiz();

        }

    }, 1500);

}

function finalizarQuiz() {

    tituloPergunta.innerHTML = "🎉 Quiz Finalizado!";

    botoesQuiz.forEach(botao => botao.style.display = "none");

    let mensagem = "";

    if (pontos === 5) {

        mensagem = "Excelente! Você domina o assunto.";

    } else if (pontos >= 3) {

        mensagem = "Muito bem! Você conhece bastante sobre sustentabilidade.";

    } else {

        mensagem = "Continue estudando. Você pode melhorar!";

    }

    resultadoQuiz.innerHTML = `
        <h3>${pontos} / ${perguntas.length}</h3>
        <p>${mensagem}</p>
        <br>
        <button class="quiz-restart" type="button" onclick="reiniciarQuiz()">↻ Refazer Quiz</button>
    `;

}

function reiniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;

    carregarPergunta();

}

carregarPergunta();



// ===========================
// CALCULADORA SUSTENTÁVEL
// ===========================

const campoTorneiras = document.getElementById("torneiras");
const campoArroz = document.getElementById("pes-arroz");
const resultadoAgua = document.getElementById("resultadoAgua");
const resultadoArroz = document.getElementById("resultadoArroz");

function numeroPositivo(campo) {
    return Math.max(0, Number(campo.value) || 0);
}

function calcularAgua() {
    const torneiras = numeroPositivo(campoTorneiras);
    const litrosPorMes = torneiras * 15 * 30;
    resultadoAgua.textContent = `💧 Ao consertar ${torneiras} torneira(s), você pode economizar cerca de ${litrosPorMes.toLocaleString("pt-BR")} litros de água por mês.`;
}

function calcularArroz() {
    const pes = numeroPositivo(campoArroz);
    const quilos = pes * 0.03;
    resultadoArroz.textContent = `🌾 ${pes.toLocaleString("pt-BR")} pé(s) de arroz podem produzir aproximadamente ${quilos.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} kg de arroz.`;
}

document.querySelector('[data-calculo="agua"]')?.addEventListener("click", calcularAgua);
document.querySelector('[data-calculo="arroz"]')?.addEventListener("click", calcularArroz);

if (campoTorneiras && campoArroz) {
    calcularAgua();
    calcularArroz();
}
