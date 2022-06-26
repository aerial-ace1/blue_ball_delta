const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const platform_list = [];


canvas.width = 700;
canvas.height = 300;


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#5ffbd6', '#7ECEFD', '#FFF6E5', '#FF0000']


class ball {
    constructor(x, y, dx, dy, height) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.gravity = 0.5
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

  
            if (this.y  < 20 || this.y > 260){
                unanimate();
                window.removeEventListener("keydown",movement);
                
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
            
            c.fill();
        };

        this.update = function () {
            this.y += this.speed;
            if (this.y === 20) {
                platform_list.splice(0, 1);
            }
            else {
                this.draw();
            }


        };
    }
}

function draw_fire(){
    c.fillStyle = colors[3];
    c.fillRect(0,0,canvas.width,20);
}

function one_platform( width = null, x = null, y = 300){

    if (x === null){
        x = Math.floor(Math.random() * canvas.width);
    }

    if (width === null){
    width = Math.floor(Math.random() * (canvas.width - x ) );
    }
    let single_platform = new platform( x, y, -1, width, 10);
    platform_list.push(single_platform);
    platform_list[platform_list.length -1 ].draw();

}

function two_platform( x = 0, y = 305 ){

    this.x = x;
    this.y = y;
    if (this.x === 0){
        this.x = Math.floor(Math.random() * canvas.width);
    }
    single_platform = new platform( this.x, this.y, -1, 250, 10);
    platform_list.push(single_platform);
    

}


function movement(e){
    moving_ball.move(e);
}



function init() {
    moving_ball = new ball(canvas.width/2, 300 -50,0,1,10);
    draw_fire();    
    window.addEventListener("keydown",movement);
    one_platform(250 ,canvas.width/2 +10-125 , 300 -50+10 );
    one_platform( 250);

    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].draw();
    }

}

// Animation Loop
function animate() {
    
    animate_func = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    moving_ball.update();
    draw_fire();
    moving_ball.dx = 0;

    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].update();
    }
}

function unanimate(){
    cancelAnimationFrame(animate_func);
}



init();
animate();
