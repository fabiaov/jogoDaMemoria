const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
// let techs = ['bootstrap',
//   'css',
//   'electron',
//   'firebase',
//   'html',
//   'javascript',
//   'jquery',
//   'mongo',
//   'node',
//   'react']

// let cards = null;/* aqui eu crio a variavel global com o let */
startGame();
function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = '';
    game.cards.forEach(card => {
      let cardElement = document.createElement('div');
      cardElement.id = card.id;// cada card aqui tem um ID então passamos para o elemento este mesmo id dos cards
      cardElement.classList.add(CARD); // essa função classList.add ela adiciona uma classe pra nossa div
      cardElement.dataset.icon = card.icon;

      createCardContent(card,cardElement);
      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);//aqui ele adiciona a carta no tabuleiro
  })
}
function createCardContent(card, cardElement) {
  createCardFace(FRONT,card, cardElement);
  createCardFace(BACK,card, cardElement);
}

function createCardFace(face,card,element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);
  if(face === FRONT){
    /* se for a front eu preciso cria um novo elemento que é a imagem */
    let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = "./images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  }else{
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace);
}

// function shuffleCards(cards) {
//   let currentIndex = cards.length;
//   let randomIndex = 0;
//   while (currentIndex !== 0) {
//     /* nas duas linhas abaixo nós setamos os index o primeiro e o ultimo e selecionamos de ordem aleatória cada elemento para embaralharmos */
//     randomIndex = Math.floor(Math.random() * currentIndex);// floor é pra pega um a menos pois em um array de 3 elementos vai de 0 a 2
//     currentIndex--
//     /* agora na linha abaixo nós invertemos os elementos, e dessa forma embaralhamos */
//     [cards[randomIndex],cards[currentIndex]] = [cards[currentIndex],cards[randomIndex]];
//   }
// }


// function createCardsFromTechs(techs){
//   let cards = [];
//   techs.forEach((tech)=>{
//     cards.push(createPairFromTech(tech));
    
//   });
//   return cards.flatMap(pair => pair);
// }


  // function createCardsFromTechs(techs){
  //   let cards = [];
  //   for(let tech of techs){
  //     cards.push(createPairFromTech(tech));
      
  //   }
  //   return cards.flatMap(pair => pair);
  // }desse jeito seria a forma mais simples de for

/* cada elemento do array é um par das cartas e isso é um problema pois queremos um array com todas as 20 cartas, o flatMap ele faz isso
ele desmembra o array quem tem par de elementos e retorna todos os elementos para o array principal */
// createPairFromTech(tech);{
//     return [{
//       id: createIdWithTech(tech),
//       icon: tech,
//       flipped: false,
//     },{
//       id: createIdWithTech(tech),
//       icon: tech,
//       flipped: false,
//     }];
// }

// function createIdWithTech(tech) {
//   return tech + parseInt(Math.random() * 1000);
// }

function flipCard() {
  if(game.setCard(this.id)){
      this.classList.add("flip");
      if(game.secondCard){
        if(game.checkMatch()){
          game.clearCards();
          if(game.checkGameOver()){
            let gameOverLayer = document.getElementById("gameOver");
            gameOverLayer.style.display = 'flex';

          }
        }else{
          setTimeout( () =>{
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);
            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');
            game.unflipCards();
          },1000);
        }
      };
    }
}


function restart(){
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
            gameOverLayer.style.display = 'none';
}

