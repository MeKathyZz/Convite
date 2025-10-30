const btnAbrir = document.getElementById("btnAbrir");
const detalhes = document.getElementById("detalhes");
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");
const resposta = document.getElementById("resposta");
const mensagemEspecial = document.getElementById("mensagemEspecial");
const musicaFundo = document.getElementById("musicaFundo");

const volumeNormal = 0.2;
const volumeBaixo = 0.05;
musicaFundo.volume = volumeNormal;

const somAbrir = new Audio("Sons/click.mp3");
const somVou = new Audio("Sons/sim.mp3");
const somNao = new Audio("Sons/nao.mp3");

let musicaIniciada = false;

function criarFaiscas(event) {
  const cores = ["#ff0000","#ff7f00","#ffff00","#00ff00","#0000ff","#4b0082","#8f00ff"];
  const numParticulas = 20;

  for (let i = 0; i < numParticulas; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = event.clientX + "px";
    particle.style.top = event.clientY + "px";
    particle.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];

    const x = (Math.random() - 0.5) * 200 + "px";
    const y = (Math.random() - 0.5) * 200 + "px";
    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

btnAbrir.addEventListener("click", (event) => {
  if (!musicaIniciada) {
    musicaFundo.play().catch(() => {});
    musicaIniciada = true;
  }

  if (!detalhes.classList.contains("ativo")) {
    btnAbrir.textContent = "Fechar Convite ✖️";
    mensagemEspecial.classList.add("sumir");

    setTimeout(() => {
      mensagemEspecial.style.display = "none";
      detalhes.classList.add("ativo");
    }, 400);
  } else {
    btnAbrir.textContent = "Abrir Convite 🎁";
    mensagemEspecial.style.display = "block";
    setTimeout(() => mensagemEspecial.classList.remove("sumir"), 10);
    detalhes.classList.remove("ativo");
    resposta.textContent = "";
  }

  criarFaiscas(event);
  somAbrir.currentTime = 0;
  somAbrir.play();
});

btnSim.addEventListener("click", (event) => {
  resposta.textContent = "🎉 Que ótimo! Vai ser incrível comemorar com você!";
  resposta.style.color = "#4CAF50";
  resposta.style.textAlign = "center";

  criarFaiscas(event);

  if (!somNao.paused) {
    somNao.pause();
    somNao.currentTime = 0;
  }

  musicaFundo.volume = volumeBaixo;
  somVou.currentTime = 0;
  somVou.play();
  somVou.addEventListener("ended", () => musicaFundo.volume = volumeNormal);
});

btnNao.addEventListener("click", (event) => {
  resposta.textContent = "😒 Melhore.";
  resposta.style.color = "#d32f2f";
  resposta.style.textAlign = "center";

  criarFaiscas(event);

  musicaFundo.volume = volumeBaixo;
  somNao.currentTime = 0;
  somNao.play();
  somNao.addEventListener("ended", () => musicaFundo.volume = volumeNormal);
});
