// sketch.js - Projeto: Conexão Viva 🌽🏙️
// Tema: Festejando a conexão campo-cidade
// Autor: Patrícia Ariadny Ferro (100% original)
// Ferramentas: p5.js | Gráficos feitos em editores simples (Paint, Piskel, etc)

// Variáveis globais
let fase = 0;
let pontos = 0;
let opcoes = [];
let respostaCerta = 0;
let mensagens = [];
let estado = 'menu';
let botoes = [];
let imagens = {};

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(20);
  prepararFase();
  mensagens = [
    "Clique na resposta correta para ganhar pontos!",
    "Cada fase mostra uma conexão entre campo e cidade.",
    "Ganhe 10 pontos por acerto e perca 5 por erro!"
  ];
}

function draw() {
  background(245);

  if (estado === 'menu') {
    desenharMenu();
  } else if (estado === 'jogo') {
    desenharFase();
    mostrarPontuacao();
  } else if (estado === 'fim') {
    mostrarFinal();
  }
}

function desenharMenu() {
  fill(0);
  textSize(28);
  text("🎮 Conexão Viva - Campo e Cidade em Festa 🎉", width/2, 100);
  textSize(18);
  text("Bem-vindo ao jogo educativo que celebra as conexões entre campo e cidade!", width/2, 160);

  for (let i = 0; i < mensagens.length; i++) {
    text(mensagens[i], width/2, 220 + i * 30);
  }

  fill(100, 200, 100);
  rect(width/2 - 100, 400, 200, 50, 15);
  fill(255);
  text("Começar o jogo", width/2, 425);
}

function desenharFase() {
  fill(0);
  textSize(22);
  text(`Fase ${fase + 1}`, width/2, 40);
  textSize(18);

  for (let i = 0; i < opcoes.length; i++) {
    let y = 150 + i * 80;
    fill(200, 230, 200);
    rect(width/2 - 150, y, 300, 60, 12);
    fill(0);
    text(opcoes[i], width/2, y + 30);
  }
}

function mostrarPontuacao() {
  fill(50);
  textSize(18);
  text(`Pontuação: ${pontos}`, width/2, height - 30);
}

function mostrarFinal() {
  background(230, 255, 230);
  textSize(28);
  fill(0);
  text("Parabéns, Explorador Cultural!", width/2, 200);
  textSize(22);
  text(`Você somou ${pontos} pontos em ${fase} fases.`, width/2, 260);

  let resultado = "";
  if (pontos >= 80) resultado = "🌟 Conector Mestre! Você uniu campo e cidade com sabedoria!";
  else if (pontos >= 50) resultado = "✨ Aprendiz de Conexões! Falta pouco para dominar tudo!";
  else resultado = "🧐 Explorador Iniciante. Continue praticando!";

  textSize(20);
  text(resultado, width/2, 320);

  fill(100, 180, 100);
  rect(width/2 - 100, 400, 200, 50, 15);
  fill(255);
  text("Jogar Novamente", width/2, 425);
}

function prepararFase() {
  opcoes = [];
  if (fase === 0) {
    respostaCerta = 0;
    opcoes = ["Festa Junina no campo", "Show de rock urbano", "Balada eletrônica"];
  } else if (fase === 1) {
    respostaCerta = 2;
    opcoes = ["Comida congelada", "Fast-food", "Feira orgânica"];
  } else if (fase === 2) {
    respostaCerta = 0;
    opcoes = ["Drone na plantação", "Fogos urbanos", "Bicicleta comum"];
  } else if (fase === 3) {
    respostaCerta = 2;
    opcoes = ["Jogar lixo no rio", "Desperdício de água", "Reutilização da água da chuva"];
  } else if (fase === 4) {
    respostaCerta = 1;
    opcoes = ["Tecnologia sem propósito", "Irrigação automatizada", "Poluição por agrotóxicos"];
  }
}

function mousePressed() {
  if (estado === 'menu') {
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > 400 && mouseY < 450) {
      estado = 'jogo';
    }
  } else if (estado === 'jogo') {
    for (let i = 0; i < opcoes.length; i++) {
      let y = 150 + i * 80;
      if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > y && mouseY < y + 60) {
        if (i === respostaCerta) {
          pontos += 10;
        } else {
          pontos -= 5;
        }
        fase++;
        if (fase >= 5) {
          estado = 'fim';
        } else {
          prepararFase();
        }
      }
    }
  } else if (estado === 'fim') {
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > 400 && mouseY < 450) {
      fase = 0;
      pontos = 0;
      estado = 'menu';
    }
  }
}
