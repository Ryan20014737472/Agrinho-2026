// ===============================
// AGRO FORTE - FUTURO SUSTENTÁVEL
// ===============================

// Mensagem inicial
console.log("Site Agro Forte carregado com sucesso!");

// Rolagem suave do menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute('href'));

        destino.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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
