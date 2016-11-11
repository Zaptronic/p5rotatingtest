var circles =[];
var randomDist = [];
var randomSize = [];
var circlesAmount = 480;

function setup() {
    rectMode(CENTER);
    colorMode(HSB);
    blendMode(MULTIPLY);
    noStroke();

    for(var i = 0; i < circlesAmount; i++) {
        randomDist[i] = random(120, 1280);
        circles.push(new circle(randomDist[i]));
    }
}

function draw() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    translate(windowWidth/2, windowHeight/2);

    for(var i = 0; i < circlesAmount; i++) {
        circles[i].show();
        circles[i].speedcheck();
        circles[i].update();
    }
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}
function circle(offset) {
    this.i = floor(randomGaussian(0, 360));
    this.speed = randomGaussian(0.1, 0.8);
    this.offset = offset;
    this.minSize = 24;
    this.maxSize = 64;
    this.size = randomGaussian(this.minSize, this.maxSize);
    this.incrementer = 1;
    this.direction = 1;
    this.j;
    this.nx;
    this.ny;
    this.colorV = floor(random(360));

    this.show = function() {
        blendMode(MULTIPLY);
        fill(this.colorV, 120, 255);
        ellipse(this.nx, this.ny, this.size, this.size);
    }

    this.update = function() {
        if(this.i>360) {
            this.i = this.i%360;
        }
        this.j = this.i*Math.PI/180;
        this.nx = Math.cos(this.j)*this.offset;
        this.ny = Math.sin(this.j)*this.offset;
        this.i+= this.speed;
        this.size += this.incrementer * this.direction;
        this.incrementer += 0.0001;
        console.log(this.size);
    }
    this.speedcheck = function() {
        if (this.size > this.maxSize * 2) {
            this.direction = -1;
            this.incrementer = 1;
        } else if (this.size <= this.minSize) {
            this.direction = 1;
        }
    }
}
