var counter;

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('play');
    counter = new Counter();
    counter.new();
}

function draw() {
    background(233, 0, 0);
    counter.draw();
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
        }
        else{
            var div = select('#solution');
            div.html("Wrong");
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
            touch.x >= 0 && touch.x < 400 &&
            touch.y >= 0 && touch.y < 400 
        )
        {
            counter.new();
        }
    }
}

function Counter () {
    this.objects = [];
    this.number = 0;
   
    this.new = function () {
        this.objects = [];
        this.number = floor(random(1, 10));
        while(this.objects.length < this.number) {
            var newObject = createVector(random(45,355), random(45,355));

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
            ellipse(object.x, object.y, 80);
        }
    }

    this.guess = function(guess) {
        this.lastGuess = guess;
    }

    this.isValid = function() {
        return this.lastGuess == this.number;
    }
}