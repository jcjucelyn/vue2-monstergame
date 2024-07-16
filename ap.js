new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },

    methods: {
        startGame: function() {
            this.gameIsRunning = true,
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.turns = []
        },
        rndDmg: function(min, max) {
           return Math.floor(Math.random() * (max - min + 1) + min);
        },
        monsterMove: function() {
            var changeAmt = this.rndDmg(5,12);
            this.playerHealth -= changeAmt;
            console.log(changeAmt)
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: "monster deals " + changeAmt + " damage to player."
            })
        },
        attack: function() {
            var attAmt = this.rndDmg(1, 5);
            this.monsterHealth -= attAmt;

            this.turns.unshift({
                isPlayer: true,
                text: "player deals " + attAmt + " damage to monster."
            })

            if (this.checkWin()) {
                return;
            } else {
            this.monsterMove(); }
        },
        spAttack: function() {
            var sattAmt = this.rndDmg(10, 15);
            this.monsterHealth -= sattAmt;

            this.turns.unshift({
                isPlayer: true,
                text: "player deals " + sattAmt + " damage to monster."
            })

            if (this.checkWin()) {
                return;
            } else {
            this.monsterMove(); }
        },
        heal: function() {
            var healAmt = this.rndDmg(5, 10);
            var checkHealth = 100 - healAmt;
            if (this.playerHealth <= checkHealth) {
                this.playerHealth += healAmt;
                console.log('Player heals ' + healAmt + ' points.');
                this.turns.unshift({
                    isPlayer: true,
                    text: "player heals " + healAmt + " points."
                })
            } else {
                this.turns.unshift({
                    isPlayer: true,
                    text: "player heals " + (100 - (playerHealth + healAmt)) + " points."
                })

                this.playerHealth = 100;
                
            }
            
            this.monsterMove();
        },
        giveUp: function() {
            this.gameIsRunning = false;

        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
            }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost... New Game?')) {
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return false;
            }
        }
        
        },
   
    
    
})