import p5 from 'p5';
import Counter from './counter';

var counter;
var header = 160;
var effectiveWindowWidth, effectiveWindowHeight;
var objectSize = 80;

window.setup = function() {
    effectiveWindowWidth = windowWidth - 16;
    effectiveWindowHeight = windowHeight - header;
    var canvas = createCanvas(effectiveWindowWidth, effectiveWindowHeight);

    if (displayWidth < 700)
        objectSize = 30;

    canvas.parent('play');
    counter = new Counter(objectSize, effectiveWindowWidth, effectiveWindowHeight);
    counter.new();

    var buttons = selectAll('.value-button');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].mouseClicked(function () {
            if (counter.losing)
                counter.new();
            else
                counter.guess(this.elt.innerHTML);
        });
    }

    var enterButton = select('.enter-button');
    enterButton.mouseClicked(function () {
        if (counter.losing)
            counter.new();
        else
            counter.submitGuess();
    });
}

window.draw = function() {
    background(255, 255, 255);
    counter.draw();
}

window.windowResized = function() {
    effectiveWindowWidth = windowWidth - 16;
    effectiveWindowHeight = windowHeight - header;
    resizeCanvas(effectiveWindowWidth, effectiveWindowHeight);
}

window.keyTyped = function() {
    if (key === ' ' || counter.losing) {
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

window.touchStarted = function() {
    if (touches.length > 0) {
        var touch = touches[0];
        if (
            touch.x >= 0 && touch.x < effectiveWindowWidth &&
            touch.y >= 0 && touch.y < effectiveWindowHeight 
        )
        {
            if (counter.losing)
                counter.new();
        }
    }
}