const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var platform_list = [];
var heart_list = [];
var banana_list =[];
var boost_list =[]

var play_but = document.getElementById('play');
var score_but = document.getElementById('score');

var platform_generator;
var powerup_generator;
var hearts;
var score;
var playing = false;
var replay;
var life;
var platform_speed;
var platform_range;

var base_1 = new Image();
base_1.src = "background/platform.png";
var base_1_spiky = new Image();
base_1_spiky.src = "background/platform_spike.png"
base_1_fragile = new Image();
base_1_fragile.src = "background/platform_fragile.png"
var heart_img = new Image();
heart_img.src = "background/life.png";
var banana_img = new Image();
banana_img.src = "background/banana.png";
var boost_img = new Image();
boost_img.src = "background/speed.png";

canvas.width = 700;
canvas.height = 300;


function init() {
    

    c.clearRect(0, 0, canvas.width, canvas.height);
    platform_list = [];
    heart_list = [];
    banana_list = [];
    boost_list = [];
    platform_speed = -0.7
    platform_range = 10;

    moving_ball = new ball(canvas.width/2 - 5, canvas.height -20,0,1,20);
    window.addEventListener("keydown",movement);

    life = new lives();
    life.draw();

    c.fillStyle = c.createPattern(base_1, 'repeat');
    base_1_platfrom = new platform(canvas.width/2-125 , canvas.height, platform_speed, 250 , 13);
    platform_list.push(base_1_platfrom);
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].draw();
    }
    platform_generator = setInterval( platformpicker, 1500);
    powerup_generator = setInterval( powerup_caller, 3000);
    
    spikes = new spike("background/spikes.png");
    spikes.draw();    
}


// Animation Loop
function animate() {
    
    score_but.innerHTML = score;
    platform_speed -= score / 100000000;

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
    for (var i=0; i<banana_list.length; i++) {
        banana_list[i].update();
    }
    for (var i=0; i<boost_list.length; i++) {
        boost_list[i].update();
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

    if (innerHeight > innerWidth || innerWidth < canvas.width){
        alert("Please shift to Landscape Mode");        
    }

} , 2000);