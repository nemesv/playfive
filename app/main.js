var counter;
var header = 150;
var effectiveWindowWidth, effectiveWindowHeight;

function setup() {
    effectiveWindowWidth = windowWidth - 16;
    effectiveWindowHeight = windowHeight - header;
    var canvas = createCanvas(effectiveWindowWidth, effectiveWindowHeight);
    
    canvas.parent('play');
    counter = new Counter();
    counter.new();
}

function draw() {
    background(255, 255, 255);
    counter.draw();
}

function windowResized() {
    effectiveWindowWidth = windowWidth - 16;
    effectiveWindowHeight = windowHeight - header;
    resizeCanvas(effectiveWindowWidth, effectiveWindowHeight);
}

function keyTyped() {
    if (key === ' ') {
        counter.new();
    }
    if (keyCode == ENTER) {
        if (counter.isValid()) {
            var div = select('#solution');
            div.html("Right");
            counter.win();
            counter.new();
        }
        else{
            var div = select('#solution');
            div.html("Wrong");
            counter.loose();
        }
    }
    var numbers = ["1","2","3","4","5","6","7","8","9","0"];
    if (numbers.indexOf(key) > - 1) {
        counter.guess(key);
        var div = select('#solution');
        div.html(key);
    }
}

function touchStarted() {
    if (touches.length > 0) {
        var touch = touches[0];
        if (
            touch.x >= 0 && touch.x < effectiveWindowWidth &&
            touch.y >= 0 && touch.y < effectiveWindowHeight 
        )
        {
            counter.new();
        }
    }
}

function Counter () {
    this.objects = [];
    this.score = 0;
    this.number = 0;
    var gap = 45;
    this.new = function () {
        this.objects = [];
        this.number = floor(random(1, 10));
        while(this.objects.length < this.number) {
            this.objects.push({
                    position: this.findNewPosition(),
                    color: color('red'),
                    type: 'ellipse'
                });
        }
        if (this.score > 5) {
            for(var i = 0; i < floor(random(1, 5)); i++) {
                this.objects.push({
                    position: this.findNewPosition(),
                    color: color('blue'),
                    type: 'ellipse'
                });
            }
        }
        if (this.score > 10) {
            for(var i = 0; i < floor(random(1, 5)); i++) {
                this.objects.push({
                    position: this.findNewPosition(),
                    color: color('red'),
                    type: 'rect'
                });
            }
        }
        var div = select('#solution');
        div.html("Count the RED circles and press ENTER!");
    }

    this.findNewPosition = function() {
        while(true) 
        {
            var newPosition = createVector(random(gap, effectiveWindowWidth - gap), random(gap, effectiveWindowHeight - gap));

            if (this.objects.every(function(item){
                return p5.Vector.sub(item.position, newPosition).mag() > 85;
            }))
            {
                return newPosition;
            }
        }
    }

    this.draw = function() {
        for(var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            fill(object.color);
            switch (object.type)
            {
                case 'ellipse':
                    ellipse(object.position.x, object.position.y, 80);
                break;
                case 'rect':
                    rect(object.position.x - 40, object.position.y - 40, 80, 80, 20);
                break;
            }
        }
        fill(0,0,0);
        textSize(30);
        text(this.score, 10, 35);
    }

    this.guess = function(guess) {
        this.lastGuess = guess;
    }

    this.isValid = function() {
        return this.lastGuess == this.number;
    }

    this.win = function() {
        this.score += 1;
    }

    this.loose = function() {
        this.score = 0;
    }
}