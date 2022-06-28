
class spawning_lives{
    constructor(){
        this.height = 15;
        this.x = randomIntFromRange(0,canvas.width - this.height);
        this.y = randomIntFromRange(50,canvas.height - this.height);
        this.frame = 600;

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
                    play_audio("heart");
                    this.remove();
                    hearts += 1;

                }
            this.draw();
        }
    }
}

class spawning_banana{
    constructor(){
        this.height = 15;
        this.x = randomIntFromRange(0,canvas.width - this.height);
        this.y = randomIntFromRange(50,canvas.height - this.height);
        this.frame = 600;

        this.draw = function() {
            c.drawImage(banana_img, this.x,this.y,this.height,this.height);
        }

        this.remove = function () {
            for (var i=0; i<banana_list.length; i++) {
                if (JSON.stringify(this) === JSON.stringify(banana_list[i])){
                    banana_list.splice(i,1);
                }
            }
        }
        this.update =function () {

            this.frame -= 1;
            if ( this.frame === 0 ){
                this.remove();
            }

            if (collision( this , moving_ball)){
                    play_audio("powerdown");
                    this.remove();
                    moving_ball.xgravity = 8;
                    setTimeout( function () {
                        moving_ball.xgravity = 0;
                    }, 3000);

                }
            this.draw();
        }
    }
}


class spawning_boost{
    constructor(){
        this.height = 15;
        this.x = randomIntFromRange(0,canvas.width - this.height);
        this.y = randomIntFromRange(50,canvas.height - this.height);
        this.frame = 600;

        this.draw = function() {
            c.drawImage(boost_img, this.x,this.y,this.height,this.height);
        }

        this.remove = function () {
            for (var i=0; i<boost_list.length; i++) {
                if (JSON.stringify(this) === JSON.stringify(boost_list[i])){
                    boost_list.splice(i,1);
                }
            }
        }
        this.update =function () {

            this.frame -= 1;
            if ( this.frame === 0 ){
                this.remove();
            }

            if (collision( this , moving_ball)){
                    play_audio("powerup");
                    this.remove();
                    moving_ball.xgravity = -8;
                    setTimeout( function () {
                        moving_ball.xgravity = 0;
                    }, 3000);

                }
            this.draw();
        }
    }
}
