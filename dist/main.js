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
            counter.new();
            counter.win();
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
            var newObject = createVector(random(gap, effectiveWindowWidth - gap), random(gap, effectiveWindowHeight - gap));

            if (this.objects.every(function(item){
                return p5.Vector.sub(item, newObject).mag() > 85;
            }))
            {
                this.objects.push(newObject);
            }
        }
        var div = select('#solution');
        div.html("Count the circles and press ENTER!");
    }

    this.draw = function() {
        for(var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            fill(255,0,0);
            ellipse(object.x, object.y, 80);
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