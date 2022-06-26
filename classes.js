var moving_ball;

class ball {
    constructor(x, y, dx, dy, height) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.gravity = 0.1
        this.color = colors[1];
        this.lastkey;
        this.img = new Image();
        this.img.src = "background/ball.png"
        this.draw = function () {
            c.drawImage(this.img,this.x, this.y, this.height, this.height)
        };
        
        this.update = function () {

  
            if (this.y  < 50 || this.y > 290){
                
                hearts -= 1;
                unanimate();
                window.removeEventListener("keydown",movement);
                clearInterval(platform_generator);
                clearInterval(heart_generator);

                if (hearts === 0 ){
                    playing = false;
                    playerScore(score);
                    play_but.innerHTML = "Restart";
                    play_but.addEventListener("click",start);
                }
                else {
                    replay = setTimeout( function () {
                        start()
                    }, 1000);
                }
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
            score += Math.floor(Math.abs(this.dy)*10);

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
            score += Math.floor(Math.abs(this.dx)*5);
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
        this.pattern = c.createPattern(base_1,'repeat');

        this.draw = function () {
            
            c.fillStyle = this.pattern;
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

class spike {
    constructor(path) {
        this.img = new Image();
        this.img.src = path;
        
    this.draw = function() {
        c.drawImage(this.img, 0, 0, canvas.width, 50);
    }
    }
}


class lives {
    constructor(){
        this.count = hearts
        this.draw =function () {
            this.count = hearts;
            c.drawImage(heart_img, 10,55,35,35);
            c.fillStyle = colors[2];
            c.font = '18px Arcade';
            if (this.count != 0){
                c.fillText(`x ${this.count}`,47,77 )
            }
        }
    }
}

class spawning_lives{
    constructor(){
        this.height = 15;
        this.x = randomIntFromRange(0,canvas.width - this.height);
        this.y = randomIntFromRange(50,canvas.height - this.height);
        this.frame = 300;

        this.draw = function() {
            c.drawImage(heart_img, this.x,this.y,this.height,this.height);
        }

        this.remove = function () {
            for (var i=0; i<heart_list.length; i++) {
                if (JSON.stringify(this) === JSON.stringify(heart_list[i])){
                    heart_list.splice(i,1);
                }
            }
        }
        this.update =function () {

            this.frame -= 1;
            if ( this.frame === 0 ){
                this.remove();
            }

            if (collision( this , moving_ball)){
                    this.remove();
                    hearts += 1;

                }
            this.draw();
        }
    }
}