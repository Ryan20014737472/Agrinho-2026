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
const formulario = document.querySelector('form');

formulario.addEventListener('submit', function (e) {

    e.preventDefault();

    const nome = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;

    if (nome.trim() === '' || email.trim() === '') {

        alert('Preencha todos os campos obrigatórios.');

        return;
    }

    alert('Mensagem enviada com sucesso! Obrigado por contribuir com a sustentabilidade.');

    formulario.reset();

});

// Botão de destaque ao carregar a página
window.addEventListener('load', () => {

    const botao = document.querySelector('.btn');

    botao.style.transition = '0.5s';

    setInterval(() => {

        botao.style.transform = 'scale(1.08)';

        setTimeout(() => {
            botao.style.transform = 'scale(1)';
        }, 500);

    }, 2500);

});
// ===============================
// BOTÃO VOLTAR AO TOPO
// ===============================

const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

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

let quizRespondido = false;

function responder(correta) {

    // Se já respondeu, não faz nada
    if (quizRespondido) {
        return;
    }

    quizRespondido = true;

    const resultado = document.getElementById("resultadoQuiz");
    const botoes = document.querySelectorAll(".quiz-btn");

    botoes.forEach(botao => {
        botao.disabled = true;
        botao.style.opacity = "0.6";
        botao.style.cursor = "not-allowed";
    });

    if (correta) {
        resultado.innerHTML = "✅ Parabéns! Você acertou!";
        resultado.style.color = "#39ff14";
    } else {
        resultado.innerHTML = "❌ Resposta incorreta!";
        resultado.style.color = "#ff4444";
    }
}
