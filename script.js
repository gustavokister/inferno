// 1. Relógio em tempo real
function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    
    // Atualiza o texto do relógio (precisa de um ID no HTML)
    const relogioElemento = document.getElementById('relogio-digital');
    if (relogioElemento) {
        relogioElemento.innerText = `${horas}:${minutos}:${segundos}`;
    }
}
setInterval(atualizarRelogio, 1000);

// 2. Simulador de Sensores IoT
function atualizarSensores() {
    const temp = (22 + Math.random() * 3).toFixed(1); // Oscila entre 22 e 25 graus
    const umidade = Math.floor(40 + Math.random() * 10); // Oscila entre 40 e 50%
    
    const tempElemento = document.getElementById('sensor-temp');
    const umidElemento = document.getElementById('sensor-umid');
    
    if (tempElemento) tempElemento.innerText = `${temp}°C`;
    if (umidElemento) umidElemento.innerText = `${umidade}%`;
}
setInterval(atualizarSensores, 3000);

// 3. Sistema de Logs Dinâmico
function adicionarLog(mensagem) {
    const consoleLog = document.getElementById('console-log');
    const timestamp = new Date().toLocaleTimeString();
    if (consoleLog) {
        consoleLog.value += `\n[${timestamp}] ${mensagem}`;
        consoleLog.scrollTop = consoleLog.scrollHeight; // Auto-scroll para o final
    }
}

// 4. Controle de Pistas (Formulário)
const pistaForm = document.getElementById('pista-form');
if (pistaForm) {
    pistaForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede a página de recarregar
        
        const aeronave = this.querySelector('input[type="text"]').value;
        const pista = this.querySelector('select').value;
        
        if (aeronave.trim() === "") {
            alert("Por favor, insira o prefixo da aeronave!");
            return;
        }

        adicionarLog(`AUTORIZAÇÃO CONCEDIDA: ${aeronave} autorizada para ${pista}.`);
        this.reset(); // Limpa o formulário
    });
}

// 5. Simulação de Status de Voos (Aleatório)
function alterarStatusVoos() {
    const statusPossiveis = [
        { texto: "NO HORÁRIO", classe: "" },
        { texto: "EMBARCANDO", classe: "mark" },
        { texto: "FINALIZADO", classe: "" },
        { texto: "ATRASADO", classe: "status-delayed" }
    ];

    const linhas = document.querySelectorAll('tbody tr');
    // Escolhe uma linha aleatória para mudar o status
    const linhaAleatoria = linhas[Math.floor(Math.random() * linhas.length)];
    const statusCell = linhaAleatoria.cells[3];
    const novoStatus = statusPossiveis[Math.floor(Math.random() * statusPossiveis.length)];

    statusCell.innerHTML = novoStatus.classe === "mark" 
        ? `<mark>${novoStatus.texto}</mark>` 
        : `<span class="${novoStatus.classe}">${novoStatus.texto}</span>`;

    adicionarLog(`ATUALIZAÇÃO: Voo ${linhaAleatoria.cells[0].innerText} alterado para ${novoStatus.texto}.`);
}

// Inicia uma mudança de status a cada 10 segundos
setInterval(alterarStatusVoos, 10000);

// Log inicial
window.onload = () => {
    adicionarLog("Sistema Smart Airport inicializado com sucesso.");
    adicionarLog("IA de tráfego aéreo conectada.");
};