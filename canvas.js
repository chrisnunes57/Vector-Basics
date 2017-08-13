function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    school = new School();
    school.addFish(new Fish(random(0,width),random(0,height)));
}

function draw(){
    clear();
    school.run();
}
/*
function mouseClicked(e){
    school.addFish(new Fish(mouseX,mouseY));
}
*/
function School(){
    this.fish = [];
}

School.prototype.run = function(){
    for(var i = 0; i < this.fish.length; i++){
        this.fish[i].run();
    }
}

School.prototype.addFish = function(f){
    this.fish.push(f);
    console.log("Fish added at "+f.position.x+", "+f.position.y);
}

function Fish(x,y){
    this.position = createVector(x,y);
    this.velocity = createVector(random(-1,1),random(-1,1));
    //this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.r = 5;
}

Fish.prototype.run = function(){
    this.update();
    this.checkEdges();
    this.render();
    if(mouseIsPressed){
            this.findMouse();
    }else{
            this.slowDown();
    }
    
}

Fish.prototype.render = function(){
    var angle = this.velocity.heading() + radians(90);
    fill(127);
    stroke(200);
    beginShape();
    translate(this.position.x,this.position.y);
    rotate(angle);
    vertex(0,-this.r*2);
    vertex(-this.r,this.r*2);
    vertex(this.r,this.r*2);
    endShape(CLOSE);
}

Fish.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
}

Fish.prototype.findMouse = function(){
    var mouse = createVector(mouseX,mouseY);
    var direction = p5.Vector.sub(mouse,this.position);
    direction.normalize();
    direction.mult(1);
    this.acceleration = direction;
}

Fish.prototype.checkEdges = function(){
    if(this.position.x +this.r > width || this.position.x +this.r *2< 0){
        if(this.position.x +this.r*2 < 0){
            this.position.x = 0+2*this.r;
        }else{
            this.position.x = width-2*this.r;
        }
        this.velocity.x*= -0.2;
        this.acceleration.mult(0);
    }
    if(this.position.y + this.r < 0 || this.position.y + this.r > height){
        if(this.position.y + this.r < 0){
            this.position.y = 0 + 2*this.r;
        }else{
            this.position.y = height - 2*this.r;
        }
        this.velocity.y *= -.2;
        this.acceleration.mult(0);
    }
}

Fish.prototype.slowDown = function(){
    this.velocity.mult(.98);
    this.acceleration.mult(0);
    if(this.velocity.x < 2 && this.velocity.x > 0){
        this.velocity.x = 2;
    }
    if(this.velocity.x < 0 && this.velocity.x > -2){
        this.velocity.x = -2;
    }
    if(this.velocity.y < 2 && this.velocity.y > 0){
        this.velocity.y = 2;
    }
    if(this.velocity.y < 0 && this.velocity.y > -2){
        this.velocity.y = -2;
    }
}