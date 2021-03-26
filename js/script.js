let order = [];
let clickedOrder = [];
let score = 0;

// Elements de cores
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Cores Enumerados
// 0 - green
// 1 - red
// 2 - yellow
// 3 - blue 
const colorsMap = new Map();
colorsMap.set(0, green);
colorsMap.set(1, red);
colorsMap.set(2, yellow);
colorsMap.set(3, blue);

// Cria ordem aleatória
const shuffleOrder = () =>{
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Retorna a cor
const createColorElement = (color) => {
    return colorsMap.get(color);
}

// Acende a próxima cor
const lightColor = (element, number) =>{
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    },number - 250);
    setTimeout(() =>{
        element.classList.remove('selected');
    });
}

//Checa se os botões clicados são os mesmos da ordem gerada no jogo
const checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
        if(clickedOrder.length == order.length){
            alert(`Pontuação: ${score}\nVocê acertou! Iniciando o próximo nível`);
            nextLevel();
        }
    }

// Clique do usuário
const click = (color) =>{
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() =>{
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

// Ir para o próximo nível do jogo
const nextLevel = () =>{
    score++;
    shuffleOrder();
}

// Para o Game Over
const gameOver = () =>{
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Início do jogo
const playGame = () => {
    alert(`Bem vindo ao Gênius! Iniciando um novo jogo`);
    score = 0;
    nextLevel();
}

/*
green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));
*/

//Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//Executar - Início do Jogo
playGame();
