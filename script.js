const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const platform_list = [];
var platform_generator;
var hearts;
var play_but = document.getElementById('play');


canvas.width = 700;
canvas.height = 300;


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const colors = ['#5ffbd6', '#7ECEFD', '#FFF6E5', '#FF0000']


class ball {
    constructor(x, y, dx, dy, height) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.gravity = 0.05
        this.color = colors[1];
        this.lastkey;

        this.draw = function () {
            c.beginPath();
            c.rect(this.x, this.y, this.height, this.height);
            c.fillStyle = this.color;
            c.fill();
            c.stroke();
            c.closePath();
        };
        
        this.update = function () {

  
            if (this.y  < 50 || this.y > 290){
                unanimate();
                window.removeEventListener("keydown",movement);
                clearInterval(platform_generator);
            }

            for (var i = 0; i < platform_list.length; i++) {
                if (this.y < platform_list[i].y &&
                     platform_list[i].y - this.y - this.dy < this.height && 
                     Math.abs(platform_list[i].x + platform_list[i].width/2 - this.x - this.height/2) < platform_list[i].width/2) {
                    this.dy = platform_list[i].speed;
                    this.y += this.dy;
                    this.draw();
                    return 0;
                }
            }


            this.dy += this.gravity;
            this.y += this.dy;

            this.draw();
        };

        this.move = function(event) {

            if (this.x === canvas.width || this.x === 0) {
                this.dx = -this.dx
            }

            if(event.code === 'ArrowRight'){

                this.dx += 10 ;
            }

            if(event.code === 'ArrowLeft'){
                this.dx -= 10 ;
            }

            this.x += this.dx;
            this.update();
        }
    }
}

class platform {
    constructor(x, y, speed, width, height) {

        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;

        this.draw = function () {
            c.fillStyle = colors[0];
            c.fillRect(this.x, this.y, this.width, this.height);
        };

        this.update = function () {
            this.y += this.speed;
            if (this.y === 50) {
                platform_list.splice(0, 1);
            }
            else {
                this.draw();
            }


        };
    }
}

function draw_spike(){
    img = new Image()
    img.src = "background/spikes.png";
    c.drawImage(img, 0, 0, canvas.width, 50);
}

function one_platform( width = null, x = null, y = 300){

    if (width === null){
        width = randomIntFromRange(100, canvas.width/3);
    }

    if (x === null){
        x = Math.floor(Math.random() * (canvas.width - width));
    }

    let single_platform = new platform( x, y, -1, width, 10);
    platform_list.push(single_platform);

}

function two_platform(width = null){

    if (width === null){ 
        width = randomIntFromRange(80, canvas.width/3.5);
    }
    let x_platform = (canvas.width - (2*width))/3;
    one_platform( width, x_platform, 300);
    one_platform( width, (2*x_platform) + width, 300);

}

function three_platform(width = null){

    if (width === null){ 
        width = randomIntFromRange(70, canvas.width/5);
    }
    let x_platform = (canvas.width - (3*width))/4;
    one_platform( width, x_platform, 300);
    one_platform( width, (2*x_platform) + width, 300);
    one_platform( width, (3*x_platform) + (2*width), 300);

}

function movement(e){
    moving_ball.move(e);
}

function platformpicker(){
    number = randomIntFromRange(0,2)
    if ( number === 0) {one_platform();}
    else if (number === 1) {two_platform();}
    else {three_platform();}
}

function cross_roads(){
    if (outcome) {}
}

function init() {
    moving_ball = new ball(canvas.width/2 - 5, 300 -50,0,1,10);
    
    window.addEventListener("keydown",movement);
    one_platform(250 ,canvas.width/2-125 , 300 -50+10 );
    two_platform();
    platform_generator = setInterval( platformpicker, 1000);
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].draw();
    }
    draw_spike();    
}


// Animation Loop
function animate() {
    
    animate_func = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    moving_ball.update();
    moving_ball.dx = 0;
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].update();
    }
    draw_spike();
}

function unanimate(){
    cancelAnimationFrame(animate_func);
}

function start() {
    hearts = 3;
    play_but.addEventListener('click',function(){
        init();
        animate();
    });
}

start();

