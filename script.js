const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const platform_list = [];


canvas.width = 700;
canvas.height = 300;


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#5ffbd6', '#7ECEFD', '#FFF6E5', '#FF7F66']


class ball {
    constructor(x, y, dx, dy, height) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.gravity = 0.5
        this.color = colors[1];

        this.update = function () {

            for (var i = 0; i < platform_list.length; i++) {
                console.log(platform_list[i].y - this.y);
                if (this.y < platform_list[i].y && platform_list[i].y - this.y - this.dy < this.height) {
                    console.log(platform_list[i].y - this.y);
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

        this.draw = function () {
            c.beginPath();
            c.rect(this.x, this.y, this.height, this.height);
            c.fillStyle = this.color;
            c.fill();
            c.stroke();
            c.closePath();
        };
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
            c.fillRect(this.x, this.y, this.width, this.height);
            c.fillStyle = colors[0];
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


function one_platform( x = null, y = 300, width = null){

    this.x = x;
    this.y = y;
    this.width = width;
    /*do {
        if (this.x === null){
            this.x = Math.floor(Math.random() * canvas.width);
        }

        if (this.width === null){
            this.x = Math.floor(Math.random() * canvas.width);
        }
    } while (this.x + this.width < canvas.width)*/
    let single_platform = new platform( this.x, this.y, -1, this.width, 10);
    return single_platform;

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

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

/*addEventListener('resize', () => {
  canvas.width = 700;
  canvas.height = 300;

  init()
})*/


// Implementation





function init() {
    moving_ball = new ball(canvas.width/2,canvas.height/2 -50,1,1,10);

    
    base_1 = one_platform(canvas.width/2 +10-125 , canvas.height/2 -50+10);
    console.log(base_1);
    single_platform = new platform( canvas.width/2 +10-125, canvas.height, -1, 250, 10);
    platform_list.push(single_platform);
    console.log(platform_list);
    
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].draw();
    }

}

// Animation Loop
function animate() {
    
    animate_func =requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    moving_ball.update();
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].update();
    }
}

function unanimate(){
    cancelAnimationFrame(animate_func);
}



init();
animate();
