function one_platform( width = null, x = null, y = 300){

    if (width === null){
        width = randomIntFromRange(100, canvas.width/3);
    }

    if (x === null){
        x = Math.floor(Math.random() * (canvas.width - width));
    }

    let single_platform = new platform( x, y, -1, width, 13);
    platform_list.push(single_platform);
    single_platform.draw();

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