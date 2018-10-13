let app = new Vue({
    el: '#app',
    data: {
        selectedColor: null,
        randomColors: [],
        amount: 0,
        difficultyScale: {
            easy: 3,
            medium: 5,
            hard: 7
        },
        hits: 0,
        misses: 0,
        failedGames: 0
    },
    computed: {
        totalScore() {
            return String(this.hits - this.misses)
        }
    },
    methods: {
        setSelectedColor() {
            this.selectedColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        },
        setRandomColors() {
            for (let x = 0; x < this.amount; x++) {
                this.randomColors.push(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
            }
            let randomItem = this.randomColors[Math.floor(Math.random() * this.randomColors.length)];
            var index = this.randomColors.indexOf(randomItem);
            this.randomColors[index] = this.selectedColor;
        },
        difficultyChange(newDifficulty) {
            this.randomColors = [];
            this.selectedColor = null;
            this.setSelectedColor();
            this.amount = this.difficultyScale[newDifficulty];
            this.setRandomColors();
        },
        resetGame() {
            this.randomColors = [];
            this.selectedColor = null;
            this.setSelectedColor();
            this.setRandomColors();
        },
        checkBox(color) {
            if (color == this.selectedColor) {
                this.hits++
                this.resetGame()
            } else {
                this.misses++
                let index = this.randomColors.indexOf(color)
                this.randomColors.splice(index, 1);
                this.checkToRestartGame();
            }
        },
        checkToRestartGame() {
            if (this.randomColors.length < this.amount / 2) {
                this.failedGames++
                this.resetGame()
            }
        }
    },
    created() {
        this.amount = this.difficultyScale.easy;
        this.setSelectedColor();
        this.setRandomColors();
    },
})