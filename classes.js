var moving_ball;

class ball {
    constructor(x, y, dx, dy, height, type = null) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.gravity = 0.1
        this.xgravity = 0;
        this.lastkey;

        this.img = new Image();
        this.img.src = "background/ball.png"

        this.img.opacity = 0.5
        this.type = type;
        this.draw = function () {
            c.drawImage(this.img,this.x, this.y, this.height, this.height); 
        };
        
        this.update = function () {

  
            if (this.y  < 50 || this.y > 290){
                end();
            }

            for (var i = 0; i < platform_list.length; i++) {
                if (collision(moving_ball,platform_list[i])) {
                        if (platform_list[i].type == "spiky") {
                            end();
                        }
                        this.dy = platform_list[i].speed;
                        this.y += this.dy;
                        this.draw();
                        return 0;
                }
            }


            this.dy += this.gravity;
            this.y += this.dy;
            score += Math.floor(Math.abs(this.dy));

            this.draw();
        };

        this.move = function(event) {

            if (this.x === canvas.width || this.x === 0) {
                this.dx = -this.dx
            }

            if(event.code === 'ArrowRight'){

                this.dx += 10 - this.xgravity ;
            }

            if(event.code === 'ArrowLeft'){
                this.dx -= 10  - this.xgravity;
            }

            this.x += this.dx;
            score += Math.floor(Math.abs(this.dx));
            this.update();
        }
    }
}

class platform {
    constructor(x, y, speed, width, height, type =null) {

        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.type = type
        this.pattern;
        this.frames = randomIntFromRange(50,200);

        if (this.type == "spiky") {
            this.pattern = c.createPattern(base_1_spiky,'repeat');
        }
        else if (this.type == "fragile") {
            this.pattern = c.createPattern(base_1_fragile,'repeat')
        }
        else { this.pattern = c.createPattern(base_1,'repeat');}

        this.draw = function () {
            
            c.fillStyle = this.pattern;
            c.fillRect(this.x, this.y, this.width, this.height);
        };

        this.update = function () {
            this.y += this.speed;
            if (this.type == "fragile"){
                this.frames -= 1;                
                if (this.frames === 0){

                    let index = platform_list.indexOf(this);
                    platform_list.splice(index, 1);
                }
            }

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
            c.fillStyle = "white";
            c.font = '18px Arcade';
            c.fillText(`x ${this.count}`,47,77 )
        }
    }
}
