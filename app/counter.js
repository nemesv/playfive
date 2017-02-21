import p5 from 'p5';

export default function Counter (objectSize, effectiveWindowWidth, effectiveWindowHeight) {
    this.objects = [];
    this.score = 0;
    this.number = 0;
    var gap = objectSize + 5;

    this.new = function () {
        this.final = false;
        this.lastGuess = null;
        this.losing = false;
        this.objects = [];
        this.number = floor(random(1, 10));
        var newPosition;
        while(this.objects.length < this.number) {
            newPosition = this.findNewPosition();
            if (!newPosition)
            {
                this.number--;
                continue;
            }
            this.objects.push({
                    position: newPosition,
                    color: color('red'),
                    type: 'ellipse'
                });
        }
        var level2 = floor(random(1, 5));
        if (this.score > 5) {
            for(var i = 0; i < level2; i++) {
                newPosition = this.findNewPosition();
                if (!newPosition)
                {
                    level2--;
                    continue;
                }
                this.objects.push({
                    position: newPosition,
                    color: color('blue'),
                    type: 'ellipse'
                });
            }
        }
        var level3 = floor(random(1, 5));
        if (this.score > 10) {
            for(var i = 0; i < level3; i++) {
                newPosition = this.findNewPosition();
                if (!newPosition)
                {
                    level3--;
                    continue;
                }
                this.objects.push({
                    position: newPosition,
                    color: color('red'),
                    type: 'rect'
                });
            }
        }
        if (this.score > 20) {
            displayMessage("Press any key/touch to restart.");
            this.final = true;
            this.objects.length = 0;
            this.score = 0;
        }
        else
            displayMessage("Count the RED circles and press ENTER!");
    }

    this.findNewPosition = function() {
        var counter = 0;
        while(true) 
        {
            var newPosition = createVector(random(gap, effectiveWindowWidth - gap), random(gap, effectiveWindowHeight - gap));

            if (this.objects.every(function(item){
                return p5.Vector.sub(item.position, newPosition).mag() > objectSize * 2 + 5;
            }))
            {
                return newPosition;
            }
            counter++;
            if (counter > 200)
                break;
        }
    }

    this.draw = function() {
        for(var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            fill(object.color);
            switch (object.type)
            {
                case 'ellipse':
                    ellipse(object.position.x, object.position.y, objectSize * 2);
                break;
                case 'rect':
                    rect(object.position.x - objectSize, object.position.y - objectSize, objectSize * 2, objectSize * 2, 20);
                break;
            }
        }
        fill(0,0,0);
        textSize(30);
        if (this.final) {
            text("Congratulation!", (effectiveWindowWidth - textWidth("Congratulation!")) / 2, 75);
            text("Level 20 reached.", (effectiveWindowWidth - textWidth("Level 20 reached.")) / 2, 115);
        }
        else {
            text(this.score, 10, 35);
        }
    }

    this.guess = function(guess) {
        this.lastGuess = guess;
        displayMessage(`Your guess is: ${this.lastGuess}`);
    }

    this.submitGuess = function(guess) {
        if (!this.lastGuess)
            return;
        if (this.isValid()) {
            this.win();
            this.new();
        }
        else{
            displayMessage("Wrong. Press any key/touch to restart.");
            this.lose();
        }
    }

    this.isValid = function() {
        return this.lastGuess == this.number;
    }

    this.win = function() {
        this.score += 1;
         analytics('send', {
            hitType: 'event',
            eventCategory: 'Counter',
            eventAction: 'win',
            eventLabel: 'Score-' + this.score,
            eventValue: this.score
        });
    }

    this.lose = function() {
        analytics('send', {
            hitType: 'event',
            eventCategory: 'Counter',
            eventAction: 'lose',
            eventLabel: 'Score-' + this.score,
            eventValue: this.score
        });
        this.score = 0;
        this.objects = [];
        this.losing = true;
    }

    function displayMessage(message) {
        var div = select('#solution');
        div.html(message);
    }
}

function analytics() {
    if (window.ga) {
        ga.apply(this, arguments);
    }
    else {
        console.log(arguments);
    }
}