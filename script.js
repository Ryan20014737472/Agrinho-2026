// ===============================
// AGRO FORTE - FUTURO SUSTENTÁVEL
// ===============================

// Mensagem inicial
console.log("Site Agro Forte carregado com sucesso!");



// Animação dos cards ao passar o mouse
const cards = document.querySelectorAll('.card');

cards.forEach(card => {

    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });

});

// Validação do formulário

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

if (form && successMessage) {

    emailjs.init({
        publicKey: "DjMLX_8zB2QHBCfID",
    });

    form.addEventListener("submit", function(e){

        e.preventDefault();

        emailjs.sendForm(
            "service_rkze1ah",
            "template_068bmyt",
            this
        ).then(() => {

            successMessage.style.display = "block";
            successMessage.style.background = "#2e7d32";
            successMessage.innerHTML = "✅ Obrigado pelo contato! Sua mensagem foi enviada com sucesso.";

            form.reset();

        }).catch((error) => {

            successMessage.style.display = "block";
            successMessage.style.background = "#c62828";
            successMessage.innerHTML = "❌ Erro ao enviar a mensagem.";

            console.error(error);

        });

    });

}
// Botão de destaque ao carregar a página
window.addEventListener('load', () => {

    const botao = document.querySelector('.btn');

if (botao) {

    botao.style.transition = "0.5s";

    setInterval(() => {

        botao.style.transform = "scale(1.08)";

        setTimeout(() => {
            botao.style.transform = "scale(1)";
        }, 500);

    }, 2500);

}
// ===============================
// BOTÃO VOLTAR AO TOPO
// ===============================
const btnTopo = document.getElementById("btnTopo");
if(btnTopo){

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        btnTopo.style.display = "block";
    }else{
        btnTopo.style.display = "none";
    }

});
        btnTopo.style.display = "block";

    }else{

        btnTopo.style.display = "none";

    }

});

btnTopo.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

const contadores = document.querySelectorAll(".contador");

const iniciarContadores = () => {
    contadores.forEach(contador => {

        const alvo = +contador.dataset.target;
        let valor = 0;

        const incremento = alvo / 100;

        const atualizar = () => {

            valor += incremento;

            if(valor < alvo){
                contador.innerText = Math.floor(valor).toLocaleString("pt-BR");
                requestAnimationFrame(atualizar);
            }else{
                contador.innerText = alvo.toLocaleString("pt-BR");
            }

        };

        atualizar();

    });
};

const observador = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        iniciarContadores();
        observador.disconnect();
    }
});

observador.observe(document.querySelector(".estatisticas"));

// =======================
// QUIZ
// =======================

const perguntas = [

{
pergunta:"1. Qual tecnologia ajuda a economizar água na agricultura?",
opcoes:[
"Chuva",
"Irrigação inteligente",
"Regadores manuais"
],
correta:1
},

{
pergunta:"2. Qual prática ajuda a preservar o solo?",
opcoes:[
"Usar máquinas agrícolas",
"Regar constantemente",
"Rotação de culturas"
],
correta:2
},

{
pergunta:"3. Qual fonte é considerada energia renovável?",
opcoes:[
"Energia eólica",
"Energia elétrica",
"Energia solar"
],
correta:2
},

{
pergunta:"4. O uso de drones agrícolas serve para:",
opcoes:[
"Derrubar árvores",
"Aumentar queimadas",
"Monitorar plantações"
],
correta:2
},

{
pergunta:"5. O principal objetivo da sustentabilidade é:",
opcoes:[
"Cortar todas as árvores",
"Produzir preservando o meio ambiente",
"Usar mais recursos naturais"
],
correta:1
}

];

let perguntaAtual = 0;
let pontos = 0;

const tituloPergunta = document.getElementById("pergunta");
const botoesQuiz = document.querySelectorAll(".quiz-btn");
const resultadoQuiz = document.getElementById("resultadoQuiz");

function carregarPergunta(){

tituloPergunta.textContent = perguntas[perguntaAtual].pergunta;

botoesQuiz.forEach((botao,index)=>{

botao.textContent = perguntas[perguntaAtual].opcoes[index];

});

resultadoQuiz.textContent="";

}

function responder(opcao){

if(opcao===perguntas[perguntaAtual].correta){

pontos++;

resultadoQuiz.innerHTML="✅ Correto!";

resultadoQuiz.style.color="#39ff14";

}else{

resultadoQuiz.innerHTML="❌ Incorreto!";

resultadoQuiz.style.color="#ff4444";

}

botoesQuiz.forEach(botao=>botao.disabled=true);

setTimeout(()=>{

perguntaAtual++;

if(perguntaAtual<perguntas.length){

carregarPergunta();

botoesQuiz.forEach(botao=>botao.disabled=false);

}else{

tituloPergunta.innerHTML="🎉 Quiz Finalizado!";

resultadoQuiz.innerHTML=`Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> perguntas.`;

botoesQuiz.forEach(botao=>botao.style.display="none");

}

},1500);

}

carregarPergunta();

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

});
