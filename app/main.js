var counter;
var header = 130;
var effectiveWindowWidth, effectiveWindowHeight;
var objectSize = 80;

function setup() {
    effectiveWindowWidth = windowWidth - 16;
    effectiveWindowHeight = windowHeight - header;
    var canvas = createCanvas(effectiveWindowWidth, effectiveWindowHeight);

    if (displayWidth < 700)
        objectSize = 30;

    canvas.parent('play');
    counter = new Counter();
    counter.new();

    var buttons = selectAll('.value-button');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].mouseClicked(function () {
            if (counter.loosing)
                counter.new();
            else
                counter.guess(this.elt.innerHTML);
        });
    }

    var enterButton = select('.enter-button');
    enterButton.mouseClicked(function () {
        if (counter.loosing)
            counter.new();
        else
            counter.submitGuess();
    });
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
    if (key === ' ' || counter.loosing) {
        counter.new();
        return;
    }
    if (keyCode == ENTER) {
        counter.submitGuess();
        return;
    }
    var numbers = ["1","2","3","4","5","6","7","8","9","0"];
    if (numbers.indexOf(key) > - 1) {
        counter.guess(key);
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
            if (counter.loosing)
                counter.new();
        }
    }
}

function Counter () {
    this.objects = [];
    this.score = 0;
    this.number = 0;
    var gap = objectSize + 5;
    this.new = function () {
        this.lastGuess = null;
        this.loosing = false;
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
        var div = select('#solution');
        div.html("Count the RED circles and press ENTER!");
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
        text(this.score, 10, 35);
    }

    this.guess = function(guess) {
        this.lastGuess = guess;
        
        var div = select('#solution');
        div.html("Your guess is: " + this.lastGuess);
    }

    this.submitGuess = function(guess) {
        if (!this.lastGuess)
            return;
        if (this.isValid()) {
            var div = select('#solution');
            div.html("Right");
            this.win();
            this.new();
        }
        else{
            var div = select('#solution');
            div.html("Wrong. Press any key/touch to restart.");
            this.loose();
        }
    }

    this.isValid = function() {
        return this.lastGuess == this.number;
    }

    this.win = function() {
        this.score += 1;
    }

    this.loose = function() {
        this.score = 0;
        this.objects = [];
        this.loosing = true;
    }
}