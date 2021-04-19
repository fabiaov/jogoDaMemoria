let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id){
        let card = this.cards.filter(card => card.id === id)[0];
        if(card.flipped || this.lockMode){
            return false;
        }
        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return (this.firstCard.icon === this.secondCard.icon);
    },


    unflipCards: function() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },


    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length == 0;
    },


    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },


    techs: ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'nodejs',
    'reactjs'],

    cards: null,/* aqui eu crio a variavel global com o let */

    createCardsFromTechs: function (){
        this.cards = [];
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        
        });
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },
    
    /* cada elemento do array é um par das cartas e isso é um problema pois queremos um array com todas as 20 cartas, o flatMap ele faz isso
ele desmembra o array quem tem par de elementos e retorna todos os elementos para o array principal */
    createPairFromTech: function (tech){
        return [{
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
        },{
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
        }];
    },

    createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
    },


    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        while (currentIndex !== 0) {
            /* nas duas linhas abaixo nós setamos os index o primeiro e o ultimo e selecionamos de ordem aleatória cada elemento para embaralharmos */
            randomIndex = Math.floor(Math.random() * currentIndex);// floor é pra pega um a menos pois em um array de 3 elementos vai de 0 a 2
            currentIndex--
            /* agora na linha abaixo nós invertemos os elementos, e dessa forma embaralhamos */
            [this.cards[randomIndex],this.cards[currentIndex]] = [this.cards[currentIndex],this.cards[randomIndex]];
        }
    },
}