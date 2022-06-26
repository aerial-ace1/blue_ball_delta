const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var platform_list = [];
var heart_list = [];

var play_but = document.getElementById('play');
var score_but = document.getElementById('score');

var platform_generator;
var heart_generator;
var hearts;
var score;
var playing = false;
var replay;
var life;

var base_1 = new Image();
base_1.src = "background/platform.png";
var heart_img = new Image();
heart_img.src = "background/life.png";

canvas.width = 700;
canvas.height = 300;


const colors = ['#5ffbd6', '#7ECEFD', '#FFF6E5', '#FF0000']


function init() {
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    platform_list = [];
    heart_list = [];

    moving_ball = new ball(canvas.width/2 - 5, canvas.height -20,0,1,20);
    window.addEventListener("keydown",movement);

    life = new lives();
    life.draw();

    
    
    c.fillStyle = c.createPattern(base_1, 'repeat');
    base_1_platfrom = new platform(canvas.width/2-125 , canvas.height, -1, 250 , 13);
    platform_list.push(base_1_platfrom);
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].draw();
    }
    platform_generator = setInterval( platformpicker, 1000);
    heart_generator = setInterval( heart_maker, 8000);
    
    spikes = new spike("background/spikes.png");
    spikes.draw();    
}


// Animation Loop
function animate() {
    
    score_but.innerHTML = score;

    animate_func = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    moving_ball.update();
    moving_ball.dx = 0;
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].update();
    }
    for (var i=0; i<heart_list.length; i++) {
        heart_list[i].update();
    }
    life.draw();
    spikes.draw(); 
}

function unanimate(){
    cancelAnimationFrame(animate_func);
}

function start() {
    
    if (playing != true){
        score = 0;
        play_but.removeEventListener("click",start);
        hearts = 3;
        playing = true;
    }
    play_but.innerHTML = "Playing...";
    init();
    animate();
}

updateLeader();
play_but.addEventListener("click",start);


setInterval(function() {

    let overlay = document.getElementById('nextbox')
    if (innerHeight > innerWidth || innerWidth < canvas.width){
        overlay.style.display = 'flex';
    }
    else { overlay.style.display = 'none';}
} , 1000);